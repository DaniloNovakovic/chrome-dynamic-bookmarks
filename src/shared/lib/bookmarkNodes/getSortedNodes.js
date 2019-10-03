import { isFile, isOnlyOneFile } from "./comparisons";

export default function getSortedNodes(nodes = []) {
  let sorted = [...nodes];
  sorted.sort((lhs, rhs) => {
    if (isOnlyOneFile(lhs, rhs)) {
      return isFile(lhs) ? 1 : -1;
    }
    const lhsTitle = lhs.title.toLowerCase();
    const rhsTitle = rhs.title.toLowerCase();
    return lhsTitle.localeCompare(rhsTitle);
  });
  return sorted;
}
