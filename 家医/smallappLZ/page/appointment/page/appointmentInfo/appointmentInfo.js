// page/appointment/page/orderDetail/orderDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      {
        name: "小梦",
        imgs: 'http://img3.imgtn.bdimg.com/it/u=2342818577,1681684804&fm=26&gp=0.jpg',
      },
      {
        name: "小梦",
        imgs: 'http://img3.imgtn.bdimg.com/it/u=2342818577,1681684804&fm=26&gp=0.jpg',
      },
      {
        name: "小梦",
        imgs: 'http://img3.imgtn.bdimg.com/it/u=521730989,3685589602&fm=26&gp=0.jpg',
      },
      {
        name: "小梦",
        imgs: 'http://img2.imgtn.bdimg.com/it/u=461587164,4103099166&fm=26&gp=0.jpg',
      },
      {
        name: "小梦",
        imgs: 'http://img2.imgtn.bdimg.com/it/u=461587164,4103099166&fm=26&gp=0.jpg',
      },
    ],
    swiperIndex: 0,
    indexs: 9999
  },

  bindchange(e) {
    console.log(e)
    this.setData({
      swiperIndex: e.detail.current
    })

  },
  clickimage(e) {
    this.setData({
      swiperIndex: e.currentTarget.dataset.indexs
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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