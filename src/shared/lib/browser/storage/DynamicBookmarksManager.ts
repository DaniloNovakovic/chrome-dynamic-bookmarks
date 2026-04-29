import {
  checkAndHandleError,
  logError,
  logInfo,
} from "@/shared/lib/browser/log";
import { DynamicBookmarkStorageItem } from "@/shared/types/bookmark.types";

import getCurrentBrowser from "../getCurrentBrowser";

const browser = getCurrentBrowser();

export const dbmIdsPropName = "dbm_ids";

export class DynamicBookmarksManager {
  private storage: typeof chrome.storage.local;

  constructor(
    storage: typeof chrome.storage.local | typeof chrome.storage.sync = browser
      .storage.local
  ) {
    this.storage = storage;
  }

  /**`
   * @param {function} done - callback function called with `done(error, dynBook)`
   */
  findAll = (
    done: (
      error: string | null,
      item?: Record<string, DynamicBookmarkStorageItem>
    ) => void
  ) => {
    this._getAllIds((errMsg, ids = []) => {
      if (errMsg) return done(errMsg);
      this.storage.get(ids, (result) => {
        if (!checkAndHandleError(done)) {
          const dynBook = _cloneWithMappedKeys(result, _convertToBookmarkId);
          done(null, dynBook);
        }
      });
    });
  };

  /**
   * @param {string} id - id of dynamic bookmark
   * @param {function} done - callback function called with `done(error, dynBookItem)`
   */
  findById = (
    id: string,
    done: (error: string | null, item?: DynamicBookmarkStorageItem) => void
  ) => {
    const key = _convertToDbmId(id);
    this.storage.get([key], (result) => {
      if (!checkAndHandleError(done)) {
        done(null, result[key]);
      }
    });
  };

  /**
   * @param {string} id - id of dynamic bookmark
   * @param {function} done - callback function called with `done(error)`
   */
  findByIdAndRemove = (id: string, done: typeof logError) => {
    const key = _convertToDbmId(id);
    this.storage.remove([key], () => {
      if (!checkAndHandleError(done)) {
        this._removeKeyFromDbmIds(key, done);
      }
    });
  };

  /**
   * Attempts to update dynamic bookmark. If it does not exist a new bookmark will be created.
   */
  findByIdAndUpdate = (
    id: string,
    { regExp, history }: DynamicBookmarkStorageItem,
    done: (
      error: string | null,
      updatedItem?: DynamicBookmarkStorageItem
    ) => void
  ) => {
    const key = _convertToDbmId(id);
    this.findById(key, (errMsg, item) => {
      if (errMsg) return done(errMsg);
      if (!item) {
        return this.create({ id, regExp, history }, done);
      }
      item = {
        regExp: regExp || item.regExp,
        history: history || item.history || [],
      };
      this._setItem(key, item, done);
    });
  };

  /**
   * Creates dynBookmark item and sets it into the storage
   */
  create(
    { id = "", regExp = "", history = [] },
    done: (
      error: string | null,
      createdItem?: DynamicBookmarkStorageItem
    ) => void
  ) {
    const key = _convertToDbmId(id);
    this._setItem(key, { regExp, history }, (errMsg, createdItem) => {
      if (errMsg) return done(errMsg);
      this._addKeyToDbmIds(key, (errMsg) => {
        done(errMsg, createdItem);
      });
    });
  }
  /**
   * Overwrites dynamic bookmarks object from storage with `newDynBook`.
   * `Warning`: This function is **DANGEROUS**! Potential data loss!
   */
  overwrite(
    newDynBookmarks: Record<string, DynamicBookmarkStorageItem> = {},
    done: typeof logError
  ) {
    const newDynBookMapped = _cloneWithMappedKeys(newDynBookmarks);
    logInfo("dynBookMapped", newDynBookMapped);
    this._getAllIds((errMsg, ids = []) => {
      if (errMsg) return done(errMsg);
      const idsToRemove = this._getIdsToRemove(ids, newDynBookMapped);
      this._removeIds(idsToRemove);
      this._updateStorageItems(newDynBookMapped, done);
    });
  }

  /**
   * Returns list of tracked dbm ids
   */
  private _getAllIds(done: (error: string | null, ids?: string[]) => void) {
    this.storage.get([dbmIdsPropName], (result) => {
      if (!checkAndHandleError(done)) {
        const ids = result[dbmIdsPropName] || [];
        done(null, ids);
      }
    });
  }
  private _getIdsToRemove(
    dbmIds: string[] = [],
    newDynBookMapped: Record<string, DynamicBookmarkStorageItem> = {}
  ) {
    const idsToRemove = dbmIds.filter((key) => !(key in newDynBookMapped));
    return idsToRemove;
  }

  private _removeIds(idsToRemove: string[]) {
    logInfo("Removing ids: ", idsToRemove);
    if (idsToRemove.length > 0) {
      this.storage.remove(idsToRemove, () => checkAndHandleError());
    }
  }
  private _updateStorageItems(
    newDynBookMapped: Record<string, DynamicBookmarkStorageItem>,
    done: typeof logError
  ) {
    logInfo("Updating storage items to ", newDynBookMapped);
    const newKeys = Object.keys(newDynBookMapped);
    this.storage.set({ [dbmIdsPropName]: newKeys, ...newDynBookMapped }, () => {
      if (!checkAndHandleError(done)) {
        done(null);
      }
    });
  }

  /**
   * Adds `key` if it doesn't already exist to `dbm_ids`
   */
  private _addKeyToDbmIds(key: string, done: typeof logError) {
    this._getAllIds((errMsg, ids = []) => {
      if (errMsg) return done(errMsg);
      if (ids.includes(key)) {
        return done(null);
      }
      ids.push(key);
      this._setItem(dbmIdsPropName, ids, done);
    });
  }
  private _removeKeyFromDbmIds(key: string, done: typeof logError) {
    this._getAllIds((errMsg, ids) => {
      if (errMsg) return done(errMsg);
      const newIds = ids.filter((el) => el !== key);
      this._setItem(dbmIdsPropName, newIds, done);
    });
  }
  /**
   * Sets `item` as `{[key]: item}` in `storage`.
   */
  private _setItem<T>(
    key: string,
    item: T,
    done: (error: string | null, item?: T) => void
  ) {
    this.storage.set({ [key]: item }, () => {
      if (!checkAndHandleError(done)) {
        done(null, item);
      }
    });
  }
}

function _convertToBookmarkId(dbmId = "") {
  return dbmId.replace(/^dbm_/, "");
}
function _convertToDbmId(id: string) {
  if (/^dbm_.*/.test(id)) {
    return id;
  }
  return `dbm_${id}`;
}

function _cloneWithMappedKeys(obj = {}, keyMap = _convertToDbmId) {
  const retVal = {};
  for (const key in obj) {
    const dbmId = keyMap(key);
    retVal[dbmId] = obj[key];
  }
  return retVal;
}

export default new DynamicBookmarksManager();
