const max: <T>(callbackfn?: (value: T) => number, thisArg?: any[]) => T = function (
  func = x => (x as unknown) as number,
  thisArg = this
) {
  return thisArg.sortByAttr(func, "DESC", thisArg)[0];
};

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
Array.prototype.max = max;
