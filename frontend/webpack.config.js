
process.noDeprecation = true;

const debug = process.env.NODE_ENV !== "production";
const webpack = require('webpack');
const path = require('path');


//Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

//Html plugin config
const htmlPluginConfig = {
  template: './index.html',
  filename: 'index.html',
  inject: 'body'
};


//Plugins in use to production
const plugins = [
  new ExtractTextPlugin('assets/css/style.min.css'),
  new HtmlWebpackPlugin(htmlPluginConfig),
  new webpack.optimize.UglifyJsPlugin({mangle: false}),
  new webpack.ProvidePlugin(
    {
      $: 'jquery',
      jQuery: 'jquery', 'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default']
    }
  )
];

const config = {
  // context: path.resolve(__dirname, "src/main/js"),
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./index.js",
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules | bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(scss|css)$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader",
              options: {
                minimize: true,
                sourceMap: true
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              prefix: 'img',
            }
          }
        ]
      }

    ]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.min.js"
  },
  plugins: plugins,
  devServer: {
    historyApiFallback: true,
    port: 3001
  }

};

module.exports = config;
