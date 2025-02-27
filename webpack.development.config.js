const path = require('path')
require('dotenv').config()
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WebpackShellPlugin = require('webpack-shell-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const { nanoid } = require('nanoid')

const APP_VERSION = nanoid()
const config = {
  devtool: 'eval-source-map',

  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3001',
    'webpack/hot/only-dev-server',
    './main.js',
    './assets/scss/main.scss'
  ],
  resolve: {
    alias: {
      d3: 'd3/index.js',
      'react-dom': '@hot-loader/react-dom'
    }
  },
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'dist/assets'),
    publicPath: ''
  },
  mode: 'development',
  context: path.resolve(__dirname, 'client'),
  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, 'dist/assets'),
    watchContentBase: true,
    host: 'localhost',
    port: 3001,

    historyApiFallback: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: [
      {
        context: ['/api', '/auth', '/ws'],
        target: 'http://localhost:3000',
        secure: false,
        changeOrigin: true,
        ws: true
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
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
      filename: 'css/main.css',
      chunkFilename: 'css/[id].css',
      ignoreOrder: false
    }),
    new CopyWebpackPlugin(
      {
        patterns: [
          { from: 'assets/images', to: 'images' },
          { from: 'assets/fonts', to: 'fonts' },
          { from: 'assets/manifest.json', to: 'manifest.json' },
          { from: 'index.html', to: 'index.html' },

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
      },
      { parallel: 100 }
    ),

    new ReactRefreshWebpackPlugin({
      overlay: {
        sockIntegration: 'wds'
      }
    }), // new HardSourceWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin(
      Object.keys(process.env).reduce(
        (res, key) => ({ ...res, [key]: JSON.stringify(process.env[key]) }),
        {
          APP_VERSION: JSON.stringify(APP_VERSION),
          'windows.process': { cwd: () => '' }
        }
      )
    )
  ]
}

module.exports = config
