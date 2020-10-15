import "../src/index";
import { assert, expect } from "chai";
import { describe } from "mocha";

import {
    assertErrorType,
    Exception_FindReplaceIllegalAction
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
    it("ASC with enum", function () {
        let result = myArr.sortByAttr(a => a.age, SortDirection.ASC);

        expect(result[0].age).equal(ASSERTIONS.MIN_AGE);
        expect(result[myArr.length - 1].age).equal(ASSERTIONS.MAX_AGE);
    });

    it("ASC with num", function () {
        let result = myArr.sortByAttr(a => a.age, 0);

        expect(result[0].age).equal(ASSERTIONS.MIN_AGE);
        expect(result[myArr.length - 1].age).equal(ASSERTIONS.MAX_AGE);
    });

    it("DESC with enum ", function () {
        let result = myArr.sortByAttr(a => a.age, SortDirection.DESC);

        expect(result[0].age).equal(ASSERTIONS.MAX_AGE);
        expect(result[myArr.length - 1].age).equal(ASSERTIONS.MIN_AGE);
    });

    it("DESC with num", function () {
        let result = myArr.sortByAttr(a => a.age, 1);

        expect(result[0].age).equal(ASSERTIONS.MAX_AGE);
        expect(result[myArr.length - 1].age).equal(ASSERTIONS.MIN_AGE);
    });

    it("ASC by string with num", function () {
        let result = myArr.sortByAttr(a => a.name.first, 0);

        expect(result[0].name.first).equal(ASSERTIONS.LOWEST_NAME);
        expect(result[myArr.length - 1].name.first).equal(ASSERTIONS.HIGHEST_NAME);
    });

    it("DESC by string with num", function () {
        let result = myArr.sortByAttr(a => a.name.first, 1);

        expect(result[0].name.first).equal(ASSERTIONS.HIGHEST_NAME);
        expect(result[myArr.length - 1].name.first).equal(ASSERTIONS.LOWEST_NAME);
    });

    it("Shuffle Then sort", function () {
        let result = myArr
            .shuffle()
            .shuffle()
            .sortByAttr(a => a.name.first);

        expect(result[0].name.first).equal(ASSERTIONS.LOWEST_NAME);
        expect(result[myArr.length - 1].name.first).equal(ASSERTIONS.HIGHEST_NAME);
    });
});

