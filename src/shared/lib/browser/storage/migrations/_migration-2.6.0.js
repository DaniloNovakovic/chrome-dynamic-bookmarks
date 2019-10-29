import * as dbm25x from "../_dbm-2.5.x";
import dbm260 from "../_dbm-2.6.0";
import { logError, logInfo } from "shared/lib/browser/log";

function _isMigrated(dynBook) {
  return Object.keys(dynBook).length == 0;
}

export class Migrator260 {
  up(done = logError) {
    logInfo("Running 2.6.0 migration...");
    dbm25x.findAll((err, dynBook = {}) => {
      if (err) {
        return done(err);
      }
      if (_isMigrated(dynBook)) {
        logInfo("Data is already migrated.");
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
      logInfo("Finished moving data to new storage.");
      this._removeOldStorage(done);
    });
  }

  _removeOldStorage(done) {
    logInfo("Removing old storage...");
    dbm25x.clearAll(errMsg => {
      if (errMsg) {
        return done(errMsg);
      }
      done(null);
    });
  }
}

export default new Migrator260();
