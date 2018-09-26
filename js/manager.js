// this file will hold logic considering add/edit/delete buttons
const editBtn = document.getElementById('edit-btn');
const deleteBtn = document.getElementById('delete-btn');
const addFileBtn = document.getElementById('add-file-btn');
const addFolderBtn = document.getElementById('add-folder-btn');

const modals = document.querySelectorAll('.modal');
const modalsInstances = M.Modal.init(modals);
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
        chrome.storage.sync.get(['dynBookmarks'], ({ dynBookmarks }) => {
          const dynBook = dynBookmarks || {};
          dynBook[bookmark.id] = { regExp };
          chrome.storage.sync.set({ dynBookmarks: dynBook });
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
    : document.getElementById('folder-children-info').getAttribute('folderId');
  if (id) {
    chrome.bookmarks.get(id, (results) => {
      if (chrome.runtime.lastError) {
        console.warn(chrome.runtime.lastError.message);
      } else {
        const parentId = results[0].parentId;
        chrome.bookmarks.remove(id, () => {
          if (chrome.runtime.lastError) {
            console.warn(chrome.runtime.lastError.message);
          } else {
            hideFolderInfoChildren();
            clearBookmarkInfo();
            hideBookmarkInfo();
            disableFooterButtons();
          }
        });
        clearSearchBar();
        displayFolderInfo(parentId);
        globalSelectHandler.setSelected(document.getElementById(parentId));
      }
    });
  }
});

editBtn.addEventListener('click', () => {
  if (isFolderInfoHidden()) {
    fillInfoEditForm(getInfoData());
    hideInfoDisplay();
    showInfoEditForm();
  } else {
    fillFolderEditForm(getFolderInfoData());
    hideFolderInfoDisplay();
    showFolderInfoEdit();
  }
  disableFooterButtons();
});

function enableFooterButtons() {
  editBtn.classList.remove('disabled');
  deleteBtn.classList.remove('disabled');
}
function disableFooterButtons() {
  editBtn.classList.add('disabled');
  deleteBtn.classList.add('disabled');
}
