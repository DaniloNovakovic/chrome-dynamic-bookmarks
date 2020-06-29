import { getNode } from "./getNode";

export function onNodeChanged(state, { data = {} }) {
  const nodeId = data.id;
  const node = getNode(state, nodeId);
  return {
    ...state,
    data: {
      ...state.data,
      [nodeId]: {
        ...node,
        ...data,
      },
    },
  };
}
