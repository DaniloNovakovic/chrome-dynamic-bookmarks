import migrator_260 from "./_migration-2.6.0";

/**
 * Used to migrate data to new storage when updating application
 */
export function migrate() {
  migrator_260.up();
}
