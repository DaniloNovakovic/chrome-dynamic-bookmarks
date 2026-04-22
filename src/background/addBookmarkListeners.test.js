const mockOnCreated = jest.fn();
const mockOnMoved = jest.fn();
const mockOnRemoved = jest.fn();
const mockOnChanged = jest.fn();
const mockFindByIdAndRemove = jest.fn();
const mockFindById = jest.fn();
const mockFindByIdAndUpdate = jest.fn();
const mockWarn = jest.fn();

jest.mock("@/shared/lib/browser", () => ({
  dbm: {
    findByIdAndRemove: (...args) => mockFindByIdAndRemove(...args),
    findById: (...args) => mockFindById(...args),
    findByIdAndUpdate: (...args) => mockFindByIdAndUpdate(...args),
  },
  getCurrentBrowser: () => ({
    bookmarks: {
      onCreated: { addListener: mockOnCreated },
      onMoved: { addListener: mockOnMoved },
      onRemoved: { addListener: mockOnRemoved },
      onChanged: { addListener: mockOnChanged },
    },
  }),
  logWarn: (...args) => mockWarn(...args),
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
    const callback = jest.fn();
    const addBookmarkListeners = require("./addBookmarkListeners").default;
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
    const callback = jest.fn();
    const addBookmarkListeners = require("./addBookmarkListeners").default;
    addBookmarkListeners(callback);
    mockFindByIdAndRemove.mockImplementation((_id, done) => done(null));

    mockOnRemoved.mock.calls[0][0]("3");

    expect(mockFindByIdAndRemove).toHaveBeenCalledWith(
      "3",
      expect.any(Function)
    );
    expect(callback).toHaveBeenCalledWith({
      type: "BM_NODE_REMOVED",
      data: { id: "3" },
    });
  });

  it("logs warning and skips remove event when metadata removal fails", () => {
    const callback = jest.fn();
    const addBookmarkListeners = require("./addBookmarkListeners").default;
    addBookmarkListeners(callback);
    mockFindByIdAndRemove.mockImplementation((_id, done) => done("boom"));

    mockOnRemoved.mock.calls[0][0]("3");

    expect(mockWarn).toHaveBeenCalledWith("boom");
    expect(callback).not.toHaveBeenCalled();
  });

  it("updates tracked bookmark history on url changes", () => {
    const callback = jest.fn();
    const addBookmarkListeners = require("./addBookmarkListeners").default;
    addBookmarkListeners(callback);
    mockFindById.mockImplementation((_id, done) =>
      done(null, { regExp: "example", history: ["older"] })
    );
    mockFindByIdAndUpdate.mockImplementation((_id, item, done) =>
      done(null, item)
    );

    mockOnChanged.mock.calls[0][0]("5", {
      title: "Tracked",
      url: "https://example.com/new",
    });

    expect(mockFindByIdAndUpdate).toHaveBeenCalledWith(
      "5",
      { regExp: "example", history: ["https://example.com/new", "older"] },
      expect.any(Function)
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
    const callback = jest.fn();
    const addBookmarkListeners = require("./addBookmarkListeners").default;
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
