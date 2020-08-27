Global extension of the Array.prototype includes typescript definitions.

```typescript
import "ts-array-ext";

type Score = {
  userId: number;
  score: number;
};

const myArr: Score[] = [
  { userId: 1, score: 1000 },
  { userId: 2, score: 999 },
  { userId: 2, score: 200 }
];
```

## SortByArg

Shorthand for sorting an array by a single comparable attribute.
Additional options for sorting descending.

### Usage

```typescript
const lowestFirst = myArr.SortByArg(
  x => x.score,
  SortDirection.ASC // is default, but you can be explicit
);

const highestFirst = myArr.SortByArg(x => x.score, SortDirection.DESC);
```

## Shuffle

Shorthand for shuffling an array.

### Usage

```typescript
const randomSortArr = myArr.shuffle();
```

## Sum

### Usage

```typescript
const totalScore = myArr.sum(x => x.score);
```

## Average

### Usage

```typescript
const avgScore = myArr.average(x => x.score);
```

## Min

### Usage

```typescript
const lowestScore = myArr.min(x => x.score);
```

## Max

### Usage

```typescript
const highestScore = myArr.max(x => x.score);
```

## Median

### Usage

```typescript
const medianScore = myArr.median(x => x.score);
```

## GroupBy

### Usage

```typescript
const map = myArr.groupBy(x => x.userId);
```

It is possible to add another callback for each of the groups' array.

#### Advanced

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
