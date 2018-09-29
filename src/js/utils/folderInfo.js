/* Show / Hide export functionality */
export function hideFolderInfo() {
  document.getElementById('folderInfo').classList.add('hide');
}
export function showFolderInfo() {
  document.getElementById('folderInfo').classList.remove('hide');
}
export function hideFolderInfoDisplay() {
  document.getElementById('folder-info-display').classList.add('hide');
}
export function showFolderInfoDisplay() {
  document.getElementById('folder-info-display').classList.remove('hide');
}
export function isFolderInfoHidden() {
  return document.getElementById('folderInfo').classList.contains('hide');
}
export function getFolderInfoData() {
  const id = document
    .getElementById('folder-children-info')
    .getAttribute('folderId');
  const folder = document.getElementById(id);
  const title =
    (folder && folder.querySelector('.folder-header > span').textContent) || '';
  return { id, title };
}

// adds 'hide' class to each child of 'folder-children-info'
export function hideFolderInfoChildren() {
  const childrenList = document.getElementById('folder-children-info');
  for (let child of childrenList.children) {
    child.classList.add('hide');
  }
}

/**
 * Traverses a tree and whenever a leaf node is found (elem withouth children property) it will trigger a callback
 * @param {object} rootNode - object with children array
 * @param {export function} onLeafNodeFound - callback triggered whenever a leaf is found
 */
export function findLeafNodes(rootNode, onLeafNodeFound) {
  if (!rootNode.children) {
    onLeafNodeFound(rootNode);
  } else {
    for (let child of rootNode.children) {
      findLeafNodes(child, onLeafNodeFound);
    }
  }
}

import options from '../config/config';
const {
  openedArrowIcon,
  openedFolderIcon,
  defaultFileIconColor,
  trackedFileIconColor
} = options;

//depends: openedArrowIcon, openedFolderIcon
export function openFolder(folderId) {
  const folder = document.getElementById(folderId);
  const folderHeader = folder.querySelector('.folder-header');
  if (folder && folderHeader) {
    let icons = folderHeader.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      if (/arrow/i.test(icon.textContent)) {
        icon.textContent = openedArrowIcon;
      } else {
        icon.textContent = openedFolderIcon;
      }
    });
    folderHeader.nextElementSibling.classList.remove('hide');
    folderHeader.setAttribute('opened', true);
  }
}

// depends: openFolder
export function openAllParentFolders(parentId) {
  if (!parentId || parentId === '0') {
    return;
  } else {
    openFolder(parentId);
    chrome.bookmarks.get(parentId, (bookmarks) => {
      if (chrome.runtime.lastError) {
        console.warn(chrome.runtime.lastError.message);
      } else {
        openAllParentFolders(bookmarks[0].parentId);
      }
    });
  }
}

// converts bookmarkId into child-info id
export function createChildInfoId(bookmarkId) {
  return `child-info-${bookmarkId}`;
}

/* depends: 
 hideFolderInfoChildren, findLeafNodes,
 defaultFileIconColor, trackedFileIconColor
*/
// renders children based on search pattern from 'search-input'
export function renderChildren(renderAll = false) {
  const childrenList = document.getElementById('folder-children-info');
  const folderId =
    renderAll === true ? '0' : childrenList.getAttribute('folderId');

  let searchPattern;
  try {
    let searchInput = document.getElementById('search-input').value;
    searchPattern = new RegExp(searchInput, 'i');
  } catch {
    console.warn('invalid reg exp');
    searchPattern = new RegExp(); // this matched anything
  }

  chrome.bookmarks.getSubTree(folderId, (results) => {
    if (chrome.runtime.lastError) {
      console.warn(chrome.runtime.lastError.message);
    } else {
      chrome.storage.sync.get(['dynBookmarks'], ({ dynBookmarks }) => {
        const dynBook = dynBookmarks || {};
        hideFolderInfoChildren();
        for (let child of results) {
          findLeafNodes(child, (node) => {
            const childEl = document.getElementById(`child-info-${node.id}`);
            if (childEl) {
              if (searchPattern.test(childEl.textContent)) {
                childEl.parentElement.classList.remove('hide');
              }
              const spans = childEl.querySelectorAll('span');
              for (let span of spans) {
                if (dynBook[node.id]) {
                  span.classList.replace(
                    defaultFileIconColor,
                    trackedFileIconColor
                  );
                } else {
                  span.classList.replace(
                    trackedFileIconColor,
                    defaultFileIconColor
                  );
                }
              }
              if (spans[0].textContent !== node.title) {
                spans[0].textContent = node.title;
              } else if (childEl.getAttribute('href') !== node.url) {
                childEl.setAttribute('href', node.url);
                spans[1].textContent = ` (${node.url})`;
              }
            }
          });
        }
      });
    }
  });
}
