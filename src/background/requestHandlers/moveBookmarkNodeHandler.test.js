const mockMove = jest.fn();

jest.mock("@/shared/lib/browser/bookmarks", () => ({
  bm: {
    move: (...args) => mockMove(...args),
  },
}));

import moveBookmarkNodeHandler from "./moveBookmarkNodeHandler";

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

    await new Promise((resolve) => setTimeout(resolve, 0));
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

    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(sendResponse).toHaveBeenCalledWith({
      type: "error",
      message: "failed",
    });
  });
});
