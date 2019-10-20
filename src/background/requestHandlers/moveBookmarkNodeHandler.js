import responseTypes from "shared/constants/responseTypes";
import { bm as bookmarks } from "shared/lib/browser/bookmarks";

export default function moveBookmarkNodeHandler({ data }, sendResponse) {
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
