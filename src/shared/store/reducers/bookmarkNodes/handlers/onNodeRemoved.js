import { removeProp } from "shared/lib/objects";
import { getNode } from "./getNode";

export function onNodeRemoved(state, { data = {} }) {
  const nodeId = data.id;
  const node = getNode(state, nodeId, null);
  if (!node) {
    return state;
  }
  const parentNode = getNode(state, node.parentId);
  const newData = removeProp(state.data, nodeId);
  newData[parentNode.id] = {
    ...parentNode,
    children: parentNode.children.filter((childId) => childId !== nodeId),
  };
  return { ...state, data: newData };
}
