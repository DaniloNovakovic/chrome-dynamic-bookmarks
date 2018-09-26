document.addEventListener('DOMContentLoaded', () => {
  const searchBar = document.getElementById('search-input');
  searchBar.addEventListener('keyup', () => {
    renderChildren(true);
    hideBookmarkInfo();
    hideFolderInfoEdit();
    showFolderInfoDisplay();
    showFolderInfo();
    globalSelectHandler.unselect();
  });
});

function clearSearchBar() {
  document.getElementById('search-input').value = '';
  M.updateTextFields();
}
