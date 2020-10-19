import "../src/index";

import { assert } from "chai";

import {
  assertErrorType,
  Exception_FindReplaceIllegalAction,
  Exception_OutOfBounds
} from "../src/customErrors";
import { myArr, Score } from "./testData";

const ASSERTIONS = {
  ARRAY_LENGTH: 17,
  MAX_AGE: 49,
  MIN_AGE: 20,
  LOWEST_NAME: "Adkins",
  HIGHEST_NAME: "Roxanne"
};

describe("sort", function () {
  test("ASC with default value", function () {
    const result = myArr.sortByAttr(a => a.age);

    expect(result[0].age).toBe(ASSERTIONS.MIN_AGE);
    expect(result[myArr.length - 1].age).toBe(ASSERTIONS.MAX_AGE);
  });

  test("ASC with direction", function () {
    const result = myArr.sortByAttr(a => a.age, "ASC");

    expect(result[0].age).toBe(ASSERTIONS.MIN_AGE);
    expect(result[myArr.length - 1].age).toBe(ASSERTIONS.MAX_AGE);
  });

  test("DESC with direction", function () {
    const result = myArr.sortByAttr(a => a.age, "DESC");

    expect(result[0].age).toBe(ASSERTIONS.MAX_AGE);
    expect(result[myArr.length - 1].age).toBe(ASSERTIONS.MIN_AGE);
  });

  test("ASC by string with direction", function () {
    const result = myArr.sortByAttr(a => a.name.first, "ASC");

    expect(result[0].name.first).toBe(ASSERTIONS.LOWEST_NAME);
    expect(result[myArr.length - 1].name.first).toBe(ASSERTIONS.HIGHEST_NAME);
  });

  test("DESC by string with direction", function () {
    const result = myArr.sortByAttr(a => a.name.first, "DESC");

    expect(result[0].name.first).toBe(ASSERTIONS.HIGHEST_NAME);
    expect(result[myArr.length - 1].name.first).toBe(ASSERTIONS.LOWEST_NAME);
  });

  test("Shuffle Then sort", function () {
    const result = myArr.shuffle().sortByAttr(a => a.name.first);

    expect(result[0].name.first).toBe(ASSERTIONS.LOWEST_NAME);
    expect(result[myArr.length - 1].name.first).toBe(ASSERTIONS.HIGHEST_NAME);
  });
});

describe("shuffle", () => {
  test("Shuffle 1 mio times and expect results to be close to average", function (done) {
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

    expect(result).toBe(myArr.length);
    done();
  });
});

describe("calculate", () => {
  test("sum", function () {
    const result = myArr.sum(x => x.age);
    expect(result).toBe(613);
  });

  test("min", function () {
    const score = myArr.min(x => x.age).age;
    expect(score).toBe(ASSERTIONS.MIN_AGE);
  });

  test("max", function () {
    const score = myArr.max(x => x.age).age;
    expect(score).toBe(ASSERTIONS.MAX_AGE);
  });

  test("median", function () {
    const score = myArr.median(x => x.age).age;
    expect(score).toBe(38);
  });

  test("avg", function () {
    const result = myArr.average(x => x.age, 2);

    expect(result).toBe(36.06);
  });

  test("test for caalculation exceptions", function () {
    const empty: Score[] = [];

    expect(() => {
      myArr.average(x => x.age, -1);
    }).toThrow(Exception_OutOfBounds);
    expect(() => {
      empty.average(x => x.age, 2);
    }).toThrow(Exception_OutOfBounds);
  });
});

describe("groupBy", function () {
  test("groupByUserId", function () {
    const groups = myArr.groupBy(x => x.favoriteFruit);

    expect(Object.keys(groups).length).toBe(4);
  });

  test("groupByThenCount", function () {
    const groups = myArr.groupBy(
      x => x.favoriteFruit,
      arr => arr.length
    );

    expect(Object.keys(groups).length).toBe(4);
    //"User ID 1 should have 2 scores"
    expect(groups["banana"]).toBe(6);
    //"User ID 2 should have 3 scores"
    expect(groups["apple"]).toBe(4);
    //"User ID 2 should have 3 scores"
    expect(groups["strawberry"]).toBe(2);
    //"User ID 2 should have 3 scores"
    expect(groups["orange"]).toBe(5);
  });

  test("groupByThenShuffle", function () {
    const groups = myArr.groupBy(
      x => x.age,
      arr => arr.shuffle()
    );

    expect(Object.keys(groups).length).toBe(14);
  });
});

