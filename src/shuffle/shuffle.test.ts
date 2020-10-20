import ".";

import { expect } from "chai";

describe("shuffle", () => {
  const myArr = [...new Array(17)].map((_, i) => ({ index: i }));

  it("Shuffle 1 mio times and expect results to be close to average", function (done) {
    let roll = 0;
    const counts: { [k: string]: number } = {};

    for (let i = 0; i < myArr.length; i++) {
      counts[i] = 0;
    }

    while (roll < 1000000) {
      roll++;
      //increase the count of the index value of the newly shuffled array.
      counts[myArr.shuffle()[0].index]++;
    }

    //Check each index value. If it is within the error margin, that index was shuffled randomly.
    const result = Object.keys(counts).filter(
      // numbers are derived from the array length (17) with an error margin of 0.2% (2000)
      // lower: (1,000,000 / 17) round to lowest 2000th = 58000
      // upper: (1,000,000 / 17) round to highest 2000th = 60000
      x => counts[x] > 58000 && counts[x] < 60000
    ).length;

    expect(result).equal(myArr.length);
    done();
  });
});
