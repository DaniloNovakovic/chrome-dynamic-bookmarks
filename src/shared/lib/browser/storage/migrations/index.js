import { Migrator260 } from "./_migration-2.6.0";
import { logError, logInfo } from "shared/lib/browser/log";

/**
 * Used to migrate data to new storage when updating application
 */
export function migrateStorage() {
  logInfo("Running migrations...");
  try {
    let migrator_260 = new Migrator260();
    migrator_260.up(err => {
      if (err) {
        logError(err);
      } else {
        logInfo("Finished migrating the data to 2.6.x storage.");
      }
    });
  } catch (e) {
    logError(e);
  }
}
