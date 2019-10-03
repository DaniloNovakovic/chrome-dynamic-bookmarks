import {
  getCurrentBrowser,
  logWarn,
  dbm,
  migrateStorage
} from "shared/lib/browser";

const browser = getCurrentBrowser();

browser.runtime.onInstalled.addListener(({ reason = "update" }) => {
  if (reason === "update") {
    migrateStorage();
  }
});

browser.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (!changeInfo.url) return;

  const newUrl = changeInfo.url;

  // get bookmarks
  dbm.findAll((err, dynBook) => {
    if (err) console.warn(err);
    for (let id in dynBook) {
      let { regExp } = dynBook[id];
      try {
        regExp = new RegExp(regExp);
      } catch {
        console.warn(
          `regExp: ${regExp} from dynBookmarks.id of ${id} is invalid...`
        );
        continue;
      }
      if (regExp.test(newUrl)) {
        console.log(`Updating bookmark with id of ${id} to url: ${newUrl}`);
        browser.bookmarks.update(id, { url: newUrl }, () => {
          if (browser.runtime.lastError) {
            console.warn(browser.runtime.lastError.message);
          }
        });
      }
    }
  });
});

browser.bookmarks.onRemoved.addListener(id => {
  dbm.findByIdAndRemove(id, err => {
    if (err) {
      console.warn(err);
    } else {
      console.log(
        `Successfully removed bookmark with id of ${id} from storage`
      );
    }
  });
});

// maybe let user setup this in options in future?
const maxHistorySize = 10;

browser.bookmarks.onChanged.addListener((id, changeInfo) => {
  if (changeInfo.url) {
    dbm.findById(id, (err, item) => {
      if (err) return console.warn(err);
      if (item.history.length >= maxHistorySize) {
        item.history.pop();
      }
      item.history.unshift(changeInfo.url);
      dbm.findByIdAndUpdate(id, item, logWarn);
    });
  }
});
