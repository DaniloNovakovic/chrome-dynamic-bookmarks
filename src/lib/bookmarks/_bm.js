///<reference path="../../chrome.intellisense.js"/>
import { checkAndHandleError } from "../../utils/log";

export default {
  create,
  getTreeRoot
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
