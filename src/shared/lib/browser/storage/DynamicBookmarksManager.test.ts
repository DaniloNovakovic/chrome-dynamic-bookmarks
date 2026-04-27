type StorageShape = {
  values: Record<string, any>;
  get: (keys: string[], cb: (result: Record<string, any>) => void) => void;
  set: (data: Record<string, any>, cb: () => void) => void;
  remove: (keys: string[], cb: () => void) => void;
};

function createStorage(initial: Record<string, any> = {}): StorageShape {
  const values = { ...initial };
  return {
    values,
    get: (keys, cb) => {
      const result: Record<string, any> = {};
      for (const key of keys) {
        result[key] = values[key];
      }
      cb(result);
    },
    set: (data, cb) => {
      Object.assign(values, data);
      cb();
    },
    remove: (keys, cb) => {
      for (const key of keys) {
        delete values[key];
      }
      cb();
    },
  };
}

jest.mock("@/shared/lib/browser/log", () => ({
  checkAndHandleError: () => false,
  logError: jest.fn(),
  logInfo: jest.fn(),
}));

import {
  DynamicBookmarksManager,
  dbmIdsPropName,
} from "./DynamicBookmarksManager";

describe("DynamicBookmarksManager", () => {
  it("creates item and tracks dbm ids", () => {
    const storage = createStorage();
    const manager = new DynamicBookmarksManager(storage as any);

    return new Promise<void>((resolve, reject) => {
      manager.create(
        { id: "11", regExp: "example", history: [] },
        (err, item) => {
          try {
            expect(err).toBeNull();
            expect(item).toEqual({ regExp: "example", history: [] });
            expect(storage.values.dbm_11).toEqual({
              regExp: "example",
              history: [],
            });
            expect(storage.values[dbmIdsPropName]).toEqual(["dbm_11"]);
            resolve();
          } catch (e) {
            reject(e);
          }
        }
      );
    });
  });

  it("findByIdAndUpdate creates missing item", () => {
    const storage = createStorage();
    const manager = new DynamicBookmarksManager(storage as any);

    return new Promise<void>((resolve, reject) => {
      manager.findByIdAndUpdate(
        "22",
        { regExp: "x", history: ["a"] },
        (err, updatedItem) => {
          try {
            expect(err).toBeNull();
            expect(updatedItem).toEqual({ regExp: "x", history: ["a"] });
            expect(storage.values.dbm_22).toEqual({
              regExp: "x",
              history: ["a"],
            });
            resolve();
          } catch (e) {
            reject(e);
          }
        }
      );
    });
  });

  it("findByIdAndRemove removes item and id reference", () => {
    const storage = createStorage({
      dbm_44: { regExp: "abc", history: [] },
      [dbmIdsPropName]: ["dbm_44"],
    });
    const manager = new DynamicBookmarksManager(storage as any);

    return new Promise<void>((resolve, reject) => {
      manager.findByIdAndRemove("44", (err) => {
        try {
          expect(err).toBeNull();
          expect(storage.values.dbm_44).toBeUndefined();
          expect(storage.values[dbmIdsPropName]).toEqual([]);
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    });
  });

  it("findAll returns bookmark ids without dbm_ prefix", () => {
    const storage = createStorage({
      dbm_1: { regExp: "a", history: [] },
      dbm_2: { regExp: "b", history: [] },
      [dbmIdsPropName]: ["dbm_1", "dbm_2"],
    });
    const manager = new DynamicBookmarksManager(storage as any);

    return new Promise<void>((resolve, reject) => {
      manager.findAll((err, items) => {
        try {
          expect(err).toBeNull();
          expect(items).toEqual({
            "1": { regExp: "a", history: [] },
            "2": { regExp: "b", history: [] },
          });
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    });
  });
});
