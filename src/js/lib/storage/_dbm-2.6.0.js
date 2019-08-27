///<reference path="../../chrome.intellisense.js"/>

import { DynBookRepository } from "./_dbm-repository";
export const dbmIdsPropName = "dbm_ids";

function _convertToDbmId(id) {
  return `dbm_${id}`;
}

class Dbm260 extends DynBookRepository {
  constructor() {
    this.storage = chrome.storage.sync;
  }
  create({ id = "", regExp = "", history = [] }, done) {}
}

export default new Dbm260();
