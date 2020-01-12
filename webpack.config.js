const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    app: ['./src/index.js']
  },
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'public')
  }
};