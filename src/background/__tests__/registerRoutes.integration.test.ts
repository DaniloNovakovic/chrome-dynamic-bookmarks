import { beforeEach, describe, expect, it, vi } from "vitest";
const mockCreateBookmarkNode = vi.fn();
const mockEditBookmarkNode = vi.fn();
const mockRemoveBookmarkNode = vi.fn();
const mockCopyBookmarkNode = vi.fn();
const mockBmMove = vi.fn();

vi.mock("@/shared/lib/browser", () => ({
  createBookmarkNode: (...args: unknown[]) => mockCreateBookmarkNode(...args),
  editBookmarkNode: (...args: unknown[]) => mockEditBookmarkNode(...args),
  removeBookmarkNode: (...args: unknown[]) => mockRemoveBookmarkNode(...args),
  copyBookmarkNode: (...args: unknown[]) => mockCopyBookmarkNode(...args),
}));

vi.mock("@/shared/lib/browser/bookmarks", () => ({
  bm: {
    move: (...args: unknown[]) => mockBmMove(...args),
  },
}));

function flushAsync() {
  return new Promise((resolve) => setImmediate(resolve));
}

import createRouter from "../createRouter";
import registerRoutes from "../registerRoutes";

describe("registerRoutes integration", () => {
  beforeEach(() => {
    mockCreateBookmarkNode.mockReset();
    mockEditBookmarkNode.mockReset();
    mockRemoveBookmarkNode.mockReset();
    mockCopyBookmarkNode.mockReset();
    mockBmMove.mockReset();
  });

  it("handles ADD_BM_NODE requests", () => {
    const router = createRouter();
    registerRoutes(router);
    const sendResponse = vi.fn();

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
      sendResponse,
    );

    expect(sendResponse).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "success",
        data: expect.objectContaining({ id: "10", title: "Created" }),
      }),
    );
  });

  it("handles EDIT_BM_NODE requests and supports untracking", () => {
    const router = createRouter();
    registerRoutes(router);
    const sendResponse = vi.fn();

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
      sendResponse,
    );

    expect(sendResponse).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "success",
        data: expect.objectContaining({ id: "20", regExp: "" }),
      }),
    );
  });

  it("handles REMOVE_BM_NODE requests", async () => {
    const router = createRouter();
    registerRoutes(router);
    const sendResponse = vi.fn();

    mockRemoveBookmarkNode.mockImplementation((_id, cb) => cb(null));

    router.handleRequest(
      {
        type: "REMOVE_BM_NODE",
        data: { id: "30" },
      },
      sendResponse,
    );

    await flushAsync();
    expect(sendResponse).toHaveBeenCalledWith({
      type: "success",
      message: "1 item(s) deleted",
    });
  });

  it("handles COPY_BM_NODE requests", async () => {
    const router = createRouter();
    registerRoutes(router);
    const sendResponse = vi.fn();

    mockCopyBookmarkNode.mockImplementation((_id, _destination, done) =>
      done(null, { ok: true }),
    );

    router.handleRequest(
      {
        type: "COPY_BM_NODE",
        data: {
          id: "40",
          destination: { parentId: "p", index: 0 },
        },
      },
      sendResponse,
    );

    await flushAsync();
    expect(sendResponse).toHaveBeenCalledWith({
      type: "success",
      message: "1 item(s) copied",
    });
  });

  it("handles MOVE_BM_NODE requests", async () => {
    const router = createRouter();
    registerRoutes(router);
    const sendResponse = vi.fn();

    mockBmMove.mockImplementation((_id, _destination, done) =>
      done(null, { ok: true }),
    );

    router.handleRequest(
      {
        type: "MOVE_BM_NODE",
        data: {
          id: "50",
          destination: { parentId: "p2", index: 0 },
        },
      },
      sendResponse,
    );

    await flushAsync();
    expect(sendResponse).toHaveBeenCalledWith({
      type: "success",
      message: "1 item(s) moved",
    });
  });
});
