module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^Assets(.*)$": "<rootDir>/src/assets$1",
    "^Components(.*)$": "<rootDir>/src/components$1",
    "^Constants(.*)$": "<rootDir>/src/constants$1",
    "^Setup(.*)$": "<rootDir>/src/setup$1",
    "^Store(.*)$": "<rootDir>/src/store$1",
    "^Utils(.*)$": "<rootDir>/src/utils$1",
    "^Views(.*)$": "<rootDir>/src/views$1"
  },
}
