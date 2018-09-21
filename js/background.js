chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (!changeInfo.url) return;

  const newUrl = changeInfo.url;

  // get bookmarks
  chrome.storage.sync.get(['dynBookmarks'], ({ dynBookmarks }) => {
    let dynBook = dynBookmarks || {};
    for (let id in dynBook) {
      let { url, regExp } = dynBook[id];
      try {
        regExp = new RegExp(regExp);
      } catch {
        console.warn(
          `regExp: ${regExp} from dynBookmarks.id of ${id} is invalid...`
        );
        continue;
      }
      if (url !== newUrl && regExp.test(newUrl)) {
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
  chrome.storage.sync.get(['dynBookmarks'], ({ dynBookmarks }) => {
    let dynBook = dynBookmarks || {};
    if (dynBook[id]) {
      delete dynBook[id];
      console.log(
        `Successfully removed bookmark with id of ${id} from storage`
      );
      chrome.storage.sync.set({ dynBookmarks: dynBook }, () => {
        if (chrome.runtime.lastError) {
          console.warn(chrome.runtime.lastError.message);
        }
      });
    }
  });
});
