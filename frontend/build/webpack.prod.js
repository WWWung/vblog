const merge = require('webpack-merge');
const base = require('./webpack.base.js');
//  把css打包成一个文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//  压缩css
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
//  压缩js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require("path")

module.exports = merge(base, {
    mode: 'production', // 压缩代码
    output: {
        path: path.resolve(__dirname, '../../backend/dist'),
        // 打包多出口文件
        // 生成 a.bundle.[hash].js  b.bundle.[hash].js
        filename: './js/[name].[chunkhash:8].js',
    },
    module: {
        rules: [
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[chunkhash:8].css'
        })
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        drop_debugger: true,
                        drop_console: true,
                    },
                },
                sourceMap: false, // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    }
})