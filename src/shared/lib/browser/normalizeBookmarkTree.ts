import { BrowserBookmark, NormalizedBrowserBookmark } from "@/shared/types";

function isFile(node: chrome.bookmarks.BookmarkTreeNode) {
  return !!node.url;
}

/**
 * Normalizes bookmark tree to form `{<id>: {...node, children?:[<id>]}}`
 * @param {node} treeRoot - root of the bookmark tree to normalize
 */
export default function normalizeBookmarkTree(
  treeRoot: BrowserBookmark,
): Record<string, NormalizedBrowserBookmark> {
  const normalized = {};

  (function traverseTree(node) {
    if (isFile(node)) {
      normalized[node.id] = node;
      return;
    }
    const childIds = [];
    for (const child of node.children) {
      traverseTree(child);
      childIds.push(child.id);
    }
    normalized[node.id] = {
      ...node,
      children: childIds,
    };
  })(treeRoot);

  return normalized;
}
