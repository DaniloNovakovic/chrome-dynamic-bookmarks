// materializecss modal
const popupModalEl = document.querySelector('#popup-modal');
const popupModalInstance = M.Modal.init(popupModalEl, { dismissible: true });
const formResponse = document.getElementById('form-response');

// update storage on form submit
const popupForm = document.getElementById('popup-form');
popupForm.addEventListener('submit', popupSubmit);

// url to use in case of error
const defaultUrl = 'https://www.google.com';

function popupSubmit(event) {
  event.preventDefault();

  // extract values from form
  const title = event.target['bookmark_name'].value;
  let regExpString = event.target.regexp.value;
  try {
    regExp = new RegExp(event.target.regexp.value);
  } catch {
    formResponse.textContent = 'Invalid regular expression';
    popupModalInstance.open();
    return false;
  }

  chrome.tabs.query(
    {
      active: true,
      currentWindow: true
    },
    function(tabs) {
      const url = tabs[0].url || defaultUrl;
      handleBookmarkSubmit(title, url, regExpString, (err) => {
        if (err) {
          console.warn(err);
          formResponse.textContent = err.message || 'Unexpected error occured';
        } else {
          formResponse.textContent =
            'Bookmark has been submitted successfully.!';
        }
        popupModalInstance.open();
      });
    }
  );
}

function handleBookmarkSubmit(title, url, regExp, done) {
  chrome.storage.sync.get(['dynBookmarks'], ({ dynBookmarks }) => {
    let dynBook = dynBookmarks || {};
    createBookmark(dynBook, title, url, regExp, done);
  });
}

function createBookmark(dynBook, title, url, regExp, done) {
  const newUrl = url || defaultUrl;
  chrome.bookmarks.create({ title, url: newUrl }, (newBookmark) => {
    if (chrome.runtime.lastError) {
      done(chrome.runtime.lastError);
    } else {
      dynBook[newBookmark.id] = { regExp, history: [] };
      chrome.storage.sync.set({ dynBookmarks: dynBook }, () =>
        done(chrome.runtime.lastError)
      );
    }
  });
}
