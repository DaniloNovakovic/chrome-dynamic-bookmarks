import responseTypes from "shared/constants/responseTypes";
import { copyBookmarkNode } from "shared/lib/browser";

export default function copyBookmarkNodeHandler({ data }, sendResponse) {
  const { id, destination = {} } = data || {};
  copyBookmarkNode(id, destination, errMsg => {
    if (errMsg) {
      sendResponse({ type: responseTypes.ERROR, message: errMsg });
    } else {
      sendResponse({
        type: responseTypes.SUCCESS,
        message: `Successfully copied node '${id}'`
      });
    }
  });
}
