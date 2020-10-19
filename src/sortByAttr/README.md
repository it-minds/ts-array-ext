### SortByAttr

Sorts an array by a single comparable attribute.
Additional options for sorting descending. Returns the sorted array.

#### Usage

```typescript
const lowestFirst = myArr.sortByAttr(x => x.score);

const lowestFirst = myArr.sortByAttr(x => x.score, SortDirection.ASC);

const lowestFirst = myArr.sortByAttr(x => x.score, 0);

const highestFirst = myArr.sortByAttr(x => x.score, SortDirection.DESC);

const highestFirst = myArr.sortByAttr(x => x.score, 1);
```