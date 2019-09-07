///<reference path="../../chrome.intellisense.js"/>
import { checkAndHandleError } from "../../utils/log";

export default {
  create,
  getTreeRoot,
  getChildren,
  search
};

const bookmarks = chrome.bookmarks;

/**
 * Creates a bookmark or folder under the specified parentId.
 * If url is `NULL` or missing, it will be a folder
 * @param {object} bookmark - `{parentId:string?, index:integer?, title:string?, url:string?}`
 * @param {function} done - callback function called with `done(errMsg, newBookmark)`
 */
function create(bookmark, done) {
  bookmarks.create(bookmark, newBookmark => {
    if (!checkAndHandleError(done)) {
      done(null, newBookmark);
    }
  });
}

/**
 * Retrives the root node of the bookmarks
 * @param {function} done - callback function called with `done(errMsg, treeRoot)`
 */
function getTreeRoot(done) {
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
function getChildren(id, done) {
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
function search(query, done) {
  bookmarks.search(query || {}, results => {
    if (checkAndHandleError()) {
      done([]);
    } else {
      done(results);
    }
  });
}
