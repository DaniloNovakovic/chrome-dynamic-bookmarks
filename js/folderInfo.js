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

/* Children functionality */
function clearFolderInfo() {
  document.getElementById('folder-children-info').innerHTML = '';
}

function renderChildren() {
  const childrenList = document.getElementById('folder-children-info');
  const folderId = childrenList.getAttribute('folderId');

  chrome.bookmarks.getSubTree(folderId, (results) => {
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
              : `${defaultFileIconColor} text-darken-1`;
            childrenList.appendChild(
              a(
                {
                  href: node.url,
                  className: `hoverable truncate ${color}`
                },
                `${node.title}(${node.url})`
              )
            );
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
