import responseTypes from "@/shared/constants/responseTypes";
import { removeBookmarkNode } from "@/shared/lib/browser";

function removeBookmarkNodeAsync(id) {
  return new Promise(function (resolve, reject) {
    removeBookmarkNode(id, function (err, data) {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

function removeBookmarkNodesAsync(ids = []) {
  let promises = [];
  for (let id of ids) {
    promises.push(removeBookmarkNodeAsync(id));
  }
  return Promise.all(promises);
}

export default function removeBookmarkNodesHandler({ data }, sendResponse) {
  if (!data || typeof data !== "object") {
    return sendResponse({
      type: responseTypes.ERROR,
      message: "Missing request data",
    });
  }

  let { id: ids } = data;
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
  removeBookmarkNodesAsync(ids)
    .then(() =>
      sendResponse({
        type: responseTypes.SUCCESS,
        message: `${ids.length} item(s) deleted`,
      })
    )
    .catch((errMsg) =>
      sendResponse({
        type: responseTypes.ERROR,
        message: errMsg,
      })
    );
}
