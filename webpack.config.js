const path = require('path');
const {
  NODE_ENV = 'production',
} = process.env;
module.exports = {
  entry: './index.ts',
  mode: NODE_ENV,
  target: 'node',
  output: {
    path: path.resolve(__dirname, '.dist'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          'ts-loader',
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
  }
}