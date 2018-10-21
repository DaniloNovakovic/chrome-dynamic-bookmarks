import * as dbm from '../lib/dynBookmarks';
import sortList from '../lib/sortList';

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

  // extract search pattern from search-input
  let searchPattern;
  try {
    let searchInput = document.getElementById('search-input').value;
    searchPattern = new RegExp(searchInput, 'i');
  } catch {
    console.warn('invalid reg exp');
    searchPattern = new RegExp(); // this matched anything
  }

  const isTrackedChecked = document.getElementById('tracked-checkbox').checked;
  const isUntrackedChecked = document.getElementById('untracked-checkbox')
    .checked;

  chrome.bookmarks.getSubTree(folderId, (subTrees) => {
    if (chrome.runtime.lastError) {
      console.warn(chrome.runtime.lastError.message);
    } else {
      dbm.findAll((err, dynBook) => {
        if (err) console.warn(err);
        hideFolderInfoChildren();
        sortFolderInfoChildren();
        for (let tree of subTrees) {
          findLeafNodes(tree, (node) => {
            const childEl = document.getElementById(`child-info-${node.id}`);
            // filter by search pattern
            if (childEl && searchPattern.test(childEl.textContent)) {
              const spans = childEl.querySelectorAll('span');

              // filter by tracked/untracked
              if (dynBook[node.id] && isTrackedChecked) {
                showTracked(childEl);
              } else if (!dynBook[node.id] && isUntrackedChecked) {
                showUntracked(childEl);
              }

              // update information if bookmark is changed
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

export function sortFolderInfoChildren() {
  sortList('folder-children-info', (lhs, rhs) => {
    const lhsUrl = lhs.querySelector('.child-info-link').textContent;
    const rhsUrl = rhs.querySelector('.child-info-link').textContent;

    const lhsTitle = lhs
      .querySelector('.child-info-title')
      .textContent.toLowerCase();
    const rhsTitle = rhs
      .querySelector('.child-info-title')
      .textContent.toLowerCase();

    if (lhsTitle === rhsTitle) {
      return lhsUrl > rhsUrl;
    } else {
      return lhsTitle > rhsTitle;
    }
  });
}

/* Functions below are NOT exported, they are intended to make functions above more readable */
function showTracked(childEl) {
  const spans = childEl.querySelectorAll('span');
  childEl.parentElement.classList.remove('hide');
  replaceAllClass(spans, defaultFileIconColor, trackedFileIconColor);
}
function showUntracked(childEl) {
  const spans = childEl.querySelectorAll('span');
  childEl.parentElement.classList.remove('hide');
  replaceAllClass(spans, trackedFileIconColor, defaultFileIconColor);
}
function replaceAllClass(nodesArray, oldClass, newClass) {
  for (let node of nodesArray) {
    node.classList.replace(oldClass, newClass);
  }
}
