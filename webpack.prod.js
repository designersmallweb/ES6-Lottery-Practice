var path = require('path')
var webpack = require('webpack');
var pkg = require('./package.json')
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = Merge(CommonConfig, {
    entry: {
        app: ['babel-polyfill',path.resolve(__dirname, 'app/index.js')],
        // 将 第三方依赖（node_modules中的） 单独打包
        vendor: Object.keys(pkg.dependencies)
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "[name].[chunkhash:8].js"
    },

    resolve: {
        extensions: ['.js', '.jsx']
    },

    module: {
        rules: [{
                test: /\.less$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader', 'less-loader']
                })
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader']
                })
            },
            {
                test: /\.(png|gif|jpg|jpeg|bmp)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 5000,
                        name: '[name].[hash:8].[ext]',
                        outputPath:'img/'
                    }
                }]
            },
            {
                test: /\.(png|woff|woff2|svg|ttf|eot)($|\?)/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 5000,
                        name: '[name].[hash:8].[ext]',
                        outputPath:'fonts/'
                    }
                }]
            }
        ]
    },
    plugins: [
        // 定义为生产环境，编译 React 时压缩到最小
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),

        // 为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                //supresses warnings, usually from module minification
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),

        // 分离CSS和JS文件
        new ExtractTextPlugin({
            filename: './css/[name].[chunkhash:8].css'
        }),

        // 提供公共代码
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: './js/[name].[chunkhash:8].js'
        }),
        new CleanWebpackPlugin(['build'])
    ]
})