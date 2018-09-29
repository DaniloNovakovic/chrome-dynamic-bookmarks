import {
  setBookmarkInfo,
  showBookmarkInfo,
  showInfoDisplay,
  hideBookmarkInfo,
  getBookmarkData
} from '../utils/bookmarkInfo';
import {
  hideFolderInfo,
  renderChildren,
  showFolderInfoDisplay,
  showFolderInfo
} from '../utils/folderInfo';
import {
  enableFooterButtons,
  disableFooterButtons
} from '../utils/footerButtons';
import { hideInfoEditForm, hideFolderInfoEdit } from '../utils/managerForm';
import { clearSearchBar } from '../utils/searchBar';
import globalSelectHandler from './selectHandler';

// depends: globalSelectHandler

export function displayFileInfo(data) {
  setBookmarkInfo(data);
  hideFolderInfo();
  hideInfoEditForm();
  showInfoDisplay();
  showBookmarkInfo();
  enableFooterButtons();
}

export function displayBookmark(bookmarkId) {
  getBookmarkData(bookmarkId, (data) => {
    clearSearchBar();
    displayFileInfo(data);
    globalSelectHandler.setSelected(document.getElementById(bookmarkId));
  });
}

export function displayFolderInfo(folderId) {
  if (!folderId) {
    return console.warn(`folderId of ${folderId} is invalid`);
  }
  document
    .getElementById('folder-children-info')
    .setAttribute('folderId', folderId);
  renderChildren();
  hideBookmarkInfo();
  hideFolderInfoEdit();
  showFolderInfoDisplay();
  showFolderInfo();

  // 0 (root - invisible), 1 (bookmarks bar), and 2 (other bookmarks) are
  // reserved / unchangable chrome folders
  if (folderId > 2) {
    enableFooterButtons();
  } else {
    disableFooterButtons();
  }
}
