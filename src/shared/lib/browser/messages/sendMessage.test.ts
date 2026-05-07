import { beforeEach, describe, expect, it, vi } from "vitest";
const mockSendMessage = vi.fn();
const mockLogInfo = vi.fn();

vi.mock("../getCurrentBrowser", () => ({
  __esModule: true,
  default: () => ({
    runtime: {
      sendMessage: (...args: any[]) => mockSendMessage(...args),
    },
  }),
}));

vi.mock("../log", () => ({
  logInfo: (...args: any[]) => mockLogInfo(...args),
}));

import sendMessage from "./sendMessage";

describe("sendMessage", () => {
  beforeEach(() => {
    mockSendMessage.mockReset();
    mockLogInfo.mockReset();
  });

  it("sends request and passes successful response through", () => {
    const onResponse = vi.fn();
    mockSendMessage.mockImplementation((_req, done) =>
      done({ type: "success", message: "done" }),
    );

    sendMessage("TYPE_A", { a: 1 }, onResponse);

    expect(mockSendMessage).toHaveBeenCalledWith(
      { type: "TYPE_A", data: { a: 1 } },
      expect.any(Function),
    );
    expect(onResponse).toHaveBeenCalledWith({
      type: "success",
      message: "done",
    });
  });

  it("normalizes empty response into error with fallback message", () => {
    const onResponse = vi.fn();
    mockSendMessage.mockImplementation((_req, done) => done({}));

    sendMessage("TYPE_B", { b: 2 }, onResponse);

    expect(onResponse).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "error",
      }),
    );
  });
});
