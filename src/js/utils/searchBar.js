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

export function enableSearchFilter() {
  document.getElementById('tracked-checkbox').disabled = false;
  document.getElementById('untracked-checkbox').disabled = false;
}
export function disableSearchFilter() {
  document.getElementById('tracked-checkbox').disabled = true;
  document.getElementById('untracked-checkbox').disabled = true;
}
