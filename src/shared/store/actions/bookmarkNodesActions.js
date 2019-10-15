import { getBookmarkNodes as _getBookmarkNodes } from "shared/lib/browser/dynBookmarksFacade";
import { sendMessage } from "shared/lib/browser";
import { requestTypes, responseTypes, actionTypes } from "shared/constants";

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

function mapResponseToAlertAction({ type, message }) {
  switch (type) {
    case responseTypes.SUCCESS:
      return { type: actionTypes.ALERT_SUCCESS, message };
    case responseTypes.ERROR:
      return { type: actionTypes.ALERT_ERROR, message };
    default:
      return { type: actionTypes.ALERT_CLEAR };
  }
}

export function removeBookmarkNode(nodeId) {
  return dispatch => {
    sendMessage(requestTypes.REMOVE_BM_NODE, { id: nodeId }, response => {
      dispatch(mapResponseToAlertAction(response));
    });
  };
}

export function applyFilter(filter = {}) {
  return { type: actionTypes.APPLY_FILTER, filter };
}
