import responseTypes from "shared/constants/responseTypes";
import { bm as bookmarks } from "shared/lib/browser/bookmarks";

function isSameNode(id = "", { parentId = "" }) {
  return id === parentId;
}

function moveBookmarkNodeAsync(id, destination) {
  return new Promise(function(resolve, reject) {
    bookmarks.move(id, destination, function(err, data) {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

function moveBookmarkNodesAsync(ids = [], destination) {
  let promises = [];
  for (let id of ids) {
    promises.push(moveBookmarkNodeAsync(id, destination));
  }
  return Promise.all(promises);
}

export default function moveBookmarkNodeHandler({ data }, sendResponse) {
  let { id: ids, destination } = data;

  if (!Array.isArray(ids)) {
    ids = [ids];
  }

  if (ids.find(nodeId => isSameNode(nodeId, destination))) {
    return sendResponse({
      type: responseTypes.ERROR,
      message: "You cannot move node into itself"
    });
  }

  moveBookmarkNodesAsync(ids, destination)
    .then(() =>
      sendResponse({
        type: responseTypes.SUCCESS,
        message: `${ids.length} item(s) moved`
      })
    )
    .catch(errMsg =>
      sendResponse({ type: responseTypes.ERROR, message: errMsg })
    );
}
