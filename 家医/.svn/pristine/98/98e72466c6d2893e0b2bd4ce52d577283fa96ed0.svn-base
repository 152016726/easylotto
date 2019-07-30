//app.js
var http = require('utils/request.js');

App({
  onShow: function (options) {
    var _this = this;
    console.log('-0-0-0-')
    console.log(options)
    var appId = '';
    //options.referrerInfo = {};
    //options.referrerInfo.appId = 'wx077f995ee3c0b7e7';
    if (options.referrerInfo) {
      if (options.referrerInfo.appId) {
        appId = options.referrerInfo.appId;
        //根据appId获取orgId
        http.request({
          url: '/org/orgThirdConfig/selectByAppId',
          header: {
            'content-type': 'application/json'
          },
          method: "GET",
          data: { appId: appId },
          success: function (res) {
            console.log('------根据appId获取orgId------')
            console.log(res)
            if (res.code == 1) {
              //res.obj.inletType
              //res.obj.orgId
              if (res.obj) {
                wx.setStorageSync("inletType", res.obj.inletType)
                wx.setStorageSync("orgId", res.obj.orgId)
                _this.wxlogin('773745954466103297')//登录用大的机构id
              } else {
                wx.setStorageSync("inletType", "1")
                wx.setStorageSync("orgId", "773745954466103297")
                _this.wxlogin('773745954466103297')//化州市机构id
              }
            } else {
              wx.setStorageSync("inletType", "1")
              wx.setStorageSync("orgId", "773745954466103297")
              _this.wxlogin('773745954466103297')//化州市机构id
            }
          }
        })
      } else {
        wx.setStorageSync("inletType", "1")
        wx.setStorageSync("orgId", "773745954466103297")
        _this.wxlogin('773745954466103297')//化州市机构id
      }
    } else {
      wx.setStorageSync("inletType", "1")
      wx.setStorageSync("orgId", "773745954466103297")
      _this.wxlogin('773745954466103297')//化州市机构id
    }
  },
  //微信登录获取信息
  wxlogin: function (orgId) {
    var _this = this;
    wx.login({
      success: res => {
        var code = res.code;
        var params = {};
        params.code = code;
        //params.orgId = '773745954466103297'//orgId;
        console.log('--------wx.login------')
        console.log(res)
        // 获取用户信息
        wx.getUserInfo({
          lang: 'zh_CN',
          success: res => {
            console.log('--------getUserInfo-----success------')
            console.log(res)
            //params.thirdNickname = res.userInfo.nickName;
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
  },
  login: function (params) {
    var _this = this;
    console.log(params)
    http.request({
      url: '/user/miniAppLogin',
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      data: { params: params },
      success: function (res) {
        console.log('------login------')
        console.log(res)
        if (res.code == 1) {
          var userInfo = res.obj;
          wx.setStorageSync("userInfo", userInfo)
          wx.setStorageSync("sessionId", userInfo.sessionId)
          _this.globalData.employData = 'hasdata';
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