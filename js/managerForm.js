const form = document.getElementById('info-edit');
const titleInput = document.getElementById('title-info-input');
const urlInput = document.getElementById('url-info-input');
const regExpInput = document.getElementById('regExp-info-input');
const bookmarkIdInput = document.getElementById('bookmark-id-info-input');
const formSubmitBtn = document.getElementById('info-edit-submit');
const formCancelBtn = document.getElementById('info-edit-cancel');

form.onsubmit = (event) => {
  event.preventDefault();
  const data = {
    id: event.target.id.value,
    url: event.target.url.value,
    title: event.target.title.value,
    regExp: event.target.regExp.value
  };
  handleSubmit(data);
  setBookmarkInfo(data);
  cancelForm();
};
function handleSubmit({ id, url, title, regExp }) {
  if (!id || (!url && !title)) return;
  chrome.bookmarks.update(
    id,
    {
      ...(url && { url }),
      ...(title && { title })
    },
    (bookmark) => {
      if (chrome.runtime.lastError) {
        console.warn(chrome.runtime.lastError.message);
      } else {
        chrome.storage.sync.get(['dynBookmarks'], ({ dynBookmarks }) => {
          const dynBook = dynBookmarks || {};
          if (regExp) {
            dynBook[bookmark.id] = { regExp };
          } else {
            delete dynBook[bookmark.id];
          }
          chrome.storage.sync.set({ dynBookmarks: dynBook }, () => {
            updateTreeColor();
          });
        });
      }
    }
  );
}

formCancelBtn.addEventListener('click', cancelForm);

function cancelForm() {
  hideForm();
  showInfoDisplay();
  enableFooterButtons();
}

function showForm() {
  form.classList.remove('hide');
}
function hideForm() {
  form.classList.add('hide');
}
function fillForm(data) {
  titleInput.setAttribute('value', data.title);
  urlInput.setAttribute('value', data.url);
  regExpInput.setAttribute('value', data.regExp);
  bookmarkIdInput.setAttribute('value', data.id);
  M.updateTextFields();
}
