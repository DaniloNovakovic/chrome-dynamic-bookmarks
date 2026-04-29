import { BookmarkSchema } from "./BookmarkSchema";

describe("BookmarkSchema", () => {
  it("accepts valid bookmark payload", async () => {
    await expect(
      BookmarkSchema.validate({
        title: "Example",
        url: "https://example.com",
        regExp: "example\\.com",
      })
    ).resolves.toBeTruthy();
  });

  it("rejects malformed regexp", async () => {
    await expect(
      BookmarkSchema.validate({
        title: "Example",
        url: "https://example.com",
        regExp: "[",
      })
    ).rejects.toBeTruthy();
  });

  it("rejects invalid url", async () => {
    await expect(
      BookmarkSchema.validate({
        title: "Example",
        url: "example.com",
        regExp: "example",
      })
    ).rejects.toBeTruthy();
  });
});
