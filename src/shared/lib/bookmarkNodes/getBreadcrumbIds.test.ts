import getBreadcrumbIds from "./getBreadcrumbIds";

describe("getBreadcrumbs", () => {
  const nodes = {
    0: {
      id: "0",
      syncing: false,
      children: ["1", "2"],
    },
    1: {
      id: "1",
      parentId: "0",
      syncing: false,
    },
    2: {
      id: "2",
      parentId: "0",
      syncing: false,
      children: ["3"],
    },
    3: {
      id: "3",
      parentId: "2",
      syncing: false,
    },
  };
  it("returns valid breadcrumb", () => {
    const breadcrumbs = getBreadcrumbIds(nodes, "3");
    expect(breadcrumbs).toEqual(["0", "2", "3"]);
  });
});
