import { checkAndHandleError } from "shared/lib/browser/log";
import getCurrentBrowser from "../getCurrentBrowser";

const browser = getCurrentBrowser();
const bookmarks = browser.bookmarks;

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
  removeTree
};

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

/**
 * Creates a bookmark or folder under the specified parentId.
 * If url is `NULL` or missing, it will be a folder
 * @returns {Promise} Promise object represents the newly created bookmark / folder
 */
export function createAsync(bookmarkNode) {
  return new Promise(function(resolve, reject) {
    create(bookmarkNode, function(err, data) {
      if (err) reject(err);
      else resolve(data);
    });
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
 * Retrieves part of the Bookmarks hierarchy, starting at the specified node.
 * @param {function} done - callback function called with `done(errMsg, subTreeRoot)`
 */
export function getSubTree(id, done) {
  bookmarks.getSubTree(id, results => {
    if (!checkAndHandleError(done)) {
      const rootNode = results[0];
      done(null, rootNode);
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

export function move(id, { parentId, index }, done) {
  bookmarks.move(id, { parentId, index }, result => {
    if (!checkAndHandleError(done)) {
      done(null, result);
    }
  });
}

export function update(id, { title, url }, done) {
  bookmarks.update(id, { title, url }, updatedNode => {
    if (!checkAndHandleError(done)) {
      done(null, updatedNode);
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

export function removeTree(id, done) {
  bookmarks.removeTree(id, () => {
    if (!checkAndHandleError(done)) {
      done(null);
    }
  });
}
