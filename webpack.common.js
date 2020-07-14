const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const WorkWebpackPlugin = require('workbox-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

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
    new MiniCssExtractPlugin({
      name: 'css/[name].[contenthash:8].css'
    })
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
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{ loader: "file-loader" , options: { name: 'media/[name].[hash:8].[ext]'}}],
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
