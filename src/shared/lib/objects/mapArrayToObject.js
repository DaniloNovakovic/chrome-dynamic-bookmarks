export default function mapArrayToObject(ids = [], valueFactory = () => true) {
  let obj = {};
  for (let id of ids) {
    obj[id] = valueFactory(id);
  }
  return obj;
}
