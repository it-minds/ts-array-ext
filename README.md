# TS-Array-Ext

<p align="center">
Fast <b><2kB</b> array utility library with a modern API</p>
<br>

![](https://badgen.net/bundlephobia/minzip/ts-array-ext?color=blue)
![](https://badgen.net/npm/dt/ts-array-ext?color=blue)
![](https://badgen.net/npm/license/ts-array-ext?color=blue)
![](https://badgen.net/npm/types/ts-array-ext?color=blue)
![](https://badgen.net/david/dev/IT-Minds-opensource/ts-array-ext?color=blue)
![](https://badgen.net/david/dep/IT-Minds-opensource/ts-array-ext?color=blue)

> TS-Array-Ext is a minimalist TypeScript library that provides a few utility functions to the Array prototype class.
> Inspired by LINQ functionality we aim to bring a few easy to use functions that ourselves keep rewriting over and over. No longer. It is time to extend base JavaScript Array functions.

- 🧠 Familiar LINQ API & patterns
- 💪 Immutable
- 🔥 Chainable
- 📦 <2kB mini library
- 👫 Node and browser support

---

## Getting started

### Installation

```sh
npm i ts-array-ext --save
```

Then simply import at top level for global use or scoped if using webpack

```typescript
import "ts-attay-ext";
```

### Demo

Checkout [this playground](https://stackblitz.com/edit/ts-array-ext?devtoolsheight=75&file=index.ts) with all examples of usage from below.

---

## API

It's easy to use TS-Array-Ext.

- [SortByArg](#SortByArg)
- [Shuffle](#Shuffle)
- [Sum](#Sum)
- [Min](#Min)
- [Max](#Max)
- [Median](#Median)
- [GroupBy](#GroupBy)
- [findAndReplace](#findOrCreate)
- [reduceAsync](#reduceAsync)
- [chunkBySize](#chunkBySize)
- [chunkByCount](#chunkByCount)

### SortByArg

Sorts an array by a single comparable attribute.
Additional options for sorting descending. Returns the sorted array.

#### Usage

```typescript
const lowestFirst = myArr.SortByArg(x => x.score);

const lowestFirst = myArr.SortByArg(x => x.score, SortDirection.ASC);

const lowestFirst = myArr.SortByArg(x => x.score, 0);

const highestFirst = myArr.SortByArg(x => x.score, SortDirection.DESC);

const highestFirst = myArr.SortByArg(x => x.score, 1);
```

### Shuffle

Shuffled an array using the following algorithm:

`Math.floor(1e14 * Math.random() * Math.random()) % (this.length * 100)`

Tested to practically shuffle evenly with an error margin of **< 0.2%**

#### Usage

```typescript
const randomSortArr = myArr.shuffle();
```

### Sum

#### Usage

```typescript
const totalScore = myArr.sum(x => x.score);
```

### Average

#### Usage

```typescript
const avgScore = myArr.average(x => x.score);
```

### Min

#### Usage

```typescript
const lowestScore = myArr.min(x => x.score);
```

### Max

#### Usage

```typescript
const highestScore = myArr.max(x => x.score);
```

### Median

#### Usage

```typescript
const medianScore = myArr.median(x => x.score);
```

### GroupBy

#### Usage

```typescript
const map = myArr.groupBy(x => x.userId);
```

It is possible to add another callback for each of the groups' array.

##### Advanced

Sum

```typescript
const userTotalScores = myArr.groupBy(
  x => x.userId,
  arr => arr.sum(x => x.score)
);
```

Sort

```typescript
const usersHighScores = myArr.groupBy(
  x => x.userId,
  arr => arr.sortByAttr(x => x.score, SortDirection.DESC)
);
```

Nested

```typescript
const userScoreAttempts = myArr.groupBy(
  x => x.userId,
  arr =>
    arr.groupBy(
      x => x.score,
      arr2 => arr2.length
    )
);
```

### findAndReplace

#### Usage

```typescript

```

### reduceAsync

#### Usage

```typescript

```

### chunkBySize

Split an array into an amount of chunks depending on size.

#### Usage

```typescript
const chunksArray = myArr.chunkBySize(NUM);
```

### chunkByCount

#### Usage

```typescript

```
