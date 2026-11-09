import isObjectEmpty from "@/shared/lib/objects/isObjectEmpty";

import getCurrentBrowser from "../../getCurrentBrowser";
import { logError, logInfo } from "../../log";
import { DynamicBookmarksManager } from "../DynamicBookmarksManager";

const browser = getCurrentBrowser();

const migrateStorageToLocal = (done = logError) => {
  const localStorageManager = new DynamicBookmarksManager(
    browser.storage.local,
  );
  const syncStorageManager = new DynamicBookmarksManager(browser.storage.sync);

  // checks if it's migrated already
  localStorageManager.findAll((localError, localBookmarksMap) => {
    const isMigrated = !isObjectEmpty(localBookmarksMap);
    if (localError) {
      done(localError);
      return;
    }
    if (isMigrated) {
      logInfo("Data already migrated, skipping migration...");
      done(null);
      return;
    }

    // fetches the data from sync storage
    syncStorageManager.findAll((syncError, syncBookmarksMap) => {
      if (syncError) {
        done(syncError);
        return;
      }

      // sets the data in local storage
      localStorageManager.overwrite(syncBookmarksMap, (localOverwriteError) => {
        if (localOverwriteError) {
          done(localOverwriteError);
          return;
        }

        // clears the data from sync storage
        syncStorageManager.overwrite({}, done);
      });
    });
  });
};

export default migrateStorageToLocal;
