import { getBookmarkNodes as _getBookmarkNodes } from "lib/dynBookmarksFacade";

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
