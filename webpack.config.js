const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); //to access built-in plugins
const path = require('path');
module.exports= {
    mode : 'development',

    devtool: 'source-map',
    output: {
    // Указываем имя этого файла
      filename: 'bundle.js',
    },
    module: {
        rules: [
          {
            test: /\.(?:js|mjs|cjs)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', { targets: "defaults" }]
                ]
              }
            }
          }
        ]
      },
      module: {
        rules: [
          {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
          },
        ],
      },

      devServer: {
        static: './dist',
      },

      plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({ template: './index.html' }),
      ],
}