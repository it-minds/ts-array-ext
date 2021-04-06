export {};
declare global {
  interface Array<T> {
    /**
     * A function that splits two arrays into three venn like sections.
     * leftSplit is the section for all items in the source array that do not have a match in the second array.
     * innerJoin is the zip between both arrays where two elements match.
     * rightSplit is the section of remaining items form the second array that did not have a match for the innerJoin.
     *
     * example:
     * ```typescript
     * const result = users.unionSplit(
     *   fruits,
     *   (user, fruit) => a.favoriteFruit === b.id,
     *   (user, fruit) => ({
     *     age: user.age,
     *     fruit: fruit.name
     *   })
     * );
     *
     * // leftSplit is the users who's favorite fruit does not exist in the fruits array.
     * // innerJoin is an object of users and their favorite fruit.
     * // rightSplit is the fruits that no user have as their favorite.
     * ```
     * @param this Source array of type T.
     * @param secondArr Secondary array to use of type U.
     * @param zip *optional.* Zip function to apply to the matches, defaults to return just the source item of type T.
     */
    unionSplit<U = T, V = T>(
      secondArr: Array<U>,
      comparator: (a: T, b: U) => boolean,
      zip?: (a: T, b: U) => V,
      thisArg?: any[]
    ): {
      leftSplit: T[];
      rightSplit: U[];
      innerJoin: V[];
    };
  }
}

Array.prototype.unionSplit = function (secondArr, comparator, zip = (t) => t, thisArg = this) {
  const checkedIndexesFromSecondArr: number[] = [];

  const leftSplit: any[] = [];
  const innerJoin: any[] = [];

  thisArg.forEach(t => {
    const index = secondArr.findIndex(u => comparator(t, u));

    if (index !== -1) {
      //Save index for later filtering
      checkedIndexesFromSecondArr.push(index);
      innerJoin.push(zip(t, secondArr[index]));

    } else {
      leftSplit.push(t);
    }
  });

  const rightSplit = secondArr.filter((_, i) => !checkedIndexesFromSecondArr.includes(i));

  return { leftSplit, innerJoin, rightSplit };
};
