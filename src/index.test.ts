//COVERAGE CHECKER
import "./";

import { expect } from "chai";

it("Full coverage required test", () => {
  expect(Array.prototype).to.have.property("average");
  expect(Array.prototype).to.have.property("chunkByCount");
  expect(Array.prototype).to.have.property("chunkBySize");
  expect(Array.prototype).to.have.property("distinct");
  expect(Array.prototype).to.have.property("findAndReplace");
  expect(Array.prototype).to.have.property("groupBy");
  expect(Array.prototype).to.have.property("max");
  expect(Array.prototype).to.have.property("min");
  expect(Array.prototype).to.have.property("median");
  expect(Array.prototype).to.have.property("reduceAsync");
  expect(Array.prototype).to.have.property("shuffle");
  expect(Array.prototype).to.have.property("sortByAttr");
  expect(Array.prototype).to.have.property("sum");
  expect(Array.prototype).to.have.property("unionSplit");
  expect(Array.prototype).to.have.property("distinct");
});
