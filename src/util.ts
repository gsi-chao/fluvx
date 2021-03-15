export function isPromise(val: any) {
  return val && typeof val.then === "function";
}

export function isEmpty(obj: unknown) {
  if (obj instanceof Object) {
    return Object.keys(obj).length === 0;
  }
  return !obj;
}
