const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'build');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');

const config = {
  // Entry points to the project
  entry: [
    path.join(__dirname, '/src/app.jsx'),
  ],
  // Server Configuration options
  devServer: {
    contentBase: './src', // Relative directory for base of server
    devtool: 'eval',
    hot: true, // Live-reload
    inline: true,
    port: 3000, // Port Number
    host: 'localhost', // Change to '0.0.0.0' for external facing server
  },
  devtool: 'eval',
  output: {
    path: buildPath, // Path of output file
    filename: 'app.js',
  },
  module: {
    loaders: [
      {
        // React-hot loader and
        test: /\.(js|jsx)$/, // All .js files
        loaders: ['babel-loader'], // react-hot is like browser sync and babel loads jsx and es6-7
        exclude: [nodeModulesPath],
      },
    ],

  },
  resolve: {
    extensions: ['','.js', '.jsx']
  }
};

module.exports = config;
