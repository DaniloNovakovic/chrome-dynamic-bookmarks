import responseTypes from "shared/constants/responseTypes";
import { createTrackedBookmark } from "shared/lib/browser";

export default function addBookmarkNodeHandler({ data }, sendResponse) {
  console.log(data);
  console.log(sendResponse);
  createTrackedBookmark(data, (errMsg, { id = "" }) => {
    if (errMsg) {
      sendResponse({ type: responseTypes.ERROR, message: errMsg });
    } else {
      sendResponse({
        type: responseTypes.SUCCESS,
        message: `Successfully created bookmark node ${id}`
      });
    }
  });
}
