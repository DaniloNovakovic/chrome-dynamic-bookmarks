const mockEditBookmarkNode = jest.fn();

jest.mock("@/shared/lib/browser", () => ({
  editBookmarkNode: (...args: unknown[]) => mockEditBookmarkNode(...args),
}));

import editBookmarkNodeHandler from "../editBookmarkNodeHandler";

describe("editBookmarkNodeHandler", () => {
  beforeEach(() => {
    mockEditBookmarkNode.mockReset();
  });

  it("returns error when data is missing", () => {
    const sendResponse = jest.fn();
    editBookmarkNodeHandler({ data: undefined }, sendResponse);
    expect(sendResponse).toHaveBeenCalledWith({
      type: "error",
      message: "Missing request data",
    });
    expect(mockEditBookmarkNode).not.toHaveBeenCalled();
  });

  it("returns success when editBookmarkNode succeeds", () => {
    const sendResponse = jest.fn();
    mockEditBookmarkNode.mockImplementation((_data, cb) =>
      cb(null, { id: "2", title: "E", url: "https://e.com" })
    );

    editBookmarkNodeHandler(
      { data: { id: "2", title: "E", url: "https://e.com" } },
      sendResponse
    );

    expect(sendResponse).toHaveBeenCalledWith({
      type: "success",
      message: "Successfully updated bookmark node 2",
      data: { id: "2", title: "E", url: "https://e.com" },
    });
  });

  it("returns error when editBookmarkNode fails", () => {
    const sendResponse = jest.fn();
    mockEditBookmarkNode.mockImplementation((_data, cb) => cb("edit failed"));

    editBookmarkNodeHandler({ data: { id: "2", title: "E" } }, sendResponse);

    expect(sendResponse).toHaveBeenCalledWith({
      type: "error",
      message: "edit failed",
    });
  });
});
