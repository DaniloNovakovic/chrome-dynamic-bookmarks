import { Migrator } from "./_migrator";
import * as dbm_2_5 from "../lib/_dbm-2.5.x";

export class Migrator260 extends Migrator {
  up() {
    dbm_2_5.findAll((err, dynBook) => {});
  }
  down() {}
}

export default new Migrator260();
