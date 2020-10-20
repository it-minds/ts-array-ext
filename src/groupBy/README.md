# GroupBy

Shorthand for creating a dictionary object with the key

## Example

```typescript
const map = myArr.groupBy(x => x.userId);
```

## Advanced

It is possible to add another callback for each of the groups' array.

Here are some examples:

### Sum

```typescript
const userTotalScores = myArr.groupBy(
  x => x.userId,
  arr => arr.sum(x => x.score)
);
```

Returns key value pair with userId as key and the users total score as value.

### Sort

```typescript
const usersHighScores = myArr.groupBy(
  x => x.userId,
  arr => arr.sortByAttr(x => x.score, SortDirection.DESC)
);
```

Returns key value pair with userId as key and their scores ranked from highest to lowest as value.

### Nested

```typescript
const userScoreAttempts = myArr.groupBy(
  x => x.userId,
  arr =>
    arr.groupBy(
      x => x.score,
      arr2 => arr2.length
    )
);

// result type
{
  [userId: string] : {
    [score: number]: number;
  }
}

```

Returns key value pair with userId as key and a dictionary with each score and count of occurrence.
