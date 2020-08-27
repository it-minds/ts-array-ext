/// <reference path="array.d.ts"/>
Array.prototype.sortByAttr = function (
  func = x => x,
  sortDirection = SortDirection.ASC,
  thisArg = this
) {
  return thisArg.sort((a: any, b: any) => {
    return sortDirection === SortDirection.ASC
      ? func(a) > func(b)
        ? 1
        : -1
      : func(b) > func(a)
      ? 1
      : -1;
  });
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

Array.prototype.average = function (func = x => x, thisArg = this) {
  return thisArg.sum(func, thisArg) / thisArg.length;
};

Array.prototype.min = function (func = x => x, thisArg = this) {
  return thisArg.sortByAttr(func, SortDirection.ASC, thisArg)[0];
};

Array.prototype.max = function (func = x => x, thisArg = this) {
  return thisArg.sortByAttr(func, SortDirection.DESC, thisArg)[0];
};

Array.prototype.shuffle = function (thisArg = this) {
  return thisArg
    .map(val => ({
      sort:
        Math.floor(Math.pow(10, 14) * Math.random() * Math.random()) %
        (thisArg.length * 100),
      val
    }))
    .sortByAttr(x => x.sort)
    .map(x => x.val);
};

Array.prototype.median = function (
  func = x => x,
  tieBreaker = -1,
  thisArg = this
) {
  const sorted = thisArg.sortByAttr(func, SortDirection.ASC, thisArg);
  const middle = sorted.length / 2;
  if (Number.isInteger(middle)) return sorted[middle];

  return sorted[tieBreaker < 0 ? Math.floor(middle) : Math.ceil(middle)];
};

Array.prototype.chunkByCount = function (
  chunkCount,
  forceFairness = false,
  thisArg = this
) {
  if (chunkCount <= 0) throw Error("Out of bounds");

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
  if (chunkSize <= 0) throw Error("Out of bounds");
  const result: any[][] = [];

  if (forceFairness) {
    if (thisArg.length % chunkSize == 0)
      return thisArg.chunkByCount(thisArg.length / chunkSize);

    if (treatChunkSizeAsMax)
      return thisArg.chunkByCount(Math.ceil(thisArg.length / chunkSize));

    const fewerGroups = thisArg.chunkByCount(
      Math.floor(thisArg.length / chunkSize)
    );

    const moreGroups = thisArg.chunkByCount(
      Math.ceil(thisArg.length / chunkSize)
    );

    const fewerAverageDiff = fewerGroups
      .map(arr => Math.abs(arr.length - chunkSize))
      .average();
    const moreAverageDiff = moreGroups
      .map(arr => Math.abs(arr.length - chunkSize))
      .average();

    if (fewerAverageDiff < moreAverageDiff) return fewerGroups;
    if (moreAverageDiff < fewerAverageDiff) return moreGroups;

    const tiebreaker =
      Math.round(thisArg.length / chunkSize) ===
      Math.ceil(thisArg.length / chunkSize);
    if (tiebreaker) return moreGroups;
    else return fewerGroups;
  }

  for (let i = 0; i < thisArg.length; i += chunkSize) {
    const part = thisArg.slice(i, i + chunkSize);
    result.push(part);
  }

  return result;
};
