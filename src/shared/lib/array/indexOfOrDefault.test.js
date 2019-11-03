import indexOfOrDefault from "./indexOfOrDefault";

describe("indexOfOrDefault", () => {
  const array = [5, 6, 0];
  describe("when item exists", () => {
    it("returns index of item in array", () => {
      const index = indexOfOrDefault(array, 5, -1);
      expect(index).toBe(0);
    });
  });
  describe("when item does not exist", () => {
    it("returns provided default value", () => {
      const defaultValue = 0;
      const index = indexOfOrDefault(array, 9, defaultValue);
      expect(index).toBe(defaultValue);
    });
  });
});
