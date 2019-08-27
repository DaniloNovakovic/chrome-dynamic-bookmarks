///<reference path="../../../chrome.intellisense.js"/>

import { Migrator } from "./_migrator";
import * as dbm25x from "../_dbm-2.5.x";
import dbm260 from "../_dbm-2.6.0";

function _logError(errMsg) {
  if (errMsg) {
    console.error(errMsg);
  }
}

function _isMigrated(dynBook) {
  return Object.keys(dynBook).length == 0;
}

export class Migrator260 extends Migrator {
  up(done = _logError) {
    dbm25x.findAll((err, dynBook = {}) => {
      if (err) {
        return done(err);
      }
      if (_isMigrated(dynBook)) {
        return done(null);
      }
      dbm260.overwrite(dynBook, done);
      dbm25x.clearAll();
    });
  }
  down(done = _logError) {
    done(null);
  }
}

export default new Migrator260();
