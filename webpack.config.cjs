'use strict'

const { resolve, dirname } = require('node:path')
const loadJsonFile = require('load-json-file')
const packageDirectory = require('pkg-dir')
const WebpackBarPlugin = require('webpackbar')

/**
 * @param env {Object.<string, *>}
 * @param argv {Object.<string, *>}
 * @returns {import('webpack').Configuration}
 */
module.exports = async (env, argv) => {
  const packageInfo = await loadJsonFile(resolve(await packageDirectory(), 'package.json'))
  const typesPath = packageInfo.types || packageInfo.typings || resolve(__dirname, 'dist', 'types', 'index.d.ts')

  const outPath = resolve(__dirname, 'dist')

  /** @type {import('webpack').Configuration} */
  const baseConfig = (makeDefinitions = false) => ({
    entry: { index: './src/index.ts' },
    module: {
      rules: [
        // TypeScript support
        {
          test: /\.tsx?$/u,
          use: [
            {
              loader: 'ts-loader',
              options: {
                onlyCompileBundledFiles: true,
                // Define build compile options since the project options are required for the test runner
                compilerOptions: {
                  module: 'esnext',
                  target: 'es2015',
                  noEmitOnError: true,
                  declaration: makeDefinitions,
                  declarationDir: makeDefinitions ? dirname(typesPath) : undefined,
                  rootDir: './src/'
                }
              }
            }
          ],
          exclude: /node_modules/u
        }
      ]
    },
    resolve: { extensions: ['.tsx', '.ts', '.js'] },
    plugins: [
      // Fancy progress bars.
      new WebpackBarPlugin({ profile: true })
    ],
    // Only show compiled assets and build time.
    stats: { preset: 'errors-warnings', assets: true, colors: true },
    // Source maps
    devtool: 'source-map'
  })

  return [
    {
      ...baseConfig(),
      name: 'CommonJS',
      target: 'node14',
      output: {
        // $PROJECTDIR/bin/index.cjs.js
        library: { type: 'commonjs' },
        filename: '[name].cjs.js',
        path: outPath
      }
    },
    {
      ...baseConfig(true),
      name: 'ES6 Modules',
      target: 'es2020',
      output: {
        // $PROJECTDIR/bin/index.esm.js
        library: { type: 'module' },
        filename: '[name].esm.js',
        path: outPath
      },
      experiments: {
        outputModule: true
      }
    },
    {
      ...baseConfig(),
      name: 'IIFE',
      target: 'web',
      output: {
        // $PROJECTDIR/bin/index.iife.js
        library: { name: 'vahvista', type: 'var' },
        filename: '[name].iife.js',
        path: outPath
      }
    }
  ]
}
