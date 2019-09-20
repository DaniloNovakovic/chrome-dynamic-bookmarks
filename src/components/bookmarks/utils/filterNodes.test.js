import filterNodes from "./filterNodes";

describe("filterNodes", () => {
  const nodes = {
    "0": {
      id: "0",
      parentId: null,
      title: "root"
    },
    "1": {
      id: "1",
      parentId: "0",
      title: "child"
    },
    "2": {
      id: "2",
      parentId: "1",
      title: "grandchild"
    }
  };
  it("filters nodes by parentId", () => {
    const expected = [nodes["1"]];
    const actual = filterNodes(nodes, { parentId: "0" });
    expect(actual).toEqual(expected);
  });
});
