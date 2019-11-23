import getTrackedByIdNodes from "./getTrackedByIdNodes";

describe("getTrackedByIdNodes", () => {
  const nodes = {
    "0": {
      id: "0",
      children: ["1", "2"]
    },
    "1": {
      id: "1",
      url: "https://mylink.com",
      regExp: /myregexp/
    },
    "2": {
      id: "2",
      children: ["3"]
    },
    "3": {
      id: "3",
      url: "https://mylink.com"
    }
  };
  it("returns object with tracked node ids as key", () => {
    const trackedById = getTrackedByIdNodes(nodes, "0");
    expect(Object.keys(trackedById)).toEqual(["0", "1"]);
  });
});
