var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    console.log(options.tid)
    _this.setData({
      teamId: options.tid
    })
  },
  onShow: function () {
    var _this = this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        _this.setData({
          userInfo: res.data
        })
        if (res.data.id) {
          _this.getList(res.data.id);
        } else {
          wx.redirectTo({
            url: '/pages/info/editinfo/editinfo',
          })
        }
      }
    })
  },
  selectedTap: function(e){
    console.log(e.currentTarget.dataset.id)
    wx.redirectTo({
      url: '../confirm/confirm?tid=' + this.data.teamId + '&aid=' + e.currentTarget.dataset.id,
    })
  },
  linkAddresslistTap: function () {
    wx.navigateTo({
      url: '../../info/address/list/list?backUrl=../../../sign/selectaddress/selectaddress&tid=' + this.data.teamId,
    })

  },
  addAddressTap: function () {
    wx.navigateTo({
      url: '../../info/address/add/add?backUrl=../../../sign/selectaddress/selectaddress&tid=' + this.data.teamId,
    })

  },
  getList: function (useId) {//获取地址列表
    var _this = this;
    app.request({
      url: '/user/address/selectList',
      header: {
        'content-type': 'application/json'
      },
      method: "Get",
      data: {
        params: {
          "userId": useId,
          "status": "1"
        }
      },
      success: function (res) {
        console.log(res);
        if (res.code == 1) {
          _this.setData({
            addressList: res.data
          })
          console.log(_this.data.addressList)
        } else {
          wx.showToast({
            title: res.message,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  }
})