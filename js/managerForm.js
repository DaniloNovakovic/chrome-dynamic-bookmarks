/* info-edit form */
const infoEditForm = document.getElementById('info-edit');
const titleInput = document.getElementById('title-info-input');
const urlInput = document.getElementById('url-info-input');
const regExpInput = document.getElementById('regExp-info-input');
const bookmarkIdInput = document.getElementById('bookmark-id-info-input');
const infoEditSubmitBtn = document.getElementById('info-edit-submit');
const infoEditCancelBtn = document.getElementById('info-edit-cancel');

infoEditForm.onsubmit = (event) => {
  event.preventDefault();
  const data = {
    id: event.target.id.value,
    url: event.target.url.value,
    title: event.target.title.value,
    regExp: event.target.regExp.value
  };
  handleBookmarkSubmit(data);
  setBookmarkInfo(data);
  cancelInfoEditForm();
};
function handleBookmarkSubmit({ id, url, title, regExp }) {
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

infoEditCancelBtn.addEventListener('click', cancelInfoEditForm);

function cancelInfoEditForm() {
  hideInfoEditForm();
  showInfoDisplay();
  enableFooterButtons();
}

function showInfoEditForm() {
  infoEditForm.classList.remove('hide');
}
function hideInfoEditForm() {
  infoEditForm.classList.add('hide');
}
function fillInfoEditForm(data) {
  titleInput.setAttribute('value', data.title);
  urlInput.setAttribute('value', data.url);
  regExpInput.setAttribute('value', data.regExp);
  bookmarkIdInput.setAttribute('value', data.id);
  M.updateTextFields();
}

/* folder-info-edit form */
const folderEditForm = document.getElementById('folder-info-edit');
const folderIdInput = document.getElementById('folder-id-info-input');
const folderTitleInput = document.getElementById('folder-title-info-input');
const folderEditCancelBtn = document.getElementById('folder-edit-cancel');

folderEditForm.onsubmit = (event) => {
  event.preventDefault();
  const data = {
    id: event.target.id.value,
    title: event.target.title.value
  };
  handleFolderEditFormSubmit(data);
  cancelFolderEditForm();
};

function handleFolderEditFormSubmit({ id, title }) {
  if (!id || !title) return;
  chrome.bookmarks.update(id, { title }, () => {
    if (chrome.runtime.lastError) {
      console.warn(chrome.runtime.lastError.message);
    }
  });
}

folderEditCancelBtn.addEventListener('click', cancelFolderEditForm);

function cancelFolderEditForm() {
  hideFolderInfoEdit();
  showFolderInfoDisplay();
  if (folderIdInput.getAttribute('value') > 2) {
    enableFooterButtons();
  }
}
function hideFolderInfoEdit() {
  folderEditForm.classList.add('hide');
}
function showFolderInfoEdit() {
  folderEditForm.classList.remove('hide');
}
function fillFolderEditForm({ id, title }) {
  folderIdInput.setAttribute('value', id);
  folderTitleInput.setAttribute('value', title);
  M.updateTextFields();
}
