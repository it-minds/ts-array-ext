import ".";

import { expect } from "chai";

describe("unionSplit", () => {
  const myArr = [
    {
      favoriteFruit: "banana",
      age: 4
    },
    {
      favoriteFruit: "banana",
      age: 40
    },
    {
      favoriteFruit: "apple",
      age: 40
    },
    {
      favoriteFruit: "strawberry",
      age: 4
    },
    {
      favoriteFruit: "orange",
      age: 4
    },
    {
      favoriteFruit: "orange",
      age: 40
    },
    {
      favoriteFruit: "orange",
      age: 40
    }
  ];
  const fruitsToCheck = ["banana", "strawberry", "lemon"];

  it("Who's fruit is it?", () => {
    const result = myArr.unionSplit(fruitsToCheck, (a, b) => a.favoriteFruit === b);

    expect(result.rightSplit.length).equal(1);
    expect(result.innerJoin.length).equal(3);
    expect(result.leftSplit.length).equal(4);
  });

  it("Who's fruit is it? With Zip", () => {
    const result = myArr.unionSplit(
      fruitsToCheck,
      (a, b) => a.favoriteFruit === b,
      (u, f) => ({
        age: u.age,
        fruit: f
      })
    );

    expect(result.rightSplit.length).equal(1);
    expect(result.innerJoin.length).equal(3);
    expect(result.leftSplit.length).equal(4);
  });
});
