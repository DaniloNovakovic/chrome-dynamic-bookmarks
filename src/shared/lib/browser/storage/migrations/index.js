import { Migrator260 } from "./_migration-2.6.0";

/**
 * Used to migrate data to new storage when updating application
 */
export function migrateStorage() {
  console.log("Running migrations...");
  try {
    let migrator_260 = new Migrator260();
    migrator_260.up(err => {
      if (err) {
        console.error(err);
      } else {
        console.log("Finished migrating the data to 2.6.x storage.");
      }
    });
  } catch (e) {
    console.error(e);
  }
}
