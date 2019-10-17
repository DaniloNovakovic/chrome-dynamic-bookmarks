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

export function addBookmarkNode(node) {
  return createSendMessageDispatch(requestTypes.ADD_BM_NODE, node);
}

export function editBookmarkNode(node) {
  return createSendMessageDispatch(requestTypes.EDIT_BM_NODE, node);
}

export function removeBookmarkNode(nodeId) {
  return createSendMessageDispatch(requestTypes.REMOVE_BM_NODE, { id: nodeId });
}

/**
 * Sends message and dispatches response such as `ALERT.SUCCESS` or `ALERT.ERROR`
 * depending on if the operation was successful or not.
 * @param {string} requestType - type of the request message
 * @param {object} data - parameters that will be sent in message
 */
function createSendMessageDispatch(requestType, data) {
  return dispatch => {
    sendMessage(requestType, data, response => {
      dispatch(mapResponseToAlertAction(response));
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
