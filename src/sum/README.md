# Sum

Returns sum of numeric values in collection.

## Example

Sum with selector

```typescript
const ages: number[] = [
  /* ... */
];

const totalAge = ages.sum();
```

Sum for numeric types

```typescript
type UserScore = {
  userId: string;
  score: number;
};

const userScores: UserScore[] = [
  /* ... */
];

const totalScore = userScores.sum(x => x.score);
```
