import mapArrayToObject from "./mapArrayToObject";

describe("mapArrayToObject", () => {
  it("maps array to object", () => {
    const array = ["1", "2", "3"];
    const value = true;
    const expected = { "1": value, "2": value, "3": value };
    const actual = mapArrayToObject(array, _ => value);
    expect(actual).toEqual(expected);
  });
});
