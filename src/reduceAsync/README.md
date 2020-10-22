# reduceAsync

Avoid having to fiddle with promise accumulator and resolution in a `.reduce`.

## Example

```typescript
const result = await myArr.reduceAsync<ExtendedScore[]>(async (acc, cur) => {
  const addOnAttr = await new Promise<string>(resolve =>
    setTimeout(() => resolve(Date.now().toString(24)), 5)
  );

  (cur as ExtendedScore).fetchedAttr = addOnAttr;

  return [...acc, cur as ExtendedScore];
}, []);
```
  