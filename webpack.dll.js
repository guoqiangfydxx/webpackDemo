const path = require('path')
const webpack = require('webpack')
module.exports = {
  entry: {
    library: [
      'react',
      'react-dom'
    ]
  },
  output: {
    path: path.join(__dirname, 'dist/library'),
    filename: '[name].dll.js',
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_[hash]',
      path: path.join(__dirname, 'dist/library/[name].json')
    })
  ]
}
