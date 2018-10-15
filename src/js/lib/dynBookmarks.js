const dynBookmarksPropName = 'dynBookmarks';

/**
 * finds dynBook object in hash map form: `{ bookmark_id: { regExp:String, history:[String] } }`
 * @param {function} done - callback function called with `done(error, dynBook)`
 */
export function findAll(done) {
  chrome.storage.sync.get([dynBookmarksPropName], (result) => {
    if (chrome.runtime.lastError) {
      done(chrome.runtime.lastError.message);
    } else {
      const dynBook = result[dynBookmarksPropName] || {};
      done(null, dynBook);
    }
  });
}

/**
 * finds dynBook[id] in form `{regExp:String, history: [String]}`
 * @param {string} id - id of dynamic bookmark
 * @param {function} done - callback function called with `done(error, dynBook[id])`
 */
export function findById(id, done) {
  findAll((err, dynBook) => {
    if (err) done(err);
    else done(null, dynBook[id]);
  });
}

/**
 * Updates dynamic bookmark with given id (creates one if it doesn't exist)
 * @param {string} id - id of dynamic bookmark
 * @param {object} options - `{regExp: String, history:[String]}`
 * @param {function} done - (optional) callback function called with done(error, updatedDynBook)
 */
export function findByIdAndUpdate(id, options, done) {
  findAll((err, dynBook) => {
    if (err) {
      if (typeof done == 'function') {
        done(err);
      } else {
        console.warn(err);
      }
    } else {
      dynBook[id] = {
        regExp: options.regExp || dynBook[id].regExp,
        history: options.history || dynBook[id].history
      };
      overwrite(dynBook, (err) => {
        if (typeof done == 'function') {
          if (err) done(err);
          else done(null, dynBook[id]);
        }
      });
    }
  });
}

/**
 * Overwrites dynamic bookmarks object from storage with `newDynBook`.
 * `Warning`: This function is DANGEROUS! Potential data loss!
 * @param {object} newDynBook - new dynamic bookmarks object in form `{bookmark_id: {regExp: String, history:[String]}}`
 * @param {function} done - callback function called with done(error)
 */
export function overwrite(newDynBook, done) {
  chrome.storage.sync.set({ [dynBookmarksPropName]: newDynBook }, () => {
    if (typeof done == 'function') {
      if (chrome.runtime.lastError) {
        done(chrome.runtime.lastError.message);
      } else {
        done(null);
      }
    }
  });
}
