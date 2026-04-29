import responseTypes from "@/shared/constants/responseTypes";
import { copyBookmarkNode } from "@/shared/lib/browser";

function copyBookmarkNodeAsync(id, destination) {
  return new Promise(function (resolve, reject) {
    copyBookmarkNode(id, destination, function (err, data) {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

function copyBookmarkNodesAsync(ids = [], destination) {
  const promises = [];
  for (const id of ids) {
    promises.push(copyBookmarkNodeAsync(id, destination));
  }
  return Promise.all(promises);
}

export default function copyBookmarkNodeHandler({ data }, sendResponse) {
  if (!data || typeof data !== "object") {
    return sendResponse({
      type: responseTypes.ERROR,
      message: "Missing request data",
    });
  }

  let { id: ids } = data;
  const { destination = {} } = data;
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

  copyBookmarkNodesAsync(ids, destination)
    .then(() =>
      sendResponse({
        type: responseTypes.SUCCESS,
        message: `${ids.length} item(s) copied`,
      })
    )
    .catch((errMsg) =>
      sendResponse({ type: responseTypes.ERROR, message: errMsg })
    );
}
