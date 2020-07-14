const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const WorkWebpackPlugin = require('workbox-webpack-plugin')

module.exports = {
  entry: {
    app: "./src/index.js",
    // print: './src/print.js'
  },
  output: {
    filename: "[name].[hash].js",
    chunkFilename: "[name].chunk.js",
    path: path.resolve(__dirname, "build"),
  },
  mode: "development",
//   devtool: 'inline-source-map',
//   devServer: {
//     contentBase: './dist',
//     hot: true
//   },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin(),
    new webpack.NamedModulesPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      _: 'loadsh'
    }),
    new WorkWebpackPlugin.GenerateSW({
      skipWaiting: true,
      clientsClaim: true
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'vendor',
    filename: 'vendor-[hash].js',
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"],
      },
      {
        test: /.xml$/,
        use: ["xml-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        include: path.resolve(__dirname, "src"),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
};
