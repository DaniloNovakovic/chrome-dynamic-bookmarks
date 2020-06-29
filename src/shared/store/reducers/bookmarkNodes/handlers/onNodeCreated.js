import { isFolder } from "shared/lib/bookmarkNodes";
import { onNodeChanged } from "./onNodeChanged";
import { getNode } from "./getNode";

export function onNodeCreated(state, { data = {} }) {
  const nodeId = data.id;
  if (nodeId in state.data) {
    return onNodeChanged(state, { data });
  }
  let newNode = { ...data };
  if (isFolder(newNode) && !newNode.children) {
    newNode.children = [];
  }
  const parent = getNode(state, data.parentId);
  return {
    ...state,
    data: {
      ...state.data,
      [parent.id]: {
        ...parent,
        children: [...parent.children, nodeId],
      },
      [nodeId]: newNode,
    },
  };
}
