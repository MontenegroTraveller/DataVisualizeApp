const path = require('path')
require('dotenv').config()
const webpack = require('webpack')
const glob = require('glob')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const PurgecssPlugin = require('purgecss-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { nanoid } = require('nanoid')

const PATHS = {
  src: path.join(__dirname, 'client')
}

const APP_VERSION = nanoid()
const config = {
  entry: ['./main.js', './assets/scss/main.scss'],
  resolve: {
    alias: {
      d3: 'd3/index.js'
    }
  },
  output: {
    filename: 'js/bundle.js',
    chunkFilename: 'js/[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist/assets'),
    publicPath: ''
  },
  mode: 'production',
  context: path.resolve(__dirname, 'client'),
  devtool: false,
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserJSPlugin({ parallel: true }),
      new OptimizeCSSAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }]
        }
      })
    ]
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: [/client/, /server/],
        use: ['eslint-loader'],
        resolve: {
          extensions: ['.js', '.jsx']
        }
      },
      {
        test: /\.(js|jsx)$/,
        resolve: {
          extensions: ['.js', '.jsx']
        },
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          { loader: 'css-loader', options: { sourceMap: true } },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        test: /\.txt$/i,
        use: 'raw-loader'
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },

          { loader: 'css-loader', options: { sourceMap: true } },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },

      {
        test: /\.(png|jpg|gif|webp)$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
      {
        test: /\.eot$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
      {
        test: /\.woff(2)$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
      {
        test: /\.[ot]tf$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          },
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10 * 1024,
              noquotes: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css',
      ignoreOrder: false
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'assets/images', to: 'images' },
        { from: 'assets/fonts', to: 'fonts' },
        { from: 'assets/manifest.json', to: 'manifest.json' },
        // {
        //   from: 'install-sw.js',
        //   to: 'js/install-sw.js',
        //   transform: (content) => {
        //     return content.toString().replace(/APP_VERSION/g, APP_VERSION)
        //   }
        // },

        { from: 'assets/robots.txt', to: 'robots.txt' },
        { from: 'vendors', to: 'vendors' },
        {
          from: 'html.js',
          to: 'html.js',
          transform: (content) => {
            return content.toString().replace(/COMMITHASH/g, APP_VERSION)
          }
        }
        // {
        //   from: 'sw.js',
        //   to: 'sw.js',
        //   transform: (content) => {
        //     return content.toString().replace(/APP_VERSION/g, APP_VERSION)
        //   }
        // }
      ]
    }),

    new webpack.DefinePlugin(
      Object.keys(process.env).reduce(
        (res, key) => ({ ...res, [key]: JSON.stringify(process.env[key]) }),
        {
          APP_VERSION: JSON.stringify(APP_VERSION)
        }
      )
    )
  ]
}

module.exports = config
