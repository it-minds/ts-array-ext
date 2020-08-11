import "../index";
import { expect } from "chai";
import { describe } from "mocha";

type Score = {
  id: number;
  userId: number;
  score: number;
};

const myArr: Score[] = [
  { id: 1, userId: 1, score: 1000 },
  { id: 2, userId: 2, score: 999 },
  { id: 3, userId: 2, score: 200 },
  { id: 4, userId: 2, score: 200 },
  { id: 5, userId: 1, score: 150 }
];

describe("calculate", function () {
  it("sum", function () {
    let result = myArr.sum(x => x.score);
    expect(result).equal(2549);
  });

  it("min", function () {
    let score = myArr.min(x => x.score);
    let result = score.score;
    expect(result).equal(150);
  });

  it("max", function () {
    let score = myArr.max(x => x.score);
    let result = score.score;
    expect(result).equal(1000);
  });

  it("median", function () {
    let score = myArr.median(x => x.score);
    let result = score.score;
    expect(result).equal(200);
  });

  it("avg", function () {
    let result = myArr.average(x => x.score);
    expect(result).equal(509.8);
  });
});

describe("groupBy", function () {
  it("groupByUserId", function () {
    let groups = myArr.groupBy(x => x.userId);

    expect(Object.keys(groups).length).equal(2);
    expect(groups[1].length, "User ID 1 should have 2 scores").equal(2);
    expect(groups[2].length, "User ID 2 should have 3 scores").equal(3);
  });

  it("groupByThenSum", function () {
    let groups = myArr.groupBy(
      x => x.userId,
      arr => arr.sum(x => x.score)
    );

    expect(Object.keys(groups).length).equal(2);
    expect(groups[1]).equal(1150);
    expect(groups[2]).equal(1399);
  });

  it("groupByThenRandomSort", function () {
    let groups = myArr.groupBy(
      x => x.score,
      arr =>
        arr
          .map(val => ({ sort: Math.random(), val }))
          .sortByAttr(x => x.sort)
          .map(x => x.val)
    );

    expect(Object.keys(groups).length).equal(4);
    expect(groups[200].length).equal(2);
  });
});
