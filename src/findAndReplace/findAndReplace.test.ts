import "./index";

import { expect } from "chai";

import { Exception_FindReplaceIllegalAction } from "../utils/customErrors";

describe("empty cases", () => {
  it("cant replace with function", () => {
    const myArr: number[] = [];

    const t = () =>
      myArr.findAndReplace(
        x => x === 0,
        x => x,
        true
      );

    expect(t).to.throw(Exception_FindReplaceIllegalAction);
  });
});

describe("Null cases", () => {
  const myArr = [25, 35, 45, 55];
  it("Chunk into two parts", () => {
    const result = myArr.findAndReplace(x => x === 24, 26);

    expect(myArr[0]).equal(25);
    expect(result).equal(null);
  });
});

describe("Test array of base type", () => {
  const myArr = [25, 35, 45, 55];
  it("Replace first element", () => {
    const result = myArr.findAndReplace(x => x === 25, 26);

    expect(myArr[0]).equal(26);
    expect(result).equal(25);
  });

  it("Not find element and add", () => {
    const result = myArr.findAndReplace(x => x === 24, 24, true);

    expect(myArr.length).equal(5);
    expect(result).equal(null);
    expect(myArr[4]).equal(24);
  });

  it("Find and mutate with function", () => {
    const result = myArr.findAndReplace(
      x => x === 24,
      x => x + 1,
      true
    );

    expect(myArr.length).equal(5);
    expect(result).equal(24);
    expect(myArr[4]).equal(25);
  });
});
