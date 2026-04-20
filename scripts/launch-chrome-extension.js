#!/usr/bin/env node

const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawn, spawnSync } = require("child_process");

const args = process.argv.slice(2);
const shouldWaitForBuild = args.includes("--wait-for-build");
const requestedBrowser = process.env.EXT_BROWSER || "auto";

const repoRoot = path.resolve(__dirname, "..");
const buildDir = path.resolve(repoRoot, "build");
const manifestPath = path.resolve(buildDir, "manifest.json");
const profileRoot = path.resolve(repoRoot, ".tmp");
const profileDir = path.resolve(
  profileRoot,
  `chrome-extension-manual-${Date.now()}`
);

function listExisting(paths = []) {
  return paths.filter((candidatePath) => fs.existsSync(candidatePath));
}

function getPlaywrightChromiumCandidates() {
  try {
    const playwright = require("playwright");
    const executablePath = playwright.chromium.executablePath();
    if (executablePath && fs.existsSync(executablePath)) {
      return [executablePath];
    }
  } catch (_error) {
    // Playwright is optional for manual runs.
  }

  const homeDir = os.homedir();
  const candidates = [];

  const rootsByPlatform = {
    darwin: [
      path.join(homeDir, "Library", "Caches", "ms-playwright"),
      path.join(homeDir, "Library", "Caches", "ms-playwright-github"),
    ],
    linux: [path.join(homeDir, ".cache", "ms-playwright")],
    win32: [path.join(homeDir, "AppData", "Local", "ms-playwright")],
  };

  const binaryRelativePaths = {
    darwin: path.join(
      "chrome-mac",
      "Chromium.app",
      "Contents",
      "MacOS",
      "Chromium"
    ),
    linux: path.join("chrome-linux", "chrome"),
    win32: path.join("chrome-win", "chrome.exe"),
  };

  const roots = rootsByPlatform[process.platform] || [];
  const binarySuffix = binaryRelativePaths[process.platform];
  if (!binarySuffix) {
    return [];
  }

  for (const root of roots) {
    if (!fs.existsSync(root)) {
      continue;
    }

    for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
      if (!entry.isDirectory() || !entry.name.startsWith("chromium-")) {
        continue;
      }
      candidates.push(path.join(root, entry.name, binarySuffix));
    }
  }

  return listExisting(candidates);
}

function resolveChromeBinary() {
  if (process.env.CHROME_PATH) {
    return { path: process.env.CHROME_PATH, source: "CHROME_PATH" };
  }

  const platform = process.platform;
  const chromiumByPlatform = {
    darwin: [
      "/Applications/Chromium.app/Contents/MacOS/Chromium",
      "/Applications/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing",
    ],
    win32: [
      "C:\\Program Files\\Chromium\\Application\\chrome.exe",
      "C:\\Program Files (x86)\\Chromium\\Application\\chrome.exe",
    ],
    linux: ["/usr/bin/chromium-browser", "/usr/bin/chromium"],
  };
  const chromeByPlatform = {
    darwin: ["/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"],
    win32: [
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    ],
    linux: ["/usr/bin/google-chrome", "/usr/bin/google-chrome-stable"],
  };

  const availableChromium = [
    ...getPlaywrightChromiumCandidates(),
    ...listExisting(chromiumByPlatform[platform] || []),
  ];
  const availableChrome = listExisting(chromeByPlatform[platform] || []);

  if (requestedBrowser === "chrome" && availableChrome[0]) {
    return { path: availableChrome[0], source: "system-chrome" };
  }
  if (requestedBrowser === "chromium") {
    if (availableChromium[0]) {
      return { path: availableChromium[0], source: "chromium" };
    }
    return null;
  }

  if (availableChromium[0]) {
    return { path: availableChromium[0], source: "chromium" };
  }
  if (availableChrome[0]) {
    return { path: availableChrome[0], source: "system-chrome" };
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

  const resolvedBrowser = resolveChromeBinary();
  if (!resolvedBrowser) {
    const browserHint =
      requestedBrowser === "chromium"
        ? "\nNo Chromium binary found. Run `yarn test:e2e:install` or set CHROME_PATH to a Chromium executable."
        : "";
    throw new Error(
      `Unable to locate Chrome/Chromium binary.${browserHint}\nSet CHROME_PATH and retry.`
    );
  }
  const chromeBinary = resolvedBrowser.path;
  const browserVersion = getBrowserVersion(chromeBinary);

  fs.mkdirSync(profileDir, { recursive: true });

  const chromeArgs = [
    `--user-data-dir=${profileDir}`,
    `--disable-extensions-except=${buildDir}`,
    `--load-extension=${buildDir}`,
    "--no-first-run",
    "--no-default-browser-check",
    "chrome://extensions/",
  ];

  console.log(`Launching browser: ${chromeBinary}`);
  console.log(`Browser source: ${resolvedBrowser.source}`);
  console.log(`Browser version: ${browserVersion}`);
  console.log(`Loading extension from: ${buildDir}`);
  console.log(`Using isolated profile: ${profileDir}`);
  if (resolvedBrowser.source === "system-chrome") {
    console.log(
      "Note: If the extension does not appear, re-run with EXT_BROWSER=chromium (or set CHROME_PATH to a Chromium binary)."
    );
  }
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
