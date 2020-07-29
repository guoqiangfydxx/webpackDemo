const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const WorkWebpackPlugin = require('workbox-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const glob = require('glob')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const setMAP = () => {
  const entry = {}
  const HtmlWebpackPlugin1 = []

  const entryFiles = glob.sync(path.resolve(__dirname, './src/*/index.js'))
  entryFiles.forEach(filePath => {
    const chunkName = filePath.match(/src\/(.*)\/index\.js/)
    const chunk = chunkName && chunkName[1]
    entry[chunk] = filePath
    HtmlWebpackPlugin1.push(new HtmlWebpackPlugin({
      template: path.join(__dirname, `./src/${chunk}/${chunk}.html`),
      filename: `${chunk}.html`,
      chunks: ['vendor', chunk],
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
        html5: true
      }
    }))
  })

  return {
    entry,
    HtmlWebpackPlugin1
  }
}

const { entry, HtmlWebpackPlugin1 } = setMAP()
module.exports = {
  entry: entry,
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].chunk.js',
    path: path.resolve(__dirname, 'build')
  },
  mode: 'development',
  //   devtool: 'inline-source-map',
  //   devServer: {
  //     contentBase: './dist',
  //     hot: true
  //   },
  plugins: [
    new CleanWebpackPlugin(),
    // new HtmlWebpackPlugin({
    //   template: './src/test.html',
    //   filename: 'index.html',
    //   minify: {
    //     removeComments: true,
    //     collapseWhitespace: true,
    //     removeRedundantAttributes: true,
    //     useShortDoctype: true,
    //     removeEmptyAttributes: true,
    //     removeStyleLinkTypeAttributes: true,
    //     keepClosingSlash: true,
    //     minifyJS: true,
    //     minifyCSS: true,
    //     minifyURLs: true,
    //   },
    // }),
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
    }),
    new FriendlyErrorsWebpackPlugin(),
    new BundleAnalyzerPlugin()
  ].concat(HtmlWebpackPlugin1),
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /(react| react-dom)/,
          name: 'vendor',
          chunks: 'all'
        },
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2
        }
      }
      // chunks: 'all',
      // name: 'vendor',
      // filename: 'vendor-[hash].js',
    },
    minimizer: [new TerserWebpackPlugin({}), new OptimizeCSSAssetsPlugin({ cssProcessor: require('cssnano') })]
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.css$/,
        use: [{ loader: MiniCssExtractPlugin.loader }, {
          loader: 'css-loader',
          options: {
            importLoaders: 1
          }
        }, {
          loader: 'postcss-loader'
        }]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{ loader: 'file-loader', options: { name: 'media/[name].[hash:8].[ext]' } }]
      },
      {
        test: /.xml$/,
        use: ['xml-loader']
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env'], '@babel/preset-react']
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
}
