import React from "react";
import { getSortedNodes, isFile } from "shared/lib/bookmarkNodes";
import FolderTreeItem from "./FolderTreeItem";
import FileTreeItem from "./FileTreeItem";

const defaultOptions = {
  includeFiles: false,
  fileTreeItemProps: {},
  folderTreeItemProps: {},
  readOnlyIds: []
};

export default function createTree(
  nodes = {},
  rootId = "0",
  options = defaultOptions
) {
  const {
    fileTreeItemProps = {},
    folderTreeItemProps = {},
    readonlyIds = []
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
function _getChildren(nodes, rootId, options = {}) {
  let children = nodes[rootId].children.map(childId => nodes[childId]);
  let sorted = getSortedNodes(children);
  let filtered = _applyFilter(sorted, options);
  return filtered.map(child => createTree(nodes, child.id));
}

function _applyFilter(nodes = [], options = {}) {
  if (!options.includeFiles) {
    nodes = nodes.filter(child => !isFile(child));
  }
  return nodes;
}
