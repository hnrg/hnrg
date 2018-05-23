const webpack = require('webpack');
const path = require('path');
const precss = require('precss');
const postcssImport = require('postcss-import');
const cssNext = require('postcss-cssnext');
const cssNested = require('postcss-nested');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const serverConfig = {
  context: path.resolve(__dirname, '../../server'),

  devtool: 'eval-source-map',

  target: 'node',

  entry: {
    renderer: './renderer.jsx',
  },

  output: {
    path: path.resolve(__dirname, '../../dist'),
    publicPath: '/',
    filename: '../server/SSR.js',
    libraryTarget: 'commonjs2',
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react'],
          },
        },
      }, {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIndentName: '[name]__[local]__[hash:base64:5]',
              emit: false,
            },
          },
        ],
      }, {
        test: /\.(eot|png|svg|[ot]tf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      static: path.resolve(__dirname, '../../static'),
      components: path.resolve(__dirname, '../../shared/components'),
      containers: path.resolve(__dirname, '../../shared/containers'),
      helpers: path.resolve(__dirname, '../../shared/helpers'),
      reducers: path.resolve(__dirname, '../../shared/reducers'),
      config: path.resolve(__dirname, '../../server/config'),
      controllers: path.resolve(__dirname, '../../server/controllers'),
      models: path.resolve(__dirname, '../../server/models'),
      modules: path.resolve(__dirname, '../../server/modules'),
      routes: path.resolve(__dirname, '../../server/routes')
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
};

if (process.env.NODE_ENV === 'inspect') {
  clientConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = serverConfig;
