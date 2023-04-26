/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  collectCoverage: true,
  collectCoverageFrom: ['src/components/**/*.{ts,tsx}', '!**/node_modules/**'],
  coverageReporters: ['text-summary'],
};
