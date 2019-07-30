const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radioValue: ''
  },
  radioChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      radioValue: e.detail.value
    });
  },
  confirmTap: function () {
    var _this = this;
    wx.showToast({
      title: '正在提交订单，请稍等...',
      icon: 'none',
      duration: 10000
    })
    if (this.data.radioValue) {
      var obj = _this.data.options, params={};
      params.patientId = _this.data.radioValue;
      params.userId = _this.data.userInfo.id;
      params.startTime = obj.beginTime;
      params.endTime = obj.endTime;
      params.schId = obj.schId;
      params.docId = obj.docId;
      params.hospId = obj.hospId;
      console.log(obj)
      app.request({
        url: "/order/registration/insert",
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        data: {
          'order': params
        },
        success: function (res) {
          console.log(res)
          wx.hideToast();
          if (res.code == 1) {
            wx.navigateTo({
              url: '../orderpay/orderpay?id=' + res.obj.id
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
      wx.hideToast();
      wx.showToast({
        title: '请先选择就诊人',
        icon: 'none',
        duration: 2000
      })
    }
  },
  /**
   * 获取就诊人
   */
  getMemberList: function () {
    var _this = this;
    var params = {
      "userId": _this.data.userInfo.id
    };
    app.request({
      url: "/patient/selectPatientList",
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      data: params,
      success: function (res) {
        console.log(res)
        if (res.code == 1) {
          if (res.data.length > 0) {
            var memberList = [];
            var memberList = res.data;
            _this.setData({
              memberList: res.data
            });

          } else {
            _this.setData({
              memberList: []
            });
          }
        } else {
          wx.showToast({
            title: res.message,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  /**
   * 获取医院简介
   */
  getHospDetail: function () {
    var _this = this;
    var params = {
      "id": _this.data.options.hospId
    };
    app.request({
      url: "/hospital/select",
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      data: params,
      success: function (res) {
        console.log(res)
        if (res.code == 1) {
            _this.setData({
              hospDetail: res.obj
            });
        } else {
          wx.showToast({
            title: res.message,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    console.log(options)
    _this.setData({
      options: options
    })

    _this.getHospDetail();

    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        _this.setData({
          width: res.windowWidth
        })
      }
    })
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
    var _this = this;
    wx.getStorage({
      key: 'userInfo',//获取用户信息
      success: function (res) {
        _this.setData({
          userInfo: res.data
        });
        if (res.data.id) {
          //获取列表数据
          _this.getMemberList()
        }
      }
    });
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