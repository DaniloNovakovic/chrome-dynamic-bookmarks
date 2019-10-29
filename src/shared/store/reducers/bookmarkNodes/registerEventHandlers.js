import events from "shared/constants/events";
import { removeProp } from "shared/lib/objects";
import { isFolder } from "shared/lib/bookmarkNodes";

function getNode(state, nodeId, defaultValue = {}) {
  return nodeId in state.data ? state.data[nodeId] : defaultValue;
}

function onNodeMoved(state, { data = {} }) {
  const nodeId = data.id;
  const node = getNode(state, nodeId);
  let parents = {};
  if (node.parentId !== data.parentId) {
    const oldParent = getNode(state, node.parentId);
    const newParent = getNode(state, data.parentId);
    parents = {
      [oldParent.id]: {
        ...oldParent,
        children: oldParent.children.filter(childId => childId !== nodeId)
      },
      [newParent.id]: {
        ...newParent,
        children: [...newParent.children, nodeId]
      }
    };
  }
  return {
    ...state,
    data: {
      ...state.data,
      ...parents,
      [nodeId]: { ...node, parentId: data.parentId }
    }
  };
}

function onNodeRemoved(state, { data = {} }) {
  const nodeId = data.id;
  const node = getNode(state, nodeId, null);
  if (!node) {
    return state;
  }
  const parentNode = getNode(state, node.parentId);
  const newData = removeProp(state.data, nodeId);
  newData[parentNode.id] = {
    ...parentNode,
    children: parentNode.children.filter(childId => childId !== nodeId)
  };
  return { ...state, data: newData };
}

function onNodeChanged(state, { data = {} }) {
  const nodeId = data.id;
  const node = getNode(state, nodeId);
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

function onNodeCreated(state, { data = {} }) {
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
        children: [...parent.children, nodeId]
      },
      [nodeId]: newNode
    }
  };
}

export default function registerEventHandlers(factory) {
  factory.register(events.BM_NODE_MOVED, onNodeMoved);
  factory.register(events.BM_NODE_REMOVED, onNodeRemoved);
  factory.register(events.BM_NODE_CHANGED, onNodeChanged);
  factory.register(events.BM_NODE_CREATED, onNodeCreated);
}
