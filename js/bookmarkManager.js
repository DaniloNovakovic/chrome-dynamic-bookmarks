/* File */

const File = ({ name }) => {
  return div(
    { className: 'file' },
    i({ className: 'material-icons', style: 'opacity: 0;' }, 'arrow_right'),
    i({ className: 'material-icons' }, 'insert_drive_file'),
    span(null, name)
  );
};

/* Folder */

const openedFolderIcon = 'folder_open';
const closedFolderIcon = 'folder';
const openedArrowIcon = 'arrow_drop_down';
const closedArrowIcon = 'arrow_right';

function changeOpened(event) {
  const folderHeader = event.target;
  const opened = folderHeader.getAttribute('opened') == 'true';
  //console.log(folderHeader, opened);

  let icons = folderHeader.querySelectorAll('.material-icons');
  icons.forEach((icon) => {
    if (/arrow/i.test(icon.textContent)) {
      icon.textContent = opened ? openedArrowIcon : closedArrowIcon;
    } else {
      icon.textContent = opened ? openedFolderIcon : closedFolderIcon;
    }
  });
  try {
    const sibling = folderHeader.nextElementSibling;
    if (!opened) {
      sibling.classList.remove('hide');
    } else {
      sibling.classList.add('hide');
    }
  } catch {
    console.warn(`No sibling of elem ${folderHeader} found ...`);
  }
  folderHeader.setAttribute('opened', !opened);
}

const Folder = (props, ...children) => {
  const opened = props.opened;
  const arrowIcon = opened ? openedArrowIcon : closedArrowIcon;
  const folderIcon = opened ? openedFolderIcon : closedFolderIcon;

  //const folderItems = children;
  // const folderItems = children.map((child) => {
  //   li(child);
  // });
  const folderName = props.name || 'unknown';
  return div(
    { className: 'folder' },
    header(
      {
        onClick: changeOpened,
        className: 'folder-header',
        opened: opened ? true : false
      },
      i({ className: 'material-icons' }, arrowIcon),
      i({ className: 'material-icons' }, folderIcon),
      span(null, folderName)
    ),
    ul({ className: opened ? '' : 'hide' }, ...children)
  );
};

/* TreeView */

const TreeView = () => {
  return section(
    { className: 'container' },
    File({ name: 'myBookmark.js' }),
    Folder(
      { name: 'otherBookmarks' },
      Folder({ name: 'myTest.js' }, File({ name: 'whatup.js' })),
      File({ name: 'justASimpleFile.css' })
    )
  );
};

const app = document.querySelector('#treeView');
app.appendChild(createElement(TreeView));
