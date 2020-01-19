import { isFile, isOnlyOneFile } from "./comparisons";

function _safeToLowerCase(value = "", defaultValue = "") {
  if (typeof value === "string") {
    return value.toLowerCase();
  } else {
    return defaultValue;
  }
}

export default function getSortedNodes(nodes = []) {
  let sorted = [...nodes];
  sorted.sort((lhs, rhs) => {
    if (isOnlyOneFile(lhs, rhs)) {
      return isFile(lhs) ? 1 : -1;
    }
    const lhsTitle = _safeToLowerCase(lhs.title);
    const rhsTitle = _safeToLowerCase(rhs.title);
    return lhsTitle.localeCompare(rhsTitle);
  });
  return sorted;
}
