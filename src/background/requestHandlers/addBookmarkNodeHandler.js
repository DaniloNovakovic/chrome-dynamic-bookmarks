import responseTypes from "shared/constants/responseTypes";
import { createBookmarkNode } from "shared/lib/browser";

export default function addBookmarkNodeHandler({ data }, sendResponse) {
  createBookmarkNode(data, (errMsg, createdNode) => {
    if (errMsg) {
      sendResponse({ type: responseTypes.ERROR, message: errMsg });
    } else {
      sendResponse({
        type: responseTypes.SUCCESS,
        message: `Successfully created bookmark node ${createdNode.id}`,
        data: createdNode
      });
    }
  });
}
