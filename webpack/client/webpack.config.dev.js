const webpack = require('webpack');
const path = require('path');
const precss = require('precss');
const postcssImport = require('postcss-import');
const cssNext = require('postcss-cssnext');
const cssNested = require('postcss-nested');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const clientConfig = {
  context: path.resolve(__dirname, '../../client'),

  devtool: 'eval-source-map',

  entry: {
    app: [
      'babel-polyfill', 'react-hot-loader/patch', './app.jsx', 'webpack-hot-middleware/client',
    ],
    vendor: [
      'react',
      'react-dom',
      'react-router-dom',
      'react-router',
      'redux',
      'react-redux',
      'axios',
    ],
  },

  output: {
    path: path.resolve(__dirname, '../../dist'),
    publicPath: '/',
    filename: 'js/[name].js',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react'],
          },
        },
      }, {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.(eot|png|jpg|svg|[ot]tf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      static: path.resolve(__dirname, '../../static'),
      components: path.resolve(__dirname, '../../shared/components'),
      containers: path.resolve(__dirname, '../../shared/containers'),
      helpers: path.resolve(__dirname, '../../shared/helpers'),
      reducers: path.resolve(__dirname, '../../shared/reducers'),
    },
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', minChunks: Infinity }),
    new ExtractTextPlugin('css/app.css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
};

module.exports = clientConfig;
