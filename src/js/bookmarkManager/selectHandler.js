class selectHandlerFunc {
  constructor() {
    this.oldBgCol = null;
    this.oldTxtCol = null;
    this.currSelected = null;
  }
  setSelected(element, backgroundColor = '#e0e0e0', color = '') {
    if (this.currSelected) {
      this.unselect();
    }
    if (element) {
      let id;
      if (element.classList.contains('folder')) {
        element = element.querySelector('.folder-header');
      }
      this.oldTxtCol = element.style.color;
      this.oldBgCol = element.style.backgroundColor;
      element.style.backgroundColor = backgroundColor;
      this.currSelected = element;

      if (element.classList.contains('folder-header')) {
        id = element.parentElement.getAttribute('id');
      } else if (element.classList.contains('file')) {
        id = element.getAttribute('id');
      }
      if (id) {
        chrome.bookmarks.get(id, (bookmarks) => {
          if (chrome.runtime.lastError) {
            console.warn(chrome.runtime.lastError.message);
          } else {
            openAllParentFolders(bookmarks[0].parentId);
          }
        });
      }
    }
  }
  unselect() {
    if (this.currSelected) {
      this.currSelected.style.color = this.oldTxtCol;
      this.currSelected.style.backgroundColor = this.oldBgCol;
      this.currSelected = null;
    }
  }
}

// use this handler if you want to have uniquely selected element
var globalSelectHandler = new selectHandlerFunc();
