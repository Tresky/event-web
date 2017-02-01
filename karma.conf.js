let webpackConfig = require('./webpack.config.dev')
webpackConfig.entry = {}

module.exports = function (config) {
  config.set({

    basePath: '.',

    files: [
      'src/app/index.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'test/unit/test.js',
      'test/unit/**/*.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome'],

    preprocessors: {
      'src/app/index.js': ['webpack'],
      'test/unit/test.js': ['babel'],
      'test/unit/**/*.js': ['babel']
    },

    webpackMiddleware: {
      stats: 'errors-only'
    },

    webpack: webpackConfig
  })
}
