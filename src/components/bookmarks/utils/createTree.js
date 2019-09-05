import React from "react";
import File from "../File";
import Folder from "../Folder";

const defaultOptions = {
  includeFiles: false
};

export default function createTree(node, options = defaultOptions) {
  if (_isFile(node)) {
    return options.includeFiles ? File(node) : <div />;
  }
  const children = _getChildren(node, options);
  return Folder({
    ...node,
    children
  });
}

function _getChildren(node, options) {
  let children = _getSortedNodes(node.children);
  if (!options.includeFiles) {
    children = children.filter(child => !_isFile(child));
  }
  return children.map(child => createTree(child, options));
}

function _getSortedNodes(children = []) {
  let sorted = [...children];
  sorted.sort((lhs, rhs) => {
    if (_isOnlyOneFolder(lhs, rhs)) {
      return _isFile(lhs) ? 1 : -1;
    }
    lhsTitle = lhs.title.toLowerCase();
    rhsTitle = rhs.title.toLowerCase();
    return lhsTitle.localeCompare(rhsTitle);
  });
  return sorted;
}

function _isOnlyOneFolder(lhs, rhs) {
  return _isFile(lhs) ^ _isFile(rhs);
}

function _isFile(node) {
  return !!node.url;
}
