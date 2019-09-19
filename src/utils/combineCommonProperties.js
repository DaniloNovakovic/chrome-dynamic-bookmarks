/**
 * For object `{A:{propA}, B:{propB}}` and `{A:{propA2}, C:{propC}}` returns `{A:{propA, propA2}}`
 */
export function combineCommonProperties(lhs = {}, rhs = {}) {
  let retVal = {};
  for (let key in lhs) {
    if (!(key in rhs)) {
      continue;
    }
    retVal[key] = {
      ...lhs[key],
      ...rhs[key]
    };
  }
  return retVal;
}

export default combineCommonProperties;
