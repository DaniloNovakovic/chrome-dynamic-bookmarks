import { BrowserBookmark, NormalizedBrowserBookmark } from "@/shared/types";

import normalizeBookmarkTree from "./normalizeBookmarkTree";

describe("normalizeBookmarkTree", () => {
  it("normalizes bookmark tree", () => {
    const treeRoot: BrowserBookmark = {
      id: "0",
      title: "",
      syncing: false,
      children: [
        {
          children: [],
          id: "1",
          parentId: "0",
          title: "Folder",
          syncing: false,
        },
        {
          id: "2",
          parentId: "0",
          url: "https://mysite.com",
          title: "Bookmark",
          syncing: false,
        },
      ],
    };

    const expected: Record<string, NormalizedBrowserBookmark> = {
      0: {
        id: "0",
        title: "",
        syncing: false,
        children: ["1", "2"],
      },
      1: {
        id: "1",
        parentId: "0",
        title: "Folder",
        syncing: false,
        children: [],
      },
      2: {
        id: "2",
        parentId: "0",
        title: "Bookmark",
        url: "https://mysite.com",
        syncing: false,
      },
    };

    const actual = normalizeBookmarkTree(treeRoot);
    expect(actual).toEqual(expected);
  });
});
