const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const filename = ext => isDev ? `[name].${ext}` : `[name].[fullhash].${ext}`

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  }

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetWebpackPlugin(),
      new TerserWebpackPlugin()
    ]
  }

  return config
}

const sourceMap = () => {
  if (isDev) {
    return 'source-map'
  }
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  // entry: './index.js',
  entry: {
    index: ['./index.js'],
    second: ['./plugins/secondPage.js'],
    thirth: ['./plugins/thirthPage.js']
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
    publicPath: ''
  },
  resolve: {
    alias: {
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@': path.resolve(__dirname, 'src')
    }
  },
  optimization: optimization(),
  target: 'web',
  devServer: {
    port: 8080,
    open: true
  },
  devtool: sourceMap(),
  plugins: [
    // new HTMLWebpackPlugin({
    //   // template: './index.html'
    //   filename: 'index.html',
    //   template: './pug/pages/index.pug'
    // }),
    new HTMLWebpackPlugin({
      // template: './index.html'
      filename: 'index.html',
      template: './pug/pages/index.pug',
      chunks: ['index']
    }),
    new HTMLWebpackPlugin({
      filename: 'second.html',
      template: './pug/pages/second.pug',
      chunks: ['second']
    }),
    new HTMLWebpackPlugin({
      filename: 'thirth.html',
      template: './pug/pages/thirth.pug',
      chunks: ['thirth']
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon.ico'),
          to: path.resolve(__dirname, 'dist')
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    })
  ],
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          pretty: true
        }
      },
      {
        test: /\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ['file-loader']
      }
    ]
  }
}