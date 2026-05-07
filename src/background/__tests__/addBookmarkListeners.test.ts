import { beforeEach, describe, expect, it, vi } from "vitest";

import addBookmarkListeners from "../addBookmarkListeners";

const {
  mockOnCreated,
  mockOnMoved,
  mockOnRemoved,
  mockOnChanged,
  mockFindByIdAndRemove,
  mockFindById,
  mockFindByIdAndUpdate,
  mockWarn,
} = vi.hoisted(() => ({
  mockOnCreated: vi.fn(),
  mockOnMoved: vi.fn(),
  mockOnRemoved: vi.fn(),
  mockOnChanged: vi.fn(),
  mockFindByIdAndRemove: vi.fn(),
  mockFindById: vi.fn(),
  mockFindByIdAndUpdate: vi.fn(),
  mockWarn: vi.fn(),
}));

vi.mock("@/shared/lib/browser", () => ({
  dbm: {
    findByIdAndRemove: (...args: unknown[]) => mockFindByIdAndRemove(...args),
    findById: (...args: unknown[]) => mockFindById(...args),
    findByIdAndUpdate: (...args: unknown[]) => mockFindByIdAndUpdate(...args),
  },
  getCurrentBrowser: () => ({
    bookmarks: {
      onCreated: { addListener: mockOnCreated },
      onMoved: { addListener: mockOnMoved },
      onRemoved: { addListener: mockOnRemoved },
      onChanged: { addListener: mockOnChanged },
    },
  }),
  logWarn: (...args: unknown[]) => mockWarn(...args),
}));

describe("addBookmarkListeners", () => {
  beforeEach(() => {
    mockOnCreated.mockReset();
    mockOnMoved.mockReset();
    mockOnRemoved.mockReset();
    mockOnChanged.mockReset();
    mockFindByIdAndRemove.mockReset();
    mockFindById.mockReset();
    mockFindByIdAndUpdate.mockReset();
    mockWarn.mockReset();
  });

  it("emits create and move events", () => {
    const callback = vi.fn();
    addBookmarkListeners(callback);

    mockOnCreated.mock.calls[0][0]("1", { title: "Node", parentId: "0" });
    mockOnMoved.mock.calls[0][0]("1", { parentId: "2", oldParentId: "0" });

    expect(callback).toHaveBeenCalledWith({
      type: "BM_NODE_CREATED",
      data: { id: "1", title: "Node", parentId: "0" },
    });
    expect(callback).toHaveBeenCalledWith({
      type: "BM_NODE_MOVED",
      data: { id: "1", parentId: "2", oldParentId: "0" },
    });
  });

  it("removes tracked metadata and emits remove event", () => {
    const callback = vi.fn();
    addBookmarkListeners(callback);
    mockFindByIdAndRemove.mockImplementation((_id, done) => done(null));

    mockOnRemoved.mock.calls[0][0]("3");

    expect(mockFindByIdAndRemove).toHaveBeenCalledWith(
      "3",
      expect.any(Function),
    );
    expect(callback).toHaveBeenCalledWith({
      type: "BM_NODE_REMOVED",
      data: { id: "3" },
    });
  });

  it("logs warning and skips remove event when metadata removal fails", () => {
    const callback = vi.fn();
    addBookmarkListeners(callback);
    mockFindByIdAndRemove.mockImplementation((_id, done) => done("boom"));

    mockOnRemoved.mock.calls[0][0]("3");

    expect(mockWarn).toHaveBeenCalledWith("boom");
    expect(callback).not.toHaveBeenCalled();
  });

  it("updates tracked bookmark history on url changes", () => {
    const callback = vi.fn();
    addBookmarkListeners(callback);
    mockFindById.mockImplementation((_id, done) =>
      done(null, { regExp: "example", history: ["older"] }),
    );
    mockFindByIdAndUpdate.mockImplementation((_id, item, done) =>
      done(null, item),
    );

    mockOnChanged.mock.calls[0][0]("5", {
      title: "Tracked",
      url: "https://example.com/new",
    });

    expect(mockFindByIdAndUpdate).toHaveBeenCalledWith(
      "5",
      { regExp: "example", history: ["https://example.com/new", "older"] },
      expect.any(Function),
    );
    expect(callback).toHaveBeenCalledWith({
      type: "BM_NODE_CHANGED",
      data: {
        id: "5",
        title: "Tracked",
        url: "https://example.com/new",
        regExp: "example",
        history: ["https://example.com/new", "older"],
      },
    });
  });

  it("emits change directly when bookmark is not tracked", () => {
    const callback = vi.fn();
    addBookmarkListeners(callback);
    mockFindById.mockImplementation((_id, done) => done(null, undefined));

    mockOnChanged.mock.calls[0][0]("7", {
      title: "Regular bookmark",
      url: "https://example.com",
    });

    expect(callback).toHaveBeenCalledWith({
      type: "BM_NODE_CHANGED",
      data: { id: "7", title: "Regular bookmark", url: "https://example.com" },
    });
    expect(mockFindByIdAndUpdate).not.toHaveBeenCalled();
  });
});
