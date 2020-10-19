### GroupBy

#### Usage

```typescript
const map = myArr.groupBy(x => x.userId);
```

It is possible to add another callback for each of the groups' array.

##### Advanced

Sum

```typescript
const userTotalScores = myArr.groupBy(
  x => x.userId,
  arr => arr.sum(x => x.score)
);
```

Sort

```typescript
const usersHighScores = myArr.groupBy(
  x => x.userId,
  arr => arr.sortByAttr(x => x.score, SortDirection.DESC)
);
```

Nested

```typescript
const userScoreAttempts = myArr.groupBy(
  x => x.userId,
  arr =>
    arr.groupBy(
      x => x.score,
      arr2 => arr2.length
    )
);
```