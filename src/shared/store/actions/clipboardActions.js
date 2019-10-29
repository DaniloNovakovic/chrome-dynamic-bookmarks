import { actionTypes } from "shared/constants";

export function copyToClipboard(data) {
  return {
    type: actionTypes.COPY_TO_CLIPBOARD,
    data
  };
}

export function cutToClipboard(data) {
  return {
    type: actionTypes.CUT_TO_CLIPBOARD,
    data
  };
}
