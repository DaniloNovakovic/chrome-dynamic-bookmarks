/* File */

const File = ({ name }) => {
  return div(
    { className: 'file' },
    i({ className: 'material-icons', style: 'opacity: 0;' }, 'arrow_right'),
    i({ className: 'material-icons' }, 'insert_drive_file'),
    span({ className: 'truncate' }, name)
  );
};

/* Folder */

const openedFolderIcon = 'folder_open';
const closedFolderIcon = 'folder';
const openedArrowIcon = 'arrow_drop_down';
const closedArrowIcon = 'arrow_right';

function changeOpened(event) {
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

const Folder = (props, ...children) => {
  const opened = props.opened || false;
  const arrowIcon = opened ? openedArrowIcon : closedArrowIcon;
  const folderIcon = opened ? openedFolderIcon : closedFolderIcon;
  const folderName = props.name || 'unknown';

  return div(
    { className: 'folder' },
    header(
      {
        onClick: changeOpened,
        className: 'folder-header',
        opened: opened
      },
      i({ className: 'material-icons' }, arrowIcon),
      i({ className: 'material-icons' }, folderIcon),
      span(null, folderName)
    ),
    ul({ className: opened ? '' : 'hide' }, ...children)
  );
};

/* TreeView */

const createTree = (node) => {
  if (!node.children) {
    console.log({ name: node.title });
    return File({ name: node.title });
  } else {
    let childEls = [];
    for (let child of node.children) {
      let subTree = createTree(child);
      childEls.push(subTree);
    }
    return Folder({ name: node.title, opened: false }, ...childEls);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('#treeView');
  chrome.bookmarks.getTree((results) => {
    app.appendChild(createTree(results[0]));
  });
});
