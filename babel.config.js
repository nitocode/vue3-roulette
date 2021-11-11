// Build presets are used when building the component library with Rollup
const buildPresets = [
  [
    '@babel/preset-env',
    {}
  ]
]

// Dev presets are used when running a local development server
const devPresets = ['@vue/cli-plugin-babel/preset']

// Test presets are used when running unit-tests
const testPresets = [
  [
    'env',
    {
      targets: {
        node: 'current'
      }
    }
  ]
]

module.exports = {
  presets: process.env.NODE_ENV === 'production'
    ? buildPresets : process.env.NODE_ENV === 'development'
      ? devPresets : testPresets
}
