import {
  renderChildren,
  showFolderInfo,
  showFolderInfoDisplay
} from '../utils/folderInfo';
import { hideBookmarkInfo } from '../utils/bookmarkInfo';
import { hideFolderInfoEdit } from '../utils/managerForm';

//depends: globalSelectHandler

document.addEventListener('DOMContentLoaded', () => {
  const searchBar = document.getElementById('search-input');
  searchBar.addEventListener('keyup', () => {
    renderChildren(true);
    hideBookmarkInfo();
    hideFolderInfoEdit();
    showFolderInfoDisplay();
    showFolderInfo();
    globalSelectHandler.unselect();
  });
});
