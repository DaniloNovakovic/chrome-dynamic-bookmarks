/// <reference types="jest" /
import combineProps from "./combineProps";

describe("combineProps", () => {
  it("combines properties", () => {
    const lhs = { A: { propA: "A1" }, B: { propB: "B" } };
    const rhs = { A: { propA2: "A2" }, C: { propC: "C" } };
    const combinedProps = combineProps(lhs, rhs);
    expect(combinedProps).toEqual({
      A: { propA: "A1", propA2: "A2" },
      B: { propB: "B" },
      C: { propC: "C" }
    });
  });
});
