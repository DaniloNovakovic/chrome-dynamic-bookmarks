const mockRemoveBookmarkNode = jest.fn();

jest.mock("@/shared/lib/browser", () => ({
  removeBookmarkNode: (...args) => mockRemoveBookmarkNode(...args),
}));

import removeBookmarkNodesHandler from "./removeBookmarkNodeHandler";

function flushAsync() {
  return new Promise((resolve) => setImmediate(resolve));
}

describe("removeBookmarkNodesHandler", () => {
  beforeEach(() => {
    mockRemoveBookmarkNode.mockReset();
  });

  it("returns error when data is missing", async () => {
    const sendResponse = jest.fn();
    removeBookmarkNodesHandler({ data: undefined }, sendResponse);
    await flushAsync();
    expect(sendResponse).toHaveBeenCalledWith({
      type: "error",
      message: "Missing request data",
    });
    expect(mockRemoveBookmarkNode).not.toHaveBeenCalled();
  });

  it("returns error when no valid ids after normalization", async () => {
    const sendResponse = jest.fn();
    removeBookmarkNodesHandler({ data: { id: "" } }, sendResponse);
    await flushAsync();
    expect(sendResponse).toHaveBeenCalledWith({
      type: "error",
      message: "No bookmark id provided",
    });
    expect(mockRemoveBookmarkNode).not.toHaveBeenCalled();
  });

  it("removes multiple ids and returns success", async () => {
    const sendResponse = jest.fn();
    mockRemoveBookmarkNode.mockImplementation((_id, cb) => cb(null));

    removeBookmarkNodesHandler({ data: { id: ["a", "b"] } }, sendResponse);
    await flushAsync();

    expect(mockRemoveBookmarkNode).toHaveBeenCalledTimes(2);
    expect(sendResponse).toHaveBeenCalledWith({
      type: "success",
      message: "2 item(s) deleted",
    });
  });

  it("returns error when remove fails", async () => {
    const sendResponse = jest.fn();
    mockRemoveBookmarkNode.mockImplementation((_id, cb) => cb("remove failed"));

    removeBookmarkNodesHandler({ data: { id: "x" } }, sendResponse);
    await flushAsync();

    expect(sendResponse).toHaveBeenCalledWith({
      type: "error",
      message: "remove failed",
    });
  });
});
