/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.e2e-spec.ts'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'test',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
}; 