#!/usr/bin/env node

const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawn } = require("child_process");

const args = process.argv.slice(2);
const shouldWaitForBuild = args.includes("--wait-for-build");

const repoRoot = path.resolve(__dirname, "..");
const buildDir = path.resolve(repoRoot, "build");
const manifestPath = path.resolve(buildDir, "manifest.json");
const profileRoot = path.resolve(repoRoot, ".tmp");
const profileDir = path.resolve(
  profileRoot,
  `chrome-extension-manual-${Date.now()}`
);

function resolveChromeBinary() {
  if (process.env.CHROME_PATH) {
    return process.env.CHROME_PATH;
  }

  const platform = process.platform;
  const candidatesByPlatform = {
    darwin: [
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      "/Applications/Chromium.app/Contents/MacOS/Chromium",
    ],
    win32: [
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    ],
    linux: [
      "/usr/bin/google-chrome",
      "/usr/bin/google-chrome-stable",
      "/usr/bin/chromium-browser",
      "/usr/bin/chromium",
    ],
  };

  const candidates = candidatesByPlatform[platform] || [];
  const existing = candidates.find((candidatePath) =>
    fs.existsSync(candidatePath)
  );
  if (existing) {
    return existing;
  }

  return null;
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

  const chromeBinary = resolveChromeBinary();
  if (!chromeBinary) {
    throw new Error(
      "Unable to locate Chrome/Chromium binary. Set CHROME_PATH and retry."
    );
  }

  fs.mkdirSync(profileDir, { recursive: true });

  const chromeArgs = [
    `--user-data-dir=${profileDir}`,
    `--disable-extensions-except=${buildDir}`,
    `--load-extension=${buildDir}`,
    "--no-first-run",
    "--no-default-browser-check",
    "chrome://extensions/",
  ];

  console.log(`Launching Chrome with extension from: ${buildDir}`);
  console.log(`Using isolated profile: ${profileDir}`);
  console.log("Close Chrome or press Ctrl+C to stop this session.");

  const chrome = spawn(chromeBinary, chromeArgs, {
    stdio: "inherit",
  });

  chrome.on("exit", (code) => {
    process.exit(code || 0);
  });
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
