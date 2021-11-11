/**
 * Rollup configuration inspired by: https://github.com/team-innovation/vue-sfc-rollup
 */

import resolve from '@rollup/plugin-node-resolve' // NodeJS node_modules resolution algorithm
import commonjs from '@rollup/plugin-commonjs' // Convert CommonJS modules to ES6
import babel from '@rollup/plugin-babel' // Babel rollup plugin
import replace from '@rollup/plugin-replace' // Replace strings in the source-code
import postcss from 'rollup-plugin-postcss' // Extract SCSS as CSS with PostCSS and inject it in JavaScript
import vue from 'rollup-plugin-vue' // Handle the compilation of .vue SFC files
import { terser } from 'rollup-plugin-terser' // Minify generated bundle
import svg from 'rollup-plugin-svg' // Handle .svg files imports

const esmConfig = {
  input: 'src/index.js',

  // Dependencies to exclude in the build output.
  external: ['vue'],

  output: {
    file: 'dist/vue3-roulette.esm.js',
    format: 'esm',
    exports: 'named',
    // Provide global variable names to replace your external imports.
    globals: {
      vue: 'Vue'
    }
  },

  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      preventAssignment: true
    }),

    svg(),

    vue({
      // Required to extract and re-inject SCSS styles as CSS
      preprocessStyles: true,
      css: true,
      template: {
        isProduction: true
      }
    }),

    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue']
    }),

    postcss(),

    commonjs(),

    babel({
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
      babelHelpers: 'bundled',
      presets: [
        ['@babel/preset-env', {}]
      ]
    })
  ]
}

const umdConfig = {
  input: 'src/index.js',

  // Dependencies to exclude in the build output.
  external: ['vue'],

  output: {
    compact: true,
    sourcemap: true,
    file: 'dist/vue3-roulette.js',
    format: 'cjs',
    name: 'vue3-roulette',
    exports: 'auto',
    // Provide global variable names to replace your external imports.
    globals: {
      vue: 'Vue'
    }
  },

  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      preventAssignment: true
    }),

    svg(),

    vue({
      // Required to extract and re-inject SCSS styles as CSS
      preprocessStyles: true,
      css: true,
      template: {
        isProduction: true,
        optimizeSSR: true
      }
    }),

    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue']
    }),

    postcss(),

    commonjs(),

    babel({
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
      babelHelpers: 'bundled',
      presets: [
        ['@babel/preset-env', {}]
      ]
    }),

    terser({
      output: { ecma: 5 }
    })
  ]
}

const iifeConfig = {
  input: 'src/index.js',

  // Dependencies to exclude in the build output.
  external: ['vue'],

  output: {
    compact: true,
    file: 'dist/vue3-roulette.min.js',
    format: 'iife',
    name: 'vue3Roulette',
    exports: 'auto',
    // Provide global variable names to replace your external imports.
    globals: {
      vue: 'Vue'
    }
  },

  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      preventAssignment: true
    }),

    svg(),

    vue({
      // Required to extract and re-inject SCSS styles as CSS
      preprocessStyles: true,
      css: true,
      template: {
        isProduction: true
      }
    }),

    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue']
    }),

    postcss(),

    commonjs(),

    babel({
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
      babelHelpers: 'bundled',
      presets: [
        ['@babel/preset-env', {}]
      ]
    }),

    terser({
      output: { ecma: 5 }
    })
  ]
}

export default [esmConfig, umdConfig, iifeConfig]
