import { NormalizedDynamicBookmark } from "@/shared/types";

export function isFile(node: Pick<NormalizedDynamicBookmark, "url">) {
  return !!node?.url;
}

export function isFolder(node: Pick<NormalizedDynamicBookmark, "url">) {
  return !node?.url;
}

export function isRoot(node: Pick<NormalizedDynamicBookmark, "id">) {
  return node?.id == "0";
}

export function isTracked(node: Pick<NormalizedDynamicBookmark, "regExp">) {
  return !!node?.regExp;
}

export function isOnlyOneFile(
  lhs: Pick<NormalizedDynamicBookmark, "url">,
  rhs: Pick<NormalizedDynamicBookmark, "url">,
) {
  return isFile(lhs) !== isFile(rhs);
}
