/// <reference types="jest" /
import { combineCommonProperties } from "./combineCommonProperties";

describe("combineCommonProperties", () => {
  it("combines common properties", () => {
    const lhs = { A: { propA: "A1" }, B: { propB: "B" } };
    const rhs = { A: { propA2: "A2" }, C: { propC: "C" } };
    const combinedCommonProps = combineCommonProperties(lhs, rhs);
    expect(combinedCommonProps).toEqual({ A: { propA: "A1", propA2: "A2" } });
  });
});
