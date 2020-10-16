import "./types";

import { Exception_FindReplaceIllegalAction, Exception_OutOfBounds } from "./customErrors";
import { isFunction } from "./typeGuards";

Array.prototype.sortByAttr = function (func = x => x, sortDirection = "ASC", thisArg = this) {
  const sortVal = sortDirection === "ASC" ? 1 : -1;
  return thisArg.sort((a: any, b: any) => (func(a) > func(b) ? sortVal : -sortVal));
};

Array.prototype.groupBy = function (callback, func?, thisArg = this) {
  const groupArr = thisArg.reduce((acc, element) => {
    const key = callback(element);
    if (acc[key] !== undefined) {
      acc[key].push(element);
    } else {
      acc[key] = [element];
    }
    return acc;
  }, {});

  if (func) {
    Object.keys(groupArr).forEach(key => {
      groupArr[key] = func(groupArr[key]);
    });
  }

  return groupArr;
};

Array.prototype.sum = function (func = x => x, thisArg = this) {
  return thisArg.reduce<number>((acc, t: any) => acc + func(t), 0);
};

Array.prototype.average = function (func = x => x, round = null, thisArg = this) {
  if (thisArg.length <= 0) throw new Exception_OutOfBounds();
  if (round !== null) {
    if (round < 0) throw new Exception_OutOfBounds();
    const roundInTens = 10 ** round;
    return Math.round((thisArg.sum(func, thisArg) / thisArg.length) * roundInTens) / roundInTens;
  }
  return thisArg.sum(func, thisArg) / thisArg.length;
};

Array.prototype.min = function (func = x => x, thisArg = this) {
  return thisArg.sortByAttr(func, "ASC", thisArg)[0];
};

Array.prototype.max = function (func = x => x, thisArg = this) {
  return thisArg.sortByAttr(func, "DESC", thisArg)[0];
};

Array.prototype.shuffle = function (thisArg = this) {
  return thisArg
    .map(val => ({
      //This magical random is considered more random than the standard Math.random().
      //https://stackoverflow.com/a/59735724/6103188
      sort: Math.floor(1e14 * Math.random() ** 2) % (thisArg.length * 100),
      val
    }))
    .sortByAttr(x => x.sort)
    .map(x => x.val);
};

Array.prototype.median = function (func = x => x, tieBreaker = -1, thisArg = this) {
  const sorted = thisArg.sortByAttr(func, "ASC", thisArg);
  const middle = sorted.length / 2;
  if (Number.isInteger(middle)) return sorted[middle];

  return sorted[tieBreaker < 0 ? Math.floor(middle) : Math.ceil(middle)];
};

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

Array.prototype.chunkBySize = function (
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

Array.prototype.findAndReplace = function <T extends unknown>(
  predicate: (value: T, index: number, obj: T[]) => boolean,
  replaceVal: T | ((t?: T) => T),
  addIfNotFound = false,
  thisArg = this
) {
  const oldIndex = thisArg.findIndex(predicate);
  if (oldIndex === -1) {
    if (!addIfNotFound) {
      return null;
    }

    if (isFunction(replaceVal)) {
      throw new Exception_FindReplaceIllegalAction();
    } else {
      thisArg.push(replaceVal);
    }
    return null;
  }
  const oldItem = thisArg[oldIndex];

  if (isFunction(replaceVal)) {
    thisArg[oldIndex] = replaceVal(thisArg[oldIndex]);
  } else {
    thisArg[oldIndex] = replaceVal;
  }

  return oldItem;
};

Array.prototype.reduceAsync = function (callback, initialVal, thisArg = this) {
  const prom = thisArg.reduce(async (accProm, cur, i, arr) => {
    const acc = await accProm;
    return await callback(acc, cur, i, arr);
  }, Promise.resolve(initialVal));

  return prom;
};

Array.prototype.unionSplit = function (secondArr, comparator, thisArg = this) {
  const leftSplit = thisArg.filter(t => secondArr.every(u => !comparator(t, u)));
  const rightSplit = secondArr.filter(u => thisArg.every(t => !comparator(t, u)));

  const innerJoin = thisArg.filter(t => secondArr.some(u => comparator(t, u)));

  return {
    leftSplit,
    innerJoin,
    rightSplit
  };
};

Array.prototype.distinct = function (func = x => x, thisArg = this) {
  let term : string | number | symbol;
  return thisArg.filter((element, index, arr) => {
    term = func(element);
    return arr.findIndex((item) => term === func(item)) === index;
  });
}