import responseTypes from "shared/constants/responseTypes";
import { removeBookmarkNode } from "shared/lib/browser";

export default function removeBookmarkNodeHandler({ data }, sendResponse) {
  removeBookmarkNode(data.id, errMsg => {
    if (errMsg) {
      sendResponse({
        type: responseTypes.ERROR,
        message: errMsg
      });
    } else {
      sendResponse({
        type: responseTypes.SUCCESS,
        message: `Successfully deleted bookmark ${data.id}`
      });
    }
  });
}
