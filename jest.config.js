// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // A preset that is used as a base for Jest's configuration
  preset: "ts-jest",

  // The test environment used for testing
  testEnvironment: "node",

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // A list of reporter names used when generating coverage reports
  coverageReporters: ["lcov"],

  // The directory where Jest should output its coverage files
  coverageDirectory: "test-coverage",

  // Define here the minimum coverage for a succesfull test
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
