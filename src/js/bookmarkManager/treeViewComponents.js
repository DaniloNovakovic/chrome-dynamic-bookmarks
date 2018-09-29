import File from '../components/File';
import Folder from '../components/Folder';
import options from '../config/config';
import { clearSearchBar } from '../utils/searchBar';
import { getBookmarkData } from '../utils/bookmarkInfo';
import { displayFileInfo, displayFolderInfo } from './displayFunctions';
import globalSelectHandler from './selectHandler';

const {
  openedArrowIcon,
  closedArrowIcon,
  openedFolderIcon,
  closedFolderIcon
} = options;

/* TreeView */

export function createTree(node) {
  if (!node.children) {
    return File({ id: node.id, name: node.title, onClick: handleFileClick });
  } else {
    let childEls = [];
    for (let child of node.children) {
      let subTree = createTree(child);
      childEls.push(subTree);
    }
    return Folder(
      {
        id: node.id,
        name: node.title,
        opened: false,
        onClick: handleFolderHeaderClick
      },
      ...childEls
    );
  }
}

/* onClick handlers */
export function handleFileClick(event) {
  const file = event.target.classList.contains('file')
    ? event.target
    : event.target.parentElement;
  getBookmarkData(file.id, (data) => {
    if (data) {
      clearSearchBar();
      displayFileInfo(data);
      globalSelectHandler.setSelected(file);
    }
  });
}

export function handleFolderHeaderClick(event) {
  const folderHeader = event.target.classList.contains('folder-header')
    ? event.target
    : event.target.parentElement;
  const folder = folderHeader.parentElement;
  const opened = folderHeader.getAttribute('opened') == 'true';
  const newOpened = !opened;

  let icons = folderHeader.querySelectorAll('.material-icons');
  icons.forEach((icon) => {
    if (/arrow/i.test(icon.textContent)) {
      icon.textContent = newOpened ? openedArrowIcon : closedArrowIcon;
    } else {
      icon.textContent = newOpened ? openedFolderIcon : closedFolderIcon;
    }
  });

  try {
    const sibling = folderHeader.nextElementSibling;
    if (newOpened) {
      sibling.classList.remove('hide');
    } else {
      sibling.classList.add('hide');
    }
  } catch {
    console.warn(`No sibling of elem ${folderHeader} found ...`);
  }

  folderHeader.setAttribute('opened', newOpened);

  clearSearchBar();
  if (!event.target.classList.contains('arrow-icon')) {
    displayFolderInfo(folder.getAttribute('id'));
    globalSelectHandler.setSelected(folderHeader);
  }
}

export default {
  createTree,
  handleFolderHeaderClick,
  handleFileClick
};
