import ".";

import { expect } from "chai";

describe("basic cases", () => {
  it("", () => {
    const myArr: number[] = [];

    const score = myArr.sum();
    expect(score).equal(0);
  });

  it("", () => {
    const myArr: number[] = [4, 5, 3, 2, 1];

    const score = myArr.sum();
    expect(score).equal(15);
  });

  it("", () => {
    const myArr = [4, 5, 3, 2, 1].map(x => ({
      score: x
    }));

    const score = myArr.sum(x => x.score);
    expect(score).equal(15);
  });
});
