export function isFunction<T>(val: T | ((t?: T) => T)): val is (t?: T) => T {
  return typeof val === "function";
}
