import "./index";

import { expect } from "chai";

import { Exception_OutOfBounds } from "../utils/customErrors";

describe("empty cases", () => {
  it("count by 0", () => {
    const myArr: number[] = [];

    const t = () => myArr.chunkBySize(0);

    expect(t).to.throw(Exception_OutOfBounds);
  });

  it("count by less than 0", () => {
    const myArr: number[] = [];

    const t = () => myArr.chunkBySize(-1);

    expect(t).to.throw(Exception_OutOfBounds);
  });
});

describe("Test array of base type", () => {
  const myArr = [25, 35, 45, 55];
  it("Chunk into two parts", () => {
    const result = myArr.chunkBySize(2);

    expect(result.length).equal(2);
  });

  it("Chunk into two parts with force", () => {
    const result = myArr.chunkBySize(2, true);

    expect(result.length).equal(2);
  });
});

describe("Test array of object types", () => {
  const myArr = [25, 35, 45, 55].map((age, i) => ({ index: i, age }));

  it("Chunk into two parts", () => {
    const result = myArr.chunkBySize(2);

    expect(result.length).equal(2);
  });

  it("Chunk into two parts with force", () => {
    const result = myArr.chunkBySize(2, true);

    expect(result.length).equal(2);
  });
});

describe("chunk uneven groups", function () {
  const baseArr = [...new Array(17)].map(Function.call, Math.random);

  it("chunkByCount", function () {
    const groups = baseArr.chunkByCount(3);

    expect(groups.length).equal(3);
    expect(groups[0].length).equal(6);
    expect(groups[1].length).equal(6);
    expect(groups[2].length).equal(5);
  });

  it("chunkByCountFair", function () {
    const groups = baseArr.chunkByCount(3, true);

    expect(groups.length).equal(3);
    expect(groups[0].length).equal(5);
    expect(groups[1].length).equal(5);
    expect(groups[2].length).equal(5);
  });

  it("chunkBySize", function () {
    const groups = baseArr.chunkBySize(7);

    expect(groups.length).equal(3);
    expect(groups[0].length).equal(7);
    expect(groups[1].length).equal(7);
    expect(groups[2].length).equal(3);
  });

  it("chunkBySizeFairMore", function () {
    const groups = baseArr.chunkBySize(7, true);

    expect(groups.length).equal(3);
    expect(groups[0].length).equal(6);
    expect(groups[1].length).equal(6);
    expect(groups[2].length).equal(5);
  });

  it("chunkBySizeFairFewer", function () {
    const baseArr = [...new Array(15)].map(Function.call, Math.random);

    const groups = baseArr.chunkBySize(7, true);

    expect(groups.length).equal(2);
    expect(groups[0].length).equal(8);
    expect(groups[1].length).equal(7);
  });

  it("chunkBySizeFairFewerWithMax", function () {
    const baseArr = [...new Array(15)].map(Function.call, Math.random);

    const groups = baseArr.chunkBySize(7, true, true);

    expect(groups.length).equal(3);
    expect(groups[0].length).equal(5);
    expect(groups[1].length).equal(5);
    expect(groups[2].length).equal(5);
  });

  it("chunkBySizeUpperBounds", function () {
    const baseArr = [...new Array(20)].map(Function.call, Math.random);

    const groups = baseArr.chunkBySize(7, true);

    expect(groups.length).equal(3);
    expect(groups[0].length).equal(7);
    expect(groups[1].length).equal(7);
    expect(groups[2].length).equal(6);
  });

  it("chunkBySizeTie", function () {
    const arr = [...new Array(8)].map(Function.call, Math.random);

    const groups = arr.chunkBySize(6, true);

    expect(groups.length).equal(1);
    expect(groups[0].length).equal(8);
  });
});
