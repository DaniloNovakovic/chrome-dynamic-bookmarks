import { getCurrentBrowser, migrateStorage } from "shared/lib/browser";

const browser = getCurrentBrowser();

export default function addInstalledListeners() {
  browser.runtime.onInstalled.addListener(({ reason = "update" }) => {
    if (reason === "update") {
      migrateStorage();
    }
  });
}
