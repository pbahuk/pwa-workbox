const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

module.exports = {
  mode: "production",
  entry: "./src/js/app.js",
  output: {
    filename: "js/app.js",
    path: path.resolve(__dirname, "dist/"),
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: './src/index.html',
        to: 'index.html'
      },
      {
        from: './src/css/main.css',
        to: 'css/main.css'
      }
    ]),
    new WorkboxWebpackPlugin.InjectManifest({
      swSrc: "./src/src-sw.js",
      swDest: "sw.js"
    })
  ]
};