describe("shuffle", () => {
    it("Shuffle 1 mio times and expect results to be close to average", function (done) {
        this.timeout(5000);
        let roll = 0;
        let counts: { [k: string]: number } = {};

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

describe("calculate", () => {
    it("sum", function () {
        let result = myArr.sum(x => x.age);
        expect(result).equal(613);
    });

    it("min", function () {
        let score = myArr.min(x => x.age).age;
        expect(score).equal(ASSERTIONS.MIN_AGE);
    });

    it("max", function () {
        let score = myArr.max(x => x.age).age;
        expect(score).equal(ASSERTIONS.MAX_AGE);
    });

    it("median", function () {
        let score = myArr.median(x => x.age).age;
        expect(score).equal(38);
    });

    it("avg", function () {
        let result = myArr.average(x => x.age, 2);

        expect(result).equal(36.06);
    });
});

describe("groupBy", function () {
    it("groupByUserId", function () {
        let groups = myArr.groupBy(x => x.favoriteFruit);

        expect(Object.keys(groups).length).equal(4);
    });

    it("groupByThenCount", function () {
        let groups = myArr.groupBy(
            x => x.favoriteFruit,
            arr => arr.length
        );

        expect(Object.keys(groups).length).equal(4);
        expect(groups["banana"], "User ID 1 should have 2 scores").equal(6);
        expect(groups["apple"], "User ID 2 should have 3 scores").equal(4);
        expect(groups["strawberry"], "User ID 2 should have 3 scores").equal(2);
        expect(groups["orange"], "User ID 2 should have 3 scores").equal(5);
    });

    it("groupByThenShuffle", function () {
        let groups = myArr.groupBy(
            x => x.age,
            arr => arr.shuffle()
        );

        expect(Object.keys(groups).length).equal(14);
    });
});

describe("chunk", function () {
    let baseArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

    it("chunkByCount", function () {
        let groups = baseArr.chunkByCount(3);

        expect(groups[0].length).equal(6);
        expect(groups[1].length).equal(6);
        expect(groups[2].length).equal(5);
    });

    it("chunkByCountFair", function () {
        let groups = baseArr.chunkByCount(3, true);

        expect(groups[0].length).equal(5);
        expect(groups[1].length).equal(5);
        expect(groups[2].length).equal(5);
    });

    it("chunkBySize", function () {
        let groups = baseArr.chunkBySize(7);

        expect(groups[0].length).equal(7);
        expect(groups[1].length).equal(7);
        expect(groups[2].length).equal(3);
    });

    it("chunkBySizeFairMore", function () {
        let groups = baseArr.chunkBySize(7, true);

        expect(groups[0].length).equal(6);
        expect(groups[1].length).equal(6);
        expect(groups[2].length).equal(5);
    });

    it("chunkBySizeFairFewer", function () {
        const baseArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

        let groups = baseArr.chunkBySize(7, true);

        expect(groups[0].length).equal(8);
        expect(groups[1].length).equal(7);
    });

    it("chunkBySizeFairFewerWithMax", function () {
        const baseArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

        let groups = baseArr.chunkBySize(7, true, true);

        expect(groups[0].length).equal(5);
        expect(groups[1].length).equal(5);
        expect(groups[2].length).equal(5);
    });
});

describe("async test", () => {
    it("simple reduce", async () => {
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

        expect(resultProm).property("then");
        expect(resultProm).property("catch");
        const result = await resultProm;
        expect(result[0]).property("fetchedAttr");
        expect(result[0].fetchedAttr).equal("SOMETHING_NEW");
    });
});

describe("findAndReplace", () => {
    it("single element", () => {
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

        expect(myArr.find(x => x.index === 5).id).equal("adasdasd");
        expect(oldScore.id).equal("5f5f24b8b804f4ead7b82da9");
    });

    it("Insert Instead of Replace", () => {
        myArr.sortByAttr(x => x.index);

        expect(myArr.find(x => x.index === 500)).equal(undefined);

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

        expect(myArr.find(x => x.index === 500).id).equal("adasdasd");
        expect(oldScore).equal(null);
        expect(myArr.length).equal(ASSERTIONS.ARRAY_LENGTH + 1);
    });

    it("findReplace functions", () => {
        myArr.findAndReplace(
            x => x.index === 500,
            x => {
                x.id = "123456";
                return x;
            }
        );

        expect(myArr.find(x => x.index === 500).id).equal("123456");
    });

    it("findReplace functions for not found", () => {
        myArr.findAndReplace(
            x => x.index === 50000,
            x => {
                x.id = "123456";
                return x;
            }
        );

        expect(myArr.find(x => x.index === 50000)).equal(undefined);
    });

    it("illegal action findReplace functions for not found and insert", () => {
        try {
            myArr.findAndReplace(
                x => x.index === 50000,
                x => x,
                true
            );

            assert(
                false,
                "This function didn't throw error like it was expected to."
            );
        } catch (err) {
            assertErrorType(err, Exception_FindReplaceIllegalAction);

            expect(err.constructor.name).equal("Exception_FindReplaceIllegalAction");
        }
    });
});

describe("unionSplit", () => {
    const fruitsToCheck = ["banana", "strawberry", "lemon"];

    it("Who's fruit is it?", () => {
        const result = myArr.unionSplit(
            fruitsToCheck,
            (a, b) => a.favoriteFruit === b
        );

        expect(result.rightSplit.length).equal(1);
        expect(result.innerJoin.length).equal(7);
        expect(result.leftSplit.length).equal(11);
    });
});

describe("Distinct", () => {
    it("Only distinct elements.", () => {
        const arr = ["banana", "strawberry", "lemon"];
        const res = arr.distinct();

        expect(res.length).equal(3);
        expect(res).deep.equal(arr);
    });

    it("Multiple identical elements.", () => {
        const arr = ["banana", "strawberry", "lemon", "banana", "strawberry", "lemon", "banana", "strawberry", "lemon"];
        const res = arr.distinct();

        expect(res.length).equal(3);
        expect(res).deep.equal(["banana", "strawberry", "lemon"]);
    });

    it("Only distinct objects.", () => {
        const arr = [
            { id: 0, fruit: "banana" },
            { id: 1, fruit: "strawberry" },
            { id: 2, fruit: "lemon" }
        ];
        const res = arr.distinct(x => x.fruit);

        expect(res.length).equal(3);
        expect(res).deep.equal(arr);
    });

    it("Multiple identical object attributes.", () => {
        const arr = [
            { id: 0, fruit: "banana" },
            { id: 1, fruit: "strawberry" },
            { id: 2, fruit: "lemon" },
            { id: 3, fruit: "lemon" },
            { id: 4, fruit: "strawberry" },
            { id: 5, fruit: "lemon" }
        ];
        const res = arr.distinct(x => x.fruit);

        expect(res.length).equal(3);
        expect(res).deep.equal([{ id: 0, fruit: "banana" },
        { id: 1, fruit: "strawberry" },
        { id: 2, fruit: "lemon" }])
    });

    it("Empty", () => {
        const arr: string[] = [];
        const res = arr.distinct();

        expect(res.length).equal(0);
        expect(res).deep.equal([]);
    });
})
