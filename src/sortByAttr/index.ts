export {};
declare global {
  type SortDirection = "ASC" | "DESC";

  interface Array<T> {
    /**
     * Shorthand for sorting an array by a single comparable attribute. Additional options for sorting descending.
     *
     * Example
     * ```typescript
     * const lowestFirst = myArr.SortByArg(x => x.score);
     * const lowestFirst = myArr.SortByArg(x => x.score, "ASC");
     *
     * const highestFirst = myArr.SortByArg(x => x.score, "DESC");
     * ```
     */
    sortByAttr(
      callbackfn?: (value: T) => string | number,
      sortDirection?: SortDirection,
      thisArg?: any[]
    ): T[];
  }
}

Array.prototype.sortByAttr = function (func = x => x, sortDirection = "ASC", thisArg = this) {
  const sortVal = sortDirection === "ASC" ? 1 : -1;
  return thisArg.sort((a: any, b: any) => (func(a) > func(b) ? sortVal : -sortVal));
};
