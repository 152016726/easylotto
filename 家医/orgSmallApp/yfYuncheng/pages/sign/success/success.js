// pages/sign/success/success.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowHeight)
        _this.setData({
          height: res.windowHeight
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var _this = this;
    var printAnimation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
      delay: 1100
    })
    _this.printAnimation = printAnimation
    //printAnimation.opacity(0).step();
    printAnimation.opacity(1).step();

    var sealAnimation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })
    _this.sealAnimation = sealAnimation
    // sealAnimation.bottom('335rpx').right('-350rpx').step();
    sealAnimation.bottom('175rpx').right('50rpx').step();//中间
    sealAnimation.bottom('174rpx').right('51rpx').step();//中间
    sealAnimation.bottom('173rpx').right('52rpx').step();//中间
    sealAnimation.bottom('15rpx').right('-350rpx').step();

    _this.setData({
      printAnimationData: printAnimation.export(),
      sealAnimationData: sealAnimation.export(),
    })

    setTimeout((function callback() {
      wx.redirectTo({
        url: '../../info/sign/list/list'
      })
    }).bind(this), 3000);
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