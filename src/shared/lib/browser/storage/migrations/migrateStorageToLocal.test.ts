const mockLogInfo = jest.fn();

let mockLocalFindAllImpl: any;
let mockSyncFindAllImpl: any;
let mockLocalOverwriteImpl: any;
let mockSyncOverwriteImpl: any;
const mockChrome = (globalThis as any).chrome || {
  storage: { local: {}, sync: {} },
};

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

  it("propagates errors from initial local findAll", (done) => {
    mockLocalFindAllImpl = (cb: any) => cb("local-read-failed", null);
    mockSyncFindAllImpl = jest.fn();

    migrateStorageToLocal((err: any) => {
      expect(err).toBe("local-read-failed");
      expect(mockSyncFindAllImpl).not.toHaveBeenCalled();
      done();
    });
  });

  it("propagates errors from sync findAll", (done) => {
    mockLocalFindAllImpl = (cb: any) => cb(null, {});
    mockSyncFindAllImpl = (cb: any) => cb("sync-read-failed", null);
    mockLocalOverwriteImpl = jest.fn();

    migrateStorageToLocal((err: any) => {
      expect(err).toBe("sync-read-failed");
      expect(mockLocalOverwriteImpl).not.toHaveBeenCalled();
      done();
    });
  });

  it("propagates sync overwrite errors after local migration succeeds", (done) => {
    const syncData = { "4": { regExp: "y", history: [] } };
    mockLocalFindAllImpl = (cb: any) => cb(null, {});
    mockSyncFindAllImpl = (cb: any) => cb(null, syncData);
    mockLocalOverwriteImpl = (_items: any, cb: any) => cb(null);
    mockSyncOverwriteImpl = (_items: any, cb: any) => cb("sync-clear-failed");

    migrateStorageToLocal((err: any) => {
      expect(err).toBe("sync-clear-failed");
      done();
    });
  });
});
