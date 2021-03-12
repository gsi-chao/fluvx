export function isPromise(val: Promise<unknown>) {
  return val && typeof val.then === "function";
}
