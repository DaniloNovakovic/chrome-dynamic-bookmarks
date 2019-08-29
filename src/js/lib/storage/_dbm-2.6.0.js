///<reference path="../../chrome.intellisense.js"/>

import { DynBookRepository } from "./_dbm-repository";
export const dbmIdsPropName = "dbm_ids";

function _convertToDbmId(id) {
  if (/^dbm_\d+$/.test(id)) {
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

/**
 * Checks if there is an error, if found calls callback function and returns `true` else `false`
 * @param {function} onErrorFound - callback to call if error was found
 */
function _checkAndHandleError(onErrorFound = errMsg => console.error(errMsg)) {
  if (chrome.runtime.lastError) {
    onErrorFound(chrome.runtime.lastError.message);
    return true;
  }
  return false;
}

class Dbm260 {
  constructor(storage = chrome.storage.sync) {
    this.storage = storage;
  }
  create({ id = "", regExp = "", history = [] }, done) {}
  overwrite(newDynBook = {}, done) {
    const newDynBookMapped = _cloneWithMappedKeys(newDynBook);
    console.log("dynBookMapped", newDynBookMapped);
    this.storage.get([dbmIdsPropName], response => {
      if (_checkAndHandleError()) {
        return;
      }
      const idsToRemove = this._getIdsToRemove(response, newDynBookMapped);
      this._removeIds(idsToRemove);
      this._updateStorageItems(newDynBookMapped, done);
    });
  }

  _updateStorageItems(newDynBookMapped, done) {
    console.log("Updating storage items to ", newDynBookMapped);
    const newKeys = Object.keys(newDynBookMapped);
    this.storage.set({ [dbmIdsPropName]: newKeys, ...newDynBookMapped }, () => {
      if (_checkAndHandleError(done)) {
        return;
      } else {
        done(null);
      }
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
      this.storage.remove(idsToRemove, () => _checkAndHandleError());
    }
  }
}

export default new Dbm260();
