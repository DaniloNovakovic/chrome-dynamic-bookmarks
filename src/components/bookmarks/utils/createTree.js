import File from "../File";
import Folder from "../Folder";

export default function createTree(node) {
  if (_isFile(node)) {
    return File(node);
  }
  const children = _getSortedNodes(node.children);
  return Folder({
    ...node,
    children: children.map(child => createTree(child))
  });
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
