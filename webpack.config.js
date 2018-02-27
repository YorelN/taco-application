const path = require("path");

// Import Webpack / Webpack plugins
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

// Environment set up
const isProd = process.env.NODE_ENV === "production";
const hostCheck = process.env.HOST_CHECK || false;

// Set up webpack plugins
const webpackPlugins = [
  new CleanWebpackPlugin(["build"]),
  new HtmlWebpackPlugin({
    filename: "index.html",
    template: "src/index.html"
  }),
  new webpack.HotModuleReplacementPlugin()
];

if (isProd) {
  webpackPlugins.push(new UglifyJsPlugin());
}

module.exports = {
  entry: ["babel-polyfill", "./src/index.js"],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "app-[hash].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["es2015", "react", "stage-0"]
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "dart-sass-loader"]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          "file-loader?name=assets/images/[name]-[hash:6].[ext]",
          "image-webpack-loader"
        ]
      }
    ]
  },
  plugins: webpackPlugins,
  devServer: {
    host: "0.0.0.0",
    historyApiFallback: true,
    contentBase: "./build",
    port: process.env.PORT || 3000,
    proxy: {
      "/api": {
        target: "http://taco_api",
        pathRewrite: {
          "^/api": ""
        }
      }
    },
    disableHostCheck: hostCheck
  }
};