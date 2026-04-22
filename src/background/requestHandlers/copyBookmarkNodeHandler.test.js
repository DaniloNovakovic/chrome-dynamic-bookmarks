const mockCopyBookmarkNode = jest.fn();

jest.mock("@/shared/lib/browser", () => ({
  copyBookmarkNode: (...args) => mockCopyBookmarkNode(...args),
}));

import copyBookmarkNodeHandler from "./copyBookmarkNodeHandler";

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

    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(mockCopyBookmarkNode).toHaveBeenCalledTimes(2);
    expect(sendResponse).toHaveBeenCalledWith({
      type: "success",
      message: "2 item(s) copied",
    });
  });

  it("handles missing data gracefully with error response", async () => {
    const sendResponse = jest.fn();
    mockCopyBookmarkNode.mockImplementation((_id, _destination, done) =>
      done("bad input")
    );

    copyBookmarkNodeHandler({ data: undefined }, sendResponse);

    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(sendResponse).toHaveBeenCalledWith({
      type: "error",
      message: "bad input",
    });
  });
});
