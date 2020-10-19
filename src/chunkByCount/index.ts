import { Exception_OutOfBounds } from "../utils/customErrors";

declare global {
  interface Array<T> {
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
    chunkByCount(chunkCount: number, forceFairness?: boolean, thisArg?: any[]): T[][];
  }
}

Array.prototype.chunkByCount = function (chunkCount, forceFairness = false, thisArg = this) {
  if (chunkCount <= 0) throw new Exception_OutOfBounds();

  const result: any[][] = [];
  for (let i = chunkCount; i > 0; i--) {
    result.push([]);
  }

  const fairness = forceFairness ? thisArg.length % chunkCount : 0;
  thisArg.slice(0, thisArg.length - fairness).forEach((ele, i) => {
    const group = i % chunkCount;
    result[group].push(ele);
  });

  return result;
};
