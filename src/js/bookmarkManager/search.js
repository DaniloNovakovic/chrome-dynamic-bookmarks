import {
  renderChildren,
  showFolderInfo,
  showFolderInfoDisplay
} from '../utils/folderInfo';
import { showSearchFilter } from '../utils/searchBar';
import { hideBookmarkInfo } from '../utils/bookmarkInfo';
import { hideFolderInfoEdit } from '../utils/managerForm';
import globalSelectHandler from './selectHandler';

document.addEventListener('DOMContentLoaded', () => {
  const searchBar = document.getElementById('search-input');
  const searchFilter = document.getElementById('search-filter');
  const trackedCheckbox = document.getElementById('tracked-checkbox');
  const untrackedCheckbox = document.getElementById('untracked-checkbox');

  searchBar.addEventListener('keyup', () => {
    renderChildren(true);
    hideBookmarkInfo();
    hideFolderInfoEdit();
    showSearchFilter();
    showFolderInfoDisplay();
    showFolderInfo();
    globalSelectHandler.unselect();
  });

  trackedCheckbox.addEventListener('change', () => {
    renderChildren();
  });
  untrackedCheckbox.addEventListener('change', () => {
    renderChildren();
  });
});
