import { bm as bookmarks } from "./bookmarks";
import { dbm as storage } from "./storage";
import normalizeBookmarkTree from "./normalizeBookmarkTree";
import { combineCommonProperties } from "../utils/combineCommonProperties";

export function createTrackedBookmark({ title, url, regExp }, done) {
  bookmarks.create({ title, url }, (errMsg, newBookmark) => {
    if (errMsg) {
      return done(errMsg);
    }
    storage.create({ id: newBookmark.id, regExp, history: [] }, done);
  });
}

/**
 * Retrieves list of all bookmark nodes (bookmarks and folders) normalized in form `{<id>:{id,parentId,title, url?, children?: [<id>], regExp?}}`
 * @param {function} done - function called with `done(errMsg, bookmarkNodes: {<id>:bookmarkNode})`
 */
export function getBookmarkNodes(done) {
  _getNormalizedBookmarkTree((errMsg, normalizedTree = {}) => {
    if (errMsg) {
      return done(errMsg);
    }
    _combineWithTrackedBookmarks(normalizedTree, done);
  });
}

/**
 * Returns normalized version of bookmark tree
 * @param {function} done - `done(errMsg, normalizedBookmarks: {<id>:bookmarkNode})`
 */
function _getNormalizedBookmarkTree(done) {
  bookmarks.getTreeRoot((errMsg, treeRoot) => {
    if (errMsg) {
      return done(errMsg);
    }
    const normalized = normalizeBookmarkTree(treeRoot);
    done(null, normalized);
  });
}

function _combineWithTrackedBookmarks(normalizedTree, done) {
  storage.findAll((errMsg, trackedBookmarks) => {
    if (errMsg) {
      return done(errMsg);
    }
    const combined = combineCommonProperties(normalizedTree, trackedBookmarks);
    done(null, combined);
  });
}
