import getBreadcrumbs from "./getBreadcrumbs";

describe("getBreadcrumbs", () => {
  const nodes = {
    "0": {
      id: "0",
      children: ["1", "2"]
    },
    "1": {
      id: "1",
      parentId: "0"
    },
    "2": {
      id: "2",
      parentId: "0",
      children: ["3"]
    },
    "3": {
      id: "3",
      parentId: "2"
    }
  };
  it("returns valid breadcrumb", () => {
    const breadcrumbs = getBreadcrumbs(nodes, "3");
    expect(breadcrumbs).toEqual(["0", "2", "3"]);
  });
});
