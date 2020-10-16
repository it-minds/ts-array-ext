import { Exception_OutOfBounds } from "./customErrors";

const chunkBySize: <T>(
  chunkSize: number,
  forceFairness?: boolean,
  treatChunkSizeAsMax?: boolean,
  thisArg?: any[]
) => T[][] = function (
  chunkSize,
  forceFairness = false,
  treatChunkSizeAsMax = false,
  thisArg = this
) {
  if (chunkSize <= 0) throw new Exception_OutOfBounds();
  const result: any[][] = [];

  if (forceFairness) {
    if (thisArg.length % chunkSize == 0) return thisArg.chunkByCount(thisArg.length / chunkSize);

    if (treatChunkSizeAsMax) return thisArg.chunkByCount(Math.ceil(thisArg.length / chunkSize));

    const fewerGroups = thisArg.chunkByCount(Math.floor(thisArg.length / chunkSize));

    const moreGroups = thisArg.chunkByCount(Math.ceil(thisArg.length / chunkSize));

    const fewerAverageDiff = fewerGroups.map(arr => Math.abs(arr.length - chunkSize)).average();
    const moreAverageDiff = moreGroups.map(arr => Math.abs(arr.length - chunkSize)).average();

    if (fewerAverageDiff < moreAverageDiff) return fewerGroups;
    if (moreAverageDiff < fewerAverageDiff) return moreGroups;

    const tiebreaker =
      Math.round(thisArg.length / chunkSize) === Math.ceil(thisArg.length / chunkSize);
    if (tiebreaker) return moreGroups;
    else return fewerGroups;
  }

  for (let i = 0; i < thisArg.length; i += chunkSize) {
    const part = thisArg.slice(i, i + chunkSize);
    result.push(part);
  }

  return result;
};

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
Array.prototype.chunkBySize = chunkBySize;
