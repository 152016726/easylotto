/**
 * Author: hezhiwei
 * Create Time: 2019-04-09 12:00
 * Description: 打包配置
 */


module.exports = {
    defTemplate: '/index.html',
    mapping: [                          // 模板-js映射
        /*{                             // 对象方式映射
            pageName: "livescore",
            tempURL: "/LivescoreSoccer.html",
            jsEntryURL: "/liveScore/index.js"
        }*/
        "fixture",
        "livescore",                     // 直接目录映射
        "matchMsgList",
        "matchResult",
        "timeAxis",
        "playerInfo"
    ],
    isDebugData: true,                 // 是否使用测试数据
    rootPath: './src',                  // 服务根映射
    publicPath: '/',                   // 生成文件对应静态位置
    tempRootPath: "./template",         // html模板根目录
    contentBase: "./sourceOuter",       // dev时root路径
    jsEntryRootPath: "/views",          // js入口根目录
    target: './dist',                   // 打包目录
    serverPort: 8800                    // 服务端口
};