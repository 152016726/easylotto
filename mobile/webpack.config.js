/**
 * Author: hezhiwei
 * Create Time: 2019-04-09 12:01
 * Description: webpack打包文件
 */

const fs = require("fs");
const path = require("path");
const config = require("./config");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (isDebug) => {
    let DEBUG = !!isDebug;
    let entry = {};
    let htmlOps = [];
    let GLOBALS = {
        '__DEBUG__': DEBUG,
        "__DEBUGDATA__": config.isDebugData
    };
    for(let i = 0; i < config.mapping.length; i++){
        let strContent = "";
        entry[config.mapping[i].pageName] = `${config.rootPath}${config.jsEntryRootPath}/${config.mapping[i].viewName}/index.js`;
        try{
            strContent = fs.readFileSync(`${config.rootPath}${config.jsEntryRootPath}/${config.mapping[i].viewName}/index.html`, "utf8");
        }catch (e) {
            strContent = "";
            console.log(`Read HTML Content File Error: ${e.toString()}`);
        }
        htmlOps.push({
            filename: `${config.mapping[i].pageName}.html`,
            template: `${config.tempRootPath}/${config.mapping[i].pageName}.html`,
            hash: true,
            bodyContent: strContent,
            chunks: [
                config.mapping[i].pageName
            ]
        });
    }

    return {
        entry: entry,
        output: {
            path: path.join(__dirname, config.target),
            filename: `js/[name].js`,
            publicPath: DEBUG ? "/" : config.publicPath,
            chunkFilename: `js/[id].bundle.js?[hash]`
        },
        devtool: DEBUG ? "#eval" : false,
        mode: DEBUG ? "development" : "production",
        resolve: {
            alias: Object.assign(DEBUG ? {
                vue: 'vue/dist/vue.js'
            }: {
                "vue$": "vue/dist/vue.js"
            }),
            modules: [
                path.join(__dirname, config.rootPath),
                "node_modules"
            ],
            extensions: [".webpack.js", ".web.js", ".css", ".js", ".jsx"]
        },
        resolveLoader: {
            modules: ["node_loaders", "node_modules"]
        },
        module: {
            rules: [
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "postcss-loader",
                        "sass-loader",
                        "replace-rem-loader"
                    ]
                },
                {
                    test: /\.(png|svg|jpg|gif|jpeg)$/,
                    loader: 'file-loader?name=images/[path][name].[ext]'
                },
                {
                    test: /\.template$/,
                    loaders: ["html-loader"]
                }
            ]
        },
        plugins: htmlOps.map(ops => new HtmlWebpackPlugin(ops)).concat([
            new MiniCssExtractPlugin({
                filename: "css/[name].css",
                chunkFilename: "[id].css"
            }),
            new webpack.DefinePlugin(GLOBALS),
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: ['**/*'] // 不删某一文件/文件夹, 数组里面加 "!文件名/文件夹名" 即可
            }),
            new CopyPlugin([
                {
                    from: config.tempRootPath,
                    to: './',
                    ignore: ['[name].js', "[name].css", "[name].html"]
                },
                {
                    from: './common_modules/debug',
                    to: 'debug'
                }
            ])
        ])
    };
};

































