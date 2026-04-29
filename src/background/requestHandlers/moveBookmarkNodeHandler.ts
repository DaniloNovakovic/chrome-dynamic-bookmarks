import responseTypes from "@/shared/constants/responseTypes";
import { bm as bookmarks } from "@/shared/lib/browser/bookmarks";

function isSameNode(id = "", { parentId = "" }) {
  return id === parentId;
}

function moveBookmarkNodeAsync(id, destination) {
  return new Promise(function (resolve, reject) {
    bookmarks.move(id, destination, function (err, data) {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

function moveBookmarkNodesAsync(ids = [], destination) {
  const promises = [];
  for (const id of ids) {
    promises.push(moveBookmarkNodeAsync(id, destination));
  }
  return Promise.all(promises);
}

export default function moveBookmarkNodeHandler({ data }, sendResponse) {
  if (!data || typeof data !== "object") {
    return sendResponse({
      type: responseTypes.ERROR,
      message: "Missing request data",
    });
  }

  let { id: ids } = data;
  const { destination } = data;

  if (!destination || typeof destination !== "object") {
    return sendResponse({
      type: responseTypes.ERROR,
      message: "Missing destination",
    });
  }

  if (
    destination.parentId === undefined ||
    destination.parentId === null ||
    destination.parentId === ""
  ) {
    return sendResponse({
      type: responseTypes.ERROR,
      message: "Missing destination.parentId",
    });
  }

  if (!Array.isArray(ids)) {
    ids = [ids];
  }
  ids = ids.filter((id) => id != null && id !== "");
  if (ids.length === 0) {
    return sendResponse({
      type: responseTypes.ERROR,
      message: "No bookmark id provided",
    });
  }

  if (ids.find((nodeId) => isSameNode(nodeId, destination))) {
    return sendResponse({
      type: responseTypes.ERROR,
      message: "You cannot move node into itself",
    });
  }

  moveBookmarkNodesAsync(ids, destination)
    .then(() =>
      sendResponse({
        type: responseTypes.SUCCESS,
        message: `${ids.length} item(s) moved`,
      })
    )
    .catch((errMsg) =>
      sendResponse({ type: responseTypes.ERROR, message: errMsg })
    );
}
