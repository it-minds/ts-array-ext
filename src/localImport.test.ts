//COVERAGE CHECKER
import "./max";

import { expect } from "chai";

it("Test only selected import part of prototype", () => {
  expect(Array.prototype).to.have.property("max");
  expect(Array.prototype).to.not.have.property("min");
});
