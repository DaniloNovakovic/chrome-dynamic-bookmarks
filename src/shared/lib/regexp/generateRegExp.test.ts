import generateRegExp from "./generateRegExp";

describe("generateRegExp", () => {
  it("should generate regural expression that matches up to one depth less of relative path", () => {
    const depth0 = new RegExp(generateRegExp("example.com"));
    expect("example.com").toMatch(depth0);

    const depth1 = new RegExp(generateRegExp("example.com/path1"));
    expect("example.com").toMatch(depth1);
    expect("example.com/path1").toMatch(depth1);

    const depth2 = new RegExp(generateRegExp("example.com/path1/path2"));
    expect("example.com").not.toMatch(depth2);
    expect("example.com/path1").toMatch(depth2);
    expect("example.com/path1/path2").toMatch(depth2);

    const depth3 = new RegExp(generateRegExp("example.com/path1/path2/path3"));
    expect("example.com").not.toMatch(depth3);
    expect("example.com/path1").not.toMatch(depth3);
    expect("example.com/path1/path2").toMatch(depth3);
    expect("example.com/path1/path2/path3").toMatch(depth3);
  });

  it.each([
    ["example.com"],
    ["www.example.com"],
    ["https://www.example.com"],
    ["https://www.example.com?q=test12345"],
    ["https://www.example.com/test"],
    ["https://www.example.com/test/test2"],
    ["https://www.example.com/test/test2/test3?q=test12345"],
  ])(
    "should generate correct regural expression for non-YouTube playlist URL (input: %s)",
    (url) => {
      const result = generateRegExp(url);
      const expression = new RegExp(result);

      expect(url).toMatch(expression);
      expect(url + "/test").toMatch(expression);
      expect(url + "/test/test2").toMatch(expression);
      expect(url + "?q=abcdefg").toMatch(expression);

      expect("https://www.invalid.com").not.toMatch(expression);
      expect("https://invalid.com").not.toMatch(expression);
      expect("invalid.com").not.toMatch(expression);
      expect(".com").not.toMatch(expression);
    },
  );

  it("should correct regural expression for YouTube playlist URL", () => {
    const url = "https://www.youtube.com/watch?v=VIDEO_ID&list=PLAYLIST_ID";

    const result = generateRegExp(url);
    const expression = new RegExp(result);

    expect(url).toMatch(expression);
    expect("https://www.youtube.com/watch?v=abcd&list=PLAYLIST_ID").toMatch(
      expression,
    );
    expect("https://www.youtube.com/watch?v=abcdefg&list=PLAYLIST_ID").toMatch(
      expression,
    );
    expect("https://www.youtube.com/watch?v=abcdefg&list=abcdeffg").not.toMatch(
      expression,
    );
    expect("list=PLAYLIST_ID").not.toMatch(expression);
    expect(".com/list=PLAYLIST_ID").not.toMatch(expression);
  });
});
