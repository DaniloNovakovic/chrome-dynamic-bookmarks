/**
 * Returns index of `item` in `array`.
 *
 * _If `item` is not found then it will returns `defaultValue`_
 */
export default function indexOfOrDefault<TValue>(
  array: TValue[] = [],
  item: TValue = null,
  defaultValue = -1,
): number {
  let index = array.indexOf(item);
  if (index < 0) {
    index = defaultValue;
  }
  return index;
}
