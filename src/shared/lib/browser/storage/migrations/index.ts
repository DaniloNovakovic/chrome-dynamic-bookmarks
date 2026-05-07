import { logError, logInfo } from "@/shared/lib/browser/log";

import migrateStorageToLocal from "./migrateStorageToLocal";

/**
 * Used to migrate data to new storage when updating application
 */
export function migrateStorage() {
  logInfo("Running migrations...");
  try {
    migrateStorageToLocal((err) => {
      if (err) {
        logError(err);
      } else {
        logInfo("Finished migrating the data to local storage.");
      }
    });
  } catch (e) {
    logError(e instanceof Error ? e.message : String(e));
  }
}
