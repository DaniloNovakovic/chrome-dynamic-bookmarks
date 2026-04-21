const mockCreateBookmarkNode = jest.fn();
const mockEditBookmarkNode = jest.fn();
const mockRemoveBookmarkNode = jest.fn();
const mockCopyBookmarkNode = jest.fn();
const mockMoveBookmarkNode = jest.fn();

jest.mock("@/shared/lib/browser", () => ({
  createBookmarkNode: (...args) => mockCreateBookmarkNode(...args),
  editBookmarkNode: (...args) => mockEditBookmarkNode(...args),
  removeBookmarkNode: (...args) => mockRemoveBookmarkNode(...args),
  copyBookmarkNode: (...args) => mockCopyBookmarkNode(...args),
  moveBookmarkNode: (...args) => mockMoveBookmarkNode(...args),
}));

import createRouter from "./createRouter";
import registerRoutes from "./registerRoutes";

describe("registerRoutes integration", () => {
  beforeEach(() => {
    mockCreateBookmarkNode.mockReset();
    mockEditBookmarkNode.mockReset();
    mockRemoveBookmarkNode.mockReset();
    mockCopyBookmarkNode.mockReset();
    mockMoveBookmarkNode.mockReset();
  });

  it("handles ADD_BM_NODE requests", () => {
    const router = createRouter();
    registerRoutes(router);
    const sendResponse = jest.fn();

    mockCreateBookmarkNode.mockImplementation((_data, cb) => {
      cb(null, {
        id: "10",
        title: "Created",
        url: "https://example.com",
        regExp: "x",
      });
    });

    router.handleRequest(
      {
        type: "ADD_BM_NODE",
        data: { title: "Created", url: "https://example.com", regExp: "x" },
      },
      sendResponse
    );

    expect(sendResponse).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "success",
        data: expect.objectContaining({ id: "10", title: "Created" }),
      })
    );
  });

  it("handles EDIT_BM_NODE requests and supports untracking", () => {
    const router = createRouter();
    registerRoutes(router);
    const sendResponse = jest.fn();

    mockEditBookmarkNode.mockImplementation((_data, cb) => {
      cb(null, {
        id: "20",
        title: "Edited",
        url: "https://example.com/new",
        regExp: "",
      });
    });

    router.handleRequest(
      {
        type: "EDIT_BM_NODE",
        data: {
          id: "20",
          title: "Edited",
          url: "https://example.com/new",
          regExp: "",
        },
      },
      sendResponse
    );

    expect(sendResponse).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "success",
        data: expect.objectContaining({ id: "20", regExp: "" }),
      })
    );
  });

  it("handles REMOVE_BM_NODE requests", async () => {
    const router = createRouter();
    registerRoutes(router);
    const sendResponse = jest.fn();

    mockRemoveBookmarkNode.mockImplementation((_id, cb) => cb(null));

    router.handleRequest(
      {
        type: "REMOVE_BM_NODE",
        data: { id: "30" },
      },
      sendResponse
    );

    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(sendResponse).toHaveBeenCalledWith({
      type: "success",
      message: "1 item(s) deleted",
    });
  });
});
