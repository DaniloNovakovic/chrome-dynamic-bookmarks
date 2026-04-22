const mockSendMessage = jest.fn();
const mockLogInfo = jest.fn();

jest.mock("../getCurrentBrowser", () => ({
  __esModule: true,
  default: () => ({
    runtime: {
      sendMessage: (...args: any[]) => mockSendMessage(...args),
    },
  }),
}));

jest.mock("../log", () => ({
  logInfo: (...args: any[]) => mockLogInfo(...args),
}));

import sendMessage from "./sendMessage";

describe("sendMessage", () => {
  beforeEach(() => {
    mockSendMessage.mockReset();
    mockLogInfo.mockReset();
  });

  it("sends request and passes successful response through", () => {
    const onResponse = jest.fn();
    mockSendMessage.mockImplementation((_req, done) =>
      done({ type: "success", message: "done" })
    );

    sendMessage("TYPE_A", { a: 1 }, onResponse);

    expect(mockSendMessage).toHaveBeenCalledWith(
      { type: "TYPE_A", data: { a: 1 } },
      expect.any(Function)
    );
    expect(onResponse).toHaveBeenCalledWith({
      type: "success",
      message: "done",
    });
  });

  it("normalizes empty response into error with fallback message", () => {
    const onResponse = jest.fn();
    mockSendMessage.mockImplementation((_req, done) => done({}));

    sendMessage("TYPE_B", { b: 2 }, onResponse);

    expect(onResponse).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "error",
      })
    );
  });
});
