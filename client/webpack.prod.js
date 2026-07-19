const {merge} = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common');

module.exports = merge(common, {
    // 生产环境配置
    mode: 'production',
    devtool: 'source-map',// 生成source map文件，生产环境下设置记录原始代码位置信息功能
    output:{
        filename: '[name].[contenthash].js', // 输出文件名，使用内容哈希值来实现缓存优化
    },

    // 优化配置
    optimization: {
        splitChunks: {
            chunks: 'all', // 将所有类型的代码（同步和异步）进行分割
            cacheGroups: {
                // 将第三方库代码单独打包成一个文件，减少主文件体积，提高加载速度
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                }
            },
        },
        runtimeChunk: 'single', // 将运行时代码单独打包成一个文件，减少主文件体积，提高加载速度
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            'process.env.REACT_APP_API_BASE_URL': JSON.stringify(process.env.REACT_APP_API_BASE_URL || '/api'),
            'process.env.PUBLIC_URL': JSON.stringify(process.env.PUBLIC_URL || '/'),
        }),
    ],
})