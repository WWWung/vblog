const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const copyWebpackPlugin = require("copy-webpack-plugin");
const purifyCssWebpack = require("purifycss-webpack");
const {
    DefinePlugin
} = require('webpack');
const path = require("path");
const glob = require('glob');
const rules = require('./webapck.rules')

const entries = getEntry('./frontend/src/pages/')
module.exports = {
    entry: entries,
    plugins: [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
        //静态资源输出
        new copyWebpackPlugin([{
            from: path.resolve(__dirname, "../src/assets"),
            to: './assets',
            ignore: ['.*']
        }]),
        new DefinePlugin({
            '__MODE__': JSON.stringify(process.env.NODE_ENV)
        })
    ],
    module: {
        rules: [
            ...rules
        ]
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src')
        }
    }
}

//动态添加入口
function getEntry(PAGES_DIR) {
    var entry = {}
    //读取src目录所有page入口
    glob.sync(PAGES_DIR + '**/*.js').forEach(function (name) {
        var start = name.indexOf('pages/') + 4
        var end = name.length - 3
        var n = name.slice(start, end)
        n = n.split('/')[1]
        entry[n] = name
    })
    return entry
}


function getHtmlConfig(name, chunks) {
    return {
        template: `./frontend/src/pages/${name}/${name}.html`,
        filename: `${name}.html`,
        // favicon: './favicon.ico',
        // title: title,
        inject: 'body',
        hash: false, //开启hash  ?[hash]
        chunks: chunks,
        minify: process.env.NODE_ENV === "development" ? false : {
            removeComments: true, //移除HTML中的注释
            collapseWhitespace: true, //折叠空白区域 也就是压缩代码
        },
    }
}

//修改   自动化配置页面
var htmlArray = [];
Object.keys(entries).forEach(function (element) {
    htmlArray.push({
        _html: element,
        title: '',
        chunks: [element]
    })
})

//自动生成html模板
htmlArray.forEach((element) => {
    module.exports.plugins.push(new HtmlWebpackPlugin(getHtmlConfig(element._html, element.chunks)));
})