import { showInfoDisplay, setBookmarkInfo } from '../utils/bookmarkInfo';
import { showFolderInfoDisplay } from '../utils/folderInfo';
import { enableFooterButtons } from '../utils/footerButtons';
import {
  getInfoEditForm,
  getFolderEditForm,
  getFolderEditFormElements,
  hideFolderInfoEdit,
  hideInfoEditForm
} from '../utils/managerForm';

// depends: updateTreeColor

document.addEventListener('DOMContentLoaded', () => {
  /* info-edit form */
  const infoEditForm = getInfoEditForm();
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
              dynBook[bookmark.id] = {
                ...dynBook[bookmark.id],
                regExp,
                ...(!dynBook[bookmark.id] && { history: [] })
              };
            } else {
              delete dynBook[bookmark.id];
            }
            setBookmarkInfo({
              ...dynBook[bookmark.id],
              id,
              title,
              url
            });
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
    infoEditForm.reset();
    hideInfoEditForm();
    showInfoDisplay();
    enableFooterButtons();
  }

  /* folder-info-edit form */
  const folderEditForm = getFolderEditForm();
  const { folderIdInput } = getFolderEditFormElements();
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
});
