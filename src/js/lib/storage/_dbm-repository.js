export class DynBookRepository {
  /**
   * @param {object} props - `{id:String, regExp:String, history:[String] (optional)}`
   * @param {function} done - callback function called with (err, createdItem)
   */
  create = (props, done) => {};

  /**`
   * @param {function} done - callback function called with `done(error, dynBook)`
   */
  findAll = done => {};

  /**
   * @param {string} id - id of dynamic bookmark
   * @param {function} done - callback function called with `done(error, dynBookItem)`
   */
  findById = (id, done) => {};

  /**
   * @param {string} id - id of dynamic bookmark
   * @param {function} done - callback function called with `done(error)`
   */
  findByIdAndRemove = (id, done) => {};

  /**
   * @param {string} id - id of dynamic bookmark
   * @param {object} options - `{regExp: String, history:[String]}`
   * @param {function} done - (optional) callback function called with `done(error, updatedDynBookItem)`
   */
  findByIdAndUpdate = (id, options, done) => {};

  /**
   * @param {object} newDynBook - new dynamic bookmarks object in form `{bookmark_id: {regExp: String, history:[String]}}`
   * @param {function} done - callback function called with `done(error)`
   */
  overwrite = (newDynBook, done) => {};
}

export default DynBookRepository;
