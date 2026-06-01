module.exports = {
  preset: 'jest-expo',
  moduleNameMapper: {
    '^expo-modules-core/(.*)$':
      '<rootDir>/node_modules/expo/node_modules/expo-modules-core/$1',
    '^expo-modules-core$':
      '<rootDir>/node_modules/expo/node_modules/expo-modules-core',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^immer$': '<rootDir>/node_modules/immer/dist/cjs/index.js',
    '^react-redux$': '<rootDir>/node_modules/react-redux/dist/cjs/index.js',
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};
