document.addEventListener('DOMContentLoaded', () => {
  initFolderInfo();
});

/* Show / Hide functionality */
function hideFolderInfo() {
  document.getElementById('folderInfo').classList.add('hide');
}
function showFolderInfo() {
  document.getElementById('folderInfo').classList.remove('hide');
}
function hideFolderInfoDisplay() {
  document.getElementById('folder-info-display').classList.add('hide');
}
function showFolderInfoDisplay() {
  document.getElementById('folder-info-display').classList.remove('hide');
}
function isFolderInfoHidden() {
  return document.getElementById('folderInfo').classList.contains('hide');
}
function getFolderInfoData() {
  const id = document
    .getElementById('folder-children-info')
    .getAttribute('folderId');
  const folder = document.getElementById(id);
  const title =
    (folder && folder.querySelector('.folder-header > span').textContent) || '';
  return { id, title };
}

function displayFolderInfo(folderId) {
  if (!folderId) {
    return console.warn(`folderId of ${folderId} is invalid`);
  }
  document
    .getElementById('folder-children-info')
    .setAttribute('folderId', folderId);
  renderChildren();
  hideBookmarkInfo();
  hideFolderInfoEdit();
  showFolderInfoDisplay();
  showFolderInfo();

  // 0 (root - invisible), 1 (bookmarks bar), and 2 (other bookmarks) are
  // reserved / unchangable chrome folders
  if (folderId > 2) {
    enableFooterButtons();
  } else {
    disableFooterButtons();
  }
}

/* Children functionality */

function initFolderInfo() {
  const childrenList = document.getElementById('folder-children-info');

  chrome.bookmarks.getTree((results) => {
    if (chrome.runtime.lastError) {
      console.warn(chrome.runtime.lastError.message);
    } else {
      chrome.storage.sync.get(['dynBookmarks'], ({ dynBookmarks }) => {
        const dynBook = dynBookmarks || {};
        childrenList.innerHTML = '';
        for (let child of results) {
          findLeafNodes(child, (node) => {
            const color = dynBook[node.id]
              ? trackedFileIconColor
              : `${defaultFileIconColor}`;
            const hostName = node.url
              .match(/^(http[s]?:\/\/.*?\/)/i)[0]
              .replace(/http[s]:\/\//, '');
            const faviconLink =
              'https://www.google.com/s2/favicons?domain=' + hostName;
            childrenList.appendChild(
              div(
                { className: 'child-info-wrapper' },
                img({ src: faviconLink, className: 'favicon' }),
                a(
                  {
                    id: `child-info-${node.id}`,
                    href: node.url,
                    className: `truncate`,
                    target: '_blank'
                  },
                  span({ className: `${color} text-darken-4` }, node.title),
                  span(
                    { className: `${color}  child-info-link` },
                    ` (${node.url})`
                  )
                ),
                i(
                  {
                    className: 'material-icons edit-child-info-icon'
                  },
                  'more_vert'
                )
              )
            );
          });
        }
      });
    }
  });
}
// adds 'hide' class to each child of 'folder-children-info'
function hideFolderInfoChildren() {
  const childrenList = document.getElementById('folder-children-info');
  for (let child of childrenList.children) {
    child.classList.add('hide');
  }
}
// renders children based on search pattern from 'search-input'
function renderChildren(renderAll = false) {
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
            if (childEl && searchPattern.test(childEl.textContent)) {
              childEl.parentElement.classList.remove('hide');
            }
          });
        }
      });
    }
  });
}

/**
 * Traverses a tree and whenever a leaf node is found (elem withouth children property) it will trigger a callback
 * @param {object} rootNode - object with children array
 * @param {function} onLeafNodeFound - callback triggered whenever a leaf is found
 */
function findLeafNodes(rootNode, onLeafNodeFound) {
  if (!rootNode.children) {
    onLeafNodeFound(rootNode);
  } else {
    for (let child of rootNode.children) {
      findLeafNodes(child, onLeafNodeFound);
    }
  }
}
