var webpack = require('webpack')
var path = require('path')
var poststylus = require('poststylus')
var HtmlWebpackPlugin = require('html-webpack-plugin')

require('dotenv').config({ silent: true })

var PORT = process.env.PORT || 5000;

module.exports = {
  entry: [
    // 'webpack/hot/dev-server',
    './src/app/index.js'
  ],
  // resolve: ['', '.js', '.css', '.styl', '.html'],
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: 'http://localhost:5000/',
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js'
  },
  resolve: {
    moduleDirectories: ['node_modules']
  },
  devServer: {
    port: 5000,
    host: '127.0.0.1',
    contentBase: './src/public',
    historyApiFallback: true,
    inline: true,
    hot: true
  },
  devtool: 'eval-source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }, {
        test: /\.styl$/,
        loader: 'style-loader!css-loader!stylus-loader'
      }, {
        test: /\.css$/,
        loader: 'style!css'
      }, {
        test: /\.html$/,
        loader: 'raw-loader'
      }, {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
    ]
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/public/index.html',
      inject: 'body'
    })
  ],
  stylus: {
    use: [
      poststylus([ 'autoprefixer', 'lost' ])
    ]
  }
}
