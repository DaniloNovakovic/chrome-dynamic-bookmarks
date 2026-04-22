import { onNodeRemoved } from "./onNodeRemoved";

describe("onNodeRemoved", () => {
  it("removes node and detaches it from parent children", () => {
    const state = {
      data: {
        parent: { id: "parent", children: ["nodeA", "nodeB"] },
        nodeA: { id: "nodeA", parentId: "parent", title: "A" },
        nodeB: { id: "nodeB", parentId: "parent", title: "B" },
      },
      isFaulted: false,
      errMsg: "",
    };

    const next = onNodeRemoved(
      state as any,
      {
        data: { id: "nodeA" },
      } as any
    );

    expect(next.data.nodeA).toBeUndefined();
    expect(next.data.parent.children).toEqual(["nodeB"]);
  });
});
