// this file will hold logic considering add/edit/delete buttons
const addBtn = document.getElementById('add-btn');
const editBtn = document.getElementById('edit-btn');
const deleteBtn = document.getElementById('delete-btn');

deleteBtn.addEventListener('click', () => {
  const id = document.getElementById('bookmark-id-info').textContent;
  if (id) {
    chrome.bookmarks.remove(id, () => {
      if (chrome.runtime.lastError) {
        console.warn(chrome.runtime.lastError.message);
      } else {
        clearBookmarkInfo();
        disableFooterButtons();
      }
    });
  }
});

editBtn.addEventListener('click', () => {
  fillForm(getInfoData());
  hideInfoDisplay();
  showForm();
  disableFooterButtons();
});

function enableFooterButtons() {
  editBtn.classList.remove('disabled');
  deleteBtn.classList.remove('disabled');
}
function disableFooterButtons() {
  editBtn.classList.add('disabled');
  deleteBtn.classList.add('disabled');
}
