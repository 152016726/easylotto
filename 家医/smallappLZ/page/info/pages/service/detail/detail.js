// pages/lianxi/lianxi.js
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
    var that = this
    var userId = wx.getStorageSync("userInfo");
    wx.setStorageSync("mas1s", options.mas);
  
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
      url: '/plan/familyPlanDetail/select?id=' + options.mas,
      header: {
        'content-type': 'application/json'
      },
      method: "POST",
      data: { id:options.mas},
      success: function (res) {
        var aa=""
        if (res.obj.modifyStatus=="0"){
           aa ="inline-block"
        }else{
          aa = "none"
        }
        if (res.obj.teamImageUrl == ""){
          res.obj.teamImageUrl="../img/dc.png"
        }
        console.log(res.obj)
        that.setData({
          mar: res.obj,
          userId: userId,
          aa:aa
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
    var that=this
    var userId = wx.getStorageSync("userInfo");
    var mas = wx.getStorageSync("mas1s");
    var params = {
      params: {
        "id": mas,
        "userId": userId.id
      },
      "pageNo": 1,
      "pageSize": 999
    };
    console.log(params)
    app.request({
      url: '/plan/familyPlanDetail/select?id=' +mas,
      header: {
        'content-type': 'application/json'
      },
      method: "POST",
      data: { id: mas },
      success: function (res) {
        var gaiqi=""
        var aa = ""
        if (res.obj.modifyStatus == "0") {
          aa = "inline-block"
        } else {
          aa = "none"
        }
        if (res.obj.teamImageUrl == "") {
          res.obj.teamImageUrl = "../img/dc.png"
        }
        if (res.obj.userHopeTime!=""){
          gaiqi = "( 已申请改期为"+res.obj.userHopeTime+" )"
        }else{
          gaiqi=""
        }
        console.log(res.obj)
        that.setData({
          mar: res.obj,
          userId: userId,
          aa: aa,
          gaiqi:gaiqi
        })
      }
    })
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