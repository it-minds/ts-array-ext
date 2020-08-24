/// <reference path="array.d.ts"/>
Array.prototype.sortByAttr = function (
  func,
  sortDirection = SortDirection.ASC,
  thisArg = this
) {
  return thisArg.sort((a: any, b: any) => {
    if (typeof func(a) !== typeof func(b))
      throw Error("Type of attribute differs on the object");
    switch (typeof func(a)) {
      case "number":
        return sortDirection === SortDirection.ASC
          ? (func(a) as number) - (func(b) as number)
          : (func(b) as number) - (func(a) as number);

      case "string":
        return sortDirection === SortDirection.ASC
          ? (func(a) as string) > (func(b) as string)
            ? 1
            : -1
          : (func(b) as string) > (func(a) as string)
          ? 1
          : -1;
    }
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

Array.prototype.sum = function (func, thisArg = this) {
  return thisArg.reduce((acc: number, t: any) => acc + func(t), 0);
};

Array.prototype.average = function (func, thisArg = this) {
  return thisArg.sum(func, thisArg) / thisArg.length;
};

Array.prototype.min = function (func, thisArg = this) {
  return thisArg.sortByAttr(func, SortDirection.ASC, thisArg)[0];
};

Array.prototype.max = function (func, thisArg = this) {
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

Array.prototype.median = function (func, tieBreaker = -1, thisArg = this) {
  const sorted = thisArg.sortByAttr(func, SortDirection.ASC, thisArg);
  const middle = sorted.length / 2;
  if (Number.isInteger(middle)) return sorted[middle];

  return sorted[tieBreaker < 0 ? Math.floor(middle) : Math.ceil(middle)];
};
