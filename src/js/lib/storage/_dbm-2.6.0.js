///<reference path="../../chrome.intellisense.js"/>
import { logError, checkAndHandleError } from "../../utils/log";
export const dbmIdsPropName = "dbm_ids";

class Dbm260 {
  constructor(storage = chrome.storage.sync) {
    this.storage = storage;
  }

  /**`
   * @param {function} done - callback function called with `done(error, dynBook)`
   */
  findAll = done => {};

  /**
   * @param {string} id - id of dynamic bookmark
   * @param {function} done - callback function called with `done(error, dynBookItem)`
   */
  findById = (id, done) => {
    const key = _convertToDbmId(id);
    this.storage.get([key], result => {
      if (!checkAndHandleError(done)) {
        done(null, result[key]);
      }
    });
  };

  /**
   * @param {string} id - id of dynamic bookmark
   * @param {function} done - callback function called with `done(error)`
   */
  findByIdAndRemove = (id, done) => {
    const key = _convertToDbmId(id);
    this.storage.remove([key], () => {
      if (!checkAndHandleError(done)) {
        done(null);
      }
    });
  };

  /**
   * @param {string} id - id of dynamic bookmark
   * @param {object} options - `{regExp: String, history:[String]}`
   * @param {function} done - (optional) callback function called with `done(error, updatedDynBookItem)`
   */
  findByIdAndUpdate = (id, { regExp, history }, done) => {
    const key = _convertToDbmId(id);
    this.findById(key, (errMsg, item) => {
      if (errMsg) return done(errMsg);
      item = {
        regExp: regExp || item.regExp,
        history: history || item.history
      };
      this._setItem(key, item, done);
    });
  };

  create({ id = "", regExp = "", history = [] }, done) {
    const key = _convertToDbmId(id);
    this._setItem(key, { regExp, history }, done);
  }
  /**
   * Overwrites dynamic bookmarks object from storage with `newDynBook`.
   * `Warning`: This function is DANGEROUS! Potential data loss!
   * @param {object} newDynBook - new dynamic bookmarks object in form `{bookmark_id: {regExp: String, history:[String]}}`
   * @param {function} done - callback function called with done(error)
   */
  overwrite(newDynBook = {}, done) {
    const newDynBookMapped = _cloneWithMappedKeys(newDynBook);
    console.log("dynBookMapped", newDynBookMapped);
    this.storage.get([dbmIdsPropName], response => {
      if (checkAndHandleError()) {
        return;
      }
      const idsToRemove = this._getIdsToRemove(response, newDynBookMapped);
      this._removeIds(idsToRemove);
      this._updateStorageItems(newDynBookMapped, done);
    });
  }

  _getIdsToRemove(response, newDynBookMapped) {
    const dbmIds = response[dbmIdsPropName] || [];
    const idsToRemove = dbmIds.filter(key => !(key in newDynBookMapped));
    return idsToRemove;
  }

  _removeIds(idsToRemove) {
    console.log("Removing ids: ", idsToRemove);
    if (idsToRemove.length > 0) {
      this.storage.remove(idsToRemove, () => checkAndHandleError());
    }
  }
  _updateStorageItems(newDynBookMapped, done) {
    console.log("Updating storage items to ", newDynBookMapped);
    const newKeys = Object.keys(newDynBookMapped);
    this.storage.set({ [dbmIdsPropName]: newKeys, ...newDynBookMapped }, () => {
      if (!checkAndHandleError(done)) {
        done(null);
      }
    });
  }

  /**
   * Adds `key` if it doesn't already exist to `dbm_ids`
   * @param {string} key - Key to add
   * @param {function} done - Callback function called with `done(errMsg)`
   */
  _addKeyToDbmIds(key, done) {
    this.storage.get([dbmIdsPropName], result => {
      if (checkAndHandleError(done)) {
        return;
      }
      let ids = result[dbmIdsPropName] || [];
      if (ids.includes(key)) {
        return done(null);
      }
      ids.push(key);
      this._setItem(dbmIdsPropName, ids, done);
    });
  }

  /**
   * Sets `item` as `{[key]: item}` in `storage`.
   * @param {function} done - callback function called with `done(errMsg, storageItem)`
   */
  _setItem(key, item, done) {
    this.storage.set({ [key]: item }, () => {
      if (!checkAndHandleError(done)) {
        this._addKeyToDbmIds(key, errMsg => {
          done(errMsg, item);
        });
      }
    });
  }
}

function _convertToDbmId(id) {
  if (/^dbm_.*/.test(id)) {
    return id;
  }
  return `dbm_${id}`;
}

function _cloneWithMappedKeys(obj = {}, keyMap = _convertToDbmId) {
  let retVal = {};
  for (let key in obj) {
    let dbmId = keyMap(key);
    retVal[dbmId] = obj[key];
  }
  return retVal;
}

export default new Dbm260();
