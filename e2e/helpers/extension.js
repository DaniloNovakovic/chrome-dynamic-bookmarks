const fs = require("fs");
const os = require("os");
const path = require("path");

const { chromium } = require("@playwright/test");

async function launchExtensionContext() {
  const repoRoot = path.resolve(__dirname, "..", "..");
  const extensionPath = path.resolve(repoRoot, "build");
  const userDataDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "chrome-dynamic-bookmarks-e2e-")
  );

  const context = await chromium.launchPersistentContext(userDataDir, {
    channel: "chromium",
    headless: process.env.E2E_HEADED !== "1",
    args: [
      `--disable-extensions-except=${extensionPath}`,
      `--load-extension=${extensionPath}`,
      "--no-first-run",
      "--no-default-browser-check",
    ],
  });

  const extensionId = await getExtensionId(context);

  return {
    context,
    extensionId,
    userDataDir,
  };
}

async function getExtensionId(context) {
  let [serviceWorker] = context.serviceWorkers();
  if (!serviceWorker) {
    serviceWorker = await context.waitForEvent("serviceworker");
  }

  return serviceWorker.url().split("/")[2];
}

async function openExtensionPage(
  context,
  extensionId,
  pagePath = "popup.html"
) {
  const page = await context.newPage();
  await page.goto(`chrome-extension://${extensionId}/${pagePath}`);
  return page;
}

module.exports = {
  launchExtensionContext,
  openExtensionPage,
};
