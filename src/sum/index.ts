export {};
declare global {
  interface Array<T> {
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
  }
}

Array.prototype.sum = function (func = x => (x as unknown) as number, thisArg = this) {
  return thisArg.reduce<number>((acc, t: any) => acc + func(t), 0);
};
