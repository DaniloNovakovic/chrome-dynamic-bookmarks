export function updateTreeColor() {
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
            file.classList.replace(defaultFileIconColor, trackedFileIconColor);
            return true;
          } else {
            file.classList.replace(trackedFileIconColor, defaultFileIconColor);
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
            folderIcon.classList.replace(
              defaultFolderIconColor,
              trackedFolderIconColor
            );
          } else {
            folderIcon.classList.replace(
              trackedFolderIconColor,
              defaultFolderIconColor
            );
          }
        }
      })(rootNode);
    });
  });
}
