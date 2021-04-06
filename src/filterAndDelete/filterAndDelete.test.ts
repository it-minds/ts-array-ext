import ".";

import { expect } from "chai";

describe("basic cases", () => {
  const numbers = [12, 5, 8, 130, 44];

  function isBigEnough(value: number) {
    return value >= 10;
  }

  it("", () => {
    const score = numbers.filterAndDelete(isBigEnough);
    expect(numbers[0]).equal(5);
    expect(numbers[1]).equal(8);
    expect(score[0]).equal(12);
    expect(score[1]).equal(130);
    expect(score[2]).equal(44);
  });
});
