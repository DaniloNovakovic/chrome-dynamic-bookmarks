import { createSelector } from "reselect";
import {
  isRoot,
  getSortedNodes,
  getFilteredNodes,
  getBreadcrumbIds,
  isFile
} from "shared/lib/bookmarkNodes";

export const clipboardSelector = state => state.clipboard;

export const nodesSelector = state => state.bookmarkNodes.data || {};

const selectNodeId = (_, id) => id;

export const makeUniqueNodeByIdSelector = () =>
  createSelector(
    [nodesSelector, selectNodeId],
    (nodes, nodeId) => (nodeId in nodes && nodes[nodeId]) || {}
  );

export const bookmarksByParentIdSelector = createSelector(
  [nodesSelector, selectNodeId],
  (nodes, parentId) => {
    if (!(parentId in nodes)) {
      return [];
    }
    const parent = nodes[parentId];
    if (!parent.children) {
      return [];
    }
    return parent.children
      .map(childId => nodes[childId])
      .filter(child => !!child.url);
  }
);

export const nodesArraySelector = createSelector(
  nodesSelector,
  nodes =>
    Object.keys(nodes)
      .map(id => nodes[id])
      .filter(node => !isRoot(node))
);

export const sortedNodesSelector = createSelector(
  nodesArraySelector,
  nodes => getSortedNodes(nodes)
);

export const filterSelector = state => state.filter;

export const filteredNodesSelector = createSelector(
  sortedNodesSelector,
  filterSelector,
  (nodes, filter) => getFilteredNodes(nodes, filter)
);

export const breadcrumbIdsSelector = createSelector(
  nodesSelector,
  state => state.filter.parentId,
  (nodes, parentId) => getBreadcrumbIds(nodes, parentId)
);

export const breadcrumbsSelector = createSelector(
  nodesSelector,
  breadcrumbIdsSelector,
  (nodes, breadcrumbIds) =>
    breadcrumbIds.map(id => nodes[id]).filter(node => node && !!node.title)
);

export const selectedNodeIdsSelector = state => state.selectedNodeIds;

export const selectedNodesSelector = createSelector(
  nodesSelector,
  selectedNodeIdsSelector,
  (nodes, selectedNodeIds) => selectedNodeIds.map(id => nodes[id])
);

export const selectedBookmarksUrlSelector = createSelector(
  selectedNodesSelector,
  selectedNodes =>
    selectedNodes.filter(node => isFile(node)).map(node => node.url)
);