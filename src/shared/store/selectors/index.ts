import { createSelector } from "reselect";

import {
  getBreadcrumbIds,
  getFilteredNodes,
  getSortedNodes,
  isFile,
  isRoot,
} from "@/shared/lib/bookmarkNodes";
import getTrackedByIdNodes from "@/shared/lib/bookmarkNodes/getTrackedByIdNodes";
import { mapArrayToObject } from "@/shared/lib/objects";
import { NormalizedDynamicBookmark } from "@/shared/types";
import { StoreState } from "@/shared/types/store.types";

export const clipboardSelector = (state: StoreState) => state.clipboard;

export const nodesSelector = (
  state: StoreState,
): Record<string, NormalizedDynamicBookmark> => state.bookmarkNodes.data || {};

const selectNodeId = (_, id: string) => id;

export const makeUniqueNodeByIdSelector = () =>
  createSelector(
    [nodesSelector, selectNodeId],
    (nodes, nodeId: string): NormalizedDynamicBookmark =>
      (nodeId in nodes && nodes[nodeId]) || ({} as NormalizedDynamicBookmark),
  );

export const trackedByIdSelector = createSelector(
  nodesSelector,
  (nodes): Record<string, boolean> => getTrackedByIdNodes(nodes),
);

export const bookmarksByParentIdSelector = createSelector(
  [nodesSelector, selectNodeId],
  (nodes, parentId): NormalizedDynamicBookmark[] => {
    if (!(parentId in nodes)) {
      return [];
    }
    const parent = nodes[parentId];
    if (!parent.children) {
      return [];
    }
    return parent.children
      .map((childId) => nodes[childId])
      .filter((child) => !!child.url);
  },
);

export const nodesArraySelector = createSelector(
  nodesSelector,
  (nodes): NormalizedDynamicBookmark[] =>
    Object.keys(nodes)
      .map((id) => nodes[id])
      .filter((node) => !isRoot(node)),
);

export const sortedNodesSelector = createSelector(
  nodesArraySelector,
  (nodes): NormalizedDynamicBookmark[] => getSortedNodes(nodes),
);

export const filterSelector = (state: StoreState) => state.filter;

export const filteredNodesSelector = createSelector(
  sortedNodesSelector,
  filterSelector,
  (nodes, filter): NormalizedDynamicBookmark[] =>
    getFilteredNodes(nodes, filter),
);

export const filteredNodeIdsSelector = createSelector(
  filteredNodesSelector,
  (filteredNodes = []): string[] => filteredNodes.map((node) => node.id),
);

export const breadcrumbIdsSelector = createSelector(
  nodesSelector,
  (state): string => state.filter.parentId,
  (nodes, parentId): string[] => getBreadcrumbIds(nodes, parentId),
);

export const breadcrumbsSelector = createSelector(
  nodesSelector,
  breadcrumbIdsSelector,
  (nodes, breadcrumbIds): NormalizedDynamicBookmark[] =>
    breadcrumbIds.map((id) => nodes[id]).filter((node) => node && !!node.title),
);

export const selectedNodeIdsSelector = (state: StoreState) =>
  state.selectedNodeIds.data || [];

export const selectedPivotSelector = (state: StoreState) =>
  state.selectedNodeIds.pivot;

export const selectedByNodeIdSelector = createSelector(
  selectedNodeIdsSelector,
  (selectedNodeIds = []): Record<string, boolean> =>
    mapArrayToObject(selectedNodeIds, (_id) => true),
);

export const selectedNodesSelector = createSelector(
  nodesSelector,
  selectedNodeIdsSelector,
  (nodes = {}, selectedNodeIds = []): NormalizedDynamicBookmark[] =>
    selectedNodeIds.map((id) => nodes[id]),
);

export const selectedBookmarksUrlSelector = createSelector(
  selectedNodesSelector,
  (selectedNodes = []): string[] =>
    selectedNodes.filter((node) => isFile(node)).map((node) => node.url),
);
