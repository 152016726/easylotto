//app.js
var http = require('utils/request.js');

App({
  onShow: function () {
    var _this = this;
    //console.log(123)
    //wx.getStorage({
      //key: 'userInfo',
      //success: function (res) {
      //  console.log(res)
      //},
      //fail: function (res) {
        //console.log(res)
        // 登录
        wx.login({
          success: res => {
            var code = res.code;
            var params = {};
            params.code = code;
            console.log('--------wx.login------')
            console.log(res)
            // 获取用户信息
            wx.getUserInfo({
              lang: 'zh_CN',
              success: res => {
                console.log('--------getUserInfo-----success------')
                params.thirdNickname = res.userInfo.nickName;
                params.province = res.userInfo.province;
                params.city = res.userInfo.city;
                params.country = res.userInfo.country;
                params.headimgurl = res.userInfo.avatarUrl;
                params.sex = res.userInfo.gender;
                _this.login(params);
              },
              fail: res => {
                console.log('--------getUserInfo-----fail------')
                console.log(res)
                _this.login(params);
              },
              complete: res => {
                console.log('--------getUserInfo-----complete------')
              }
            })
          }
        })
      //}
    //})
  },
  login: function (params){
    var _this = this;
    params.orgId = '744278088727510001';
    http.request({
      url: '/user/miniAppLogin',
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      data: {params: params},
      success: function (res) {
        console.log('------login------')
        console.log(res)
        if (res.code == 1) {
          var userInfo = res.obj;
          wx.setStorage({
            key: "userInfo",
            data: userInfo
          })
          wx.setStorage({
            key: "sessionId",
            data: userInfo.sessionId
          })
          _this.globalData.employData = res.employData;
          //由于这里是网络请求，可能会在 Page.onLoad 之后才返回
          // 所以此处加入 callback 以防止这种情况
          if (_this.employDataCallback) {
            _this.employDataCallback(res.employData);
          }
        } else {
          console.log('code : 0')
        }
      }
    })
  },
  request: http.request,
  globalData: {
    employData: ''
  }
})