interface Array<T> {
  /**
   * Shorthand for creating a dictionary object with the key
   *
   * Examples:
   * ```typescript
   * const scoreInIntervals = myArr.groupBy(x => Math.floor(x.score / 100) * 100);
   * const maxScoreInEachInterval = Object.values(myArr.groupBy(
   *   x => Math.floor(x.score / 100) * 100,
   *   arr => arr.max(x => x.score)
   * ));
   * ```
   */
  groupBy<K extends keyof T, R = T[]>(
    callback: (value: T) => T[K],
    func?: (value: T[]) => R,
    thisArg?: any[]
  ): Record<T[K] extends string ? T[K] : string, R>;
}

Array.prototype.groupBy = function (callback, func?, thisArg = this) {
  const groupArr = thisArg.reduce((acc, element) => {
    const key = callback(element);
    if (acc[key] !== undefined) {
      acc[key].push(element);
    } else {
      acc[key] = [element];
    }
    return acc;
  }, {});

  if (func) {
    Object.keys(groupArr).forEach(key => {
      groupArr[key] = func(groupArr[key]);
    });
  }

  return groupArr;
};
