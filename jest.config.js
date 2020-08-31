module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
      '^.+\\.ts?$': 'ts-jest',
  },
  preset: '@shelf/jest-mongodb',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
}
