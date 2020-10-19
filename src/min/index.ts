interface Array<T> {
  /**
   * Shorthand for finding element with minimum value of an attribute.
   *
   * @returns The entire element found. So if you write `x => x.score` x is returned.
   *
   * Examples:
   * ```typescript
   * const minScore = myArr.min(x => x.score);
   * const minScore = [1,2,3].min();
   * ```
   */
  min(callbackfn?: (value: T) => number, thisArg?: any[]): T;
}

Array.prototype.min = function (func = x => x, thisArg = this) {
  return thisArg.sortByAttr(func, "ASC", thisArg)[0];
};
