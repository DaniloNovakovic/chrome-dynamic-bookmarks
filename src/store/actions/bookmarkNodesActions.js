import { getBookmarkNodes as _getBookmarkNodes } from "lib/browser/dynBookmarksFacade";

export const GET_BM_NODES_SUCCESS = "GET_BM_NODES_SUCCESS";
export const GET_BM_NODES_ERROR = "GET_BM_NODES_ERROR";

export function getBookmarkNodes() {
  return dispatch => {
    _getBookmarkNodes((errMsg, bookmarkNodes) => {
      if (errMsg) {
        dispatch({ type: GET_BM_NODES_ERROR, errMsg });
      } else {
        dispatch({ type: GET_BM_NODES_SUCCESS, bookmarkNodes });
      }
    });
  };
}

export const APPLY_FILTER = "APPLY_FILTER";

export function applyFilter(filter = {}) {
  return { type: APPLY_FILTER, filter };
}
