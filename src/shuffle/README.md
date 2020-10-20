# Shuffle

Shuffled an array using the following algorithm:

`Math.floor(1e14 * Math.random() * Math.random()) % (this.length * 100)`

Tested to practically shuffle evenly with an error margin of **< 0.2%**

## Example

```typescript
const randomSortArr = myArr.shuffle();
```
