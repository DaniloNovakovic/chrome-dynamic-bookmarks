import { getCurrentBrowser, logWarn, logInfo, dbm } from "shared/lib/browser";
import events, { BM_NODE_CHANGED } from "shared/constants/events";

const browser = getCurrentBrowser();

export default function addBookmarkListeners(callback = () => {}) {
  browser.bookmarks.onCreated.addListener((id, node) => {
    callback({ type: events.BM_NODE_CREATED, data: { ...node, id } });
  });

  browser.bookmarks.onMoved.addListener((id, { parentId, oldParentId }) => {
    callback({
      type: events.BM_NODE_MOVED,
      data: { id, parentId, oldParentId }
    });
  });

  browser.bookmarks.onRemoved.addListener(id => {
    dbm.findByIdAndRemove(id, err => {
      if (err) {
        logWarn(err);
      } else {
        callback({ type: events.BM_NODE_REMOVED, data: { id } });
      }
    });
  });

  browser.bookmarks.onChanged.addListener((id, { title, url }) => {
    if (url) {
      dbm.findById(id, (err, item) => {
        if (err) return logWarn(err);
        if (!item) {
          return callback({ type: BM_NODE_CHANGED, data: { id, title, url } });
        }
        handleUrlChange(item, url);
        dbm.findByIdAndUpdate(id, item, (errMsg, updatedItem) => {
          if (errMsg) return logWarn(errMsg);
          callback({
            type: BM_NODE_CHANGED,
            data: { id, title, url, ...updatedItem }
          });
        });
      });
    } else {
      callback({ type: BM_NODE_CHANGED, data: { id, title } });
    }
  });

  /**
   * Adds the `newUrl` to the beginning of the `history` array property from `item`.
   * If the length surpasses `maxHistorySize` then last item will be removed from the array.
   * @param {{history: string[]}} item
   * @param {string} newUrl
   * @param {number} maxHistorySize
   */
  function handleUrlChange(item, newUrl, maxHistorySize = 10) {
    if (item.history.length >= maxHistorySize) {
      item.history.pop();
    }
    item.history.unshift(newUrl);
  }
}
