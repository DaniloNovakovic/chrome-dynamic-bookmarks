import { section } from '../lib/react-clone';
import File from '../components/File';
import Folder from '../components/Folder';
import {
  createTree,
  handleFileClick,
  handleFolderHeaderClick
} from './treeViewComponents';
import options from '../config/config';
const {
  defaultFileIconColor,
  defaultFolderIconColor,
  trackedFileIconColor,
  trackedFolderIconColor
} = options;

document.addEventListener('DOMContentLoaded', () => {
  console.log(createTree, section);
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

/**
 * Removes `oldColor` from `elem.classList` and adds `newColor`
 * @param {HTMLElement} elem
 * @param {string} oldColor
 * @param {string} newColor
 */
function colorElement(elem, oldColor, newColor) {
  elem.classList.remove(oldColor);
  elem.classList.add(newColor);
}

function updateTreeColor(color = trackedFileIconColor) {
  chrome.storage.sync.get(['dynBookmarks'], ({ dynBookmarks }) => {
    let dynBook = dynBookmarks || {};
    chrome.bookmarks.getTree((results) => {
      const rootNode = results[0];
      (function traverseTree(node) {
        if (!node.children) {
          const file = document
            .getElementById(node.id)
            .querySelector('.file-icon');
          if (dynBook[node.id]) {
            colorElement(file, defaultFileIconColor, trackedFileIconColor);
            return true;
          } else {
            colorElement(file, trackedFileIconColor, defaultFileIconColor);
            return false;
          }
        } else {
          let hasTrackedChild = false;
          for (let child of node.children) {
            if (traverseTree(child)) {
              hasTrackedChild = true;
            }
          }
          const folder = document.getElementById(node.id);
          if (!folder) {
            // this can happen if the folder is root
            return hasTrackedChild;
          }
          const folderIcon = folder.querySelector(
            '.folder-header > .folder-icon'
          );
          if (hasTrackedChild) {
            colorElement(
              folderIcon,
              defaultFolderIconColor,
              trackedFolderIconColor
            );
          } else {
            colorElement(
              folderIcon,
              trackedFolderIconColor,
              defaultFolderIconColor
            );
          }
        }
      })(rootNode);
    });
  });
}
