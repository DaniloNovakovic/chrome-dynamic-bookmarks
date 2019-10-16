import { createSelector } from "reselect";
import {
  isRoot,
  getSortedNodes,
  getFilteredNodes,
  getBreadcrumbIds
} from "shared/lib/bookmarkNodes";

export const nodesSelector = state => state.bookmarkNodes.data || {};

const selectNodeId = (_, id) => id;

export const makeUniqueNodeByIdSelector = () =>
  createSelector(
    [nodesSelector, selectNodeId],
    (nodes, nodeId) => (nodeId in nodes && nodes[nodeId]) || {}
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
