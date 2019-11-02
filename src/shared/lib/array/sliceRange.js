/**
 * Slices array in closed interval `[fromIndex, toIndex]`
 *
 * _If `fromIndex > toIndex` then it will slice by `[toIndex, fromIndex]`_
 */
export default function sliceRange(array = [], fromIndex = 0, toIndex = 0) {
  return fromIndex < toIndex
    ? array.slice(fromIndex, toIndex + 1)
    : array.slice(toIndex, fromIndex + 1);
}
