import { createSelector } from "reselect";
import { isRoot } from "utils/bookmarkNodes/comparisons";
import getSortedNodes from "utils/bookmarkNodes/getSortedNodes";
import getFilteredNodes from "utils/bookmarkNodes/getFilteredNodes";
import getBreadcrumbIds from "utils/bookmarkNodes/getBreadcrumbIds";

export const nodesSelector = state => state.bookmarkNodes.data || {};

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
  filterSelector,
  (nodes, filter) => getBreadcrumbIds(nodes, filter.parentId)
);

export const breadcrumbsSelector = createSelector(
  nodesSelector,
  breadcrumbIdsSelector,
  (nodes, breadcrumbIds) =>
    breadcrumbIds.map(id => nodes[id]).filter(node => node && !!node.title)
);
