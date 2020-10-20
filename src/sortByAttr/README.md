# SortByAttr

Sorts an array by a single comparable attribute.
Additional options for sorting descending. Returns the sorted array.

## Example

```typescript
const lowestFirst = myArr.sortByAttr(x => x.score);

const lowestFirst = myArr.sortByAttr(x => x.score, "ASC");

const highestFirst = myArr.sortByAttr(x => x.score, "DESC");
```
