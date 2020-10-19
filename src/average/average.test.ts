import "./index";

import { expect } from "chai";

import { Exception_OutOfBounds } from "../utils/customErrors";

describe("empty cases", () => {
  it("averages empty array", () => {
    const myArr: number[] = [];

    const t = () => myArr.average();

    expect(t).to.throw(Exception_OutOfBounds);
  });

  it("averages with less than 0 round", () => {
    const myArr = [1, 2, 3];

    const t = () => myArr.average(x => x, -1);

    expect(t).to.throw(Exception_OutOfBounds);
  });
});

describe("Test array of base type", () => {
  it("averages to int with no params", () => {
    const myArr = [25, 35, 45, 55];
    const result = myArr.average();

    expect(result).equal(40);
  });

  it("averages to int", () => {
    const myArr = [25, 35, 45, 54];
    const result = myArr.average(x => x, 0);

    expect(result).equal(40);
  });

  it("averages to float without round", () => {
    const myArr = [25, 35, 45, 54];
    const result = myArr.average();

    expect(result).equal(39.75);
  });

  it("averages to float with round", () => {
    const myArr = [25, 35, 45, 54];
    const result = myArr.average(x => x, 1);

    expect(result).equal(39.8);
  });
});

describe("Test array of object types", () => {
  const myArr = [25, 35, 45, 55].map((age, i) => ({ index: i, age }));

  it("avg", () => {
    const result = myArr.average(x => x.age, 2);

    expect(result).equal(40.0);
  });
});
