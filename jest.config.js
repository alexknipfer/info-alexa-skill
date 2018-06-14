module.exports = {
  testEnvironment: 'node',
  transform: {
    '.(ts)': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'js'],
  testMatch: ['**/?(*.)(spec|test).ts?(x)'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx,js,jsx}',
    '!src/**/*.d.ts',
    '!src/inversify.config.ts',
    '!src/models/*'
  ],
  testPathIgnorePatterns: ['/node_modules/', '/coverage/', '/dist/']
}
