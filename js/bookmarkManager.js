const File = ({ name }) => {
  return div(
    { className: 'file' },
    i({ className: 'material-icons', style: 'opacity: 0;' }, 'arrow_right'),
    i({ className: 'material-icons' }, 'insert_drive_file'),
    span(null, name)
  );
};

const TreeView = () => {
  return section({ className: 'container' }, File({ name: 'myFile.js' }));
};

const app = document.querySelector('#treeView');
app.appendChild(createElement(TreeView));
