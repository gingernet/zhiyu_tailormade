const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const { VueLoaderPlugin } = require('vue-loader')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const header = fs.readFileSync(path.join(__dirname, './src/page/components/header.html')).toString();

const minify = {
    minify: { // 移除注释 清除空格回车
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes:false,
    },
    // minify: false,
    hash: true,
    // data: {
    //     header
    // }
};

const SRC_PATH = path.resolve(__dirname, './src');
module.exports = {
    // mode: 'development',
    // entry: './src/js/main.js' // 单文件入口
    entry: { // 多文件入口
        main: './src/js/main.js',
        home: './src/js/home.js',
        we: './src/js/we.js',
        solve: './src/js/solve.js',
        case: './src/js/case.js',
        product: './src/js/product.js',
        details: './src/js/details.js',
        news: './src/js/news.js',
        prdetails: './src/js/prdetails.js',
        help: './src/js/help.js',
        sloeDetail: './src/js/sloeDetail.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        // filename: 'bundle.js'
        filename: 'js/[name][hash:8].js',
    },
    devServer: {
        //  --open --port 3000 --contentBase src --hot
        open: true,
        port: 3010,
        contentBase: SRC_PATH, // 指定托管的根目录
        // hot: true,
        host: '0.0.0.0',
        historyApiFallback: true,
        useLocalIp: true,
        proxy:{
             '/api':'http://182.92.240.143:9002/',
             '/media': 'http://182.92.240.143:9002/'
         }
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.js' //内部为正则表达式  vue结尾的
        }
    },
    optimization: { // 优化项压缩，只在mode为production下生效
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
        splitChunks: { // 分割代码块
            cacheGroups: { // 缓存组
                common: { // 公共的模块
                    chunks: 'initial',
                    minSize: 0,
                    minChunks: 2 // 公共的代码块 引入 最小数量 在俩个文件中都引入 
                },
                vendor: { //  处理第三方插件库 不是自己定义的
                    priority: 1, // 升级权重 先执行这个  要不上面的代码执行了下面就不会执行了
                    test: /node_modules/, // 把你抽离出来
                    chunks: 'initial',
                    minSize: 0,
                    minChunks: 2,
                    // filename: 'js/common.bundle.js'
                }
            },
        }
    },

    // 加载器
    module: {
        rules: [
            // 解析.vue文件
            { test: /\.vue$/, use: 'vue-loader' },
            // 转化ES6的语法
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
            // 编译css并自动添加css前缀
            { test: /\.css$/, 
                use: [
                    {
                      loader: MiniCssExtractPlugin.loader,
                      options: {
                        publicPath: '../css',
                        hmr: process.env.NODE_ENV === 'development',
                      },
                    },
                    'css-loader',
                  ] },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../css',
                            hmr: process.env.NODE_ENV === 'development',
                        },
                      },
                       'css-loader', 'less-loader']
            },
            // 图片转化，小于8K自动转化为base64的编码
            {
                test: /\.(jpg|png|gif|bmp|jpeg)$/, //正则表达式匹配图片规则
                use: [{
                    loader: 'url-loader',
                    options: {
                        outputPath: './image',
                        esModule: false,
                        limit: 8192, // 限制打包图片的大小
                        name: '[name].[hash:8].[ext]', //css中的images图片将会打包在build/image下;

                    }
                }]
            },
            // { test: /\.jpg$/, loader: "file-loader" },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, //处理媒体文件
                loader: 'url-loader',
                options: {
                    // publicPath: './',
                    limit: 10000,
                    name: 'media/[name].[hash:8].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, //处理字体文件
                loader: 'url-loader',
                options: {
                    publicPath: './',
                    limit: 10000,
                    name: 'fonts/[name].[hash:8].[ext]'
                }
            },
            { test: /\.ejs$/, use: ['underscore-template-loader'] },
            { test: /\.(html|tpl)$/, use: ['html-loader'] }, // 处理 CSS 文件的 loader
        ]
    },
    devtool: 'none', // 'source-map',
    plugins: [
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            WOW: 'wowjs',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.WOW': 'wowjs',
            // popper: path.resolve(path.join(__dirname, 'js/popper.min.js')) // resolve('/js/popper.min.js')
        }),
        new MiniCssExtractPlugin({ 
            filename: "[name]-buddle[hash:8].css",
            chunkFilename: '[id].css'
        }), // // 注意,这个是重点,根据目录结构不同值也不同
        new htmlWebpackPlugin({ // 创建一个 在内存中 生成 HTML  页面的插件
            template: path.join(__dirname, './src/page/index.ejs'), // 指定 模板页面
            filename: 'index.html',
            ...minify,
            chunks: ['home', 'main']
        }),
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/page/news.ejs'),
            filename: 'news.html',
            ...minify,
            chunks: ['news','main']
        }),
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/page/details.ejs'),
            filename: 'details.html',
            ...minify,
            chunks: ['details', 'main']
        }),
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/page/solve.ejs'),
            filename: 'solve.html',
            ...minify,
            chunks: ['solve','main']
        }),
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/page/product.ejs'),
            filename: 'product.html',
            ...minify,
            chunks: ['product', 'main']
        }),
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/page/we.ejs'),
            filename: 'we.html',
            ...minify,
            chunks: ['we','main']
        }),
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/page/case.ejs'),
            filename: 'case.html',
            ...minify,
            chunks: ['case','main']
        }),
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/page/productDetails.ejs'),
            filename: 'prdetails.html',
            ...minify,
            chunks: ['prdetails','main']
        }),
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/page/help.ejs'),
            filename: 'help.html',
            ...minify,
            chunks: ['help','main']
        }),
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/page/sloeDetail.ejs'),
            filename: 'sloeDetail.html',
            ...minify,
            chunks: ['sloeDetail','main']
        })
    ]
};

console.log('webpack打包执行中')