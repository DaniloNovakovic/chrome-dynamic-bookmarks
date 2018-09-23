/* File */
const defaultFileIconColor = 'grey-text';
const trackedFileIconColor = 'red-text';

const File = ({ name, id, fileIconColor }) => {
  const iconColor = fileIconColor || defaultFileIconColor;
  return div(
    {
      className: 'file hoverable',
      onClick: handleFileClick,
      ...(id && { id })
    },
    i({ className: 'material-icons', style: 'opacity: 0;' }, 'arrow_right'),
    i(
      { className: `material-icons ${iconColor} file-icon` },
      'insert_drive_file'
    ),
    span(null, name)
  );
};

/* Folder */

const openedFolderIcon = 'folder_open';
const closedFolderIcon = 'folder';
const openedArrowIcon = 'arrow_drop_down';
const closedArrowIcon = 'arrow_right';

const Folder = ({ opened, name, id }, ...children) => {
  const arrowIcon = opened ? openedArrowIcon : closedArrowIcon;
  const folderIcon = opened ? openedFolderIcon : closedFolderIcon;
  const folderName = name || 'unknown';

  return div(
    { className: 'folder', ...(id && { id }) },
    header(
      {
        onClick: handleFolderHeaderClick,
        className: 'folder-header hoverable',
        opened: opened
      },
      i({ className: 'material-icons' }, arrowIcon),
      i({ className: 'material-icons grey-text text-darken-2' }, folderIcon),
      span(null, folderName)
    ),
    ul({ className: opened ? '' : 'hide' }, ...children)
  );
};

/* TreeView */

const createTree = (node) => {
  if (!node.children) {
    return File({ id: node.id, name: node.title });
  } else {
    let childEls = [];
    for (let child of node.children) {
      let subTree = createTree(child);
      childEls.push(subTree);
    }
    return Folder(
      { id: node.id, name: node.title, opened: false },
      ...childEls
    );
  }
};

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

/* onClick handlers */
function handleFileClick(event) {
  const file = event.target.classList.contains('file')
    ? event.target
    : event.target.parentElement;

  chrome.bookmarks.get(file.id, (results) => {
    if (chrome.runtime.lastError) {
      console.warn(chrome.runtime.lastError.message);
    } else {
      const bookmark = results[0];
      chrome.storage.sync.get(['dynBookmarks'], ({ dynBookmarks }) => {
        let dynBook = dynBookmarks || {};
        updateBookmarkInfo(bookmark, dynBook);
      });
    }
  });
}

function updateBookmarkInfo(bookmark, dynBook) {
  const titleInfo = document.getElementById('title-info');
  const urlInfo = document.getElementById('url-info');
  const parentTitleInfo = document.getElementById('parent-title-info');
  const idInfo = document.getElementById('bookmark-id-info');
  const parentIdInfo = document.getElementById('parent-id-info');

  titleInfo.textContent = bookmark.title;
  urlInfo.textContent = bookmark.url;
  idInfo.textContent = bookmark.id;
  parentIdInfo.textContent = bookmark.parentId;

  const trackedDiv = document.getElementById('tracked');

  if (dynBook && dynBook[bookmark.id]) {
    const regExpInfo = document.getElementById('regExp-info');
    regExpInfo.textContent = dynBook[bookmark.id].regExp;

    // const historyList = document.getElementById('history-list');
    // historyList.innerHTML = '';
    // for (let url of dynBook[bookmark.id].history) {
    //   historyList.appendChild(li(null, code(null, url)));
    // }

    trackedDiv.classList.remove('hide');
  } else if (!trackedDiv.classList.contains('hide')) {
    trackedDiv.classList.add('hide');
  }

  chrome.bookmarks.get(bookmark.parentId, (results) => {
    if (chrome.runtime.lastError) {
      console.warn(chrome.runtime.lastError.message);
    } else {
      parentTitleInfo.textContent = results[0].title;
    }
  });

  enableFooterButtons();
}

function enableFooterButtons() {
  const editBtn = document.getElementById('edit-btn');
  const deleteBtn = document.getElementById('delete-btn');
  editBtn.classList.remove('disabled');
  deleteBtn.classList.remove('disabled');
}

function handleFolderHeaderClick(event) {
  const folderHeader = event.target.classList.contains('folder-header')
    ? event.target
    : event.target.parentElement;
  const opened = folderHeader.getAttribute('opened') == 'true';
  const newOpened = !opened;

  let icons = folderHeader.querySelectorAll('.material-icons');
  icons.forEach((icon) => {
    if (/arrow/i.test(icon.textContent)) {
      icon.textContent = newOpened ? openedArrowIcon : closedArrowIcon;
    } else {
      icon.textContent = newOpened ? openedFolderIcon : closedFolderIcon;
    }
  });

  try {
    const sibling = folderHeader.nextElementSibling;
    if (newOpened) {
      sibling.classList.remove('hide');
    } else {
      sibling.classList.add('hide');
    }
  } catch {
    console.warn(`No sibling of elem ${folderHeader} found ...`);
  }

  folderHeader.setAttribute('opened', newOpened);
}
