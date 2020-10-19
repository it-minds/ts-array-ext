import ".";

import { expect } from "chai";

describe("basic cases", () => {
  it("empty", () => {
    const myArr: number[] = [];

    const score = myArr.median();
    expect(score).equal(undefined);
  });

  it("base type", () => {
    const myArr: number[] = [4, 5, 3, 2, 1];

    const score = myArr.median();
    expect(score).equal(3);
  });

  it("objects", () => {
    const myArr = [4, 5, 3, 2, 1].map(x => ({
      score: x
    }));

    const score = myArr.median(x => x.score);
    expect(score).deep.equal({ score: 3 });
  });

  it("tie down", () => {
    const myArr = [4, 5, 3, 2, 1, 6].map(x => ({
      score: x
    }));

    const score = myArr.median(x => x.score, -1);
    expect(score).deep.equal({ score: 3 });
  });

  it("tie up", () => {
    const myArr = [4, 5, 3, 2, 1, 6].map(x => ({
      score: x
    }));

    const score = myArr.median(x => x.score, 1);
    expect(score).deep.equal({ score: 4 });
  });
});
