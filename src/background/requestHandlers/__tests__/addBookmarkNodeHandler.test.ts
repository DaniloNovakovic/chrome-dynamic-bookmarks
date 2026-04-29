const mockCreateBookmarkNode = jest.fn();

jest.mock("@/shared/lib/browser", () => ({
  createBookmarkNode: (...args: unknown[]) => mockCreateBookmarkNode(...args),
}));

import addBookmarkNodeHandler from "../addBookmarkNodeHandler";

describe("addBookmarkNodeHandler", () => {
  beforeEach(() => {
    mockCreateBookmarkNode.mockReset();
  });

  it("returns error when data is missing", () => {
    const sendResponse = jest.fn();
    addBookmarkNodeHandler({ data: undefined }, sendResponse);
    expect(sendResponse).toHaveBeenCalledWith({
      type: "error",
      message: "Missing request data",
    });
    expect(mockCreateBookmarkNode).not.toHaveBeenCalled();
  });

  it("returns success when createBookmarkNode succeeds", () => {
    const sendResponse = jest.fn();
    mockCreateBookmarkNode.mockImplementation((_data, cb) =>
      cb(null, { id: "1", title: "T", url: "https://x.com" })
    );

    addBookmarkNodeHandler(
      { data: { title: "T", url: "https://x.com" } },
      sendResponse
    );

    expect(sendResponse).toHaveBeenCalledWith({
      type: "success",
      message: "Successfully created bookmark 'T'",
      data: { id: "1", title: "T", url: "https://x.com" },
    });
  });

  it("returns error when createBookmarkNode fails", () => {
    const sendResponse = jest.fn();
    mockCreateBookmarkNode.mockImplementation((_data, cb) =>
      cb("create failed")
    );

    addBookmarkNodeHandler(
      { data: { title: "T", url: "https://x.com" } },
      sendResponse
    );

    expect(sendResponse).toHaveBeenCalledWith({
      type: "error",
      message: "create failed",
    });
  });
});
