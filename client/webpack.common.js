const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const publicPath = process.env.PUBLIC_URL || '/';

module.exports = {
	entry: './src/index.tsx', // 入口文件
    output:{
        path: path.resolve(__dirname, 'dist'),
        publicPath,
        clean: true,
    },

    module: {
        rules: [
            {
                //处理js和jsx文件
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            ['@babel/preset-react', { runtime: 'automatic' }],
                            '@babel/preset-typescript'
                        ]
                    },
                },
            },
            {
                // 处理css文件
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },

    //文件扩展名解析
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            publicPath,
        }),
    ],
};