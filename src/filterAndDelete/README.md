# Sum

Returns the elements of an array that meet the condition specified in a callback function
and removes those element from the source array.

*NOTE:* This function is not immutable.

## Example

Sum with selector

```typescript
const numbers = [12, 5, 8, 130, 44];

function isBigEnough(value: number) {
  return value >= 10;
}

const bigNumbers = numbers.filterAndDelete(isBigEnough);
```
