import removeProp from "./removeProp";

describe("removeProp", () => {
  it("returns object with `key` property removed", () => {
    const input = { x: 1, y: 2 };
    const output = removeProp(input, "x");
    expect(output).toEqual({ y: 2 });
  });
  it("does not mutate input object", () => {
    const input = { x: 1, y: 2 };
    removeProp(input, "x");
    expect(input).toEqual({ x: 1, y: 2 });
  });
});
