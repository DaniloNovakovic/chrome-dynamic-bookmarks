export default function mapArrayToObject<TValue>(
  ids: string[] = [],
  valueFactory: (id: string) => TValue,
): Record<string, TValue> {
  const obj = {};
  for (const id of ids) {
    obj[id] = valueFactory(id);
  }
  return obj;
}
