/**
 * Created by DDT on 2019/4/9.
 */
const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const config = require("./config");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
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
        let objMapping = config.mapping[i];
        let chunkKey, templateUrl, contentUrl, strContent, entryJs;
        // 直接字符串简易模式
        if(typeof objMapping === 'string'){
            chunkKey = objMapping;
            templateUrl = `${config.defTemplate}`;
            entryJs = `/${objMapping}/index.js`;
            contentUrl = `/${objMapping}/index.html`;
            // 对象模式
        }else{
            chunkKey = objMapping.pageName;
            templateUrl = objMapping.tempURL;
            entryJs = objMapping.jsEntryURL;
            contentUrl = objMapping.contentURL;
        }

        try{
            strContent = fs.readFileSync(config.rootPath + config.jsEntryRootPath + contentUrl, "utf8");
        }catch (e) {
            strContent = '';
        }

        entry[chunkKey] = config.rootPath + config.jsEntryRootPath + entryJs;
        htmlOps.push({
            filename: `${chunkKey}.html`,
            template: config.tempRootPath + templateUrl,
            bodyContent: strContent,
            hash: true,
            chunks: [
                chunkKey
            ]
        });
    }

    let webpackCfg = {
        entry: entry,
        output: {
            path: path.join(__dirname, config.target),
            filename: `js/[name].js`,
            publicPath: DEBUG ? "/" : config.publicPath,
            chunkFilename: `js/[id].bundle.js?[hash]`
        },
        resolve: {
            alias: Object.assign(
                DEBUG ? {
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
                        "sass-loader"
                    ]
                },
                {
                    test: /\.(png|svg|jpg|gif|jpeg|wav)$/,
                    loader: 'file-loader?name=img/[path][name].[ext]'
                },
                {
                    test: /\.template$/,
                    loaders: ["html-loader"]
                }
            ]
        }
    };

    // 配置公用插件
    let plugins = htmlOps.map(ops =>  new HtmlWebpackPlugin(ops)).concat([
        new webpack.DefinePlugin(GLOBALS),
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: "[id].css"
        })
    ]);

    // 调试差异配置
    if(DEBUG){
        Object.assign(webpackCfg, {
            devtool: 'eval',
            mode: "development",
        });
        plugins = plugins.concat([
            new CopyPlugin([
                {
                    from: './common_modules/debug',
                    to: 'debug'
                }
            ])
        ])
        // 生产包差异配置
    }else{
        Object.assign(webpackCfg, {
            mode: "production",
            optimization: {
                minimizer: [
                    new TerserJSPlugin({}),
                    new OptimizeCSSAssetsPlugin({})
                ]
            }
        });
        plugins = plugins.concat([
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: ['**/*'] // 不删某一文件/文件夹, 数组里面加 "!文件名/文件夹名" 即可
            })
        ]);
    }

    Object.assign(webpackCfg, {
        plugins
    });

    return webpackCfg;
};