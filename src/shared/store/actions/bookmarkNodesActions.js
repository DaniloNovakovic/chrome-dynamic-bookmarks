import actionTypes from "./actionTypes";
import { getBookmarkNodes as _getBookmarkNodes } from "shared/lib/browser/dynBookmarksFacade";

export function getBookmarkNodes() {
  return dispatch => {
    _getBookmarkNodes((errMsg, bookmarkNodes) => {
      if (errMsg) {
        dispatch({ type: actionTypes.GET_BM_NODES_ERROR, errMsg });
      } else {
        dispatch({ type: actionTypes.GET_BM_NODES_SUCCESS, bookmarkNodes });
      }
    });
  };
}

export function applyFilter(filter = {}) {
  return { type: actionTypes.APPLY_FILTER, filter };
}
