import createRouter, { RequestMessage, SendResponse } from "./createRouter";

describe("createRouter", () => {
  it("uses default error handler for unknown request types", () => {
    const router = createRouter();
    const sendResponse = jest.fn<void, Parameters<SendResponse>>();

    router.handleRequest({ type: "UNKNOWN", data: undefined }, sendResponse);

    expect(sendResponse).toHaveBeenCalledWith({
      type: "error",
      message: "Could not handle request of type UNKNOWN",
    });
  });

  it("invokes registered handler for known request type", () => {
    const router = createRouter();
    const sendResponse = jest.fn<void, Parameters<SendResponse>>();
    const request: RequestMessage<number> = { type: "PING", data: 1 };
    const customHandler = jest.fn((_request, respond: SendResponse) =>
      respond({ type: "success", message: "ok" })
    );
    router.registerHandler("PING", customHandler);

    router.handleRequest(request, sendResponse);

    expect(customHandler).toHaveBeenCalledWith(request, sendResponse);
    expect(sendResponse).toHaveBeenCalledWith({
      type: "success",
      message: "ok",
    });
  });
});
