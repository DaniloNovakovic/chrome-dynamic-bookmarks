export function isOnlyOneFile(lhs, rhs) {
  return isFile(lhs) ^ isFile(rhs);
}

export function isFile(node = {}) {
  return !!node.url;
}

export function isFolder(node = {}) {
  return !node.url;
}

export function isRoot(node = {}) {
  return node.id == "0";
}

export function isTracked(node = {}) {
  return !!node.regExp;
}
