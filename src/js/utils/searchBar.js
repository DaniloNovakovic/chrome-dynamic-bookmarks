export function clearSearchBar() {
  document.getElementById('search-input').value = '';
  M.updateTextFields();
}
