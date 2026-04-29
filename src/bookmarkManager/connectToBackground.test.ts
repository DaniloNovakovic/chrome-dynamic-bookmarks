import type connectToBackgroundDefault from "./connectToBackground";

describe("connectToBackground", () => {
  let mockPostMessage: jest.Mock;
  let mockAddListener: jest.Mock;
  let mockConnect: jest.Mock;
  let connectToBackground: typeof connectToBackgroundDefault;

  beforeEach(() => {
    jest.resetModules();
    mockPostMessage = jest.fn();
    mockAddListener = jest.fn();
    mockConnect = jest.fn(() => ({
      postMessage: mockPostMessage,
      onMessage: {
        addListener: mockAddListener,
      },
    }));

    jest.doMock("@/shared/lib/browser", () => ({
      getCurrentBrowser: () => ({
        runtime: {
          connect: mockConnect,
        },
      }),
    }));

    connectToBackground = require("./connectToBackground").default;
  });

  it("connects to runtime and forwards messages via callback", () => {
    const onMessage = jest.fn();
    connectToBackground(onMessage);

    expect(mockConnect).toHaveBeenCalledWith({ name: "bookmarks" });
    expect(mockAddListener).toHaveBeenCalledTimes(1);

    const listener = mockAddListener.mock.calls[0][0];
    listener({ type: "BM_NODE_CREATED", data: { id: "1" } });

    expect(onMessage).toHaveBeenCalledWith(
      { type: "BM_NODE_CREATED", data: { id: "1" } },
      expect.any(Function)
    );

    const sendResponse = onMessage.mock.calls[0][1];
    sendResponse({ ok: true });
    expect(mockPostMessage).toHaveBeenCalledWith({ ok: true });
  });
});
