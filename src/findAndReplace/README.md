# findAndReplace

Given a predicate of finding an element and another element to take its place.

Mutates the array and returns the found (old) element.

If no element is found using the predicate the new element will not be added to the array, except if the addIfNotFound arg is true.

## Example

Found user is replaced by new. Returns null if not found.

```typescript
const user: User = { id: 2, name: "Paul": score: 0 };
const oldElement = myArr.findAndReplace(x => x.score === 100, user);
```

User is added, if it doesn't already exist.

```typescript
const user: User = { id: 2, name: "Paul" };
const oldElement = myArr.findAndReplace(x => x.id === 2, user, true);
```

Found user is mutated.

```typescript
const oldElement = myArr.findAndReplace(
  x => x.id === 2,
  x => {
    x.score++;
    return x;
  }
);
```
