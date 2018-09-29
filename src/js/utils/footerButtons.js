export function enableFooterButtons() {
  const editBtn = document.getElementById('edit-btn');
  const deleteBtn = document.getElementById('delete-btn');
  if (editBtn) {
    editBtn.classList.remove('disabled');
  }
  if (deleteBtn) {
    deleteBtn.classList.remove('disabled');
  }
}
export function disableFooterButtons() {
  const editBtn = document.getElementById('edit-btn');
  const deleteBtn = document.getElementById('delete-btn');
  if (editBtn) {
    editBtn.classList.add('disabled');
  }
  if (deleteBtn) {
    deleteBtn.classList.add('disabled');
  }
}
