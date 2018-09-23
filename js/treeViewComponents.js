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
        chrome.bookmarks.get(bookmark.parentId, (results) => {
          let parentTitle = null;
          if (chrome.runtime.lastError) {
            console.warn(chrome.runtime.lastError.message);
          } else {
            parentTitle = results[0].title;
          }
          setBookmarkInfo({
            title: bookmark.title,
            url: bookmark.url,
            id: bookmark.id,
            parentId: bookmark.parentId,
            ...(parentTitle && { parent: parentTitle }),
            ...(dynBook[bookmark.id] && {
              regExp: dynBook[bookmark.id].regExp
            }),
            ...(dynBook[bookmark.id] && {
              history: dynBook[bookmark.id].history
            })
          });
          enableFooterButtons();
        });
      });
    }
  });
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
