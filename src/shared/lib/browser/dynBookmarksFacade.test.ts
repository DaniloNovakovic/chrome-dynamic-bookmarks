const mockCreate = jest.fn();
const mockUpdate = jest.fn();
const mockRemove = jest.fn();
const mockFindByIdAndRemove = jest.fn();
const mockFindByIdAndUpdate = jest.fn();
const mockStorageCreate = jest.fn();

jest.mock("./bookmarks", () => ({
  bm: {
    create: (...args) => mockCreate(...args),
    update: (...args) => mockUpdate(...args),
    remove: (...args) => mockRemove(...args),
  },
}));

jest.mock("./storage", () => ({
  dbm: {
    create: (...args) => mockStorageCreate(...args),
    findByIdAndRemove: (...args) => mockFindByIdAndRemove(...args),
    findByIdAndUpdate: (...args) => mockFindByIdAndUpdate(...args),
    findAll: jest.fn(),
  },
}));

import { createBookmarkNode, editBookmarkNode } from "./dynBookmarksFacade";

describe("dynBookmarksFacade", () => {
  beforeEach(() => {
    mockCreate.mockReset();
    mockUpdate.mockReset();
    mockRemove.mockReset();
    mockFindByIdAndRemove.mockReset();
    mockFindByIdAndUpdate.mockReset();
    mockStorageCreate.mockReset();
  });

  it("createBookmarkNode does not create tracked storage when regExp is empty", () => {
    const done = jest.fn();

    mockCreate.mockImplementation((_node, cb) => {
      cb(null, { id: "123", title: "No RegExp", url: "https://example.com" });
    });

    createBookmarkNode(
      { title: "No RegExp", url: "https://example.com", regExp: "" },
      done
    );

    expect(mockStorageCreate).not.toHaveBeenCalled();
    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith(null, {
      id: "123",
      title: "No RegExp",
      url: "https://example.com",
    });
  });

  it("editBookmarkNode untracks bookmark when regExp becomes empty", () => {
    const done = jest.fn();

    mockUpdate.mockImplementation((_id, _node, cb) => {
      cb(null, { id: "bm1", title: "Tracked", url: "https://example.com/new" });
    });
    mockFindByIdAndRemove.mockImplementation((_id, cb) => cb(null));

    editBookmarkNode(
      {
        id: "bm1",
        title: "Tracked",
        url: "https://example.com/new",
        regExp: "",
      },
      done
    );

    expect(mockFindByIdAndRemove).toHaveBeenCalledWith(
      "bm1",
      expect.any(Function)
    );
    expect(done).toHaveBeenCalledWith(null, {
      id: "bm1",
      title: "Tracked",
      url: "https://example.com/new",
      regExp: "",
    });
  });
});
