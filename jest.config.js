module.exports = {
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'vue'
  ],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest'
  },
  transformIgnorePatterns: [
    '/node_modules(?![\\\\/]vue-awesome[\\\\/])/'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    "^Apis(.*)$": "<rootDir>/src/apis$1",
    "^Assets(.*)$": "<rootDir>/src/assets$1",
    "^Components(.*)$": "<rootDir>/src/components$1",
    "^Constants(.*)$": "<rootDir>/src/constants$1",
    "^Setup(.*)$": "<rootDir>/src/setup$1",
    "^Store(.*)$": "<rootDir>/src/store$1",
    "^Utils(.*)$": "<rootDir>/src/utils$1",
    "^Views(.*)$": "<rootDir>/src/views$1"
  },
  snapshotSerializers: [
    'jest-serializer-vue'
  ],
  testMatch: [
    '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
  ],
  testURL: 'http://localhost/'
}
