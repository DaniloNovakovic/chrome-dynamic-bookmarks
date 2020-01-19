export default function getFilteredNodes(nodes = [], { parentId, searchText }) {
  return nodes.filter(node => {
    if (parentId && node.parentId !== parentId) {
      return false;
    }
    if (searchText && !_isIncludedInTitleOrUrl(node, searchText)) {
      return false;
    }
    return true;
  });
}

function _isIncludedInTitleOrUrl(node, searchText = "") {
  const searchTextLower = searchText.toLowerCase();
  if (node.title && node.title.toLowerCase().includes(searchTextLower)) {
    return true;
  }
  if (node.url && node.url.toLowerCase().includes(searchTextLower)) {
    return true;
  }
  return false;
}
