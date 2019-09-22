import filterNodes from "./filterNodes";

describe("filterNodes", () => {
  const nodes = {
    "0": {
      id: "0",
      parentId: null,
      title: "root",
      children: ["1"]
    },
    "1": {
      id: "1",
      parentId: "0",
      title: "child",
      children: ["2"]
    },
    "2": {
      id: "2",
      parentId: "1",
      title: "grandchild",
      url: "https://mysite.com",
      regExp: /https/
    }
  };
  it("filters nodes by parentId", () => {
    const expected = [nodes["1"]];
    const actual = filterNodes(nodes, { parentId: "0" });
    expect(actual).toEqual(expected);
  });
  it("search text filters node by title", () => {
    const expected = [nodes["2"]];
    const actual = filterNodes(nodes, { searchText: "grand" });
    expect(actual).toEqual(expected);
  });
  it("search text filters node by url", () => {
    const expected = [nodes["2"]];
    const actual = filterNodes(nodes, { searchText: "mysite" });
    expect(actual).toEqual(expected);
  });
});
