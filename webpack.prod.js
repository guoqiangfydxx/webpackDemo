const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const SpeedMeasureWebpaclPlugin = require('speed-measure-webpack-plugin')

const smp = new SpeedMeasureWebpaclPlugin()

module.exports = smp.wrap(merge(common, {
  devtool: 'source-map',
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true
    })
  ]
}))
