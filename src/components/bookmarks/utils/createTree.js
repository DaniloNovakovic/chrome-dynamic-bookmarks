import React from "react";
import getSortedNodes from "utils/bookmarkNodes/getSortedNodes";
import { isFile } from "utils/bookmarkNodes/comparisons";
import FolderTreeItem from "../FolderTreeItem";
import FileTreeItem from "../FileTreeItem";

const defaultOptions = {
  ignoreFiles: true
};

export default function createTree(
  nodes = {},
  rootId = "0",
  options = defaultOptions
) {
  const node = nodes[rootId];
  if (isFile(node)) {
    return <FileTreeItem {...node} key={rootId} />;
  }
  const children = _getChildren(nodes, rootId, options);
  return <FolderTreeItem {...node} key={rootId} children={children} />;
}

function _getChildren(nodes, rootId, options = {}) {
  let children = nodes[rootId].children.map(childId => nodes[childId]);
  let sorted = getSortedNodes(children);
  if (options.ignoreFiles) {
    sorted = sorted.filter(child => !isFile(child));
  }
  return sorted.map(child => createTree(nodes, child.id));
}
