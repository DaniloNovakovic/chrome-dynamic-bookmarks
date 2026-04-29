import type { DynamicBookmarkStorageItem } from "@/shared/types";

describe("addTabsListeners integration", () => {
  function setup(dynBookmarks: Record<string, DynamicBookmarkStorageItem>) {
    const mockAddListener = jest.fn();
    const mockUpdate = jest.fn((_id, _changes, cb?: () => void) => cb && cb());
    const mockWarn = jest.fn();

    jest.doMock("@/shared/lib/browser", () => ({
      dbm: {
        findAll: (
          cb: (err: string | null, items: typeof dynBookmarks) => void
        ) => cb(null, dynBookmarks),
      },
      getCurrentBrowser: () => ({
        tabs: {
          onUpdated: {
            addListener: mockAddListener,
          },
        },
        bookmarks: {
          update: mockUpdate,
        },
        runtime: {
          lastError: null,
        },
      }),
      logInfo: jest.fn(),
      logWarn: mockWarn,
    }));

    const addTabsListeners = require("./addTabsListeners")
      .default as typeof import("./addTabsListeners").default;
    addTabsListeners();

    return {
      handler: mockAddListener.mock.calls[0][0],
      mockUpdate,
      mockWarn,
    };
  }

  beforeEach(() => {
    jest.resetModules();
  });

  it("updates bookmark when URL matches tracked regex", () => {
    const { handler, mockUpdate } = setup({
      "tracked-id": { regExp: "example\\.com/path" },
    });

    handler(1, { url: "https://example.com/path/123" });

    expect(mockUpdate).toHaveBeenCalledWith(
      "tracked-id",
      { url: "https://example.com/path/123" },
      expect.any(Function)
    );
  });

  it("does not update bookmark when URL does not match", () => {
    const { handler, mockUpdate } = setup({
      "tracked-id": { regExp: "example\\.org/path" },
    });

    handler(1, { url: "https://example.com/path/123" });

    expect(mockUpdate).not.toHaveBeenCalled();
  });

  it("skips invalid regex entries while updating valid ones", () => {
    const { handler, mockUpdate, mockWarn } = setup({
      broken: { regExp: "[" },
      valid: { regExp: "example\\.com/path" },
    });

    handler(1, { url: "https://example.com/path/123" });

    expect(mockWarn).toHaveBeenCalledWith(
      "regExp: [ from dynBookmarks.id of broken is invalid..."
    );
    expect(mockUpdate).toHaveBeenCalledWith(
      "valid",
      { url: "https://example.com/path/123" },
      expect.any(Function)
    );
  });
});
