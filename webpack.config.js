const path = require('path');

var config = {

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts'],
  },
  optimization: {}

};

module.exports = module.exports = (env, argv) => {

  if (argv.type === 'sheets') {
    config.mode = "none"
    config.entry = './src/sheets.entry.ts'
    config.output = {
      filename: 'index.js',
      path: path.resolve(__dirname, 'dist/sheets'),
    }
    config.target = "web"
    config.optimization.minimize = false
    config.module.rules = [...config.module.rules,
    {
      test: /sheets.entry/g,
      use: ('exports-loader?SACCHARIDEPAIRSTABLE')
    }]
  }

  if (argv.type === 'module') {
    config.mode = "production"
    config.entry = [
      './src/equations.ts',
      './src/permutations.ts'
    ]
    config.output = {
      filename: 'subs.js',
      path: path.resolve(__dirname, 'dist'),
    }
  }

  return config;
};