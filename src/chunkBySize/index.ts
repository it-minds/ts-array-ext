import "../average";
import "../chunkByCount";

import { Exception_OutOfBounds } from "../utils/customErrors";

declare global {
  interface Array<T> {
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
  }
}

Array.prototype.chunkBySize = function (
  chunkSize,
  forceFairness = false,
  treatChunkSizeAsMax = false,
  thisArg = this
) {
  if (chunkSize <= 0) throw new Exception_OutOfBounds();
  const result: any[][] = [];

  if (forceFairness) {
    const calculatedChunkCount = thisArg.length / chunkSize;

    if (thisArg.length % chunkSize == 0) return thisArg.chunkByCount(calculatedChunkCount);

    if (treatChunkSizeAsMax) return thisArg.chunkByCount(Math.ceil(calculatedChunkCount));

    // If the array's size can't be evenly divided into the chunkSize we aim to find the best match.

    //chunk the array into the lower & upper bound.
    // E.G.The array's length is 10 and chunk size is 3, the lower is 3 chunks the upper is 4.
    const lowerChunkCount = thisArg.chunkByCount(Math.floor(calculatedChunkCount));
    const upperChunkCount = thisArg.chunkByCount(Math.ceil(calculatedChunkCount));

    //The average size each chunk has from the wanted chunkSize
    const lowerChunkDiff = lowerChunkCount.map(arr => Math.abs(arr.length - chunkSize)).average();
    const upperChunkDiff = upperChunkCount.map(arr => Math.abs(arr.length - chunkSize)).average();

    //return the chunks that is closet to the wanted chunkSize
    if (lowerChunkDiff < upperChunkDiff) return lowerChunkCount;
    if (upperChunkDiff < lowerChunkDiff) return upperChunkCount;

    return lowerChunkCount;
  }

  for (let i = 0; i < thisArg.length; i += chunkSize) {
    const part = thisArg.slice(i, i + chunkSize);
    result.push(part);
  }

  return result;
};
