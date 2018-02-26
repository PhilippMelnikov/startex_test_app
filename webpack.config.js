const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '/public'),
    filename: 'bundle.js',
  },
  devServer: {
    inline: true,
    port: 4700,
    proxy: {
      '*': {
        target: 'http://localhost:5000',
        secure: false,
      },
    },
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.scss|\.less|\.css$/, // sass files
        use: [
          {loader: "style-loader"},
          {loader: "css-loader"},
          {loader: "autoprefixer-loader", options: {browsers: 'last 2 version'}},
          {loader: "less-loader"}
        ]
      },
    ]
  },
  plugins: [HtmlWebpackPluginConfig]
}