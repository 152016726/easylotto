//detail.js
//获取应用实例
const app = getApp()
var WxParse = require('../../../../../resources/wxParse/wxParse.js')

Page({
  data: {
    communityContent: '',
    approveCount: 0,
    animationData: {},
    animationData2: {}
  },
  onLoad: function (options) {
    var _this = this;
    console.log(options)
    _this.getContent(options.id)
    _this.setData({
      textId: options.id
    })
  },
  approveTap: function(){
    var _this = this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        _this.setData({
          userInfo: res.data
        })
        if (res.data.id) {
          console.log({
            "userId": res.data.id,
            "objectId": _this.data.textId,
            "type": 1
          })
          app.request({
            url: '/approve/insert',
            header: {
              'content-type': 'application/json'
            },
            method: "get",
            data: {
              approve: {
                "userId": res.data.id,
                "objectId": _this.data.textId,
                "type": 1
              }
            },
            success: function (res) {
              console.log(res);
              if (res.code == 1) {
                var animation = wx.createAnimation({
                  duration: 100,
                  timingFunction: 'ease',
                })
                _this.animation = animation
                animation.scale(0.9, 0.9).opacity(0.9).step();
                animation.scale(0.8, 0.8).opacity(0.8).step();
                animation.scale(0.7, 0.7).opacity(0.7).step();
                animation.scale(0.8, 0.8).opacity(0.8).step();
                animation.scale(0.9, 0.9).opacity(0.9).step();
                animation.scale(1, 1).opacity(1).step();
                animation.scale(0.9, 0.9).opacity(0.9).step();
                animation.scale(0.8, 0.8).opacity(0.8).step();
                animation.scale(0.7, 0.7).opacity(0.7).step();
                animation.scale(0.8, 0.8).opacity(0.8).step();
                animation.scale(0.9, 0.9).opacity(0.9).step();
                animation.scale(1, 1).opacity(1).step();

                var animation2 = wx.createAnimation({
                  duration: 100,
                  timingFunction: 'ease',
                })
                _this.animation2 = animation
                animation2.top('8rpx').opacity(0.2).step();
                animation2.top('6rpx').opacity(0.4).step();
                animation2.top('4rpx').opacity(0.6).step();
                animation2.top('2rpx').opacity(0.8).step();
                animation2.top('0rpx').opacity(1).step();
                animation2.top('-2rpx').opacity(0.8).step();
                animation2.top('-4rpx').opacity(0.6).step();
                animation2.top('-6rpx').opacity(0.4).step();
                animation2.top('-8rpx').opacity(0.2).step();
                animation2.top('-10rpx').opacity(0).step();

                _this.setData({
                  animationData: animation.export(),
                  animationData2: animation2.export(),
                  approveCount: parseInt(_this.data.approveCount) + 1
                })
              } else {
                wx.showToast({
                  title: res.message,
                  icon: 'none',
                  duration: 2000
                })
              }
            }
          })
        } else {
          console.log('navigateTo')
          //wx.navigateTo({
            //url: '../../info/editinfo/editinfo',
          //})
        }
      }
    }) 
  },
  getContent: function (id) {//获取资讯内容
    var _this = this;
    var params = {
        "id": id
    };
    console.log(params)
    app.request({
      url: '/news/select',
      header: {
        'content-type': 'application/json'
      },
      method: "get",
      data: params,
      success: function (res) {
        console.log(res);
        if (res.code == 1) {
          wx.setNavigationBarTitle({
            title:res.obj.title
          })
          _this.setData({
            approveCount: res.obj.approveCount,            
            content: WxParse.wxParse('communityContent', 'html', res.obj.newsContent, _this)
          })
        }
      }
    })
  }
})