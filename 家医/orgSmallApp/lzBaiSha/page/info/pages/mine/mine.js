//mine.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
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
                  //wx.setStorage({
                    //key: "userInfo",
                    //data: res.obj
                  //})
                  _this.setData({
                    userInfo: res.obj
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
})
