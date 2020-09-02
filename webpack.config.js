const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');





module.exports = {
  entry: () => {
    result = fs.readdirSync(__dirname + '/src/demos').reduce(function (entries, dir) {
      if (fs.statSync(path.join(__dirname + '/src/demos', dir)).isDirectory() && dir !== '__build__')
      {
        entries[dir] =path.join(__dirname + '/src/demos', dir, 'index.js')
      }

      return entries
    }, {})
    return result
  },
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    compress: true,
    port: 9000,
    open: true
  },
  module: {
    rules: [
      {
        test: /opencascade\.wasm\.wasm$/,
        type: "javascript/auto",
        loader: "file-loader",
        options: {
          publicPath: "/wasm/",
          outputPath: "wasm/"
        }
      }
    ]
  },
  plugins: fs.readdirSync(__dirname + '/src/demos').map(function(dir){
    return new HtmlWebpackPlugin({
      template: path.join(__dirname + '/src/demos', dir, 'index.html'),
      filename: `demos/${dir}/index.html`,
      chunks: [dir]
    })
  }),
  node: {
    fs: "empty"
  }
};
