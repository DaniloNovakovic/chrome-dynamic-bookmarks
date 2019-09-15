import React from "react";
import File from "../File";
import Folder from "../Folder";
import { isFile } from "./comparisons";
import getSortedNodes from "./getSortedNodes";

const defaultOptions = {
  includeFiles: false
};

export default function createTree(node, options = defaultOptions) {
  if (isFile(node)) {
    return options.includeFiles ? File(node) : <div />;
  }
  const children = _getChildren(node, options);
  return Folder({
    ...node,
    children
  });
}

function _getChildren(node, options) {
  let children = getSortedNodes(node.children);
  if (!options.includeFiles) {
    children = children.filter(child => !isFile(child));
  }
  return children.map(child => createTree(child, options));
}
