/** Adapter **/

import dbm from "./storage/_dbm-2.6.0";

export function findAll(done) {
  dbm.findAll(done);
}

export function create(props, done) {
  dbm.create(props, done);
}

export function findByIdAndRemove(id, done) {
  dbm.findByIdAndRemove(id, done);
}

export function findByIdAndUpdate(id, options, done) {
  dbm.findByIdAndUpdate(id, options, done);
}

export function findById(id, done) {
  dbm.findById(id, done);
}

export function overwrite(newDynBook, done) {
  dbm.overwrite(newDynBook, done);
}
