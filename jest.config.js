const nextJest = require('next/jest')
const createJestConfig = nextJest({
  dir: './',
})
const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@hooks(.*)$': '<rootDir>/hooks$1',
    '^@components(.*)$': '<rootDir>/components$1',
    '^@lib(.*)$': '<rootDir>/lib$1',
    '^@models(.*)$': '<rootDir>/models$1',
  },
}
module.exports = createJestConfig(customJestConfig)
