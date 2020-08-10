/// <reference path="array.d.ts"/>
Array.prototype.sortByAttr = function (
  func,
  sortDirection = SortDirection.ASC,
  thisArg = this
) {
  return thisArg.sort((a: any, b: any) =>
    sortDirection === SortDirection.ASC ? func(a) - func(b) : func(b) - func(a)
  );
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

  const result: any = {};

  if (func) {
    Object.keys(groupArr).forEach(key => {
      groupArr[key] = func(groupArr[key]);
    });
  }
  // result.map(elements => {
  //   result[key] = func(elements);
  // });

  return result;
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
