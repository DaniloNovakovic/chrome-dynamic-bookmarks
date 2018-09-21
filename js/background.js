chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (!changeInfo.url) return;

  // get bookmarks
  // chrome.storage.sync.get(['dynBookmarks'], function(result) {

  // });
});
