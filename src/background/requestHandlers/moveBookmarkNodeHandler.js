import responseTypes from "shared/constants/responseTypes";
import { bm as bookmarks } from "shared/lib/browser/bookmarks";

function isSameNode(id = "", { parentId = "" }) {
  return id === parentId;
}

export default function moveBookmarkNodeHandler({ data }, sendResponse) {
  if (isSameNode(data.id, data.destination)) {
    return sendResponse({
      type: responseTypes.ERROR,
      message: "You cannot move node into itself"
    });
  }
  bookmarks.move(data.id, data.destination, errMsg => {
    if (errMsg) {
      sendResponse({
        type: responseTypes.ERROR,
        message: errMsg
      });
    } else {
      sendResponse({
        type: responseTypes.SUCCESS,
        message: `Successfully moved node ${data.id}`
      });
    }
  });
}
