var path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'index.js'),
  output: {
    path: 'dist/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{ test: /\.js$/, loader: 'babel', exclude: /node_modules/ }]
  }
}
