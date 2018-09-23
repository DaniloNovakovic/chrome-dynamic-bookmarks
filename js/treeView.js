document.addEventListener('DOMContentLoaded', () => {
  const treeView = document.querySelector('#treeView');

  chrome.bookmarks.getTree((results) => {
    let childEls = [];
    for (let child of results[0].children) {
      let subTree = createTree(child);
      childEls.push(subTree);
    }
    treeView.appendChild(section(null, ...childEls));
    colorTrackedFiles();
  });

  chrome.bookmarks.onCreated.addListener((id, bookmark) => {
    const parent = document.getElementById(bookmark.parentId);
    if (!parent) {
      return console.warn(
        'failed to find parent with id of ' + bookmark.parentId
      );
    }
    if (parent.classList.contains('folder')) {
      parent
        .querySelector('ul')
        .appendChild(File({ name: bookmark.title, id: bookmark.id }));
    }
  });

  chrome.bookmarks.onRemoved.addListener((id, removeInfo) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.remove();
    }
  });

  chrome.bookmarks.onChanged.addListener((id, changeInfo) => {
    if (changeInfo.title) {
      let elem = document.getElementById(id);
      if (elem.classList.contains('folder')) {
        elem = elem.querySelector('.folder-header') || elem;
      }
      elem.querySelector('span').textContent = changeInfo.title;
    }
  });

  chrome.bookmarks.onMoved.addListener((id, moveInfo) => {
    const elem = document.getElementById(id);
    const parent = document.getElementById(moveInfo.parentId);
    if (parent.classList.contains('folder')) {
      parent.querySelector('ul').appendChild(elem);
    }
  });
});

function colorTrackedFiles(color = trackedFileIconColor) {
  chrome.storage.sync.get(['dynBookmarks'], ({ dynBookmarks }) => {
    let dynBook = dynBookmarks || {};
    for (let id in dynBook) {
      const file = document.getElementById(id);
      const fileIcon = file.querySelector('.file-icon');
      if (fileIcon) {
        fileIcon.classList.remove(defaultFileIconColor);
        fileIcon.classList.add(color);
      }
    }
  });
}
