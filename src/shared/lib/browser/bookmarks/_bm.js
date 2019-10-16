import { checkAndHandleError } from "shared/lib/browser/log";
import getCurrentBrowser from "../getCurrentBrowser";

const browser = getCurrentBrowser();
const bookmarks = browser.bookmarks;

export default {
  create,
  get,
  getTreeRoot,
  getChildren,
  search,
  remove,
  removeTree
};

export function removeTree(id, done) {
  bookmarks.removeTree(id, () => {
    if (!checkAndHandleError(done)) {
      done(null);
    }
  });
}

export function remove(id, done) {
  bookmarks.remove(id, () => {
    if (!checkAndHandleError(done)) {
      done(null);
    }
  });
}

/**
 * Creates a bookmark or folder under the specified parentId.
 * If url is `NULL` or missing, it will be a folder
 * @param {object} bookmark - `{title:string, url:string, parentId:string?, index:integer?}`
 * @param {function} done - callback function called with `done(errMsg, newBookmark)`
 */
export function create({ title, url, parentId = null, index = null }, done) {
  bookmarks.create({ title, url, parentId, index }, newBookmark => {
    if (!checkAndHandleError(done)) {
      done(null, newBookmark);
    }
  });
}

export function get(id, done) {
  bookmarks.get(id, results => {
    if (!checkAndHandleError(done)) {
      const node = results[0];
      done(null, node);
    }
  });
}

/**
 * Retrives the root node of the bookmarks
 * @param {function} done - callback function called with `done(errMsg, treeRoot)`
 */
export function getTreeRoot(done) {
  bookmarks.getTree(results => {
    if (!checkAndHandleError(done)) {
      const rootNode = results[0];
      done(null, rootNode);
    }
  });
}

/**
 * Retrieves the children of the specified BookmarkTreeNode `id`.
 * @param {string} id
 * @param {function} done - callback called with `done([bookmarks])`
 */
export function getChildren(id, done) {
  bookmarks.getChildren(id, results => {
    if (checkAndHandleError()) {
      done([]);
    } else {
      done(results);
    }
  });
}

/**
 * Searches for BookmarkTreeNodes matching the given query.
 * @param {string} query - string of words and quoted phrases that are matched against bookmark URLs and titles
 * @param {callback} done - callback function called with `done([bookmarks])`
 */
export function search(query, done) {
  bookmarks.search(query || {}, results => {
    if (checkAndHandleError()) {
      done([]);
    } else {
      done(results);
    }
  });
}
