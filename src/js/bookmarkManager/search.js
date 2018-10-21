import {
  renderChildren,
  showFolderInfo,
  showFolderInfoDisplay
} from '../utils/folderInfo';
import { showSearchFilter } from '../utils/searchBar';
import { hideBookmarkInfo } from '../utils/bookmarkInfo';
import { hideFolderInfoEdit } from '../utils/managerForm';
import { disableFooterButtons } from '../utils/footerButtons';
import globalSelectHandler from './selectHandler';

document.addEventListener('DOMContentLoaded', () => {
  const searchBar = document.getElementById('search-input');
  const trackedCheckbox = document.getElementById('tracked-checkbox');
  const untrackedCheckbox = document.getElementById('untracked-checkbox');
  const folderChildrenInfo = document.getElementById('folder-children-info');
  searchBar.addEventListener('keyup', () => {
    const folderId = folderChildrenInfo.getAttribute('folderId');
    if (folderId != '0') {
      folderChildrenInfo.setAttribute('folderId', 0);
    }
    renderChildren(true);
    hideBookmarkInfo();
    hideFolderInfoEdit();
    showSearchFilter();
    showFolderInfoDisplay();
    showFolderInfo();
    disableFooterButtons();
    globalSelectHandler.unselect();
  });

  trackedCheckbox.addEventListener('change', () => {
    renderChildren();
  });
  untrackedCheckbox.addEventListener('change', () => {
    renderChildren();
  });
});
