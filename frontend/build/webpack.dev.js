const merge = require('webpack-merge');
const base = require('./webpack.base.js');
const webpack = require("webpack");
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const path = require("path");
const {
    port
} = require('./config')
const portfinder = require('portfinder')
const packageConfig = require('../../package.json');

const devConfig = merge(base, {
    mode: 'development',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, '../dist'),
        // 打包多出口文件
        // 生成 a.bundle.js  b.bundle.js
        filename: './js/[name].bundle.js'
    },
    // optimization: { // +++
    //     splitChunks: { // +++
    //         chunks: 'initial' // +++ initial(初始块)、async(按需加载块)、all(全部块)

    //     }
    // },
    devServer: {
        contentBase: path.join(__dirname, "../dist"),
        publicPath: '/',
        host: "127.0.0.1",
        port,
        overlay: true, // 浏览器页面上显示错误
        open: true, // 开启浏览器
        // stats: "errors-only", //stats: "errors-only"表示只打印错误：
        quiet: true,
        hot: true // 开启热更新
    },
    plugins: [
        //热更新
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
        ]
    },
})

module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = port;
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err);
        } else {
            // publish the new Port, necessary for e2e tests
            process.env.PORT = port;
            // add port to devServer config
            devConfig.devServer.port = port;

            // Add FriendlyErrorsPlugin
            devConfig.plugins.push(new FriendlyErrorsPlugin({
                compilationSuccessInfo: {
                    messages: [`Your application is running here: http://${devConfig.devServer.host}:${port}`],
                },
                onErrors: createNotifierCallback(),
            }));

            resolve(devConfig);
        }
    });
});

function createNotifierCallback() {
    const notifier = require('node-notifier');

    return (severity, errors) => {
        if (severity !== 'error') return;

        const error = errors[0];
        const filename = error.file && error.file.split('!').pop();

        notifier.notify({
            title: packageConfig.name,
            message: `${severity}: ${error.name}`,
            subtitle: filename || ''
        });
    }
}