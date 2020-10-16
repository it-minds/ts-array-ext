const unionSplit: <T> () => <U = T>(
    secondArr: Array<U>,
    comparator: (a: T, b: U) => boolean,
    thisArg?: any[]
  ) => {
    leftSplit: T[];
    rightSplit: U[];
    innerJoin: T[];
  } = () => function (secondArr, comparator, thisArg = this) {
    const leftSplit = thisArg.filter(t => secondArr.every(u => !comparator(t, u)));
    const rightSplit = secondArr.filter(u => thisArg.every(t => !comparator(t, u)));
  
    const innerJoin = thisArg.filter(t => secondArr.some(u => comparator(t, u)));
  
    return {
      leftSplit,
      innerJoin,
      rightSplit
    };
  };

Array.prototype.unionSplit = unionSplit();