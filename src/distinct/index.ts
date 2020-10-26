export {};
declare global {
  interface Array<T> {
    /**
     * Produce an array with distinct elements based on a single comparable attribute.
     * Example
     * ```typescript
     * const arr = ["banana", "strawberry", "lemon", "banana", "strawberry", "lemon", "banana", "strawberry", "lemon"];
     * const res = arr.distinct();
     *
     * const arr = [{ id: 0, fruit: "banana" }, { id: 1, fruit: "strawberry" }, { id: 2, fruit: "lemon" }];
     * const res = arr.distinct(x => x.fruit);
     * ```
     */
    distinct(callbackfn?: (value: T) => string | number | symbol, thisArg?: any[]): T[];
  }
}

Array.prototype.distinct = function (func = x => x, thisArg = this) {
  let term: string | number | symbol;

  return thisArg.filter((element, index, arr) => {
    term = func(element);
    return arr.findIndex(item => term === func(item)) === index;
  });
};
