# distinct

Find distinct elements in an array of primitives or based on an attribute for objects.

## Example

```typescript
const arr = [
  "banana",
  "strawberry",
  "lemon",
  "banana",
  "strawberry",
  "lemon",
  "banana",
  "strawberry",
  "lemon"
];
const res = arr.distinct();
```

Also with attribute selector

```typescript
const data: User[] = [];

const res = arr.distinct(u => u.name);
```
