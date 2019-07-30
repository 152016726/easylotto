//list.js
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xianshi: "none",
    xianshi1: "none",
    xianshi2: "none",
    ceshi: "",
    xianshi3: "none",
    lis: [{
        jihua: "全部状态",
        num: 1
      },
      {
        jihua: "计划中",
        num: 2
      },
      {
        jihua: "已完成",
        num: 3
      },
      {
        jihua: "已关闭",
        num: 4
      }
    ],
    times: [{
        jihua: "今天",
        num: 1
      },
      {
        jihua: "本周",
        num: 2
      },
      {
        jihua: "本月",
        num: 3
      },
      {
        jihua: "本年",
        num: 4
      }
    ],
    jihuas: "全部状态",
    timsw: "今天",
    renqun: "所有人群",
    nane:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  tiaozhuan: function(e) {
    var mas = this.data.mas
    console.log(e.currentTarget.dataset.id)
    var aa = []
    for (let i in mas) {
      if (e.currentTarget.dataset.id == mas[i].id) {
        aa = mas[i]
      }
    }
    console.log(aa)
    wx.setStorageSync("lajihoutai", aa);
    wx.navigateTo({
      url: '../worklei/worklei',
    })
  },
  sousi: function(e) {
    console.log(e.detail.value)
    var nane = e.detail.value
    var that = this
    this.setData({
      nane: e.detail.value
    })
    var userInfo = wx.getStorageSync("userInfo");
    var params = {
      params: {
        "teamId": userInfo.doc.teamInfo.teamId,
        "memberName": nane
      },
      "pageNo": 1,
      "pageSize": 200
    }
    console.log(params)
    app.request({
      url: '/plan/familyPlanDetail/selectByDoctorPlan',
      header: {
        'content-type': 'application/json'
      },
      method: "Get",
      data: params,
      success: function(res) {
        console.log(res)
        for (let i in res.data) {
          if (res.data[i].status == 0) {
            res.data[i].jihua = "已过期"
          } else if (res.data[i].status == 1 || res.data[i].status == 2 || res.data[i].status == 3) {
            res.data[i].jihua = "计划中"
          } else if (res.data[i].status == 4) {
            res.data[i].jihua = "已完成"
          } else if (res.data[i].status == 8) {
            res.data[i].jihua = "已超时"
          } else if (res.data[i].status == 5) {
            res.data[i].jihua = "已停止"
          } else if (res.data[i].status == 9) {
            res.data[i].jihua = "已删除"
          }
          res.data[i].shijian = res.data[i].createTime.slice(0, 10);
        }
        that.setData({
          mas: res.data,
          mass: res.data,
        
        })
      }
    })
  },

  quexiao: function() {
    this.setData({
      xianshi3: "none"
    })
  },
  queding: function() {
    this.setData({
      xianshi3: "none"
    })
  },
  onLoad: function(options) {
    this.huoqu()
  },
  bindTextAreaBlur: function(e) {
    this.setData({
      ceshi: e.detail.value
    })
  },
  huoqu: function() {
    var that = this
    var userInfo = wx.getStorageSync("userInfo");
    console.log(userInfo)
    var params = {
      params: {
        // "id": userInfo.doc.id,
        "idCard": userInfo.doc.idCard
      }
    }
    app.request({
      url: '/doctor/familyUserSignMemberCategory/selectFilterInitCategories',
      header: {
        'content-type': 'application/json'
      },
      method: "Get",
      data: params,
      success: function(res) {
        console.log(res.data)
        var aa = [];
        for (let i in res.data) {
          res.data[i].num = i + 1
          aa = res.data
        }
        console.log(aa)
        that.setData({
          lisd: res.data
        })
      }
    })
    var params = {
      params: {
        "teamId": userInfo.doc.teamInfo.teamId,
        "memberName": userInfo.doc.teamInfo.teamName,
        "memberId": userInfo.doc.id,
        "status": "1",
        "typeId": "722646203718467584",
        "dateType": "4",
      }
    }
    console.log(params)
    app.request({
      url: '/plan/familyPlanDetail/selectByDoctorPlan',
      header: {
        'content-type': 'application/json'
      },
      method: "Get",
      data: params,
      success: function(res) {
        console.log(res.data, 63333)
        // that.setData({
        //   lisd: res.data

        // })
      }
    })
  },
  las: function(e) {
    var that = this
    wx.getSystemInfo({
      success: function(res) {
        console.log(res.windowHeight)
        that.setData({
          gaodu: res.windowHeight,
          xianshi: "inline-block",
          xianshi1: "none",
          xianshi2: "none",
          xianshi3: "none",
        })
      }
    })
  },
  las1: function(e) {
    var that = this
    wx.getSystemInfo({
      success: function(res) {
        console.log(res.windowHeight)
        that.setData({
          gaodu: res.windowHeight,
          xianshi: "none",
          xianshi1: "inline-block",
          xianshi2: "none",
          xianshi3: "none",
        })
      }
    })

  },
  las2: function(e) {
    var that = this
    wx.getSystemInfo({
      success: function(res) {
        console.log(res.windowHeight)
        that.setData({
          gaodu: res.windowHeight,
          xianshi: "none",
          xianshi1: "none",
          xianshi2: "inline-block",
          xianshi3: "none",
        })
      }
    })

  },
  shuaxin: function(e) {
    var that = this
    var lis = this.data.lis
    var aa = ""
    for (let i in lis) {
      if (e.currentTarget.dataset.ins == lis[i].num) {
        aa = lis[i].jihua
      }
    }
    that.setData({
      xianshi: "none",
      jihuas: aa
    })
  },
  shuaxin1: function(e) {
    var that = this
    var lis = this.data.lisd
    var aa = ""
    for (let i in lis) {
      if (e.currentTarget.dataset.ins == lis[i].num) {
        aa = lis[i].dicDsc
      }
    }
    that.setData({
      xianshi: "none",
      renqun: aa
    })
  },
  shuaxin2: function(e) {
    console.log(1)
    var that = this
    var lis = this.data.times
    var aa = ""
    console.log(lis)
    for (let i in lis) {
      if (e.currentTarget.dataset.ins == lis[i].num) {
        aa = lis[i].jihua

      }
    }
    console.log(aa)
    that.setData({
      xianshi2: "none",
      timsw: aa
    })
  },

  shuaxins: function() {
    var that = this
    that.setData({
      xianshi: "none",
      xianshi1: "none",
      xianshi2: "none",
      xianshi3: "none"

    })
  },


  xiugai: function() {
    var that = this
    wx.getSystemInfo({
      success: function(res) {
        console.log(res.windowHeight)
        that.setData({
          gaodu: res.windowHeight,
          xianshi: "none",
          xianshi1: "none",
          xianshi2: "none",
          xianshi3: "inline-block"
        })
      }
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