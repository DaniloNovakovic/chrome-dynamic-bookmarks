import fs from "fs";
import path from "path";

import react from "@vitejs/plugin-react";
import type { OutputAsset, OutputBundle, OutputChunk } from "rollup";
import type { Plugin } from "vite";
import { defineConfig } from "vite";

import { createManifest } from "./manifest.config";

/**
 * Vite config for this Chrome MV3 extension.
 *
 * Why this is a little “non-standard” for Vite:
 * - We intentionally keep HTML templates in the public/ folder (not repo-root *.html entry files).
 * - Vite’s public/ folder is normally copied verbatim (no transforms), so we disable publicDir
 *   and instead generate build/*.html + build/manifest.json ourselves in a Rollup plugin.
 *
 * Build flow (high level):
 * 1) Bundle JS entrypoints (popup, bookmarkManager, options, background) via Rollup.
 * 2) After chunks exist, read public/*.html templates and inject the correct script/link tags for
 *    each entry’s emitted assets.
 * 3) Emit manifest.json by merging public/manifest.json with package.json metadata (see manifest.config.ts).
 * 4) Copy remaining static extension assets from public/ (icons, etc.), excluding templates and the
 *    source manifest (since those are emitted/transformed).
 */
const projectRoot = __dirname;
const publicDir = path.resolve(projectRoot, "public");
const htmlTemplates = {
  popup: "popup.html",
  bookmarkManager: "bookmarkManager.html",
  options: "options.html",
} as const;
const entryPoints = {
  popup: path.resolve(projectRoot, "src/popup/index.tsx"),
  bookmarkManager: path.resolve(projectRoot, "src/bookmarkManager/index.tsx"),
  options: path.resolve(projectRoot, "src/options/index.ts"),
  background: path.resolve(projectRoot, "src/background/index.ts"),
};

/** Read a UTF-8 file from the extension public/ folder. */
const readPublicFile = (relativePath: string) =>
  fs.readFileSync(path.resolve(publicDir, relativePath), "utf8");

/** Narrow Rollup output records to JS chunks (so we can read Vite chunk metadata like imported CSS). */
const isChunk = (value: OutputChunk | OutputAsset): value is OutputChunk =>
  value.type === "chunk";

/**
 * Figure out which emitted files need to be referenced from a given HTML entry.
 *
 * Notes:
 * - We intentionally emit entry filenames as [name].bundle.js so background.bundle.js stays aligned
 *   with public/manifest.json’s background.service_worker.
 * - For CSS, we rely on Vite/Rollup metadata (viteMetadata.importedCss) collected for the entry chunk.
 * - We only inject the entry chunk as a module script; the browser will load its static imports.
 */
const collectEntryAssets = (
  bundle: OutputBundle,
  entryName: keyof typeof htmlTemplates
) => {
  const entryFileName = `${entryName}.bundle.js`;
  const entryChunk = bundle[entryFileName];

  if (!entryChunk || !isChunk(entryChunk)) {
    throw new Error(`Could not find built entry chunk '${entryFileName}'.`);
  }

  const viteChunk = entryChunk as OutputChunk & {
    viteMetadata?: {
      importedCss?: Set<string>;
    };
  };
  const cssFiles = Array.from(viteChunk.viteMetadata?.importedCss ?? []);
  const jsFiles = [entryChunk.fileName];

  return { cssFiles, jsFiles };
};

/**
 * Inject built asset tags into an HTML template right before </body>.
 *
 * This replaces what html-webpack-plugin used to do, while keeping the HTML source in public/.
 */
const injectEntryAssets = (
  htmlTemplate: string,
  assets: ReturnType<typeof collectEntryAssets>
) => {
  const cssTags = assets.cssFiles
    .map((fileName) => `    <link rel="stylesheet" href="./${fileName}" />`)
    .join("\n");
  const scriptTags = assets.jsFiles
    .map(
      (fileName) => `    <script type="module" src="./${fileName}"></script>`
    )
    .join("\n");
  const tags = [cssTags, scriptTags].filter(Boolean).join("\n");

  return htmlTemplate.replace("</body>", `${tags ? `${tags}\n` : ""}  </body>`);
};

/**
 * List static asset paths under public/ that should be copied into build/.
 *
 * We skip:
 * - manifest.json (emitted separately, with metadata injection)
 * - *.html templates (emitted separately, with injected tags)
 */
const listPublicAssets = (directory: string, nestedPath = ""): string[] => {
  const absoluteDirectory = path.resolve(directory, nestedPath);
  const entries = fs.readdirSync(absoluteDirectory, { withFileTypes: true });

  return entries.flatMap((entry) => {
    const relativePath = path.posix.join(nestedPath, entry.name);

    if (entry.isDirectory()) {
      return listPublicAssets(directory, relativePath);
    }

    if (relativePath === "manifest.json" || relativePath.endsWith(".html")) {
      return [];
    }

    return [relativePath];
  });
};

/**
 * Rollup plugin phase: emit extension packaging files that Vite won’t infer on its own.
 *
 * Implemented in generateBundle so we can inspect the final output graph and emit additional assets.
 */
const chromeExtensionPlugin = (): Plugin => ({
  name: "chrome-extension-public-html",
  generateBundle(_, bundle) {
    Object.entries(htmlTemplates).forEach(([entryName, templateName]) => {
      const template = readPublicFile(templateName);
      const html = injectEntryAssets(
        template,
        collectEntryAssets(bundle, entryName as keyof typeof htmlTemplates)
      );

      this.emitFile({
        type: "asset",
        fileName: templateName,
        source: html,
      });
    });

    const manifest = createManifest();
    this.emitFile({
      type: "asset",
      fileName: "manifest.json",
      source: JSON.stringify(manifest, null, 2),
    });

    listPublicAssets(publicDir).forEach((relativePath) => {
      this.emitFile({
        type: "asset",
        fileName: relativePath,
        source: fs.readFileSync(path.resolve(publicDir, relativePath)),
      });
    });
  },
});

export default defineConfig({
  /**
   * Disable Vite’s default `public/` copying behavior.
   *
   * If left enabled, Vite would copy `public/*.html` + `public/manifest.json` into `build/` without
   * injecting bundle references, which would break the extension packaging goals above.
   */
  publicDir: false,
  plugins: [
    react({
      jsxRuntime: "classic",
    }),
    chromeExtensionPlugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(projectRoot, "src"),
    },
  },
  build: {
    outDir: "build",
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      input: entryPoints,
      output: {
        entryFileNames: "[name].bundle.js",
        chunkFileNames: "chunks/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
      },
    },
  },
});
