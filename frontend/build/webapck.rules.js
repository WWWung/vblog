const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production'
const rules = [{
    test: /\.vue$/,
    loader: 'vue-loader'
},
{
    test: /\.css$/,
    use: [
        devMode ? "style-loader" : MiniCssExtractPlugin.loader,
        // "style-loader",
        'css-loader',
        'postcss-loader',
    ],
},
{
    test: /\.less$/,
    use: [
        devMode ? "style-loader" : MiniCssExtractPlugin.loader,
        // "style-loader",
        'css-loader',
        'postcss-loader',
        'less-loader',
    ],
},
{
    test: /\.js$/,
    use: ["babel-loader"],
    // 不检查node_modules下的js文件
    // exclude: "/node_modules/"
},
{
    test: /\.(png|jpg|gif|svg)$/,
    use: [{
        // 需要下载file-loader和url-loader
        loader: "url-loader",
        options: {
            limit: 5 * 1024, //小于这个时将会已base64位图片打包处理
            // 图片文件输出的文件夹
            outputPath: "images"
        }
    }]
},
{
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    options: {
        limit: 10000,
    }
},
{
    test: /\.html$/,
    // html中的img标签
    use: ["html-withimg-loader"]
}
];
module.exports = rules;