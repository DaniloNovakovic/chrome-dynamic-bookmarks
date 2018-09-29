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
