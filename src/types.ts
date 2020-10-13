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
  average(
    callbackfn?: (value: T) => number,
    roundNum?: number | null,
    thisArg?: any[]
  ): number;

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
  median(
    callbackfn?: (value: T) => number,
    tieBreaker?: -1 | 1,
    thisArg?: any[]
  ): T;

  /**
   * Split an array into X amount of chunks.
   *
   * Optional force fairness that strips the array down so `% X === 0`
   *
   * Example:
   * ```typescript
   * const chunks = myArr.chunkByCount(5);
   * //If the arr contains 21 elements, the 21st element will be part of the first array.
   * const chunks = myArr.chunkByCount(5, true);
   * //If the arr contains 21 elements, the 21st element wont be part of the result here.
   * ```
   */
  chunkByCount(
    chunkCount: number,
    forceFairness?: boolean,
    thisArg?: any[]
  ): T[][];

  /**
   * Split an array into an amount of chunks depending on size.
   *
   * Optional force fairness that distributes elements into "fair" groups.
   * The this paramter treatChunkSizeAsMax prevents the force fairness from distributing
   * elements into groups at the request size.
   *
   * Example:
   * ```typescript
   * const chunks = myArr.chunkBySize(5);
   * // If the arr contains 21 elements, the 21st element will be alone in its own array.
   * // Sizes of the different arrays: `5,5,5,5,1`
   * const chunks = myArr.chunkBySize(5, true);
   * // If the arr contains 21 elements, the 21st element will pe part of the first array.
   * // Sizes of the different arrays: `6,5,5,5`
   * const chunks = myArr.chunkBySize(5, true, true);
   * // If the arr contains 21 elements, all elements will be distributed evenly into 5 groups.
   * // Sizes of the different arrays: `5,4,4,4,4`
   * ```
   */
  chunkBySize(
    chunkSize: number,
    forceFairness?: boolean,
    treatChunkSizeAsMax?: boolean,
    thisArg?: any[]
  ): T[][];

  /**
   * Given a predicate of finding an element and another element to take its place.
   * Mutates the array and returns the found (old) element.
   * If no element is found using the predicate the new element will not be added to the array, except if the addIfNotFound arg is true.
   *
   * @param addIfNotFound If true, the new element will be added at the end of the array, if the old element wasn't found.
   *
   * Example:
   * ```typescript
   * const oldElement = myArr.findAndReplace(x => x.score === 100, new Score())
   * ```
   *
   * Example: User is added, if it doesn't already exist.
   * ```typescript
   * const user = {id: 2, name: "Paul"};
   * const oldElement = myArr.findAndReplace(x => x.id === 2, user, true);
   * ```
   */
  findAndReplace(
    predicate: (value: T, index: number, obj: T[]) => boolean,
    replaceVal: T | ((t?: T) => T),
    addIfNotFound?: boolean,
    thisArg?: any[]
  ): T;

  /**
   * Avoid having to fiddle with promise accumulator and resolution in a .reduce.
   *
   *
   *
   * Example: (a map would be better here - sue me)
   * ```typescript
   * const resultProm = myArr.reduceAsync<ExtendedScore[]>(async (acc, cur) => {
   *   const addOnAttr = await new Promise<string>(resolve =>
   *     setTimeout(() => resolve(Date.now().toString(24)), 5)
   *   );
   *
   *   (cur as ExtendedScore).fetchedAttr = addOnAttr;
   *
   *   return [...acc, cur as ExtendedScore];
   * }, []);
   * ```
   */
  reduceAsync<U = T>(
    callbackfn: (
      previousValue: U,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => Promise<U>,
    initialVal: U,
    thisArg?: any[]
  ): Promise<U>;

  unionSplit<U = T>(
    secondArr: Array<U>,
    comparator: (a: T, b: U) => boolean,
    thisArg?: any[]
  ): {
    leftSplit: T[];
    rightSplit: U[];
    innerJoin: T[];
  };
}
