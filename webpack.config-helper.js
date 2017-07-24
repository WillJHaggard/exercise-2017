'use strict';

const Path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ExtractSASS = new ExtractTextPlugin('styles/bundle.css');

module.exports = options => {
  let webpackConfig = {
    devtool: options.devtool,
    entry: [
      `webpack-dev-server/client?http://localhost:${options.port}`,
      'webpack/hot/dev-server',
      './src/scripts/index'
    ],
    output: {
      path: Path.join(__dirname, 'dist'),
      filename: 'bundle.js'
    },
    plugins: [
      new Webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(options.isProduction ? 'production' : 'development')
        }
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html'
      })
    ],
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel',
          query: {
            presets: ['latest'],
            plugins: [
              'transform-decorators-legacy',
              'transform-class-properties',
              'transform-runtime'
            ]
          }
        }
      ]
    }
  };

  if (options.isProduction) {
    webpackConfig.entry = ['./src/scripts/index'];

    webpackConfig.plugins.push(
      new Webpack.optimize.OccurenceOrderPlugin(),
      new Webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false
        }
      }),
      ExtractSASS
    );

    webpackConfig.module.loaders.push({
      test: /\.scss$/i,
      loader: ExtractSASS.extract(['css-loader?-minimize!postcss-loader', 'sass'])
    });
  } else {
    webpackConfig.plugins.push(new Webpack.HotModuleReplacementPlugin());

    webpackConfig.module.loaders.push(
      {
        test: /\.scss$/i,
        loaders: ['style', 'css', 'postcss', 'sass']
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(ttf|eot|woff|woff2|svg)$/,
        loader: 'file',
        options: {
          name: 'fonts/[name].[ext]'
        }
      }
    );

    webpackConfig.devServer = {
      contentBase: './dist',
      hot: true,
      port: options.port,
      inline: true,
      progress: true
    };
  }

  return webpackConfig;
};
