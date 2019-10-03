///<reference path="../chrome.intellisense.js"/>
import { logError } from "shared/lib/log";

export const dynBookmarksPropName = "dynBookmarks";

/**
 * finds dynBook object in hash map form: `{ bookmark_id: { regExp:String, history:[String] } }`
 * @param {function} done - callback function called with `done(error, dynBook)`
 */
export function findAll(done = logError) {
  chrome.storage.sync.get([dynBookmarksPropName], result => {
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
 * @param {function} done - callback function called with `done(error, dynBookItem)`
 */
export function findById(id, done = logError) {
  findAll((err, dynBook) => {
    if (err) done(err);
    else done(null, dynBook[id]);
  });
}

/**
 * Updates dynamic bookmark with given id (creates one if it doesn't exist)
 * @param {string} id - id of dynamic bookmark
 * @param {object} options - `{regExp: String, history:[String]}`
 * @param {function} done - (optional) callback function called with done(error, updatedDynBookItem)
 */
export function findByIdAndUpdate(id, options, done = logError) {
  findAll((err, dynBook) => {
    if (err) {
      if (typeof done == "function") {
        done(err);
      } else {
        console.warn(err);
      }
    } else {
      dynBook[id] = {
        regExp: options.regExp || dynBook[id].regExp,
        history: options.history || dynBook[id].history
      };
      overwrite(dynBook, err => {
        if (typeof done == "function") {
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
export function overwrite(newDynBook, done = logError) {
  chrome.storage.sync.set({ [dynBookmarksPropName]: newDynBook }, () => {
    if (typeof done == "function") {
      if (chrome.runtime.lastError) {
        done(chrome.runtime.lastError.message);
      } else {
        done(null);
      }
    }
  });
}

/**
 * Creates dynBookmark item and sets it into the storage
 * @param {object} props - `{id:String, regExp:String, history:[String] (optional)}`
 * @param {function} done - callback function called with (err, createdItem)
 */
export function create(props, done = logError) {
  if (!props.id || !props.regExp) {
    done("id or regExp props are missing in dynBookmarks.create!");
  }
  findByIdAndUpdate(
    props.id,
    {
      regExp: props.regExp,
      history: props.history || []
    },
    done
  );
}

export function findByIdAndRemove(id, done = logError) {
  findAll((err, dynBook) => {
    if (err) {
      if (typeof done == "function") {
        done(err);
      } else {
        console.warn(err);
      }
    } else if (dynBook[id]) {
      delete dynBook[id];
      overwrite(dynBook, done);
    }
  });
}

/**
 * Removes DynBookmarks object from `chrome.storage.sync`
 * @param {function} done - callback function called with `done(errMsg)`
 */
export function clearAll(done = logError) {
  chrome.storage.sync.remove([dynBookmarksPropName], () => {
    if (chrome.runtime.lastError) {
      done(chrome.runtime.lastError.message);
    } else {
      done(null);
    }
  });
}
