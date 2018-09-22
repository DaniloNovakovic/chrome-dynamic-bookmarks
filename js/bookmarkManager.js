const File = ({ name }) => {
  return div(
    { className: 'file' },
    i({ className: 'material-icons', style: 'opacity: 0;' }, 'arrow_right'),
    i({ className: 'material-icons' }, 'insert_drive_file'),
    span(null, name)
  );
};

function changeOpened(event) {
  //const folderHeader = event.target;
}

const Folder = (props, ...children) => {
  const opened = props.opened || false;
  const arrowIcon = opened ? 'arrow_drop_down' : 'arrow_right';
  const folderIcon = opened ? 'folder_open' : 'folder';
  const folderItems = children.map((child, index) => {
    li(child);
  });
  const folderName = props.name || 'unknown';
  return div(
    { className: 'folder' },
    header(
      {
        onClick: changeOpened,
        className: 'folder-header'
      },
      i({ className: 'material-icons' }, arrowIcon),
      i({ className: 'material-icons' }, folderIcon),
      span(null, folderName)
    ),
    ul({ className: opened ? '' : 'hide' }, ...folderItems)
  );
};

const TreeView = () => {
  return section(
    { className: 'container' },
    File({ name: 'myBookmark.js' }),
    Folder({ name: 'otherBookmarks' })
  );
};

const app = document.querySelector('#treeView');
app.appendChild(createElement(TreeView));
