export function splitKey<KeyIndexType extends number = number>(
  dndKey: string,
): [keyType: string, keyIndex: KeyIndexType] {
  const [keyType, keyIndex] = dndKey.split('-');
  return [keyType, +keyIndex as KeyIndexType];
}
