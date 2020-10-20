# chunkByCount

Split an array into X amount of chunks.

Optional force fairness that strips the array down so `% X === 0`

## Example

```typescript
const chunks = myArr.chunkByCount(5);
//If the arr contains 21 elements, the 21st element will be part of the first array.
const chunks = myArr.chunkByCount(5, true);
//If the arr contains 21 elements, the 21st element wont be part of the result here.
```
