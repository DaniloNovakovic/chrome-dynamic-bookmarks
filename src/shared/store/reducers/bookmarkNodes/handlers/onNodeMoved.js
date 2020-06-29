import { getNode } from "./getNode";

export function onNodeMoved(state, { data = {} }) {
  const nodeId = data.id;
  const node = getNode(state, nodeId);
  let parents = {};
  if (node.parentId !== data.parentId) {
    const oldParent = getNode(state, node.parentId);
    const newParent = getNode(state, data.parentId);
    parents = {
      [oldParent.id]: {
        ...oldParent,
        children: oldParent.children.filter((childId) => childId !== nodeId),
      },
      [newParent.id]: {
        ...newParent,
        children: [...newParent.children, nodeId],
      },
    };
  }
  return {
    ...state,
    data: {
      ...state.data,
      ...parents,
      [nodeId]: { ...node, parentId: data.parentId },
    },
  };
}
