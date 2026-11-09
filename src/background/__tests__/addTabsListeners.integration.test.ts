import { beforeEach, describe, expect, it, vi } from "vitest";

import type { DynamicBookmarkStorageItem } from "@/shared/types";

describe("addTabsListeners integration", () => {
  async function setup(
    dynBookmarks: Record<string, DynamicBookmarkStorageItem>,
  ) {
    const mockAddListener = vi.fn();
    const mockUpdate = vi.fn((_id, _changes, cb?: () => void) => cb && cb());
    const mockWarn = vi.fn();

    vi.doMock("@/shared/lib/browser", () => ({
      dbm: {
        findAll: (
          cb: (err: string | null, items: typeof dynBookmarks) => void,
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
      logInfo: vi.fn(),
      logWarn: mockWarn,
    }));

    const addTabsListeners = (await import("../addTabsListeners")).default;
    addTabsListeners();

    return {
      handler: mockAddListener.mock.calls[0][0],
      mockUpdate,
      mockWarn,
    };
  }

  beforeEach(() => {
    vi.resetModules();
  });

  it("updates bookmark when URL matches tracked regex", async () => {
    const { handler, mockUpdate } = await setup({
      "tracked-id": { regExp: "example\\.com/path" },
    });

    handler(1, { url: "https://example.com/path/123" });

    expect(mockUpdate).toHaveBeenCalledWith(
      "tracked-id",
      { url: "https://example.com/path/123" },
      expect.any(Function),
    );
  });

  it("does not update bookmark when URL does not match", async () => {
    const { handler, mockUpdate } = await setup({
      "tracked-id": { regExp: "example\\.org/path" },
    });

    handler(1, { url: "https://example.com/path/123" });

    expect(mockUpdate).not.toHaveBeenCalled();
  });

  it("skips invalid regex entries while updating valid ones", async () => {
    const { handler, mockUpdate, mockWarn } = await setup({
      broken: { regExp: "[" },
      valid: { regExp: "example\\.com/path" },
    });

    handler(1, { url: "https://example.com/path/123" });

    expect(mockWarn).toHaveBeenCalledWith(
      "regExp: [ from dynBookmarks.id of broken is invalid...",
    );
    expect(mockUpdate).toHaveBeenCalledWith(
      "valid",
      { url: "https://example.com/path/123" },
      expect.any(Function),
    );
  });
});
