//list.js
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xianshi3: "none",
    ceshi: "",
    timesd: ""
  },
  quexiao: function() {
    var that = this
    console.log("aa")
    wx.getSystemInfo({
      success: function(res) {
        console.log(res.windowHeight)
        that.setData({
          gaodu: res.windowHeight,
          xianshi3: "inline-block",
        })
      }
    })
  },
  qxiao: function() {
    var that = this
    that.setData({
      xianshi3: "none",
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var mas = wx.getStorageSync("lajihoutai");
    this.setData({
      mas: mas
    })
    app.request({
      url: '/user/select',
      header: {
        'content-type': 'application/json'
      },
      method: "Get",
      data: {
        id: mas.userId
      },
      success: function(res) {
        console.log(res)
        if (res.obj.userSex == "1") {
          res.obj.xingbie = "男"
        } else if (res.obj.userSex == "2") {
          res.obj.xingbie = "女"
        } else {
          res.obj.xingbie = ""
        }
        
        that.setData({
          los: res.obj
        })
      }
    })
    if(mas.jihua=="计划中"){
      chulai:"block"
    } else if (mas.jihua == "已完成"){
      chulai: "none"
    } else if (mas.jihua == "已超时" || mas.jihua == "已停止") {
      chulai: "none"
    }
  },
  bindTextAreaBlur: function(e) {
    this.setData({
      ceshi: e.detail.value
    })

  },
  bindDateChange: function(e) {
    console.log(123123123)
    var that = this
    var ceshi = this.data.ceshi
    var mas = this.data.mas
    var userInfo = wx.getStorageSync("userInfo");
    var params = {
      param: {
        "id": mas.id,
        "teamId": userInfo.doc.teamInfo.teamId,
        "doctorId": userInfo.doc.id,
        "execTime": e.detail.value,
        "docName": userInfo.doc.name
      },
    }
    console.log(params)
    app.request({
      url: '/plan/familyPlanDetail/doctorFinishPlan',
      header: {
        'content-type': 'application/json'
      },
      method: "Get",
      data: params,
      success: function(res) {
        console.log(res)
        if (res.message == "新增成功") {
          wx.showToast({
            title: "修改成功",
            icon: '',
            duration: 2000
          });
          setTimeout(function () {
            wx.navigateBack()
          }, 2300);
        } else {
          wx.showToast({
            title: "输入有误",
            icon: '',
            duration: 2000
          });
        }
      }
    })
    that.setData({
      xianshi3: "none",
    })


  },
  queding:function(){
    console.log(333)
    var that = this
    var ceshi = this.data.ceshi
    var mas = this.data.mas
    var userInfo = wx.getStorageSync("userInfo");
    if(ceshi!=""){
      var params = {
        param: {
          "id": mas.id,
          "teamId": userInfo.doc.teamInfo.teamId,
          "doctorId": userInfo.doc.id,
          "reason": ceshi
        },
      }
      console.log(params)
      app.request({
        url: '/plan/familyPlanDetail/closePlan',
        header: {
          'content-type': 'application/json'
        },
        method: "Get",
        data: params,
        success: function (res) {
          console.log(res)
          if (res.message == "新增成功"){
            wx.showToast({
              title: "修改成功",
              icon: '',
              duration: 2000
            });
            setTimeout(function () {
              wx.navigateBack()
            }, 2300);
          }else{
            wx.showToast({
              title: "输入有误",
              icon: '',
              duration: 2000
            });
          }
        }
      })
    }else{
      wx.showToast({
        title: "请输入理由",
        icon: 'none',
        duration: 2000
      })
    }
 
    that.setData({
      xianshi3: "none",
    })
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