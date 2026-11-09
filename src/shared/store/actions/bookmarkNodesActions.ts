import { Dispatch } from "redux";

import {
  actionTypes,
  clipboardTypes,
  eventTypes,
  requestTypes,
  responseTypes,
} from "@/shared/constants";
import { sendMessage } from "@/shared/lib/browser";
import { getBookmarkNodes as _getBookmarkNodes } from "@/shared/lib/browser/dynBookmarksFacade";
import {
  GenericObject,
  MessageResponse,
  NormalizedDynamicBookmark,
} from "@/shared/types";

export function getBookmarkNodes() {
  return (dispatch: Dispatch) => {
    _getBookmarkNodes((errMsg, bookmarkNodes) => {
      if (errMsg) {
        dispatch({ type: actionTypes.GET_BM_NODES_ERROR, errMsg });
      } else {
        dispatch({ type: actionTypes.GET_BM_NODES_SUCCESS, bookmarkNodes });
      }
    });
  };
}

export function addBookmarkNode(node: NormalizedDynamicBookmark) {
  return (dispatch: Dispatch) => {
    sendMessage(requestTypes.ADD_BM_NODE, node, (response) => {
      if (response.data) {
        dispatch({ type: eventTypes.BM_NODE_CREATED, data: response.data });
      }
      dispatch(mapResponseToAlertAction(response));
    });
  };
}

export function editBookmarkNode(node: NormalizedDynamicBookmark) {
  return (dispatch: Dispatch) => {
    sendMessage(requestTypes.EDIT_BM_NODE, node, (response) => {
      if (response.data) {
        dispatch({ type: eventTypes.BM_NODE_CHANGED, data: response.data });
      } else {
        dispatch(mapResponseToAlertAction(response));
      }
    });
  };
}

/**
 * @param id - single or list of ids for bookmark nodes to delete
 */
export function removeBookmarkNode(id: string | string[]) {
  return createSendMessageDispatch(requestTypes.REMOVE_BM_NODE, { id });
}

/**
 * @param id - single id or list of ids for bookmark nodes to move
 */
export function moveBookmarkNode(
  id: string | string[],
  destination: { parentId: string; index: number },
) {
  return createSendMessageDispatch(requestTypes.MOVE_BM_NODE, {
    id,
    destination,
  });
}

/**
 * @param id - single id or list of ids for bookmark nodes to copy
 */
export function copyBookmarkNode(
  id: string | string[],
  destination: { parentId: string; index: number },
) {
  return createSendMessageDispatch(requestTypes.COPY_BM_NODE, {
    id,
    destination,
  });
}

export function pasteToBookmarkNode({
  type,
  from,
  to,
}: {
  type: string;
  from: { nodeId?: string; id: string };
  to: { parentId: string; index: number };
}) {
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
 * @param requestType - type of the request message
 * @param data - parameters that will be sent in message
 */
function createSendMessageDispatch<T = GenericObject>(
  requestType: string,
  data: T,
) {
  return (dispatch: Dispatch) => {
    sendMessage(requestType, data, (response) => {
      dispatch(mapResponseToAlertAction(response));
    });
  };
}

function mapResponseToAlertAction({ type, message }: MessageResponse) {
  switch (type) {
    case responseTypes.SUCCESS:
      return { type: actionTypes.ALERT_SUCCESS, message };
    case responseTypes.ERROR:
      return { type: actionTypes.ALERT_ERROR, message };
    default:
      return { type: actionTypes.ALERT_CLEAR };
  }
}
