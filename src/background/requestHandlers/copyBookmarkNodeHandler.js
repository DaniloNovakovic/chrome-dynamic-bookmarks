import responseTypes from "shared/constants/responseTypes";
import { copyBookmarkNode } from "shared/lib/browser";

function copyBookmarkNodeAsync(id, destination) {
  return new Promise(function(resolve, reject) {
    copyBookmarkNode(id, destination, function(err, data) {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

function copyBookmarkNodesAsync(ids = [], destination) {
  let promises = [];
  for (let id of ids) {
    promises.push(copyBookmarkNodeAsync(id, destination));
  }
  return Promise.all(promises);
}

export default function copyBookmarkNodeHandler({ data }, sendResponse) {
  let { id, destination = {} } = data || {};
  if (!Array.isArray(id)) {
    id = [id];
  }
  copyBookmarkNodesAsync(id, destination)
    .then(() =>
      sendResponse({
        type: responseTypes.SUCCESS,
        message: `${id.length} item(s) copied`
      })
    )
    .catch(errMsg =>
      sendResponse({ type: responseTypes.ERROR, message: errMsg })
    );
}
