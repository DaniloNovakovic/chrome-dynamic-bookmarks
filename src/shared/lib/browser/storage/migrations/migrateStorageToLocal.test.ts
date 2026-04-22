const mockLogInfo = jest.fn();

let mockLocalFindAllImpl: any;
let mockSyncFindAllImpl: any;
let mockLocalOverwriteImpl: any;
let mockSyncOverwriteImpl: any;
const mockChrome = (globalThis as any).chrome;

jest.mock("../../log", () => ({
  logError: jest.fn(),
  logInfo: (...args: any[]) => mockLogInfo(...args),
}));

jest.mock("../DynamicBookmarksManager", () => ({
  DynamicBookmarksManager: jest.fn().mockImplementation((storage: any) => {
    if (storage === mockChrome.storage.local) {
      return {
        findAll: (...args: any[]) => mockLocalFindAllImpl(...args),
        overwrite: (...args: any[]) => mockLocalOverwriteImpl(...args),
      };
    }
    return {
      findAll: (...args: any[]) => mockSyncFindAllImpl(...args),
      overwrite: (...args: any[]) => mockSyncOverwriteImpl(...args),
    };
  }),
}));

import migrateStorageToLocal from "./migrateStorageToLocal";

describe("migrateStorageToLocal", () => {
  beforeEach(() => {
    mockLogInfo.mockReset();
    mockLocalFindAllImpl = undefined;
    mockSyncFindAllImpl = undefined;
    mockLocalOverwriteImpl = undefined;
    mockSyncOverwriteImpl = undefined;
  });

  it("short-circuits when local storage already has bookmarks", (done) => {
    mockLocalFindAllImpl = (cb: any) =>
      cb(null, { "1": { regExp: "x", history: [] } });
    mockSyncFindAllImpl = jest.fn();
    mockLocalOverwriteImpl = jest.fn();
    mockSyncOverwriteImpl = jest.fn();

    migrateStorageToLocal((err: any) => {
      expect(err).toBeNull();
      expect(mockLogInfo).toHaveBeenCalledWith(
        "Data already migrated, skipping migration..."
      );
      expect(mockSyncFindAllImpl).not.toHaveBeenCalled();
      expect(mockLocalOverwriteImpl).not.toHaveBeenCalled();
      done();
    });
  });

  it("moves data from sync to local and clears sync", (done) => {
    const syncData = { "2": { regExp: "sync", history: ["u"] } };
    mockLocalFindAllImpl = (cb: any) => cb(null, {});
    mockSyncFindAllImpl = (cb: any) => cb(null, syncData);
    mockLocalOverwriteImpl = (items: any, cb: any) => {
      expect(items).toEqual(syncData);
      cb(null);
    };
    mockSyncOverwriteImpl = (items: any, cb: any) => {
      expect(items).toEqual({});
      cb(null);
    };

    migrateStorageToLocal((err: any) => {
      expect(err).toBeNull();
      done();
    });
  });

  it("propagates local overwrite errors and does not clear sync", (done) => {
    mockLocalFindAllImpl = (cb: any) => cb(null, {});
    mockSyncFindAllImpl = (cb: any) =>
      cb(null, { "3": { regExp: "x", history: [] } });
    mockLocalOverwriteImpl = (_items: any, cb: any) => cb("cannot-write-local");
    mockSyncOverwriteImpl = jest.fn();

    migrateStorageToLocal((err: any) => {
      expect(err).toBe("cannot-write-local");
      expect(mockSyncOverwriteImpl).not.toHaveBeenCalled();
      done();
    });
  });
});
