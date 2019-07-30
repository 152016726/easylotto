// pages/healthrecords/healthrecords.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    var _this = this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
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
                var inletType = wx.getStorageSync('inletType');
                var orgId = wx.getStorageSync('orgId');
                _this.setData({
                  userInfo: res.obj,
                  url: 'https://zqhomedoc.heyuht.com/health/recordUser.html?smflag=oldtag&userId=' + res.obj.id + '&type=wxlogin&orgId=' + orgId + '&inletType=' + inletType
                })
                console.log(_this.data.url)
              }
            }
          })
        } else {
          wx.navigateTo({
            url: '../info/editinfo/editinfo?tag=health'
          })
          console.log('../info/editinfo/editinfo')
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      url: ''
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})