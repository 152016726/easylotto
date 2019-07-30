
/* 
  outpatientPayment 门诊缴费
  paymentList 订单列表
  orderStatus 订单状态
  

      "page/appointment/page/appointment/appointment",预约挂号
      "page/appointment/page/appointmentNotice/appointmentNotice",预约须知
      "page/appointment/page/appointmentInfo/appointmentInfo",预约信息
      "page/appointment/page/orderDetail/orderDetail",订单详情
      "page/appointment/page/familyDoctor/familyDoctor",家庭医生
      "page/appointment/page/ISigned/ISigned"本人签约
      "page/appointment/page/sectionIntroduction/sectionIntroduction" 科室介绍
      "page/appointment/page/selectionTime/selectionTime"
  */
//app.js
var http = require('utils/request.js');

App({
  onShow: function (options) {
    wx.clearStorageSync();//清除上一次登录的数据缓存
    var _this = this;
    var appId = '';
    console.log(options);
    if (options.referrerInfo) {
      if (options.referrerInfo.appId) {
        appId = options.referrerInfo.appId;
        //appId = 'wxf9b46d65f027cf94';
        //根据appId获取orgId
        http.request({
          url: '/org/orgThirdConfig/selectByAppId',
          header: {
            'content-type': 'application/json'
          },
          method: "GET",
          data: { appId: appId },
          success: function (res) {
            //根据appId获取orgId
            if (res.code == 1) {
              //res.obj.inletType
              //res.obj.orgId
              if (res.obj){
                wx.setStorageSync("orgData", {
                  inletType: res.obj.inletType,
                  orgId: res.obj.orgId
                })
                _this.wxlogin(res.obj.orgId)
              } else {
                wx.setStorageSync("orgData", {
                  inletType: "1",
                  orgId: "100002"
                })
                _this.wxlogin('100002')//机构id
              }
            } else {
              wx.setStorageSync("orgData", {
                inletType: "1",
                orgId: "100002"
              })
              _this.wxlogin('100002')//机构id
            }
          }
        })
      } else {
        wx.setStorageSync("orgData", {
          inletType: "1",
          orgId: "100002"
        })
        _this.wxlogin('100002')//机构id
      }
    } else {
      wx.setStorageSync("orgData", {
        inletType: "1",
        orgId: "100002"
      })
      _this.wxlogin('100002')//机构id
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
        params.orgId = orgId;
        //code appid
        // 获取用户信息
        wx.getUserInfo({
          lang: 'zh_CN',
          success: res => {
            //params.thirdNickname = res.userInfo.nickName;
            params.province = res.userInfo.province;
            params.city = res.userInfo.city;
            params.country = res.userInfo.country;
            params.headimgurl = res.userInfo.avatarUrl;
            params.sex = res.userInfo.gender;
            _this.login(params);
          },
          fail: res => {
            _this.login(params);
          },
          complete: res => {
          }
        })
      }
    })
  },
  login: function (params) {
    var _this = this;
    http.request({
      url: '/user/miniAppLogin',
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      data: { params: params },
      success: function (res) {
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
  json2Form: http.json2Form,
  globalData: {
    employData: ''
  },
  domain: http.domain,
  webDomain: http.webDomain
})
    /*{
      "pagePath": "page/tabBar/assistant/index",
      "iconPath": "images/assistant.png",
      "selectedIconPath": "images/assistantpr.png",
      "text": "智能助手"
    },*/