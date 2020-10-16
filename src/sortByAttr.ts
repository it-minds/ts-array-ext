const sortByAttr: <T>(
    callbackfn?: (value: T) => string | number,
    sortDirection?: SortDirection,
    thisArg?: any[]
) => T[] = function (func = x => (x as unknown) as string | number, sortDirection = "ASC", thisArg = this) {
    const sortVal = sortDirection === "ASC" ? 1 : -1;
    return thisArg.sort((a: any, b: any) => (func(a) > func(b) ? sortVal : -sortVal));
};

/**
 * Shorthand for sorting an array by a single comparable attribute. Additional options for sorting descending.
 *
 * Example
 * ```typescript
 * const lowestFirst = myArr.SortByArg(x => x.score);
 * const lowestFirst = myArr.SortByArg(x => x.score, 0);
 *
 * const highestFirst = myArr.SortByArg(x => x.score, 1);
 * ```
 */
Array.prototype.sortByAttr = sortByAttr;