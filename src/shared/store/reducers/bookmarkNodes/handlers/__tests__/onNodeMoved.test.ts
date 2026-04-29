import { onNodeMoved } from "../onNodeMoved";

describe("onNodeMoved", () => {
  it("moves node between parents and updates parent lists", () => {
    const state = {
      data: {
        oldParent: { id: "oldParent", children: ["nodeA"] },
        newParent: { id: "newParent", children: [] },
        nodeA: { id: "nodeA", parentId: "oldParent", title: "A" },
      },
      isFaulted: false,
      errMsg: "",
    };

    const next = onNodeMoved(
      state as any,
      {
        data: { id: "nodeA", parentId: "newParent" },
      } as any
    );

    expect(next.data.oldParent.children).toEqual([]);
    expect(next.data.newParent.children).toEqual(["nodeA"]);
    expect(next.data.nodeA.parentId).toBe("newParent");
  });
});
