import { bm as bookmarks } from "./bookmarks";
import { dbm as storage } from "./storage";
import normalizeBookmarkTree from "./normalizeBookmarkTree";
import { combineProps } from "shared/lib/objects";

export function editBookmarkNode(node, done) {
  bookmarks.update(node.id, node, (errMsg, updatedNode) => {
    if (errMsg) {
      return done(errMsg);
    }
    if (!updatedNode.url) {
      return done(null, updatedNode);
    }
    if (updatedNode.regExp) {
      storage.findByIdAndUpdate(node.id, node, (errMsg, updatedDynBookItem) => {
        if (errMsg) {
          return done(errMsg);
        }
        done(null, { ...updatedNode, ...updatedDynBookItem });
      });
    } else {
      storage.findByIdAndRemove(node.id, errMsg => {
        if (errMsg) {
          return done(errMsg);
        }
        done(null, updatedNode);
      });
    }
  });
}

export function createBookmarkNode(node, done) {
  bookmarks.create(node, (errMsg, createdNode) => {
    if (errMsg) {
      return done(errMsg);
    }
    if (node.regExp) {
      storage.create(
        { id: createdNode.id, regExp: node.regExp, history: [] },
        done
      );
    }
    done(null, createdNode);
  });
}

export function removeBookmarkNode(id, done) {
  bookmarks.get(id, (errMsg, node) => {
    if (errMsg) {
      return done(errMsg);
    }
    if (!node) {
      return done(null);
    }
    if (!node.url) {
      bookmarks.removeTree(id, done);
    } else {
      bookmarks.remove(id, errMsg => {
        if (errMsg) {
          return done(errMsg);
        }
        storage.findByIdAndRemove(id, done);
      });
    }
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
    const combined = combineProps(normalizedTree, trackedBookmarks);
    done(null, combined);
  });
}
