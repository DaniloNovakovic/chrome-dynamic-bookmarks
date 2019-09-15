const defaultFilter = {
  parentId: null
};

export default function filterNodes(
  bookmarkNodes = {},
  filter = defaultFilter
) {
  const nodes = Object.keys(bookmarkNodes).map(key => bookmarkNodes[key]);
  return _applyFilter(nodes, filter);
}

function _applyFilter(nodes = [], filter = {}) {
  if (filter.parentId) {
    nodes = nodes.filter(node => node.parentId === filter.parentId);
  }
  return nodes;
}
