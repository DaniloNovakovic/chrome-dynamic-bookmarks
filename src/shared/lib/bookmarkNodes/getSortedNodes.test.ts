import { NormalizedDynamicBookmark } from "@/shared/types";

import getSortedNodes from "./getSortedNodes";

describe("getSortedNodes", () => {
  it("sorts bookmark nodes", () => {
    const nodes: NormalizedDynamicBookmark[] = [
      { id: "0", title: "A", url: "https://mysite.com", syncing: false },
      { id: "1", title: "B", url: "https://mysite2.com", syncing: false },
      { id: "2", title: "A", children: [], syncing: false },
      { id: "3", title: "B", children: [], syncing: false },
    ];
    const expected: NormalizedDynamicBookmark[] = [
      { id: "2", title: "A", children: [], syncing: false },
      { id: "3", title: "B", children: [], syncing: false },
      { id: "0", title: "A", url: "https://mysite.com", syncing: false },
      { id: "1", title: "B", url: "https://mysite2.com", syncing: false },
    ];
    const actual = getSortedNodes(nodes);
    expect(actual).toEqual(expected);
  });
});
