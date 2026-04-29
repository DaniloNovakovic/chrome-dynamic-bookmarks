import { NormalizedDynamicBookmark } from "@/shared/types";

import getTrackedByIdNodes from "../getTrackedByIdNodes";

describe("getTrackedByIdNodes", () => {
  const nodes: Record<string, NormalizedDynamicBookmark> = {
    0: {
      id: "0",
      syncing: false,
      children: ["1", "2"],
    },
    1: {
      id: "1",
      url: "https://mylink.com",
      syncing: false,
      regExp: /myregexp/,
    },
    2: {
      id: "2",
      syncing: false,
      children: ["3"],
    },
    3: {
      id: "3",
      url: "https://mylink.com",
      syncing: false,
    },
  };
  it("returns object with tracked node ids as key", () => {
    const trackedById = getTrackedByIdNodes(nodes, "0");
    expect(Object.keys(trackedById)).toEqual(["0", "1"]);
  });
});
