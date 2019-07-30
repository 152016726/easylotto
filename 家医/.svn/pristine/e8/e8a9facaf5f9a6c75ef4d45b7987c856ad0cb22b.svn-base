const app = getApp();
const util = require('../../../utils/util.js');
Page({
  data: {
    webDomain: app.webDomain,
    phoneNumber: '',
    idCard: '',
    userInfo: {}
  },
  linkBlockTap: function () {
    wx.showToast({
      title: '即将上线，敬请期待！',
      icon: 'none',
      duration: 1000
    })
  },
  onShow: function () {

    var _this = this;

    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        console.log(res)
        if (res.data.id) {
          //用户查询
          app.request({
            url: '/user/select',
            header: {
              'content-type': 'application/json'
            },
            data: {
              id: res.data.id
            },
            method: "GET",
            success: function (res) {
              console.log('----------用户查询-------------')
              console.log(res)
              if (res.code == 1) {

                _this.setData({
                  userInfo: res.obj,
                  idCard: util.secretData(res.obj.idCard, 'idCard'),
                  phoneNumber: util.secretData(res.obj.userMobile, 'phone')
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
          _this.setData({
            userInfo: res.data
          })
        }
      }
    })
  }
});
