import { disableFooterButtons } from '../utils/footerButtons';
import {
  isFolderInfoHidden,
  getFolderInfoData,
  hideFolderInfoDisplay,
  hideFolderInfoChildren
} from '../utils/folderInfo';
import {
  getInfoData,
  hideInfoDisplay,
  clearBookmarkInfo,
  hideBookmarkInfo
} from '../utils/bookmarkInfo';
import {
  showInfoEditForm,
  showFolderInfoEdit,
  fillInfoEditForm,
  fillFolderEditForm
} from '../utils/managerForm';
import { clearSearchBar, disableSearchFilter } from '../utils/searchBar';
import { displayFolderInfo } from './displayFunctions';
import globalSelectHandler from './selectHandler';
import * as dynBookmarks from '../lib/dynBookmarks';

document.addEventListener('DOMContentLoaded', () => {
  const editBtn = document.getElementById('edit-btn');
  const deleteBtn = document.getElementById('delete-btn');
  const addFileBtn = document.getElementById('add-file-btn');
  const addFolderBtn = document.getElementById('add-folder-btn');

  const modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);
  const addFileForm = document.getElementById('add-file-form');
  const addFolderForm = document.getElementById('add-folder-form');

  addFolderBtn.addEventListener('click', () => {
    let parentId = 2;
    const parentIdInput = document.getElementById('parent-id-folder-input');

    if (isFolderInfoHidden()) {
      parentId = document.getElementById('parent-id-info').textContent || 2;
    } else {
      parentId = getFolderInfoData().id;
      if (!parentId || parentId < 2) {
        parentId = 2;
      }
    }
    parentIdInput.setAttribute('value', parentId);
  });

  addFolderForm.onsubmit = (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const parentId = event.target.parentId.value;
    chrome.bookmarks.create(
      { title, ...(parentId && { parentId }) },
      (result) => {
        if (chrome.runtime.lastError) {
          console.warn(chrome.runtime.lastError.message);
        }
        const modal = document.getElementById('addFolderModal');
        M.Modal.getInstance(modal).close();
      }
    );
  };

  addFileBtn.addEventListener('click', () => {
    let parentId = 2;
    const parentIdInput = document.getElementById('parent-id-file-input');

    if (isFolderInfoHidden()) {
      parentId = document.getElementById('parent-id-info').textContent || 2;
    } else {
      parentId = getFolderInfoData().id;
      if (!parentId || parentId < 2) {
        parentId = 2;
      }
    }
    parentIdInput.setAttribute('value', parentId);
  });

  addFileForm.onsubmit = (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const url = event.target.url.value;
    const regExp = event.target.regExp.value;
    const parentId = event.target.parentId.value;
    chrome.bookmarks.create(
      {
        title,
        url,
        ...(parentId && { parentId })
      },
      (bookmark) => {
        if (chrome.runtime.lastError) {
          console.warn(chrome.runtime.lastError.message);
        } else if (regExp) {
          dynBookmarks.findByIdAndUpdate(bookmark.id, {
            regExp,
            history: []
          });
        }
        const modal = document.getElementById('addFileModal');
        M.Modal.getInstance(modal).close();
      }
    );
  };

  deleteBtn.addEventListener('click', () => {
    const id = isFolderInfoHidden()
      ? document.getElementById('bookmark-id-info').textContent
      : document
          .getElementById('folder-children-info')
          .getAttribute('folderId');
    if (id) {
      chrome.bookmarks.get(id, (results) => {
        if (chrome.runtime.lastError) {
          console.warn(chrome.runtime.lastError.message);
        } else {
          const parentId = results[0].parentId;
          if (isFolderInfoHidden()) {
            chrome.bookmarks.remove(id, deleteBtnCallback); // removes bookmark
          } else {
            chrome.bookmarks.removeTree(id, deleteBtnCallback); // removes folder
          }
          clearSearchBar();
          displayFolderInfo(parentId);
          globalSelectHandler.setSelected(document.getElementById(parentId));
        }
      });
    }
  });

  function deleteBtnCallback() {
    if (chrome.runtime.lastError) {
      console.warn(chrome.runtime.lastError.message);
    } else {
      hideFolderInfoChildren();
      clearBookmarkInfo();
      hideBookmarkInfo();
      disableFooterButtons();
    }
  }

  editBtn.addEventListener('click', () => {
    if (isFolderInfoHidden()) {
      fillInfoEditForm(getInfoData());
      hideInfoDisplay();
      showInfoEditForm();
    } else {
      fillFolderEditForm(getFolderInfoData());
      hideFolderInfoDisplay();
      showFolderInfoEdit();
      disableSearchFilter();
    }
    disableFooterButtons();
  });
});
