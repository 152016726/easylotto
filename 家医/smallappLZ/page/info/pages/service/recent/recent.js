var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ceshi: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
      url: '/plan/familyPlanDetail/select?id=' + options.mas,
      header: {
        'content-type': 'application/json'
      },
      method: "POST",
      data: {
        id: options.mas
      },
      success: function(res) {
        var aa = ""
        if (res.obj.modifyStatus == "0") {
          aa = "inline-block"
        } else {
          aa = "none"
        }
        if (res.obj.teamImageUrl == "") {
          res.obj.teamImageUrl = "../img/dc.png"
        }
        console.log(res.obj)
        that.setData({
          mar: res.obj,
          userId: userId,
          aa: aa,
          date: res.obj.execTime
        })
      }
    })
  },
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  lists: function(e) {
    var userId = wx.getStorageSync("userInfo");
    var that = this
    var planId = that.data.mar.planId
    var planDetailId = that.data.mar.id
    var reason = that.data.ceshi
    var planTime = that.data.date
    console.log(this.data.ceshi)
    var params = {
      params: {
        "userId": userId.id,
        "planTime": planTime,
        "reason": reason,
        "planDetailId": planDetailId,
        "planId": planId,
      },
    }
    // var params = [
    //     {"userId": userId.id},
    //     {"planTime": planTime},
    //     {"reason": reason},
    //     {"planDetailId": planDetailId},
    //     {"planId": planId},
    // ]


    // var params = {}
    console.log(params)
    // var params = JSON.stringify(params)

    console.log(params)
    app.request({
      url: '/plan/familyPlanDetailFlow/insertModifySchedule',
      header: {
        'content-type': 'application/ application/json'
      },
      method: "get",
      data: params,
      success: function(res) {
        console.log(res)
        if(res.message=="提交成功"){
          wx.navigateBack()
        }else{
     
          wx.showToast({
            title: res.message,
            icon: '',
            duration: 2000
          });
        }
      }
    });

  },
  bindTextAreaBlur: function(e) {
    this.setData({
      ceshi: e.detail.value
    })

  },
  chal: function(e) {
    console.log(e.detail.value)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})