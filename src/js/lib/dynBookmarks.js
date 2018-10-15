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
      chrome.storage.sync.set({ [dynBookmarksPropName]: dynBook }, () => {
        if (typeof done == 'function') {
          if (chrome.runtime.lastError) {
            done(chrome.runtime.lastError.message);
          } else {
            done(null, dynBook[id]);
          }
        }
      });
    }
  });
}

/**
 * Overwrites dynamic bookmarks object from storage with `newDynBook`.
 * `Warning`: This function is DANGEROUS! Potential data loss!
 * `Note`: For safety reason it will test if the provided object is in valid format
 * @param {object} newDynBook - new dynamic bookmarks object in form `{bookmark_id: {regExp: String, history:[String]}}`
 * @param {function} done - callback function called with done(error)
 */
export function overwrite(newDynBook, done) {
  // tests if new DynBook is in valid format
  try {
    for (let propName in newDynBook) {
      if (typeof newDynBook[propName].regExp != 'string') {
        return done('newDynBook[propName] should have regExp string field!');
      }
      if (!Array.isArray(newDynBook[propName].history)) {
        return done('newDynBook[propName] should have history array field!');
      }
    }
  } catch (err) {
    if (typeof done == 'function') {
      done(err.message);
    }
  }

  chrome.storage.sync.set({ [dynBookmarksPropName]: dynBook }, () => {
    if (typeof done == 'function') {
      if (chrome.runtime.lastError) {
        done(chrome.runtime.lastError.message);
      } else {
        done(null);
      }
    }
  });
}