describe("chunk", function () {
  const baseArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

  test("chunkByCount", function () {
    const groups = baseArr.chunkByCount(3);

    expect(groups[0].length).toBe(6);
    expect(groups[1].length).toBe(6);
    expect(groups[2].length).toBe(5);
  });

  test("chunkByCountFair", function () {
    const groups = baseArr.chunkByCount(3, true);

    expect(groups[0].length).toBe(5);
    expect(groups[1].length).toBe(5);
    expect(groups[2].length).toBe(5);
  });

  test("chunkBySize", function () {
    const baseArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
    let groups = baseArr.chunkBySize(7);

    expect(groups[0].length).toBe(7);
    expect(groups[1].length).toBe(7);
    expect(groups[2].length).toBe(4);

    groups = baseArr.chunkBySize(2, true);
    expect(groups.length).toBe(9);
  });

  test("chunkBySizeFairMore", function () {
    const groups = baseArr.chunkBySize(7, true);

    expect(groups[0].length).toBe(6);
    expect(groups[1].length).toBe(6);
    expect(groups[2].length).toBe(5);
  });

  test("chunkBySizeFairFewer", function () {
    const baseArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

    const groups = baseArr.chunkBySize(7, true);

    expect(groups[0].length).toBe(8);
    expect(groups[1].length).toBe(7);
  });

  test("chunkBySizeFairFewerWithMax", function () {
    const baseArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

    const groups = baseArr.chunkBySize(7, true, true);

    expect(groups[0].length).toBe(5);
    expect(groups[1].length).toBe(5);
    expect(groups[2].length).toBe(5);
  });

  test("Does the method throw correct?", function () {
    const baseArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
    expect(() => {
      baseArr.chunkBySize(0);
    }).toThrow(Exception_OutOfBounds);

    expect(() => {
      baseArr.chunkByCount(0);
    }).toThrow(Exception_OutOfBounds);
  });
});

describe("async test", () => {
  test("simple reduce", async () => {
    type ExtendedScore = Score & {
      fetchedAttr: string;
    };

    const resultProm = myArr.reduceAsync<ExtendedScore[]>(async (acc, cur) => {
      const addOnAttr = await new Promise<string>(resolve =>
        setTimeout(() => resolve("SOMETHING_NEW"), 5)
      );

      (cur as ExtendedScore).fetchedAttr = addOnAttr;

      return [...acc, cur as ExtendedScore];
    }, []);

    expect(resultProm).toHaveProperty("then");
    expect(resultProm).toHaveProperty("catch");
    const result = await resultProm;
    expect(result[0]).toHaveProperty("fetchedAttr");
    expect(result[0].fetchedAttr).toBe("SOMETHING_NEW");
  });
});

describe("findAndReplace", () => {
  test("single element", () => {
    myArr.sortByAttr(x => x.id);

    const oldScore = myArr.findAndReplace(x => x.index === 5, ({
      index: 5,
      name: {
        first: "newNickName",
        last: "newLastName"
      },
      age: 5,
      id: "adasdasd"
    } as unknown) as Score);

    expect(myArr.find(x => x.index === 5).id).toBe("adasdasd");
    expect(oldScore.id).toBe("5f5f24b8b804f4ead7b82da9");
  });

  test("Insert Instead of Replace", () => {
    myArr.sortByAttr(x => x.index);

    expect(myArr.find(x => x.index === 500)).toBe(undefined);

    const oldScore = myArr.findAndReplace(
      x => x.index === 500,
      ({
        index: 500,
        name: {
          first: "newNickName",
          last: "newLastName"
        },
        age: 5,
        id: "adasdasd"
      } as unknown) as Score,
      true
    );

    expect(myArr.find(x => x.index === 500).id).toBe("adasdasd");
    expect(oldScore).toBe(null);
    expect(myArr.length).toBe(ASSERTIONS.ARRAY_LENGTH + 1);
  });

  test("findReplace functions", () => {
    myArr.findAndReplace(
      x => x.index === 500,
      x => {
        x.id = "123456";
        return x;
      }
    );

    expect(myArr.find(x => x.index === 500).id).toBe("123456");
  });

  test("findReplace functions for not found", () => {
    myArr.findAndReplace(
      x => x.index === 50000,
      x => {
        x.id = "123456";
        return x;
      }
    );

    expect(myArr.find(x => x.index === 50000)).toBe(undefined);
  });

  test("illegal action findReplace functions for not found and insert", () => {
    try {
      myArr.findAndReplace(
        x => x.index === 50000,
        x => x,
        true
      );
      assert(false, "This function didn't throw error like it was expected to.");
    } catch (err) {
      assertErrorType(err, Exception_FindReplaceIllegalAction);

      expect(err.constructor.name).toBe("Exception_FindReplaceIllegalAction");
    }
  });
});

describe("unionSplit", () => {
  const fruitsToCheck = ["banana", "strawberry", "lemon"];

  test("Who's fruit is it?", () => {
    const result = myArr.unionSplit(fruitsToCheck, (a, b) => a.favoriteFruit === b);

    expect(result.rightSplit.length).toBe(1);
    expect(result.innerJoin.length).toBe(7);
    expect(result.leftSplit.length).toBe(11);
  });
});
