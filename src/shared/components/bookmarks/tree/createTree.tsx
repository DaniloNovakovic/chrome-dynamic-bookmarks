import React from "react";

import { getSortedNodes, isFile } from "@/shared/lib/bookmarkNodes";
import { NormalizedDynamicBookmark } from "@/shared/types";

import FileTreeItem from "./FileTreeItem";
import FolderTreeItem from "./FolderTreeItem";

type TreeOptions = {
  includeFiles?: boolean;
  fileTreeItemProps?: Record<string, unknown>;
  folderTreeItemProps?: Record<string, unknown>;
  readonlyIds?: string[];
};

const defaultOptions: TreeOptions = {
  includeFiles: false,
  fileTreeItemProps: {},
  folderTreeItemProps: {},
  readonlyIds: [],
};

export default function createTree(
  nodes: Record<string, NormalizedDynamicBookmark> = {},
  rootId = "0",
  options: TreeOptions = defaultOptions
) {
  const {
    fileTreeItemProps = {},
    folderTreeItemProps = {},
    readonlyIds = [],
  } = options;
  const readOnly = readonlyIds.includes(rootId);
  const node = nodes[rootId];

  if (isFile(node)) {
    return (
      <FileTreeItem
        node={node}
        key={rootId}
        readOnly={readOnly}
        {...fileTreeItemProps}
      />
    );
  }
  const children = _getChildren(nodes, rootId, options);
  return (
    <FolderTreeItem
      node={node}
      key={rootId}
      children={children}
      readOnly={readOnly}
      {...folderTreeItemProps}
    />
  );
}

/**
 * Returns list of child nodes converted to JSX Element (using the `createTree` function)
 * @param {object} nodes - normalized nodes in form `{[nodeId]: {id:nodeId, ...}}`
 * @param {string} rootId - id of node whose children will be returned
 * @param {object} options - options / filter upon which it is decided which child nodes should be returned
 */
function _getChildren(
  nodes: Record<string, NormalizedDynamicBookmark>,
  rootId: string,
  options: TreeOptions = {}
) {
  const children = nodes[rootId].children.map((childId) => nodes[childId]);
  const sorted = getSortedNodes(children);
  const filtered = _applyFilter(sorted, options);
  return filtered.map((child) => createTree(nodes, child.id));
}

function _applyFilter(nodes = [], options: TreeOptions = {}) {
  if (!options.includeFiles) {
    nodes = nodes.filter((child) => !isFile(child));
  }
  return nodes;
}
