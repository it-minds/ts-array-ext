import ".";

import { expect } from "chai";

type Score = {
  score: number;
};

type ExtendedScore = Score & {
  fetchedAttr: string;
};
describe("async test", () => {
  it("simple reduce", async () => {
    const myArr: Score[] = [
      {
        score: 4
      }
    ];

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
