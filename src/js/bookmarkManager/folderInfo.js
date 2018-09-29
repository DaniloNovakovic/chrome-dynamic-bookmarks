document.addEventListener('DOMContentLoaded', () => {
  initFolderInfo();

  chrome.bookmarks.onCreated.addListener((id, bookmark) => {
    setTimeout(() => {
      chrome.storage.sync.get(['dynBookmarks'], ({ dynBookmarks }) => {
        const dynBook = dynBookmarks || {};
        const color = dynBook[bookmark.id]
          ? trackedFileIconColor
          : defaultFileIconColor;
        const childrenList = document.getElementById('folder-children-info');
        if (childrenList) {
          childrenList.appendChild(
            createFolderInfoChild(
              bookmark.id,
              bookmark.title,
              bookmark.url,
              color
            )
          );
        }
      });
    }, 100);
  });
  chrome.bookmarks.onRemoved.addListener((id, removeInfo) => {
    const childInfo = document.getElementById(createChildInfoId(id));
    if (childInfo) {
      const childInfoWrapper = childInfo.parentElement;
      childInfoWrapper.remove();
    }
  });
  chrome.bookmarks.onChanged.addListener((id, changeInfo) => {
    setTimeout(() => renderChildren(false), 100);
  });
  chrome.bookmarks.onMoved.addListener((id, moveInfo) => {
    renderChildren();
  });
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
              : defaultFileIconColor;

            childrenList.appendChild(
              createFolderInfoChild(node.id, node.title, node.url, color)
            );
          });
        }
      });
    }
  });
}

// converts bookmarkId into child-info id
function createChildInfoId(bookmarkId) {
  return `child-info-${bookmarkId}`;
}
/**
 * Creates and returns new FolderInfoChild element (returns null upon failure)
 * @param {string} id - (bookmark.id - resulting id of element will be `child-info-${id}`)
 * @param {string} title - (bookmark.title - name of the bookmark)
 * @param {string} url - (bookmark.url - url to which bookmark points to)
 * @param {string} color - materializecss className color of text (note: lightened/darkened are added automatically so don't use them)
 */
function createFolderInfoChild(id, title, url, color = defaultFolderIconColor) {
  if (!id || !url || !title) {
    console.warn('in createFolderInfo id, url or/and title were invalid');
    return null;
  }
  let hostName = url.match(/^(http[s]?:\/\/.*?\/)/i);
  let faviconLink;
  if (hostName) {
    hostName = hostName[0].replace(/http[s]:\/\//, '');
    faviconLink = 'https://www.google.com/s2/favicons?domain=' + hostName;
  } else {
    faviconLink = '../images/default_favicon.png';
  }

  return div(
    { className: 'child-info-wrapper' },
    img({ src: faviconLink, className: 'favicon' }),
    a(
      {
        id: createChildInfoId(id),
        href: url,
        className: `truncate`,
        target: '_blank'
      },
      span({ className: `${color} text-darken-4` }, title),
      span({ className: `${color}  child-info-link` }, ` (${url})`)
    ),
    i(
      {
        className: 'material-icons edit-child-info-icon',
        onClick: () => {
          displayBookmark(id);
        }
      },
      'more_vert'
    )
  );
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

function openAllParentFolders(parentId) {
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
function openFolder(folderId) {
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
