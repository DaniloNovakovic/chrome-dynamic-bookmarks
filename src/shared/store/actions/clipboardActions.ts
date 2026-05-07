import { actionTypes } from "@/shared/constants";
import { ClipboardAction } from "@/shared/types";

export function copyToClipboard(
  data: ClipboardAction["data"],
): ClipboardAction {
  return {
    type: actionTypes.COPY_TO_CLIPBOARD,
    data,
  };
}

export function cutToClipboard(data: ClipboardAction["data"]): ClipboardAction {
  return {
    type: actionTypes.CUT_TO_CLIPBOARD,
    data,
  };
}
