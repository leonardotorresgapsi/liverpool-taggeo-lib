const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    filename: 'liverpool-taggeo-lib.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
      },
    }],
  },
};
