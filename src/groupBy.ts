/**
 * This file does not contain a top level import or export and is by the typescript definition thus not a module, and instead treated like a script
 * whose content are available in the global scope. The 'declare global' statement seen in some other files (such as average.ts) isn't required (and cannot be 
 * placed here at all) since we by default work within the global scope.
 * https://www.typescriptlang.org/docs/handbook/modules.html
 * https://www.typescriptlang.org/docs/handbook/declaration-files/by-example.html
 */
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
