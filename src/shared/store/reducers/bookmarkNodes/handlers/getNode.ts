import { BookmarkNodesState, NormalizedDynamicBookmark } from "@/shared/types";

const emptyBookmark = {} as NormalizedDynamicBookmark;

export function getNode(
  state: BookmarkNodesState,
  nodeId: string,
  defaultValue: NormalizedDynamicBookmark = emptyBookmark,
): NormalizedDynamicBookmark {
  return nodeId in state.data ? state.data[nodeId] : defaultValue;
}
