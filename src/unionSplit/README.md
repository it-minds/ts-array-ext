# Union Split

This function allows you to split the array given another array and a comparator between the two into 3 different sections

- leftSplit: Has all the elements of the first array that doesn't match in the comparator.
- innerJoin: Has all the elements of the first array that does match in the comparator.
- rightSplit: Has all the elements of the second array that doesn't match in the comparator.

## Example

```typescript
type User = {
  name: string;
  age: number;
  id: string;
};

type UserCar = {
  userId: string;
  carId: string;
};

const users: User[] = [
  /*... */
];

const userCars: UserCar[] = [
  /*... */
];

const {
  leftSplit, // Users that doesn't own a car
  innerJoin, // Users that own a car
  rightSplit // UserCars that doesn't have a user
} = users.unionSplit(userCars, (u, uc) => u.id === uc.userId);
```

## Use cases

If you have an array of elements and another to look up in those elements but also know which were left out, unionSplit can be used as an alternative to `.filter` + `.every` || `.some`
