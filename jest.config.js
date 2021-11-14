module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{js,vue}',
    '!<rootDir>/src/index.js',
    '!<rootDir>/pages/**/*'
  ],
  moduleFileExtensions: [ 'js', 'json', 'vue' ],
  transform: {
    '.*\\.(vue)$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.js$': 'babel-jest'
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/tests/mocks/file-mock.js'
  },
  transformIgnorePatterns: [],
  snapshotSerializers: [
    'jest-serializer-vue'
  ]
}
