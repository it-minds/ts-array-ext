const median: <T>(
  callbackfn?: (value: T) => number,
  tieBreaker?: -1 | 1,
  thisArg?: any[]
) => T = function (func = x => (x as unknown) as number, tieBreaker = -1, thisArg = this) {
  const sorted = thisArg.sortByAttr(func, "ASC", thisArg);
  const middle = sorted.length / 2;
  if (Number.isInteger(middle)) return sorted[middle];

  return sorted[tieBreaker < 0 ? Math.floor(middle) : Math.ceil(middle)];
};

/**
 * Shorthand for finding element with median value of an attribute.
 * Tiebreaker option is available for even length ranges. Defaults by taking the **lower** of the two.
 *
 * @returns The entire element found. So if you write `x => x.score` x is returned.
 *
 * Examples:
 * ```typescript
 * const medianScore = myArr.median(x => x.score);
 * const medianScore = myArr.median(x => x.score, 1);
 * const medianScore = myArr.median(x => x.score, -1);
 * ```
 */
Array.prototype.median = median;
