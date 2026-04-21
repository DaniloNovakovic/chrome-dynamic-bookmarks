#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { spawn, spawnSync } = require("child_process");

const args = process.argv.slice(2);
const shouldWaitForBuild = args.includes("--wait-for-build");

const repoRoot = path.resolve(__dirname, "..");
const buildDir = path.resolve(repoRoot, "build");
const manifestPath = path.resolve(buildDir, "manifest.json");
const profileRoot = path.resolve(repoRoot, ".tmp");
const profileDir = path.resolve(
  profileRoot,
  `chromium-extension-manual-${Date.now()}`
);

function isExecutableFile(filePath) {
  if (!filePath) {
    return false;
  }

  try {
    fs.accessSync(filePath, fs.constants.X_OK);
    return true;
  } catch (_error) {
    return false;
  }
}

function resolveViaCommand(command) {
  const lookupCommand = process.platform === "win32" ? "where" : "which";
  const result = spawnSync(lookupCommand, [command], { encoding: "utf8" });
  if (result.status !== 0) {
    return null;
  }

  const firstMatch = (result.stdout || "")
    .split(/\r?\n/)
    .map((value) => value.trim())
    .find(Boolean);

  if (!firstMatch || !isExecutableFile(firstMatch)) {
    return null;
  }

  return firstMatch;
}

function resolvePlaywrightChromium() {
  try {
    const playwright = require("playwright");
    const executablePath = playwright.chromium.executablePath();
    if (isExecutableFile(executablePath)) {
      return executablePath;
    }
  } catch (_error) {
    // Playwright is optional for manual runs.
  }

  return null;
}

function resolveChromiumBinary() {
  if (process.env.CHROMIUM_PATH) {
    if (!isExecutableFile(process.env.CHROMIUM_PATH)) {
      throw new Error(
        "CHROMIUM_PATH is set but does not point to an executable file."
      );
    }

    return { path: process.env.CHROMIUM_PATH, source: "CHROMIUM_PATH" };
  }

  const playwrightChromium = resolvePlaywrightChromium();
  if (playwrightChromium) {
    return { path: playwrightChromium, source: "playwright" };
  }

  const pathCandidates = ["chromium", "chromium-browser"];
  for (const command of pathCandidates) {
    const binary = resolveViaCommand(command);
    if (binary) {
      return { path: binary, source: `PATH:${command}` };
    }
  }

  return null;
}

function getBrowserVersion(binaryPath) {
  const result = spawnSync(binaryPath, ["--version"], { encoding: "utf8" });
  if (result.status !== 0) {
    return "unknown";
  }

  return (result.stdout || result.stderr || "").trim() || "unknown";
}

async function waitForBuildOutput(timeoutMs = 60000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (fs.existsSync(manifestPath)) {
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  throw new Error(
    `Timed out waiting for ${path.relative(repoRoot, manifestPath)}.\n` +
      "Run `yarn build` once, or use `yarn test:manual:watch`."
  );
}

async function main() {
  if (shouldWaitForBuild) {
    await waitForBuildOutput();
  } else if (!fs.existsSync(manifestPath)) {
    throw new Error(
      `Missing ${path.relative(repoRoot, manifestPath)}.\n` +
        "Run `yarn build` first, or use `yarn test:manual:watch`."
    );
  }

  const resolvedBrowser = resolveChromiumBinary();
  if (!resolvedBrowser) {
    throw new Error(
      [
        "Unable to locate a Chromium executable.",
        "Install Playwright Chromium via `yarn test:e2e:install`,",
        "set CHROMIUM_PATH, or make `chromium` available in PATH.",
      ].join(" ")
    );
  }

  const chromiumBinary = resolvedBrowser.path;
  const browserVersion = getBrowserVersion(chromiumBinary);
  fs.mkdirSync(profileDir, { recursive: true });

  const chromiumArgs = [
    `--user-data-dir=${profileDir}`,
    `--disable-extensions-except=${buildDir}`,
    `--load-extension=${buildDir}`,
    "--no-first-run",
    "--no-default-browser-check",
    "chrome://extensions/",
  ];

  console.log(`Launching Chromium: ${chromiumBinary}`);
  console.log(`Resolution source: ${resolvedBrowser.source}`);
  console.log(`Browser version: ${browserVersion}`);
  console.log(`Loading extension from: ${buildDir}`);
  console.log(`Using isolated profile: ${profileDir}`);
  console.log("Close Chromium or press Ctrl+C to stop this session.");

  const chromium = spawn(chromiumBinary, chromiumArgs, {
    stdio: "inherit",
  });

  chromium.on("exit", (code) => {
    process.exit(code || 0);
  });
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
