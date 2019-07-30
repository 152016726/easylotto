// pages/fuwu/fuwu.js
var app = getApp();
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
    console.log(options.mas)

    var that = this
    var userId = wx.getStorageSync("userInfo");

    console.log(userId)
    var params = {
      params: {
        "id": options.mas,
        "userId": userId.id
      },
      "pageNo": 1,
      "pageSize": 999
    };
    console.log(params)
    app.request({
      url: '/familyPlanDetail/selectDetail?id=' + options.mas,
      // url: "/familyTeam/selectDetail?id=" +"744286824269586432",
      header: {
        'content-type': 'application/json'
      },
      method: "POST",
      data: "",
      success: function (res) {
        console.log(res)
        if(res.obj==undefined){
          wx.showToast({
            title: "暂无数据",
            icon: '',
            duration: 2000
          });
          setTimeout(function () {
            wx.navigateBack()
          }, 2300);
        }else{
          var aa = ""
          if (res.obj.modifyStatus == "0") {
            aa = "inline-block"
          } else {
            aa = "none"
          }
          if (res.obj.imageSmallPic == "") {
            res.obj.imageSmallPic = "../img/dc.png"
          }
          console.log(res.obj)
          that.setData({
            mar: res.obj,
            userId: userId,

          })
        }
   
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