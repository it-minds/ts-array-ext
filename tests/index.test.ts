import "../index";
import { expect } from "chai";
import { describe } from "mocha";

type Score = {
  id: number;
  userId: number;
  score: number;
  nickName: string;
};

const myArr: Score[] = [
  { id: 1, userId: 1, score: 1000, nickName: "aa" },
  { id: 3, userId: 2, score: 200, nickName: "bb" },
  { id: 5, userId: 1, score: 150, nickName: "ba" },
  { id: 2, userId: 2, score: 999, nickName: "zx" },
  { id: 4, userId: 2, score: 200, nickName: "ce" }
];

describe("sort", function () {
  it("ASC with enum", function () {
    let result = myArr.sortByAttr(a => a.score, SortDirection.ASC);

    expect(result[0].score).equal(150);
    expect(result[4].score).equal(1000);
  });

  it("ASC with num", function () {
    let result = myArr.sortByAttr(a => a.score, 0);

    expect(result[0].score).equal(150);
    expect(result[4].score).equal(1000);
  });

  it("DESC with enum ", function () {
    let result = myArr.sortByAttr(a => a.score, SortDirection.DESC);

    expect(result[0].score).equal(1000);
    expect(result[4].score).equal(150);
  });

  it("DESC with num", function () {
    let result = myArr.sortByAttr(a => a.score, 1);

    expect(result[0].score).equal(1000);
    expect(result[4].score).equal(150);
  });

  it("ASC by string with num", function () {
    let result = myArr.sortByAttr(a => a.nickName);

    expect(result[0].score).equal(1000);
    expect(result[4].score).equal(999);
  });

  it("DESC by string with num", function () {
    let result = myArr.sortByAttr(a => a.nickName, 1);

    expect(result[0].score).equal(999);
    expect(result[4].score).equal(1000);
  });

  it("Shuffle Then sort", function () {
    let result = myArr
      .shuffle()
      .shuffle()
      .sortByAttr(a => a.score);

    expect(result[0].score).equal(150);
    expect(result[4].score).equal(1000);
  });
});

describe("shuffle", () => {
  it("Shuffle Then sort", function () {
    let roll = 0;
    let counts: { [k: number]: number } = {};

    for (let i = 1; i <= 5; i++) {
      counts[i] = 0;
    }

    while (roll < 1000000) {
      roll++;
      counts[myArr.shuffle()[0].id]++;
    }

    const result = Object.values(counts).filter(x => x > 190000 && x < 210000)
      .length;
    expect(result).equal(5);
  });
});

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

  it("groupByThenShuffle", function () {
    let groups = myArr.groupBy(
      x => x.score,
      arr => arr.shuffle()
    );

    expect(Object.keys(groups).length).equal(4);
    expect(groups[200].length).equal(2);
  });
});

describe("chunk", function () {
  let baseArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

  it("chunkByCount", function () {
    let groups = baseArr.chunkByCount(3);

    expect(groups[0].length).equal(6);
    expect(groups[1].length).equal(6);
    expect(groups[2].length).equal(5);
  });

  it("chunkByCountFair", function () {
    let groups = baseArr.chunkByCount(3, true);

    expect(groups[0].length).equal(5);
    expect(groups[1].length).equal(5);
    expect(groups[2].length).equal(5);
  });

  it("chunkBySize", function () {
    let groups = baseArr.chunkBySize(7);

    expect(groups[0].length).equal(7);
    expect(groups[1].length).equal(7);
    expect(groups[2].length).equal(3);
  });

  it("chunkBySizeFairMore", function () {
    let groups = baseArr.chunkBySize(7, true);

    expect(groups[0].length).equal(6);
    expect(groups[1].length).equal(6);
    expect(groups[2].length).equal(5);
  });

  it("chunkBySizeFairFewer", function () {
    const baseArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

    let groups = baseArr.chunkBySize(7, true);

    expect(groups[0].length).equal(8);
    expect(groups[1].length).equal(7);
  });

  it("chunkBySizeFairFewerWithMax", function () {
    const baseArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

    let groups = baseArr.chunkBySize(7, true, true);

    expect(groups[0].length).equal(5);
    expect(groups[1].length).equal(5);
    expect(groups[2].length).equal(5);
  });
});
