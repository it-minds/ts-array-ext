import "./";

import { expect } from "chai";

describe("Distinct", () => {
  it("Only distinct elements.", () => {
    const arr = ["banana", "strawberry", "lemon"];
    const res = arr.distinct();

    expect(res.length).equal(3);
    expect(res).deep.equal(arr);
  });

  it("Multiple identical elements.", () => {
    const arr = [
      "banana",
      "strawberry",
      "lemon",
      "banana",
      "strawberry",
      "lemon",
      "banana",
      "strawberry",
      "lemon"
    ];
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
    expect(res).deep.equal([
      { id: 0, fruit: "banana" },
      { id: 1, fruit: "strawberry" },
      { id: 2, fruit: "lemon" }
    ]);
  });

  it("Empty", () => {
    const arr: string[] = [];
    const res = arr.distinct();

    expect(res.length).equal(0);
    expect(res).deep.equal([]);
  });

  it("Only distinct elements (numbers).", () => {
    const arr = [1, 2, 3];
    const res = arr.distinct();

    expect(res.length).equal(3);
    expect(res).deep.equal(arr);
  });

  it("Multiple identical elements (numbers).", () => {
    const arr = [1, 2, 3, 1, 2, 3, 1, 2, 3];
    const res = arr.distinct();

    expect(res.length).equal(3);
    expect(res).deep.equal([1, 2, 3]);
  });
});
