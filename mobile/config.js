/**
 * Author: hezhiwei
 * Create Time: 2019-04-09 12:00
 * Description: 打包配置
 */


module.exports = {
    mapping: [                          // 模板-js映射
        {
            pageName: "LivescoreSoccer",
            viewName: "liveScore"
        }
    ],
    isDebugData: true,                 // 是否使用测试数据
    rootPath: './src',                  // 服务根映射
    publicPath: './',                   // 生成文件对应静态位置
    tempRootPath: "./sourceOUter",      // html模板根目录
    jsEntryRootPath: "/views",          // js入口根目录
    target: './dist',                   // 打包目录
    serverPort: 3003                    // 服务端口
};
