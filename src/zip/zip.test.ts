import ".";

import { expect } from "chai";

interface Car {
  ownerId: number;
  model: string;
  make: string;
  year: number;
}

interface User {
  id: number;
  name: string;
  age: number;
}

describe("basic cases", () => {
  const cars: Car[] = [
    {
      make: "Toyota",
      model: "Corolla",
      ownerId: 1,
      year: 1999
    },
    {
      make: "Toyota",
      model: "Yaris",
      ownerId: 2,
      year: 2001
    },
    {
      make: "Tesla",
      model: "CyberTruck",
      ownerId: 3,
      year: 2018
    },
    {
      make: "Tesla",
      model: "Model-S",
      ownerId: 3,
      year: 2016
    }
  ];

  const users: User[] = [
    {
      id: 1,
      name: "Mister Misterson",
      age: 30
    },
    {
      id: 2,
      name: "Lars Larsdottir",
      age: 25
    },
    {
      id: 3,
      name: "Johan Johansdatter",
      age: 55
    }
  ];

  it("", () => {
    const score = cars.zip(
      users,
      (c, u) => c.ownerId === u.id,
      (c, u) => ({ age: u.age, model: c.model })
    );
    expect(score).deep.equal([
      { age: 30, model: "Corolla" },
      { age: 25, model: "Yaris" },
      { age: 55, model: "CyberTruck" }
    ]);
  });

  it("", () => {
    const score = users.zip(
      cars,
      (u, c) => c.ownerId === u.id,
      (u, c) => ({ age: u.age, model: c.model })
    );
    expect(score).deep.equal([
      { age: 30, model: "Corolla" },
      { age: 25, model: "Yaris" },
      { age: 55, model: "CyberTruck" },
      { age: 55, model: "Model-S" }
    ]);
  });
});
