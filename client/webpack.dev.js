const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
    // 开发环境配置
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    output: {
        filename: '[name].js',
    },
    // 开发服务器配置
    devServer: {
        port: 3000, // 端口号
        hot: true, // 热更新
        open: true, // 自动打开浏览器
        historyApiFallback: true, // 解决前端路由刷新404问题
        proxy: {
            // 代理配置 解决跨域
            '/api': {
                target: 'http://localhost:3001',
                changeOrigin: true, //改变源
            },
        },
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            'process.env.REACT_APP_API_BASE_URL': JSON.stringify(process.env.REACT_APP_API_BASE_URL || '/api'),
            'process.env.PUBLIC_URL': JSON.stringify(process.env.PUBLIC_URL || '/'),
        }),
    ],
});