import { isRoot } from "./comparisons";

const defaultFilter = {
  parentId: null,
  searchText: ""
};

export default function filterNodes(
  bookmarkNodes = {},
  filter = defaultFilter
) {
  let nodes = _filterByParentId(bookmarkNodes, filter.parentId);
  return _filterBySearchText(nodes, filter.searchText);
}

function _filterByParentId(bookmarkNodes = {}, parentId = null) {
  if (!parentId) {
    return Object.keys(bookmarkNodes)
      .map(key => bookmarkNodes[key])
      .filter(node => !isRoot(node));
  }
  const parent = bookmarkNodes[parentId];
  return parent.children.map(childId => bookmarkNodes[childId]);
}

function _filterBySearchText(nodes = [], searchText = "") {
  if (!searchText) {
    return nodes;
  }
  return nodes.filter(node => {
    const searchTextLower = searchText.toLowerCase();
    if (node.title.toLowerCase().includes(searchTextLower)) {
      return true;
    }
    if (node.url) {
      return node.url.toLowerCase().includes(searchTextLower);
    }
    return false;
  });
}
