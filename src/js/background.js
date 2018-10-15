import * as dbm from './lib/dynBookmarks';

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
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
        chrome.bookmarks.update(id, { url: newUrl }, () => {
          if (chrome.runtime.lastError) {
            console.warn(chrome.runtime.lastError.message);
          }
        });
      }
    }
  });
});

chrome.bookmarks.onRemoved.addListener((id) => {
  dbm.findByIdAndRemove(id, (err) => {
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
chrome.bookmarks.onChanged.addListener((id, changeInfo) => {
  if (changeInfo.url) {
    dbm.findAll((err, dynBook) => {
      if (err) {
        console.warn(err);
      } else if (dynBook[id]) {
        if (dynBook[id].history.length >= maxHistorySize) {
          dynBook[id].history.pop();
        }
        dynBook[id].history.unshift(changeInfo.url);
        dbm.overwrite(dynBook, (err) => {
          if (err) {
            console.warn(err);
          }
        });
      }
    });
  }
});
