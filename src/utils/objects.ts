export function objectToArray<T extends object, K extends string>(obj: Record<string, T>, keyProperty: K) {
  return Object.keys(obj).reduce((acc, key) => {
    acc.push({ [keyProperty]: key, ...obj[key] } as (T & {[key in K]: string}));
    return acc;
  }, [] as (T & {[key in K]: string})[]);
}
