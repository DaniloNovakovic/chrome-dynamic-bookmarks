export function getNode(state, nodeId, defaultValue = {}) {
  return nodeId in state.data ? state.data[nodeId] : defaultValue;
}
