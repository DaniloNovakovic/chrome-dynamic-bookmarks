import { describe, expect, it } from "vitest";

import isObjectEmpty from "./isObjectEmpty";

describe("isObjectEmpty", () => {
  it("returns true when empty", () => {
    expect(isObjectEmpty({})).toBe(true);
    expect(isObjectEmpty(null)).toBe(true);
  });
  it("returns false when not empty", () => {
    expect(isObjectEmpty({ test: "value" })).toBe(false);
  });
});
