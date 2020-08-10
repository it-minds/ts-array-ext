/// <reference path="index.d.ts"/>

Array.prototype.groupBy = function (callback, sort?, thisArg = this) {
  const result: Map<any, any[]> = thisArg.reduce(
    (acc: Map<any, any[]>, element: any) => {
      const key = callback(element);
      if (acc.has(key)) {
        // acc[key] = [...acc[key], element];
        acc.set(key, [...acc.get(key), element]);
      } else {
        // acc[key] = [element];
        acc.set(key, [element]);
      }
      return acc;
    },
    new Map<any, any[]>()
  );

  if (sort) {
    for (const key in result.entries) {
      result.set(key, result.get(key).sort(sort));
    }
  }

  return result;
};

Array.prototype.sum = function (func, thisArg = this) {
  return thisArg.reduce((acc: number, t: any) => acc + func(t), 0);
};
