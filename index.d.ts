interface Array<T> {
  sum(callbackfn: (value: T) => number, thisArg?: any): number;

  groupBy<K extends keyof T>(
    callbackfn: (value: T) => T[K],
    sort?: (a: T, b: T) => number,
    thisArg?: any
  ): Map<T[K], T[]>;
}
