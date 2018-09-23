const addBtn = document.getElementById('add-btn');
const editBtn = document.getElementById('edit-btn');
const deleteBtn = document.getElementById('delete-btn');

deleteBtn.addEventListener('click', () => {
  const id = document.getElementById('bookmark-id-info').textContent;
  if (id) {
    chrome.bookmarks.remove(id, () => {
      if (chrome.runtime.lastError) {
        console.warn(chrome.runtime.lastError.message);
      }
    });
  }
});
