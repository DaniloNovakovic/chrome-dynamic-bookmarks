import type { Mock } from "vitest";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type connectToBackgroundDefault from "./connectToBackground";

describe("connectToBackground", () => {
  let mockPostMessage: Mock;
  let mockAddListener: Mock;
  let mockConnect: Mock;
  let connectToBackground: typeof connectToBackgroundDefault;

  beforeEach(async () => {
    vi.resetModules();
    mockPostMessage = vi.fn();
    mockAddListener = vi.fn();
    mockConnect = vi.fn(() => ({
      postMessage: mockPostMessage,
      onMessage: {
        addListener: mockAddListener,
      },
    }));

    vi.doMock("@/shared/lib/browser", () => ({
      getCurrentBrowser: () => ({
        runtime: {
          connect: mockConnect,
        },
      }),
    }));

    connectToBackground = (await import("./connectToBackground")).default;
  });

  it("connects to runtime and forwards messages via callback", () => {
    const onMessage = vi.fn();
    connectToBackground(onMessage);

    expect(mockConnect).toHaveBeenCalledWith({ name: "bookmarks" });
    expect(mockAddListener).toHaveBeenCalledTimes(1);

    const listener = mockAddListener.mock.calls[0][0];
    listener({ type: "BM_NODE_CREATED", data: { id: "1" } });

    expect(onMessage).toHaveBeenCalledWith(
      { type: "BM_NODE_CREATED", data: { id: "1" } },
      expect.any(Function),
    );

    const sendResponse = onMessage.mock.calls[0][1];
    sendResponse({ ok: true });
    expect(mockPostMessage).toHaveBeenCalledWith({ ok: true });
  });
});
