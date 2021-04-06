import "../filterAndDelete";

declare global {
  interface Array<T> {
    /**
     * Shorthand for zipping two arrays together
     *
     * Examples:
     * ```typescript
     * const modelUserAges = userArr.zip(
     *   carArr,
     *   (u: User, c: Car) => u.id === c.ownerId,
     *   (u: User, c: Car) => ({ age: u.age, model: c.model})
     * );
     * ```
     */
    zip<U, V>(
      secondArr: U[],
      matchFunc: (t: T, u: U) => boolean,
      zipFunc: (t: T, u: U) => V,
      thisArg?: any[]
    ): V[];
  }
}

Array.prototype.zip = function (secondArr, matchFunc, zipFunc, thisArg = this) {
  const secondArrClone = [...secondArr];
  return thisArg.reduce((acc: any[], t: any) => {
    const matches = secondArrClone.filterAndDelete(u => matchFunc(t, u));

    acc.push(...matches.map(u => zipFunc(t, u)));

    return acc;
  }, []);
};
