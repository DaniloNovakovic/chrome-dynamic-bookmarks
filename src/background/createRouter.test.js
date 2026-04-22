import createRouter from "./createRouter";

describe("createRouter", () => {
  it("uses default error handler for unknown request types", () => {
    const router = createRouter();
    const sendResponse = jest.fn();

    router.handleRequest({ type: "UNKNOWN" }, sendResponse);

    expect(sendResponse).toHaveBeenCalledWith({
      type: "error",
      message: "Could not handle request of type UNKNOWN",
    });
  });

  it("invokes registered handler for known request type", () => {
    const router = createRouter();
    const sendResponse = jest.fn();
    const customHandler = jest.fn((_request, respond) =>
      respond({ type: "success", message: "ok" })
    );
    router.registerHandler("PING", customHandler);

    router.handleRequest({ type: "PING", data: 1 }, sendResponse);

    expect(customHandler).toHaveBeenCalledWith(
      { type: "PING", data: 1 },
      sendResponse
    );
    expect(sendResponse).toHaveBeenCalledWith({
      type: "success",
      message: "ok",
    });
  });
});
