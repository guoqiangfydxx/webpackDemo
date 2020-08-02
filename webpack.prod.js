const merge = require('webpack-merge')
const webpack = require('webpack')
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
    // new webpack.DllReferencePlugin({
    //   manifest: require('./dist/library/library.json')
    // })
  ]
}))
