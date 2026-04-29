const mockCopyBookmarkNode = jest.fn();

jest.mock("@/shared/lib/browser", () => ({
  copyBookmarkNode: (...args: unknown[]) => mockCopyBookmarkNode(...args),
}));

import copyBookmarkNodeHandler from "./copyBookmarkNodeHandler";

function flushAsync() {
  return new Promise((resolve) => setImmediate(resolve));
}

describe("copyBookmarkNodeHandler", () => {
  beforeEach(() => {
    mockCopyBookmarkNode.mockReset();
  });

  it("copies nodes and returns success response", async () => {
    const sendResponse = jest.fn();
    mockCopyBookmarkNode.mockImplementation((_id, _destination, done) =>
      done(null, { ok: true })
    );

    copyBookmarkNodeHandler(
      {
        data: {
          id: ["1", "2"],
          destination: { parentId: "dest", index: 3 },
        },
      },
      sendResponse
    );

    await flushAsync();
    expect(mockCopyBookmarkNode).toHaveBeenCalledTimes(2);
    expect(sendResponse).toHaveBeenCalledWith({
      type: "success",
      message: "2 item(s) copied",
    });
  });

  it("returns error when data is missing without calling copyBookmarkNode", async () => {
    const sendResponse = jest.fn();
    copyBookmarkNodeHandler({ data: undefined }, sendResponse);
    await flushAsync();
    expect(sendResponse).toHaveBeenCalledWith({
      type: "error",
      message: "Missing request data",
    });
    expect(mockCopyBookmarkNode).not.toHaveBeenCalled();
  });

  it("returns error when no valid bookmark ids", async () => {
    const sendResponse = jest.fn();
    copyBookmarkNodeHandler(
      {
        data: {
          id: "",
          destination: { parentId: "1", index: 0 },
        },
      },
      sendResponse
    );
    await flushAsync();
    expect(sendResponse).toHaveBeenCalledWith({
      type: "error",
      message: "No bookmark id provided",
    });
    expect(mockCopyBookmarkNode).not.toHaveBeenCalled();
  });

  it("returns error when destination.parentId is missing", async () => {
    const sendResponse = jest.fn();
    copyBookmarkNodeHandler(
      {
        data: {
          id: "1",
          destination: { index: 0 },
        },
      },
      sendResponse
    );
    await flushAsync();
    expect(sendResponse).toHaveBeenCalledWith({
      type: "error",
      message: "Missing destination.parentId",
    });
    expect(mockCopyBookmarkNode).not.toHaveBeenCalled();
  });

  it("returns error when copyBookmarkNode fails", async () => {
    const sendResponse = jest.fn();
    mockCopyBookmarkNode.mockImplementation((_id, _destination, done) =>
      done("bad input")
    );

    copyBookmarkNodeHandler(
      {
        data: {
          id: "1",
          destination: { parentId: "p", index: 0 },
        },
      },
      sendResponse
    );

    await flushAsync();
    expect(sendResponse).toHaveBeenCalledWith({
      type: "error",
      message: "bad input",
    });
  });
});
