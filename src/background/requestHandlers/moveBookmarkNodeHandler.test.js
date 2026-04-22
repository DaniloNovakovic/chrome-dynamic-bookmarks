const mockMove = jest.fn();

jest.mock("@/shared/lib/browser/bookmarks", () => ({
  bm: {
    move: (...args) => mockMove(...args),
  },
}));

import moveBookmarkNodeHandler from "./moveBookmarkNodeHandler";

function flushAsync() {
  return new Promise((resolve) => setImmediate(resolve));
}

describe("moveBookmarkNodeHandler", () => {
  beforeEach(() => {
    mockMove.mockReset();
  });

  it("returns error when attempting to move into itself", () => {
    const sendResponse = jest.fn();

    moveBookmarkNodeHandler(
      { data: { id: "1", destination: { parentId: "1", index: 0 } } },
      sendResponse
    );

    expect(sendResponse).toHaveBeenCalledWith({
      type: "error",
      message: "You cannot move node into itself",
    });
    expect(mockMove).not.toHaveBeenCalled();
  });

  it("moves all nodes and returns success for multi-id payload", async () => {
    const sendResponse = jest.fn();
    mockMove.mockImplementation((_id, _destination, done) =>
      done(null, { ok: true })
    );

    moveBookmarkNodeHandler(
      {
        data: {
          id: ["1", "2"],
          destination: { parentId: "dest", index: 1 },
        },
      },
      sendResponse
    );

    await flushAsync();
    expect(mockMove).toHaveBeenCalledTimes(2);
    expect(sendResponse).toHaveBeenCalledWith({
      type: "success",
      message: "2 item(s) moved",
    });
  });

  it("returns error when move fails", async () => {
    const sendResponse = jest.fn();
    mockMove.mockImplementation((_id, _destination, done) => done("failed"));

    moveBookmarkNodeHandler(
      { data: { id: "1", destination: { parentId: "x", index: 0 } } },
      sendResponse
    );

    await flushAsync();
    expect(sendResponse).toHaveBeenCalledWith({
      type: "error",
      message: "failed",
    });
  });

  it("returns error when data is missing", async () => {
    const sendResponse = jest.fn();
    moveBookmarkNodeHandler({ data: undefined }, sendResponse);
    await flushAsync();
    expect(sendResponse).toHaveBeenCalledWith({
      type: "error",
      message: "Missing request data",
    });
    expect(mockMove).not.toHaveBeenCalled();
  });

  it("returns error when destination is missing", async () => {
    const sendResponse = jest.fn();
    moveBookmarkNodeHandler({ data: { id: "1" } }, sendResponse);
    await flushAsync();
    expect(sendResponse).toHaveBeenCalledWith({
      type: "error",
      message: "Missing destination",
    });
    expect(mockMove).not.toHaveBeenCalled();
  });

  it("returns error when destination.parentId is missing", async () => {
    const sendResponse = jest.fn();
    moveBookmarkNodeHandler(
      { data: { id: "1", destination: { index: 0 } } },
      sendResponse
    );
    await flushAsync();
    expect(sendResponse).toHaveBeenCalledWith({
      type: "error",
      message: "Missing destination.parentId",
    });
    expect(mockMove).not.toHaveBeenCalled();
  });

  it("returns error when no valid bookmark ids", async () => {
    const sendResponse = jest.fn();
    moveBookmarkNodeHandler(
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
    expect(mockMove).not.toHaveBeenCalled();
  });
});
