///<reference path="../../../chrome.intellisense.js"/>

import { Migrator } from "./_migrator";
import * as dbm25x from "../_dbm-2.5.x";
import dbm260 from "../_dbm-2.6.0";

export class Migrator260 extends Migrator {
  up() {
    dbm25x.findAll((err, dynBook = {}) => {
      if (err) {
        return console.warn(err);
      }
    });
  }
  down() {}
}

export default new Migrator260();
