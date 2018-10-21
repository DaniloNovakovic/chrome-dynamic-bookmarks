import { section } from '../lib/react-clone';
import File from '../components/File';
import Folder from '../components/Folder';
import { updateTreeColor } from '../utils/treeView';
import {
  createTree,
  handleFileClick,
  handleFolderHeaderClick,
  drag,
  drop,
  allowDrop
} from './treeViewComponents';
import { displayFolderInfo, displayBookmark } from './displayFunctions';
import globalSelectHandler from './selectHandler';

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
            onClick: handleFileClick,
            draggable: true,
            onDrop: drop,
            onDragover: allowDrop,
            onDragstart: drag
          })
        : Folder({
            name: bookmark.title,
            id: bookmark.id,
            onClick: handleFolderHeaderClick,
            draggable: true,
            onDrop: drop,
            onDragover: allowDrop,
            onDragstart: drag
          });

      appendSorted(parent.querySelector('ul'), newEl);

      // note: i wrapped this in timeout because storage is updated AFTER bookmark is created
      setTimeout(() => {
        if (newEl.classList.contains('folder')) {
          displayFolderInfo(bookmark.id);
        } else {
          displayBookmark(bookmark.id);
        }
        globalSelectHandler.setSelected(newEl);
        updateTreeColor();
      }, 100);
    }
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
      elem.setAttribute('name', changeInfo.title);
      appendSorted(elem.parentElement, elem);

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
      appendSorted(parent.querySelector('ul'), elem);
    }
    setTimeout(() => {
      if (elem.classList.contains('folder')) {
        displayFolderInfo(id);
      } else {
        displayBookmark(id);
      }
      globalSelectHandler.setSelected(elem);
      updateTreeColor();
    }, 100);
  });
});

function appendSorted(parent, element) {
  if (!parent) return console.warn('parent in appendSorted is undefined');
  if (!element) return console.warn('element in appendSorted is undefined');
  let appended = false;
  const elemName = element.getAttribute('name').toLowerCase();
  const isElemFolder = element.classList.contains('folder');
  for (let child of parent.children) {
    try {
      const childName = child.getAttribute('name').toLowerCase();
      const isChildFolder = child.classList.contains('folder');

      if (
        (isElemFolder && !isChildFolder) ||
        (isElemFolder === isChildFolder && childName > elemName)
      ) {
        parent.insertBefore(element, child);
        appended = true;
        break;
      }
    } catch (err) {
      console.warn(err);
    }
  }
  if (!appended) {
    parent.appendChild(element);
  }
}
