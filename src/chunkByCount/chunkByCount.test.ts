import "./index";

import { expect } from "chai";

import { Exception_OutOfBounds } from "../utils/customErrors";

describe("empty cases", () => {
  it("count by 0", () => {
    const myArr: number[] = [];

    const t = () => myArr.chunkByCount(0);

    expect(t).to.throw(Exception_OutOfBounds);
  });

  it("count by less than 0", () => {
    const myArr: number[] = [];

    const t = () => myArr.chunkByCount(-1);

    expect(t).to.throw(Exception_OutOfBounds);
  });
});

describe("Test array of base type", () => {
  const myArr = [25, 35, 45, 55];
  it("Chunk into two parts", () => {
    const result = myArr.chunkByCount(2);

    expect(result.length).equal(2);
  });

  it("Chunk into two parts with force", () => {
    const result = myArr.chunkByCount(2, true);

    expect(result.length).equal(2);
  });
});

describe("Test array of object types", () => {
  const myArr = [25, 35, 45, 55].map((age, i) => ({ index: i, age }));

  it("Chunk into two parts", () => {
    const result = myArr.chunkByCount(2);

    expect(result.length).equal(2);
  });

  it("Chunk into two parts with force", () => {
    const result = myArr.chunkByCount(2, true);

    expect(result.length).equal(2);
  });
});
