import events from "shared/constants/events";
import { removeProp } from "shared/lib/objects";

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

function onNodeRemoved(state, { data = {} }) {
  const nodeId = data.id;
  if (!(nodeId in state.data)) {
    return state;
  }
  const node = state.data[nodeId];
  const parentNode = state.data[node.parentId];
  const newData = removeProp(state.data, nodeId);
  newData[parentNode.id] = {
    ...parentNode,
    children: parentNode.children.filter(childId => childId !== nodeId)
  };
  return { ...state, data: newData };
}

function onNodeChanged(state, { data = {} }) {
  const nodeId = data.id;
  if (!(nodeId in state.data)) {
    return state;
  }
  const node = state.data[nodeId];
  return {
    ...state,
    data: {
      ...state.data,
      [nodeId]: {
        ...node,
        ...data
      }
    }
  };
}

export default function registerEventHandlers(factory) {
  factory.register(events.BM_NODE_MOVED, onNodeMoved);
  factory.register(events.BM_NODE_REMOVED, onNodeRemoved);
  factory.register(events.BM_NODE_CHANGED, onNodeChanged);
}
