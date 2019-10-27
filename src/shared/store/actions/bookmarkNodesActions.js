import { getBookmarkNodes as _getBookmarkNodes } from "shared/lib/browser/dynBookmarksFacade";
import { sendMessage } from "shared/lib/browser";
import {
  requestTypes,
  responseTypes,
  actionTypes,
  clipboardTypes
} from "shared/constants";

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

/**
 * @param {String|Array<String>} id - single or list of ids for bookmark nodes to delete
 */
export function removeBookmarkNode(id) {
  return createSendMessageDispatch(requestTypes.REMOVE_BM_NODE, { id });
}

export function moveBookmarkNode(nodeId, destination) {
  return createSendMessageDispatch(requestTypes.MOVE_BM_NODE, {
    id: nodeId,
    destination
  });
}

/**
 * @param {String|Array<String>} id - single id or list of ids for bookmark nodes to copy
 * @param {{parentId:String, index:Number}} destination
 */
export function copyBookmarkNode(id, destination) {
  return createSendMessageDispatch(requestTypes.COPY_BM_NODE, {
    id,
    destination
  });
}

export function pasteToBookmarkNode({ type, from, to }) {
  const fromId = from.nodeId || from.id;

  if (type === clipboardTypes.COPIED) {
    return copyBookmarkNode(fromId, to);
  } else {
    return moveBookmarkNode(fromId, to);
  }
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
