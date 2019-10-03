///<reference path="../../chrome.intellisense.js"/>

import * as dbm25x from "../_dbm-2.5.x";
import dbm260 from "../_dbm-2.6.0";
import { logError } from "shared/lib/log";

function _isMigrated(dynBook) {
  return Object.keys(dynBook).length == 0;
}

export class Migrator260 {
  up(done = logError) {
    console.log("Running 2.6.0 migration...");
    dbm25x.findAll((err, dynBook = {}) => {
      if (err) {
        return done(err);
      }
      if (_isMigrated(dynBook)) {
        console.log("Data is already migrated.");
        return done(null);
      }
      this._moveToNewStorage(dynBook, done);
    });
  }
  _moveToNewStorage(dynBook, done) {
    dbm260.overwrite(dynBook, errMsg => {
      if (errMsg) {
        return done(errMsg);
      }
      console.log("Finished moving data to new storage.");
      this._removeOldStorage(done);
    });
  }

  _removeOldStorage(done) {
    console.log("Removing old storage...");
    dbm25x.clearAll(errMsg => {
      if (errMsg) {
        return done(errMsg);
      }
      done(null);
    });
  }
}

export default new Migrator260();
