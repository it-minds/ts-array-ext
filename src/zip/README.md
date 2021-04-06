# Sum

Shorthand for zipping two arrays together

## Example

Zip two arrays

```typescript
const modelUserAges = userArr.zip(
  carArr,
  (u: User, c: Car) => u.id === c.ownerId,
  (u: User, c: Car) => ({ age: u.age, model: c.model})
);
```
