/**
 * For object `{A:{propA}, B:{propB}}` and `{A:{propA2}, C:{propC}}` returns `{A:{propA, propA2}, B:{propB}, C:{propC}}`
 */
export function combineProps(lhs = {}, rhs = {}) {
  return {
    ...lhs,
    ...rhs,
    ..._combineCommonProps(lhs, rhs)
  };
}

/**
 * For object `{A:{propA}, B:{propB}}` and `{A:{propA2}, C:{propC}}` returns `{A:{propA, propA2}}`
 */
function _combineCommonProps(lhs, rhs) {
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
export default combineProps;
