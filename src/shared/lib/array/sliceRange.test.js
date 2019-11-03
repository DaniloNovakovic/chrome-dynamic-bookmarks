import sliceRange from "./sliceRange";

describe("sliceRange", () => {
  const array = [0, 1, 2, 3, 4, 5];
  describe("when fromIndex < toIndex", () => {
    it("returns sub-array in range [fromIndex,toIndex]", () => {
      const subArray = sliceRange(array, 0, 3);
      expect(subArray).toEqual([0, 1, 2, 3]);
    });
  });
  describe("when fromIndex == toIndex", () => {
    it("returns array with single element located at fromIndex", () => {
      const subArray = sliceRange(array, 2, 2);
      expect(subArray).toEqual([2]);
    });
  });
  describe("when fromIndex > toIndex", () => {
    it("returns sub-array in range [toIndex, fromIndex]", () => {
      const subArray = sliceRange(array, 3, 0);
      expect(subArray).toEqual([0, 1, 2, 3]);
    });
  });
});
