import { onNodeCreated } from "./onNodeCreated";

describe("onNodeCreated", () => {
  const baseState = {
    data: {
      "1": { id: "1", parentId: "0", title: "Parent", children: [] },
    },
    isFaulted: false,
    errMsg: "",
  };

  it("adds new bookmark to parent children", () => {
    const next = onNodeCreated(
      baseState as any,
      {
        data: { id: "2", parentId: "1", title: "Child", url: "https://x.dev" },
      } as any
    );

    expect(next.data["1"].children).toEqual(["2"]);
    expect(next.data["2"]).toMatchObject({ id: "2", title: "Child" });
  });

  it("initializes folder children when not provided", () => {
    const next = onNodeCreated(
      baseState as any,
      {
        data: { id: "3", parentId: "1", title: "Folder" },
      } as any
    );

    expect(next.data["3"]).toMatchObject({ id: "3", children: [] });
  });
});
