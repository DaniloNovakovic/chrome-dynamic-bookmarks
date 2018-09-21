// materializecss modal
const popupModalEl = document.querySelector('#popup-modal');
const popupModalInstance = M.Modal.init(popupModalEl, { dismissible: true });
const formResponse = document.getElementById('form-response');

// update storage on form submit
const popupForm = document.getElementById('popup-form');
popupForm.addEventListener('submit', popupSubmit);

function popupSubmit(event) {
  event.preventDefault();

  // extract values from form
  const bookmarkName = event.target['bookmark_name'].value;
  let regExp;
  try {
    regExp = new RegExp(event.target.regexp.value);
  } catch {
    formResponse.textContent = 'Invalid regular expression';
    popupModalInstance.open();
    return false;
  }

  // update storage
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true
    },
    function(tabs) {
      const url = regExp.test(tabs[0].url) ? tabs[0].url : null;
      addBookmarkToStorage(bookmarkName, event.target.regexp.value, url);
    }
  );
}

const defaultUrl = 'https://www.google.com';

function addBookmarkToStorage(bookmarkName, regExp, url) {
  getDynBookmarks((dynBookmarks) => {
    const newBookmarks = [...dynBookmarks];
    const isFound = findAndUpdateDynBookmarks(
      newBookmarks,
      bookmarkName,
      regExp,
      url
    );
    if (!isFound) {
      createBookmark(bookmarkName, regExp, url, (error, bookmark) => {
        newBookmarks.push(bookmark);
        addDynBookmarksToStorage(newBookmarks);
      });
    } else {
      addDynBookmarksToStorage(newBookmarks);
    }
  });
}
function createBookmark(bookmarkName, regExp, url, done) {
  const newUrl = url ? url : defaultUrl;
  chrome.bookmarks.create({ title: bookmarkName, url: newUrl }, (result) => {
    const bookmark = {
      name: bookmarkName,
      regExp,
      url: newUrl,
      ...(result.id && { id: result.id })
    };
    done(null, bookmark);
  });
}
function addDynBookmarksToStorage(dynBookmarks) {
  chrome.storage.sync.set(
    {
      dynBookmarks
    },
    function() {
      formResponse.textContent = 'Bookmark successfully added!';
      popupModalInstance.open();
    }
  );
}
// if url is falsy original won't be changed, but if new bookmark is created
// default will be google.com
function findAndUpdateDynBookmarks(dynBookmarks, bookmarkName, regExp, url) {
  let isFound = false;
  for (let bookmark of dynBookmarks) {
    if (bookmark.name == bookmarkName) {
      isFound = true;
      bookmark.regExp = regExp;
      if (url) {
        bookmark.url = url;
        if (bookmark.id) {
          chrome.bookmarks.update(bookmark.id, { url });
        }
      }
    }
  }
  return isFound;
}

// gets 'dynBookmarks' from storage, returns array
function getDynBookmarks(done) {
  chrome.storage.sync.get(['dynBookmarks'], function(result) {
    const dynBookmarks = Array.isArray(result.dynBookmarks)
      ? result.dynBookmarks
      : [];
    done(dynBookmarks);
  });
}
