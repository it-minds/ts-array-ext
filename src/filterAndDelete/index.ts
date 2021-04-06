export {};
declare global {
  interface Array<T> {
    /**
     * Returns the elements of an array that meet the condition specified in a callback function
     * and removes those element from the source array.
     * *NOTE* This function is not immutable.
     *
     *
     * @param predicate A function that accepts up to three arguments.
     * The filter method calls the predicate function one time for each element in the array.
     * @param thisArg An object to which the this keyword can refer in the predicate function.
     */
    filterAndDelete: (
      predicate: (value: T, index?: number, array?: T[]) => boolean,
      thisArg?: T[]
    ) => T[];
  }
}

Array.prototype.filterAndDelete = function (func, thisArg = this) {
  const len = this.length >>> 0,
    res = new Array(len);

  let c = 0;

  for (let index = 0; index < thisArg.length; index++) {
    if (func.call(thisArg, thisArg[index], index, thisArg)) {
      res[c++] = thisArg.splice(index--, 1)[0];
    }
  }

  res.length = c; // shrink down array to proper size
  return res;
};
