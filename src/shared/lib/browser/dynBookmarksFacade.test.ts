const mockCreate = jest.fn();
const mockUpdate = jest.fn();
const mockRemove = jest.fn();
const mockGetSubTree = jest.fn();
const mockGetTreeRoot = jest.fn();
const mockGet = jest.fn();
const mockCreateAsync = jest.fn();
const mockRemoveTree = jest.fn();
const mockFindByIdAndRemove = jest.fn();
const mockFindByIdAndUpdate = jest.fn();
const mockStorageCreate = jest.fn();
const mockFindAll = jest.fn();

jest.mock("./bookmarks", () => ({
  bm: {
    create: (...args: any[]) => mockCreate(...args),
    update: (...args: any[]) => mockUpdate(...args),
    remove: (...args: any[]) => mockRemove(...args),
    getSubTree: (...args: any[]) => mockGetSubTree(...args),
    getTreeRoot: (...args: any[]) => mockGetTreeRoot(...args),
    get: (...args: any[]) => mockGet(...args),
    createAsync: (...args: any[]) => mockCreateAsync(...args),
    removeTree: (...args: any[]) => mockRemoveTree(...args),
  },
}));

jest.mock("./storage", () => ({
  dbm: {
    create: (...args: any[]) => mockStorageCreate(...args),
    findByIdAndRemove: (...args: any[]) => mockFindByIdAndRemove(...args),
    findByIdAndUpdate: (...args: any[]) => mockFindByIdAndUpdate(...args),
    findAll: (...args: any[]) => mockFindAll(...args),
  },
}));

import {
  copyBookmarkNode,
  createBookmarkNode,
  editBookmarkNode,
  getBookmarkNodes,
  removeBookmarkNode,
} from "./dynBookmarksFacade";

describe("dynBookmarksFacade", () => {
  beforeEach(() => {
    mockCreate.mockReset();
    mockUpdate.mockReset();
    mockRemove.mockReset();
    mockGetSubTree.mockReset();
    mockGetTreeRoot.mockReset();
    mockGet.mockReset();
    mockCreateAsync.mockReset();
    mockRemoveTree.mockReset();
    mockFindByIdAndRemove.mockReset();
    mockFindByIdAndUpdate.mockReset();
    mockStorageCreate.mockReset();
    mockFindAll.mockReset();
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

  it("editBookmarkNode passes only bookmark fields to bookmarks.update", () => {
    const done = jest.fn();
    mockUpdate.mockImplementation((_id, changes, cb) => {
      expect(changes).toEqual({
        title: "T",
        url: "https://example.com/u",
      });
      cb(null, { id: "bm2", title: "T", url: "https://example.com/u" });
    });
    mockFindByIdAndUpdate.mockImplementation((_id, payload, cb) =>
      cb(null, { regExp: "ex", history: [] })
    );

    editBookmarkNode(
      {
        id: "bm2",
        title: "T",
        url: "https://example.com/u",
        regExp: "ex",
        history: ["old"],
      },
      done
    );

    expect(mockUpdate).toHaveBeenCalledWith(
      "bm2",
      {
        title: "T",
        url: "https://example.com/u",
      },
      expect.any(Function)
    );
    expect(mockFindByIdAndUpdate).toHaveBeenCalledWith(
      "bm2",
      { regExp: "ex", history: ["old"] },
      expect.any(Function)
    );
    expect(done).toHaveBeenCalledWith(
      null,
      expect.objectContaining({
        id: "bm2",
        regExp: "ex",
      })
    );
  });

  it("getBookmarkNodes returns combined tree and tracked data", () => {
    const treeRoot = {
      id: "root",
      title: "",
      children: [
        {
          id: "b1",
          parentId: "root",
          title: "One",
          url: "https://example.com/one",
        },
      ],
    };
    mockGetTreeRoot.mockImplementation((_cb: any) => _cb(null, treeRoot));
    mockFindAll.mockImplementation((_cb: any) =>
      _cb(null, { b1: { regExp: "ex", history: [] } })
    );

    return new Promise<void>((resolve, reject) => {
      getBookmarkNodes((err, nodes) => {
        try {
          expect(err).toBeNull();
          expect(nodes?.b1).toMatchObject({
            id: "b1",
            url: "https://example.com/one",
            regExp: "ex",
          });
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    });
  });

  it("getBookmarkNodes propagates getTreeRoot errors", () => {
    mockGetTreeRoot.mockImplementation((_cb: any) => _cb("tree-fail", null));

    return new Promise<void>((resolve, reject) => {
      getBookmarkNodes((err) => {
        try {
          expect(err).toBe("tree-fail");
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    });
  });

  it("getBookmarkNodes propagates storage.findAll errors", () => {
    const treeRoot = {
      id: "root",
      title: "",
      children: [],
    };
    mockGetTreeRoot.mockImplementation((_cb: any) => _cb(null, treeRoot));
    mockFindAll.mockImplementation((_cb: any) => _cb("storage-fail", null));

    return new Promise<void>((resolve, reject) => {
      getBookmarkNodes((err) => {
        try {
          expect(err).toBe("storage-fail");
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    });
  });

  it("copyBookmarkNode copies a bookmark subtree", () => {
    mockGetSubTree.mockImplementation((_id: any, cb: any) =>
      cb(null, {
        id: "src",
        title: "Src",
        url: "https://example.com/s",
      })
    );
    mockCreateAsync.mockResolvedValue({
      id: "new",
      url: "https://example.com/s",
    });

    return new Promise<void>((resolve, reject) => {
      copyBookmarkNode("src", { parentId: "p", index: 0 }, (err) => {
        try {
          expect(err).toBeNull();
          expect(mockCreateAsync).toHaveBeenCalledWith(
            expect.objectContaining({
              id: "src",
              parentId: "p",
              index: 0,
            })
          );
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    });
  });

  it("copyBookmarkNode propagates getSubTree errors", () => {
    mockGetSubTree.mockImplementation((_id: any, cb: any) =>
      cb("no-node", null)
    );

    return new Promise<void>((resolve, reject) => {
      copyBookmarkNode("missing", { parentId: "p", index: 0 }, (err) => {
        try {
          expect(err).toBe("no-node");
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    });
  });

  it("removeBookmarkNode for folder removes tree then clears tracked metadata for descendant bookmarks", () => {
    mockGet.mockImplementation((_id: any, cb: any) =>
      cb(null, { id: "folder1", title: "F", children: [] })
    );
    mockGetSubTree.mockImplementation((_id: any, cb: any) =>
      cb(null, {
        id: "folder1",
        title: "F",
        children: [
          {
            id: "child1",
            title: "C",
            url: "https://example.com/c",
          },
        ],
      })
    );
    mockRemoveTree.mockImplementation((_id: any, cb: any) => cb(null));
    mockFindByIdAndRemove.mockImplementation((_id: any, cb: any) => cb(null));

    return new Promise<void>((resolve, reject) => {
      removeBookmarkNode("folder1", (err) => {
        try {
          expect(err).toBeNull();
          expect(mockRemoveTree).toHaveBeenCalledWith(
            "folder1",
            expect.any(Function)
          );
          expect(mockFindByIdAndRemove).toHaveBeenCalledWith(
            "child1",
            expect.any(Function)
          );
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    });
  });
});
