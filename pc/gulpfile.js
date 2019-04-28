/**
 * Author: hezhiwei
 * Create Time: 2019-04-09 12:00
 * Description: 打包任务分发
 */

const gulp = require("gulp");
const gutil = require("gulp-util");
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const webpackConfig = require("./webpack.config.js");
const config = require("./config");

/**
 * @description 开发形态
 */
gulp.task("gen:staticize:dev", (callback) => {
    let _webpackConfig = webpackConfig(true);
    new WebpackDevServer(webpack(_webpackConfig), {
        stats: {
            colors: true
        },
        contentBase: config.contentBase,
        https: false,
        hot: true,
        hotOnly: false
    }).listen(config.serverPort, "localhost", (err) => {
        if (err) throw new gutil.PluginError("webpack-dev-server", err);
        gutil.log("[webpack-dev-server]", "http://localhost:" + config.serverPort + "/webpack-dev-server/index.html");
        callback();
    });
});

/**
 * @description 打包形态
 */
gulp.task("gen:staticize:build", (callback) => {
    let _webpackConfig = webpackConfig(false);
    webpack(_webpackConfig, (err, stats) => {
        if (err) throw new gutil.PluginError("webpack:build", err);
        gutil.log("[webpack:build]", stats.toString({
            colors: true
        }));
        callback();
    });
});





























