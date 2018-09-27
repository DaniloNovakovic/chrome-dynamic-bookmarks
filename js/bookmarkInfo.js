document.addEventListener('DOMContentLoaded', () => {
  const parentTitleInfo = document.getElementById('parent-title-info');
  const parentIdInfo = document.getElementById('parent-id-info');
  parentTitleInfo.addEventListener('click', () => {
    const id = parentIdInfo.textContent;
    displayFolderInfo(id);
    globalSelectHandler.setSelected(document.getElementById(id));
  });
});

/**
 * Sets given properties to bookmarkInfo (undefined values will be ignored)
 * @param {object} props - {
 * title,
 * url,
 * id,
 * parent,
 * parentId,
 * regExp (will untrack if falsy),
 * history
 * }
 */
function setBookmarkInfo(props) {
  if (typeof props.title !== 'undefined') {
    document.getElementById('title-info').textContent = props.title;
  }
  if (typeof props.url !== 'undefined') {
    const urlInfo = document.getElementById('url-info');
    urlInfo.textContent = props.url;
    urlInfo.setAttribute('href', props.url);
  }
  if (typeof props.parent !== 'undefined') {
    document.getElementById('parent-title-info').textContent = props.parent;
  }
  if (typeof props.id !== 'undefined') {
    document.getElementById('bookmark-id-info').textContent = props.id;
  }
  if (typeof props.parentId !== 'undefined') {
    document.getElementById('parent-id-info').textContent = props.parentId;
  }

  const bookmarkInfo = document.getElementById('bookmarkInfo');
  const trackedDiv = document.getElementById('tracked');
  const regExpInfo = document.getElementById('regExp-info');
  const historyList = document.getElementById('history-list');
  historyList.innerHTML = '';
  if (typeof props.regExp !== 'undefined') {
    regExpInfo.textContent = props.regExp;
    if (typeof props.history !== 'undefined') {
      for (let url of props.history) {
        historyList.appendChild(li(null, code(null, url)));
      }
    }
    bookmarkInfo.classList.add('tracked');
    trackedDiv.classList.remove('hide');
  } else {
    bookmarkInfo.classList.remove('tracked');
    trackedDiv.classList.add('hide');
    regExpInfo.textContent = '';
  }
}

/**
 * Returns json object {
 * title,
 * url,
 * id,
 * parent,
 * parentId,
 * regExp,
 * (doesn't return history currently)
 * }
 */
function getInfoData() {
  return {
    title: document.getElementById('title-info').textContent,
    url: document.getElementById('url-info').textContent,
    id: document.getElementById('bookmark-id-info').textContent,
    parent: document.getElementById('parent-title-info').textContent,
    parentId: document.getElementById('parent-id-info').textContent,
    regExp: document.getElementById('regExp-info').textContent
  };
}
function getBookmarkData(bookmarkId, done) {
  chrome.bookmarks.get(bookmarkId, (results) => {
    if (chrome.runtime.lastError) {
      console.warn(chrome.runtime.lastError.message);
    } else {
      const bookmark = results[0];
      chrome.storage.sync.get(['dynBookmarks'], ({ dynBookmarks }) => {
        let dynBook = dynBookmarks || {};
        chrome.bookmarks.get(bookmark.parentId, (results) => {
          let parentTitle = null;
          if (chrome.runtime.lastError) {
            console.warn(chrome.runtime.lastError.message);
          } else {
            parentTitle = results[0].title;
          }
          done({
            ...bookmark,
            ...dynBook[bookmark.id],
            ...(parentTitle && { parent: parentTitle })
          });
        });
      });
    }
  });
}

function clearBookmarkInfo() {
  setBookmarkInfo({
    title: '',
    url: '',
    id: '',
    parent: '',
    parentId: '',
    regExp: '',
    history: []
  });
}

function showInfoDisplay() {
  document.getElementById('info-display').classList.remove('hide');
}

function hideInfoDisplay() {
  document.getElementById('info-display').classList.add('hide');
}
function showBookmarkInfo() {
  document.getElementById('bookmarkInfo').classList.remove('hide');
}

function hideBookmarkInfo() {
  document.getElementById('bookmarkInfo').classList.add('hide');
}

function isBookmarkInfoHidden() {
  return document.getElementById('bookmarkInfo').classList.contains('hide');
}

function displayFileInfo(data) {
  setBookmarkInfo(data);
  hideFolderInfo();
  hideInfoEditForm();
  showInfoDisplay();
  showBookmarkInfo();
  enableFooterButtons();
}

function displayBookmark(bookmarkId) {
  getBookmarkData(bookmarkId, (data) => {
    clearSearchBar();
    displayFileInfo(data);
    globalSelectHandler.setSelected(document.getElementById(bookmarkId));
  });
}
