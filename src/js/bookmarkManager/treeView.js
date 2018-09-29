import { section } from '../lib/react-clone';
import File from '../components/File';
import Folder from '../components/Folder';
import options from '../config/config';
import { updateTreeColor } from '../utils/treeView';
import {
  createTree,
  handleFileClick,
  handleFolderHeaderClick
} from './treeViewComponents';

// depends: displayFolderInfo, displayBookmark

const {
  defaultFileIconColor,
  defaultFolderIconColor,
  trackedFileIconColor,
  trackedFolderIconColor
} = options;

document.addEventListener('DOMContentLoaded', () => {
  var sidenavs = document.querySelectorAll('.sidenav');
  M.Sidenav.init(sidenavs);

  const treeView = document.querySelector('#treeView');

  chrome.bookmarks.getTree((results) => {
    let childEls = [];
    for (let child of results[0].children) {
      let subTree = createTree(child);
      childEls.push(subTree);
    }
    treeView.appendChild(section(null, ...childEls));
    updateTreeColor();
  });

  chrome.bookmarks.onCreated.addListener((id, bookmark) => {
    const parent = document.getElementById(bookmark.parentId);
    if (!parent) {
      return console.warn(
        'failed to find parent with id of ' + bookmark.parentId
      );
    }
    if (parent.classList.contains('folder')) {
      const newEl = bookmark.url
        ? File({
            name: bookmark.title,
            id: bookmark.id,
            onClick: handleFileClick
          })
        : Folder({
            name: bookmark.title,
            id: bookmark.id,
            onClick: handleFolderHeaderClick
          });
      parent.querySelector('ul').appendChild(newEl);
      if (newEl.classList.contains('folder')) {
        displayFolderInfo(bookmark.id);
      } else {
        displayBookmark(bookmark.id);
      }
      globalSelectHandler.setSelected(newEl);
    }
    // note: i wrapped updateTreeColor in timeout because storage is updated AFTER bookmark is created
    setTimeout(updateTreeColor, 100);
  });

  chrome.bookmarks.onRemoved.addListener((id, removeInfo) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.remove();
    }
    setTimeout(updateTreeColor, 100);
  });

  chrome.bookmarks.onChanged.addListener((id, changeInfo) => {
    if (changeInfo.title) {
      let elem = document.getElementById(id);
      if (elem.classList.contains('folder')) {
        elem = elem.querySelector('.folder-header') || elem;
      }
      elem.querySelector('span').textContent = changeInfo.title;
    }
    setTimeout(updateTreeColor, 100);
  });

  chrome.bookmarks.onMoved.addListener((id, moveInfo) => {
    const elem = document.getElementById(id);
    const parent = document.getElementById(moveInfo.parentId);
    if (parent.classList.contains('folder')) {
      parent.querySelector('ul').appendChild(elem);
    }
    setTimeout(updateTreeColor, 100);
  });
});
