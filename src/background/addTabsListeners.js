import { getCurrentBrowser, logWarn, logInfo, dbm } from "shared/lib/browser";

const browser = getCurrentBrowser();

export default function addTabsListeners() {
  browser.tabs.onUpdated.addListener(function(_tabId, changeInfo) {
    if (!changeInfo.url) return;
    const newUrl = changeInfo.url;

    dbm.findAll((err, dynBook) => {
      if (err) logWarn(err);
      for (let id in dynBook) {
        let { regExp } = dynBook[id];
        try {
          regExp = new RegExp(regExp);
        } catch {
          logWarn(
            `regExp: ${regExp} from dynBookmarks.id of ${id} is invalid...`
          );
          continue;
        }
        if (regExp.test(newUrl)) {
          logInfo(`Updating bookmark with id of ${id} to url: ${newUrl}`);
          browser.bookmarks.update(id, { url: newUrl }, () => {
            if (browser.runtime.lastError) {
              logWarn(browser.runtime.lastError.message);
            }
          });
        }
      }
    });
  });
}
