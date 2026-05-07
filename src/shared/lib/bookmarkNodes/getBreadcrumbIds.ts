import { NormalizedDynamicBookmark } from "@/shared/types";

export default function getBreadcrumbIds(
  nodes: Record<string, NormalizedDynamicBookmark> = {},
  id = "0",
): string[] {
  const breadcrumbs: string[] = [];
  let currId = id;
  while (currId) {
    breadcrumbs.push(currId);
    const currNode = nodes[currId];
    currId = currNode?.parentId || "";
  }
  return breadcrumbs.reverse();
}
