import responseTypes from "shared/constants/responseTypes";
import { bm as bookmarks } from "shared/lib/browser";

function copyBookmarkNode(id, { parentId, index }, done) {
  bookmarks.getSubTree(id, (errMsg, node) => {
    if (errMsg) {
      done(errMsg);
    }
    bookmarks.create({ ...node, parentId, index }, done);
  });
}

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
