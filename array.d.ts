declare const enum SortDirection {
  ASC = 0,
  DESC = 1
}

interface Array<T> {
  /**
   * Shorthand for sorting an array by a single comparable attribute. Additional options for sorting descending.
   *
   * Example
   * ```typescript
   * const lowestFirst = myArr.SortByArg(x => x.score);
   * const lowestFirst = myArr.SortByArg(x => x.score, SortDirection.ASC);
   * const lowestFirst = myArr.SortByArg(x => x.score, 0);
   *
   * const highestFirst = myArr.SortByArg(x => x.score, SortDirection.DESC);
   * const highestFirst = myArr.SortByArg(x => x.score, 1);
   * ```
   */
  sortByAttr(
    callbackfn?: (value: T) => string | number,
    sortDirection?: SortDirection,
    thisArg?: any[]
  ): T[];

  /**
   * Shorthand for shuffling an array.
   *
   * Examples:
   * ```typescript
   * const randomMyArr = myArr.shuffle();
   * ```
   */
  shuffle(thisArg?: any[]): T[];

  /**
   * Shorthand for creating a summation by a single attribute
   *
   * Examples:
   * ```typescript
   * const totalScore = myArr.sum(x => x.score);
   * const totalScore = [1,2,3].sum();
   * ```
   */
  sum(callbackfn?: (value: T) => number, thisArg?: any[]): number;

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

  /**
   * Shorthand for creating an average by a single attribute
   *
   * Examples:
   * ```typescript
   * const averageScore = myArr.average(x => x.score);
   * // Can also be used on arrays of numbers
   * const averageScore = [1,2,3].average(); // returns 2
   * ```
   */
  average(callbackfn?: (value: T) => number, thisArg?: any[]): number;

  /**
   * Shorthand for finding element with minimum value of an attribute.
   *
   * Examples:
   * ```typescript
   * const minScore = myArr.min(x => x.score);
   * const minScore = [1,2,3].min();
   * ```
   */
  min(callbackfn?: (value: T) => number, thisArg?: any[]): T;

  /**
   * Shorthand for finding element with maximum value of an attribute.
   *
   * Examples:
   * ```typescript
   * const maxScore = myArr.max(x => x.score);
   * const maxScore = [1,2,3].max();
   * ```
   */
  max(callbackfn?: (value: T) => number, thisArg?: any[]): T;

  /**
   * Shorthand for finding element with median value of an attribute.
   * Tiebreaker option is available for even length ranges. Defaults by taking the **lower** of the two.
   *
   * Examples:
   * ```typescript
   * const medianScore = myArr.median(x => x.score);
   * const medianScore = myArr.median(x => x.score, 1);
   * const medianScore = myArr.median(x => x.score, -1);
   * ```
   */
  median(
    callbackfn?: (value: T) => number,
    tieBreaker?: -1 | 1,
    thisArg?: any[]
  ): T;

  chunkByCount(
    chunkCount: number,
    forceFariness?: boolean,
    thisArg?: any[]
  ): T[][];

  chunkBySize(
    chunkSize: number,
    forceFariness?: boolean,
    treatChunkSizeAsMax?: boolean,
    thisArg?: any[]
  ): T[][];
}
