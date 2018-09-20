chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (!changeInfo.url) return;

  // get bookmarks
  chrome.storage.sync.get(['dynBookmarks'], function(result) {
    if (!Array.isArray(result.dynBookmarks)) return;

    // update bookmarks array
    let newBookmarks = getUpdatedDynBookmarks(
      result.dynBookmarks,
      changeInfo.url
    );

    // store updated bookmarks array
    chrome.storage.sync.set({
      dynBookmarks: newBookmarks
    });
  });
});

function getUpdatedDynBookmarks(oldDynBookmarks, newUrl) {
  return oldDynBookmarks.map((bookmark) => {
    let regExp;
    try {
      regExp = new RegExp(bookmark.regExp);
    } catch {
      console.log(`invalid ${regExp}`);
      return bookmark;
    }

    if (regExp.test(newUrl)) {
      console.log(`Changed ${bookmark.name}'s url to ${newUrl}'`);
      let retVal = {
        ...bookmark,
        url: newUrl
      };
      if (bookmark.id) {
        chrome.bookmarks.update(bookmark.id, { url: newUrl });
      }
      return retVal;
    } else {
      return bookmark;
    }
  });
}
