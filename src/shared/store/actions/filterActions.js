import { actionTypes } from "shared/constants";

export function applyFilter(filter = {}) {
  return { type: actionTypes.APPLY_FILTER, filter };
}
