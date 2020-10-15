# Contributing

## Setup local dev environment

1. Clone the repo
2. Checkout a branch using our [branching strategy](#Branching%20Strategy)
3. `npm i` runs the prepare so you are ready to go.

## Branching Strategy

- feature/\*
  <br>A feature is an entire new section of code that adds new functionality to the library. A feature branch must not change existing functionality.
- chore/\*
  <br>A chore tends to be changing the existing features with no impacts. Such as internal error message, test cases, documentation.
- bugfix/\*
  <br>A bugfix changes a single feature set that isn't working as intended.

Use one of these branches.
If you do not know which to use please contact us at opensource@it-minds.dk.

## Type Definitions

We are writing our own type definitions in a seperate typescript file.
Follow this convention and if you got a better idea feel free to open an issue.

## Testing

When creating new features be sure to also create test that covers 100% of the code.
We accept nothing less than full coverage.

## Committing

This repo is using [husky](https://github.com/typicode/husky) to provide easy pre commit hook linking.
The pre-commit is setup to automatically lint and test your code. Do not force commit if these check fail.
