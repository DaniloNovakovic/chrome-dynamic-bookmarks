import events from "shared/constants/events";

function onNodeMoved(state, { data = {} }) {
  const nodeId = data.id;
  if (!(nodeId in state.data)) {
    return state;
  }
  const node = state.data[nodeId];
  return {
    ...state,
    data: {
      ...state.data,
      [nodeId]: { ...node, parentId: data.parentId }
    }
  };
}

export default function registerEventHandlers(factory) {
  factory.register(events.BM_NODE_MOVED, onNodeMoved);
}
