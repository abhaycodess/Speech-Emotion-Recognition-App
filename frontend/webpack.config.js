const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: [
          /node_modules\/chart\.js/,
        ],
      },
    ],
  },
  ignoreWarnings: [
    {
      module: /node_modules\/chart\.js/,
      message: /Failed to parse source map/,
    },
  ],
}; 