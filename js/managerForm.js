const form = document.getElementById('info-edit');
const titleInput = document.getElementById('title-info-input');
const urlInput = document.getElementById('url-info-input');
const regExpInput = document.getElementById('regExp-info-input');
const bookmarkIdInput = document.getElementById('bookmark-id-info-input');
const formSubmitBtn = document.getElementById('info-edit-submit');
const formCancelBtn = document.getElementById('info-edit-cancel');

form.onsubmit = (event) => {
  event.preventDefault();
  handleSubmit();
  cancelForm();
};
function handleSubmit() {
  const id = bookmarkIdInput.getAttribute('value');
  const url = urlInput.getAttribute('value');
  const title = titleInput.getAttribute('value');
  console.log(id, url, title);
  chrome.bookmarks.update(
    id,
    {
      url,
      title
    },
    (bookmark) => {
      console.log(bookmark);
      const regExp = regExpInput.getAttribute('value');
      if (chrome.runtime.lastError) {
        console.warn(chrome.runtime.lastError.message);
      } else if (regExp) {
        chrome.storage.sync.get(['dynBookmarks'], ({ dynBookmarks }) => {
          const dynBook = dynBookmarks || {};
          dynBook[bookmark.id] = { regExp };
          chrome.storage.sync.set({ dynBookmarks: dynBook });
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
