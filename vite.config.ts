import fs from "fs";
import path from "path";

import react from "@vitejs/plugin-react";
import type { OutputAsset, OutputBundle, OutputChunk } from "rollup";
import type { Plugin } from "vite";
import { defineConfig, transformWithEsbuild } from "vite";

import { createManifest } from "./manifest.config";

const projectRoot = __dirname;
const publicDir = path.resolve(projectRoot, "public");
const htmlTemplates = {
  popup: "popup.html",
  bookmarkManager: "bookmarkManager.html",
  options: "options.html",
} as const;
const entryPoints = {
  popup: path.resolve(projectRoot, "src/popup/index.tsx"),
  bookmarkManager: path.resolve(projectRoot, "src/bookmarkManager/index.js"),
  options: path.resolve(projectRoot, "src/options/index.js"),
  background: path.resolve(projectRoot, "src/background/index.js"),
};

const readPublicFile = (relativePath: string) =>
  fs.readFileSync(path.resolve(publicDir, relativePath), "utf8");

const isChunk = (value: OutputChunk | OutputAsset): value is OutputChunk =>
  value.type === "chunk";

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

const transformJsxInJsPlugin = (): Plugin => ({
  name: "transform-jsx-in-js",
  enforce: "pre",
  async transform(code, id) {
    if (!id.includes("/src/") || !id.endsWith(".js")) {
      return null;
    }

    return transformWithEsbuild(code, id, {
      loader: "jsx",
      jsx: "transform",
      jsxFactory: "React.createElement",
      jsxFragment: "React.Fragment",
    });
  },
});

export default defineConfig({
  publicDir: false,
  plugins: [
    transformJsxInJsPlugin(),
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
