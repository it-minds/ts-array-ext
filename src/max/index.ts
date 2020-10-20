import "../sortByAttr";

declare global {
  interface Array<T> {
    /**
     * Shorthand for finding element with maximum value of an attribute.
     *
     * @returns The entire element found. So if you write `x => x.score` x is returned.
     *
     * Examples:
     * ```typescript
     * const maxScore = myArr.max(x => x.score);
     * const maxScore = [1,2,3].max();
     * ```
     */
    max(callbackfn?: (value: T) => number, thisArg?: any[]): T;
  }
}

Array.prototype.max = function (func = x => x, thisArg = this) {
  return thisArg.sortByAttr(func, "DESC", thisArg)[0];
};
