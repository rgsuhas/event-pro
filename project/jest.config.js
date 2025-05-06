const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
    '^@/types/(.*)$': '<rootDir>/types/$1'
  },
  maxWorkers: 1,
  testTimeout: 10000,
  verbose: true
};

module.exports = createJestConfig(customJestConfig);