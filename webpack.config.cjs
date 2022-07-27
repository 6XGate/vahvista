'use strict'

const { resolve, dirname } = require('path')
const loadJsonFile = require('load-json-file')
const packageDirectory = require('pkg-dir')

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
  const config = {
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
                compilerOptions: {
                  module: 'esnext',
                  target: 'es2015',
                  noEmitOnError: true,
                  declaration: true,
                  declarationDir: dirname(typesPath),
                  // include: ['./src/**/*.ts'],
                  // exclude: ['./test/**/*'],
                  // outDir: outPath,
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
    devtool: 'source-map'
  }

  return [
    {
      ...config,
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
      ...config,
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
      ...config,
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
