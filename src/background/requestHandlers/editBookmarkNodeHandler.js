import responseTypes from "shared/constants/responseTypes";
import { editBookmarkNode } from "shared/lib/browser";

export default function editBookmarkNodeHandler({ data }, sendResponse) {
  editBookmarkNode(data, (errMsg, updatedNode) => {
    if (errMsg) {
      sendResponse({ type: responseTypes.ERROR, message: errMsg });
    } else {
      sendResponse({
        type: responseTypes.SUCCESS,
        message: `Successfully updated bookmark node ${updatedNode.id}`,
        data: updatedNode,
      });
    }
  });
}
