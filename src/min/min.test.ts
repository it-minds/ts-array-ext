import "./";

import { expect } from "chai";

describe("basic cases", () => {
  it("", () => {
    const myArr: number[] = [];

    const score = myArr.min();
    expect(score).equal(undefined);
  });

  it("", () => {
    const myArr: number[] = [4, 5, 3, 2, 1];

    const score = myArr.min();
    expect(score).equal(1);
  });

  it("", () => {
    const myArr = [4, 5, 3, 2, 1].map(x => ({
      score: x
    }));

    const score = myArr.min(x => x.score);
    expect(score).deep.equal({ score: 1 });
  });
});
