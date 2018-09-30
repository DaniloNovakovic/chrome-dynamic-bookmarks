export function clearSearchBar() {
  document.getElementById('search-input').value = '';
  M.updateTextFields();
}

export function hideSearchFilter() {
  document.getElementById('search-filter').classList.add('hide');
}
export function showSearchFilter() {
  document.getElementById('search-filter').classList.remove('hide');
}
