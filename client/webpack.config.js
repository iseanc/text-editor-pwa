const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
// const { GenerateSW } = require('workbox-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

// DONE: Add and configure workbox plugins for a service worker and manifest file.
// DONE: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    devServer: {
      hot: 'only',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Hot Module Reloading',
        template: './index.html',
      }),
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Webpack Plugin'
      }),
      new WorkboxPlugin.GenerateSW(),
      // new InjectManifest({
      //   swSrc: './src-sw.js',
      //   swDest: 'service-worker.js',
      // }),
      new WebpackPwaManifest({
        name: 'Text Editor',
        short_name: 'Editor',
        description: 'Edit stuff!',
        background_color: '#8eb3d2',
        theme_color: '#8eb3d2',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('./src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
      ],
    },
  };
};
