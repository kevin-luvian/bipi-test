export function typeOrUndefined(value: any, type: string) {
  if (typeof value !== type) {
    return undefined;
  } else {
    return value;
  }
}

export function ifNullDefault<T>(value: any, def: T) {
  if (typeof def !== typeof value) {
    return def;
  }

  if (value == null || value == undefined) {
    return def;
  }

  return value;
}
