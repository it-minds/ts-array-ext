import ".";
import "../shuffle";

import { expect } from "chai";

const ASSERTIONS = {
  ARRAY_LENGTH: 17,
  MAX_AGE: 49,
  MIN_AGE: 20,
  LOWEST_NAME: "Adkins",
  HIGHEST_NAME: "Roxanne"
};

const myArr = [
  { age: 42, name: "Lambert" },
  { age: 39, name: "Adkins" },
  { age: 47, name: "Rocha" },
  { age: 49, name: "Jacklyn" },
  { age: 20, name: "Burns" },
  { age: 47, name: "Marla" },
  { age: 34, name: "Betsy" },
  { age: 33, name: "Kathryn" },
  { age: 38, name: "Roxanne" },
  { age: 36, name: "Nona" },
  { age: 21, name: "Lottie" },
  { age: 43, name: "Jane" },
  { age: 24, name: "Mays" },
  { age: 24, name: "Brigitte" },
  { age: 47, name: "Anna" },
  { age: 41, name: "Kelley" },
  { age: 28, name: "Maxine" }
];

describe("sort", function () {
  it("ASC with default value", function () {
    const myArr = [2, 5, 2, 6, 1, 7, 3, 2];
    const result = myArr.sortByAttr();

    expect(result[0]).equal(1);
  });

  it("ASC with default value", function () {
    const result = myArr.sortByAttr(a => a.age);

    expect(result[0].age).equal(ASSERTIONS.MIN_AGE);
    expect(result[myArr.length - 1].age).equal(ASSERTIONS.MAX_AGE);
  });

  it("ASC with direction", function () {
    const result = myArr.sortByAttr(a => a.age, "ASC");

    expect(result[0].age).equal(ASSERTIONS.MIN_AGE);
    expect(result[myArr.length - 1].age).equal(ASSERTIONS.MAX_AGE);
  });

  it("DESC with direction", function () {
    const result = myArr.sortByAttr(a => a.age, "DESC");

    expect(result[0].age).equal(ASSERTIONS.MAX_AGE);
    expect(result[myArr.length - 1].age).equal(ASSERTIONS.MIN_AGE);
  });

  it("ASC by string with direction", function () {
    const result = myArr.sortByAttr(a => a.name, "ASC");

    expect(result[0].name).equal(ASSERTIONS.LOWEST_NAME);
    expect(result[myArr.length - 1].name).equal(ASSERTIONS.HIGHEST_NAME);
  });

  it("DESC by string with direction", function () {
    const result = myArr.sortByAttr(a => a.name, "DESC");

    expect(result[0].name).equal(ASSERTIONS.HIGHEST_NAME);
    expect(result[myArr.length - 1].name).equal(ASSERTIONS.LOWEST_NAME);
  });

  it("Shuffle Then sort", function () {
    const result = myArr.shuffle().sortByAttr(a => a.name);

    expect(result[0].name).equal(ASSERTIONS.LOWEST_NAME);
    expect(result[myArr.length - 1].name).equal(ASSERTIONS.HIGHEST_NAME);
  });
});
