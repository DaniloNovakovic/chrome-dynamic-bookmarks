import { checkAndHandleError } from "@/shared/lib/browser/log";
import { BrowserBookmark } from "@/shared/types/bookmark.types";

import getCurrentBrowser from "../getCurrentBrowser";

const browser = getCurrentBrowser();
const bookmarks = browser.bookmarks;

type BookmarkCreateArg = {
  title: string;
  url?: string;
  parentId?: string;
  index?: number;
};

type BookmarkSearchQuery = {
  query?: string;
  title?: string;
  url?: string;
};

type BookmarkDestinationArg = {
  parentId?: string;
  index?: number;
};

type BookmarkChangesArg = {
  title?: string;
  url?: string;
};

/**
 * Creates a bookmark or folder under the specified parentId.
 * If url is missing it will be a folder
 */
export function create(
  { title, url, parentId = undefined, index = undefined }: BookmarkCreateArg,
  done: (errMsg: string, newBookmark?: BrowserBookmark) => void
) {
  bookmarks.create({ title, url, parentId, index }, (newBookmark) => {
    if (!checkAndHandleError(done)) {
      done(null, newBookmark);
    }
  });
}

/**
 * Creates a bookmark or folder under the specified parentId.
 * If url is `NULL` or missing, it will be a folder
 * @returns Promise object represents the newly created bookmark / folder
 */
export function createAsync(bookmarkNode: BookmarkCreateArg) {
  return new Promise<BrowserBookmark>(function (resolve, reject) {
    create(bookmarkNode, function (err, data) {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

export function get(
  id: string,
  done: (errMsg: string, node?: BrowserBookmark) => void
) {
  bookmarks.get(id, (results) => {
    if (!checkAndHandleError(done)) {
      const node = results[0];
      done(null, node);
    }
  });
}

/**
 * Retrieves part of the Bookmarks hierarchy, starting at the specified node.
 */
export function getSubTree(
  id: string,
  done: (err: string, rootNode?: BrowserBookmark) => void
) {
  bookmarks.getSubTree(id, (results) => {
    if (!checkAndHandleError(done)) {
      const rootNode = results[0];
      done(null, rootNode);
    }
  });
}

/**
 * Retrives the root node of the bookmarks
 */
export function getTreeRoot(
  done: (err: string, rootNode?: BrowserBookmark) => void
) {
  bookmarks.getTree((results) => {
    if (!checkAndHandleError(done)) {
      const rootNode = results[0];
      done(null, rootNode);
    }
  });
}

/**
 * Retrieves the children of the specified BookmarkTreeNode `id`.
 */
export function getChildren(
  id: string,
  done: (children?: BrowserBookmark[]) => void
) {
  bookmarks.getChildren(id, (results) => {
    if (checkAndHandleError()) {
      done([]);
    } else {
      done(results);
    }
  });
}

/**
 * Searches for BookmarkTreeNodes matching the given query.
 * @param query - string of words and quoted phrases that are matched against bookmark URLs and titles
 * @param done - callback function called with `done([bookmarks])`
 */
export function search(
  query: string | BookmarkSearchQuery,
  done: (results?: BrowserBookmark[]) => void
) {
  bookmarks.search(query || ({} as unknown), (results) => {
    if (checkAndHandleError()) {
      done([]);
    } else {
      done(results);
    }
  });
}

export function move(
  id: string,
  { parentId, index }: BookmarkDestinationArg,
  done: (errMsg: string, node?: BrowserBookmark) => void
) {
  bookmarks.move(id, { parentId, index }, (result) => {
    if (!checkAndHandleError(done)) {
      done(null, result);
    }
  });
}

export function update(
  id: string,
  changes: BookmarkChangesArg,
  done: (errMsg: string, node?: BrowserBookmark) => void
) {
  bookmarks.update(id, changes, (updatedNode) => {
    if (!checkAndHandleError(done)) {
      done(null, updatedNode);
    }
  });
}

export function remove(id: string, done: (errMsg: string) => void) {
  bookmarks.remove(id, () => {
    if (!checkAndHandleError(done)) {
      done(null);
    }
  });
}

export function removeTree(id: string, done: (errMsg: string) => void) {
  bookmarks.removeTree(id, () => {
    if (!checkAndHandleError(done)) {
      done(null);
    }
  });
}

export default {
  create,
  createAsync,
  get,
  getSubTree,
  getTreeRoot,
  getChildren,
  search,
  move,
  update,
  remove,
  removeTree,
};
