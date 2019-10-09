/**
 * Returns a copy of `item` object but with `key` property removed (immutable).
 */
export default function removeProp(item, key) {
  const { [key]: toRemove, ...others } = item;
  return others;
}
