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
    return File({
      id: node.id,
      name: node.title,
      onClick: handleFileClick,
      draggable: true,
      onDrop: drop,
      onDragover: allowDrop,
      onDragstart: drag
    });
  } else {
    let childEls = [];
    node.children.sort((lhs, rhs) => {
      let retVal = 0;
      if (!lhs.children ^ !rhs.children) {
        // only one is folder
        retVal = !lhs.children ? 1 : -1;
      } else {
        // both or none are folders
        if (lhs.title.toLowerCase() < rhs.title.toLowerCase()) {
          retVal = -1;
        } else {
          retVal = 1;
        }
      }
      return retVal;
    });
    for (let child of node.children) {
      let subTree = createTree(child);
      childEls.push(subTree);
    }
    return Folder(
      {
        id: node.id,
        name: node.title,
        opened: false,
        onClick: handleFolderHeaderClick,
        onDrop: drop,
        onDragover: allowDrop,
        ...(node.id > 2 && {
          draggable: true,
          onDragstart: drag
        })
      },
      ...childEls
    );
  }
}

export function drag(ev) {
  if (ev.target.classList.contains('file')) {
    ev.dataTransfer.setData('text', ev.target.getAttribute('id'));
  } else if (ev.target.classList.contains('folder-header')) {
    const id = ev.target.parentElement.getAttribute('id');
    ev.dataTransfer.setData('text', id);
  } else if (ev.target.classList.contains('folder')) {
    ev.dataTransfer.setData('text', ev.target.getAttribute('id'));
  }
}

export function allowDrop(ev) {
  ev.preventDefault();
}

export function drop(ev) {
  ev.preventDefault();
  var id = ev.dataTransfer.getData('text');
  if (!id) {
    console.warn('id in drop is undefined!');
    return;
  }

  let parentId;
  if (this.classList.contains('folder-header')) {
    parentId = this.parentElement.getAttribute('id');
  } else if (this.classList.contains('folder')) {
    parentId = this.getAttribute('id');
  }

  if (this.classList.contains('file')) {
    chrome.bookmarks.get(this.getAttribute('id'), (results) => {
      if (chrome.runtime.lastError) {
        console.warn(chrome.runtime.lastError.message);
      } else {
        parentId = results[0].parentId;
        chrome.bookmarks.move(id, { parentId }, handleError);
      }
    });
  } else if (parentId) {
    chrome.bookmarks.move(id, { parentId }, handleError);
  }
}

function handleError() {
  if (chrome.runtime.lastError) {
    console.warn(chrome.runtime.lastError.message);
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
  let newOpened = opened;

  if (event.type == 'click') {
    newOpened = event.target.classList.contains('arrow-icon')
      ? !opened
      : opened;
  } else if (event.type == 'dblclick') {
    newOpened = !opened;
  }

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
