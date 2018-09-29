function displayFileInfo(data) {
  setBookmarkInfo(data);
  hideFolderInfo();
  hideInfoEditForm();
  showInfoDisplay();
  showBookmarkInfo();
  enableFooterButtons();
}

function displayBookmark(bookmarkId) {
  getBookmarkData(bookmarkId, (data) => {
    clearSearchBar();
    displayFileInfo(data);
    globalSelectHandler.setSelected(document.getElementById(bookmarkId));
  });
}

function displayFolderInfo(folderId) {
  if (!folderId) {
    return console.warn(`folderId of ${folderId} is invalid`);
  }
  document
    .getElementById('folder-children-info')
    .setAttribute('folderId', folderId);
  renderChildren();
  hideBookmarkInfo();
  hideFolderInfoEdit();
  showFolderInfoDisplay();
  showFolderInfo();

  // 0 (root - invisible), 1 (bookmarks bar), and 2 (other bookmarks) are
  // reserved / unchangable chrome folders
  if (folderId > 2) {
    enableFooterButtons();
  } else {
    disableFooterButtons();
  }
}
