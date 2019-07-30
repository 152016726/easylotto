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
  onLoad: function (options) {
    var _this = this;
    console.log(app.webDomain)
    if (options.flag == 'guides') {
      _this.setData({
        url: options.url
      })
    } else {
      wx.getStorage({
        key: 'userInfo',
        success: function (res) {
          if (options.url == 'sign') {
            console.log(app.webDomain+'/minisign/index.html?type=newtype&userId=' + res.data.id + '&tid=' + options.tid + '&aid=' + options.aid)
            _this.setData({
              url: app.webDomain +'/minisign/index.html?type=newtype&userId=' + res.data.id + '&tid=' + options.tid + '&aid=' + options.aid
            })

          } else if (options.url == 'ownsign') {
            console.log(app.webDomain +'/minisign/index.html?type=ownsign&userId=' + res.data.id + '&tid=' + options.tid + '&aid=' + options.aid)
            _this.setData({
              url: app.webDomain +'/minisign/index.html?type=ownsign&userId=' + res.data.id + '&tid=' + options.tid + '&aid=' + options.aid
            })
          } else if (options.url == 'familysign') {
            console.log(app.webDomain +'/minisign/index.html?type=familysign&userId=' + res.data.id + '&tid=' + options.tid + '&aid=' + options.aid)
            _this.setData({
              url: app.webDomain +'/minisign/index.html?type=familysign&userId=' + res.data.id + '&tid=' + options.tid + '&aid=' + options.aid
            })
          } else {
            _this.setData({
              userInfo: res.data,
              url: options.url + '?userId=' + res.data.id
            })
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

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