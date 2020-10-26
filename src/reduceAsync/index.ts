export {};
declare global {
  interface Array<T> {
    /**
     * Avoid having to fiddle with promise accumulator and resolution in a .reduce.
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
  }
}

Array.prototype.reduceAsync = function (callback, initialVal, thisArg = this) {
  const prom = thisArg.reduce(async (accProm, cur, i, arr) => {
    const acc = await accProm;
    return await callback(acc, cur, i, arr);
  }, Promise.resolve(initialVal));

  return prom;
};
