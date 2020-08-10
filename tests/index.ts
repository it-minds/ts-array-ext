import "../index";

type Score = {
  userId: number;
  score: number;
};

const myArr: Score[] = [
  { userId: 1, score: 1000 },
  { userId: 2, score: 999 },
  { userId: 2, score: 200 },
  { userId: 2, score: 200 }
];

const groups = myArr.groupBy(
  x => x.userId,
  arr => arr.sortByAttr(x => x.score, SortDirection.DESC)
);

const userScoreAttempts = myArr.groupBy(
  x => x.userId,
  arr =>
    arr.groupBy(
      x => x.score,
      arr2 => arr2.length
    )
);

console.log(groups, userScoreAttempts);
