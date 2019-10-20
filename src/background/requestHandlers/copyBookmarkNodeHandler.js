import responseTypes from "shared/constants/responseTypes";

export default function copyBookmarkNodeHandler({ data }, sendResponse) {
  sendResponse({
    type: responseTypes.ERROR,
    message: "Operation is not yet supported"
  });
}
