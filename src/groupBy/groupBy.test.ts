import ".";
import "../shuffle";

import { expect } from "chai";

describe("groupBy", function () {
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

  it("groupByUserId", function () {
    const groups = myArr.groupBy(x => x.favoriteFruit);

    expect(Object.keys(groups).length).equal(4);
  });

  it("groupByThenCount", function () {
    const groups = myArr.groupBy(
      x => x.favoriteFruit,
      arr => arr.length
    );

    expect(Object.keys(groups).length).equal(4);
    expect(groups["banana"], "User ID 1 should have 2 scores").equal(2);
    expect(groups["apple"], "User ID 2 should have 3 scores").equal(1);
    expect(groups["strawberry"], "User ID 2 should have 3 scores").equal(1);
    expect(groups["orange"], "User ID 2 should have 3 scores").equal(3);
  });

  it("groupByThenShuffle", function () {
    const groups = myArr.groupBy(
      x => x.age,
      arr => arr.shuffle()
    );

    expect(Object.keys(groups).length).equal(2);
  });
});
