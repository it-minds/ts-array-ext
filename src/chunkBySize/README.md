# chunkBySize

Split an array into an amount of chunks depending on size.

Optional force fairness that distributes elements into "fair" groups.
The this parameter treatChunkSizeAsMax prevents the force fairness from distributing elements into groups at the request size.

## Example

```typescript
const chunks = myArr.chunkBySize(5);
// If the arr contains 21 elements, the 21st element will be alone in its own array.
// Sizes of the different arrays: `5,5,5,5,1`
const chunks = myArr.chunkBySize(5, true);
// If the arr contains 21 elements, the 21st element will pe part of the first array.
// Sizes of the different arrays: `6,5,5,5`
const chunks = myArr.chunkBySize(5, true, true);
// If the arr contains 21 elements, all elements will be distributed evenly into 5 groups.
// Sizes of the different arrays: `5,4,4,4,4`
```
