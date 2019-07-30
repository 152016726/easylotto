//list.js
//获取应用实例
const app = getApp();
var util = require('../../../../../utils/util.js');

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
        jihua: "本年",
        num: 1
      },
      {
        jihua: "本月",
        num: 2
      },
      {
        jihua: "本周",
        num: 3
      },
      {
        jihua: "今天",
        num: 4
      }
    ],
    jihuas: "全部状态",
    timsw: "本年",
    renqun: "所有人群",
    xuans: "",
    zhuantai: "",
    mytime: "",
    mytime1: "",
    guncu: " inline-block"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  tiaozhuan: function() {
    console.log(123)
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
        "idCard": userInfo.idCard
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
    this.huoqushu()
  },
  huoqushu: function() {
    var that = this
    var userInfo = wx.getStorageSync("userInfo");
    var params = {
      params: {
        "teamId": userInfo.doc.teamInfo.teamId,
        "dateType": 4
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
        console.log(res.data, 63333)
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
          mass: res.data
        })
        that.logs()
      }
    })

  },
  tiaozhuans: function(e) {
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
    var mytime1 = this.data.mytime1
    var xuans = this.data.xuans
    var mytime = this.data.mytime
    var mas = this.data.mass
    var userInfo = wx.getStorageSync("userInfo");
    for (let i in lis) {
      if (e.currentTarget.dataset.ins == lis[i].num) {
        aa = lis[i].jihua
      }
    }
    console.log(aa)
    if (xuans == "" && mytime == "") {
      if (e.currentTarget.dataset.ins == 1) {
        that.huoqushu()
      } else if (e.currentTarget.dataset.ins == 2) {
        var params = {
          params: {
            "teamId": userInfo.doc.teamInfo.teamId,
            "status": 3
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
            console.log(res.data, 63333)
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

            })
            that.logs()
          }
        })

      } else if (e.currentTarget.dataset.ins == 3) {
        var params = {
          params: {
            "teamId": userInfo.doc.teamInfo.teamId,
            "status": 4
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
            console.log(res.data, 63333)
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

            })
            that.logs()
          }
        })

      } else {
        var params = {
          params: {
            "teamId": userInfo.doc.teamInfo.teamId,
            "status": 5
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
            console.log(res.data, 63333)
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

            })
            that.logs()
          }
        })

      }
    } else if (mytime != "" && xuans == "") {
      if (e.currentTarget.dataset.ins == 1) {
        var params = {
          params: {
            "teamId": userInfo.doc.teamInfo.teamId,
            "startTime": mytime1,
            "endTime": mytime
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
            console.log(res.data, 63333)
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

            })
            that.logs()
          }
        })

      } else if (e.currentTarget.dataset.ins == 2) {
        var params = {
          params: {
            "teamId": userInfo.doc.teamInfo.teamId,
            "status": 3,
            "startTime": mytime1,
            "endTime": mytime
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
            console.log(res.data, 63333)
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

            })
            that.logs()
          }
        })

      } else if (e.currentTarget.dataset.ins == 3) {
        var params = {
          params: {
            "teamId": userInfo.doc.teamInfo.teamId,
            "status": 4,
            "startTime": mytime1,
            "endTime": mytime
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
            console.log(res.data, 63333)
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

            })
            that.logs()
          }
        })

      } else {
        var params = {
          params: {
            "teamId": userInfo.doc.teamInfo.teamId,
            "status": 5,
            "startTime": mytime1,
            "endTime": mytime
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
            console.log(res.data, 63333)
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

            })
            that.logs()
          }
        })

      }
    } else if (mytime != "" && xuans != ""){
      if (e.currentTarget.dataset.ins == 1) {
        var params = {
          params: {
            "teamId": userInfo.doc.teamInfo.teamId,
            "startTime": mytime1,
            "endTime": mytime,
            "typeId": xuans
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
          success: function (res) {
            console.log(res.data, 63333)
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

            })
            that.logs()
          }
        })

      } else if (e.currentTarget.dataset.ins == 2) {
        var params = {
          params: {
            "teamId": userInfo.doc.teamInfo.teamId,
            "status": 3,
            "startTime": mytime1,
            "endTime": mytime,
            "typeId": xuans
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
          success: function (res) {
            console.log(res.data, 63333)
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

            })
            that.logs()
          }
        })

      } else if (e.currentTarget.dataset.ins == 3) {
        var params = {
          params: {
            "teamId": userInfo.doc.teamInfo.teamId,
            "status": 4,
            "startTime": mytime1,
            "endTime": mytime,
            "typeId": xuans
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
          success: function (res) {
            console.log(res.data, 63333)
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

            })
            that.logs()
          }
        })

      } else {
        var params = {
          params: {
            "teamId": userInfo.doc.teamInfo.teamId,
            "status": 5,
            "startTime": mytime1,
            "endTime": mytime,
            "typeId": xuans
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
          success: function (res) {
            console.log(res.data, 63333)
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

            })
            that.logs()
          }
        })

      }
    } else if (mytime == "" && xuans != "") {
      if (e.currentTarget.dataset.ins == 1) {
        var params = {
          params: {
            "teamId": userInfo.doc.teamInfo.teamId,
       
            "typeId": xuans
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
          success: function (res) {
            console.log(res.data, 63333)
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

            })
            that.logs()
          }
        })

      } else if (e.currentTarget.dataset.ins == 2) {
        var params = {
          params: {
            "teamId": userInfo.doc.teamInfo.teamId,
            "status": 3,
       
            "typeId": xuans
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
          success: function (res) {
            console.log(res.data, 63333)
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

            })
            that.logs()
          }
        })

      } else if (e.currentTarget.dataset.ins == 3) {
        var params = {
          params: {
            "teamId": userInfo.doc.teamInfo.teamId,
            "status": 4,
          
            "typeId": xuans
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
          success: function (res) {
            console.log(res.data, 63333)
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

            })
            that.logs()
          }
        })

      } else {
        var params = {
          params: {
            "teamId": userInfo.doc.teamInfo.teamId,
            "status": 5,
      
            "typeId": xuans
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
          success: function (res) {
            console.log(res.data, 63333)
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

            })
            that.logs()
          }
        })

      }
    }

    that.setData({
      xianshi: "none",
      jihuas: aa,
      zhuantai: e.currentTarget.dataset.ins
    })
    that.logs()
  },
  shuaxin1: function(e) {
    var that = this
    var lis = this.data.lisd
    var aa = ""
    var xuans = this.data.xuans
    var userInfo = wx.getStorageSync("userInfo");
    var zhuantai = this.data.zhuantai
    var mytime = this.data.mytime
    var mytime1 = this.data.mytime1
    console.log(e.currentTarget.dataset.inss)
    if (zhuantai == "" && mytime == "") {
      var params = {
        params: {
          "teamId": userInfo.doc.teamInfo.teamId,
          "typeId": e.currentTarget.dataset.inss

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
          console.log(res.data, 63333)
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

          })
          that.logs()
        }
      })
    } else if (zhuantai != "" && mytime == "") {
      if (zhuantai == 1) {
        var params = {
          params: {
            "teamId": userInfo.doc.teamInfo.teamId,
            "typeId": e.currentTarget.dataset.inss

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
            console.log(res.data, 63333)
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

            })
            that.logs()
          }
        })
      } else if (zhuantai == 2) {

        var params = {
          params: {
            "teamId": userInfo.doc.teamInfo.teamId,
            "typeId": e.currentTarget.dataset.inss,
            "status": 3
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
            console.log(res.data, 63333)
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

            })
            that.logs()
          }
        })
      } else if (zhuantai == 3) {

        var params = {
          params: {
            "teamId": userInfo.doc.teamInfo.teamId,
            "typeId": e.currentTarget.dataset.inss,
            "status": 4
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
            console.log(res.data, 63333)
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

            })
            that.logs()
          }
        })
      } else if (zhuantai == 4) {

        var params = {
          params: {
            "teamId": userInfo.doc.teamInfo.teamId,
            "typeId": e.currentTarget.dataset.inss,
            "status": 5
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
            console.log(res.data, 63333)
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

            })
            that.logs()
          }
        })
      }

    } else if (zhuantai != "" && mytime != "") {
      if (zhuantai == 1) {
        var params = {
          params: {
            "teamId": userInfo.doc.teamInfo.teamId,
            "typeId": e.currentTarget.dataset.inss,
            "startTime": mytime1,
            "endTime": mytime
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
            console.log(res.data, 63333)
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

            })
            that.logs()
          }
        })
      } else if (zhuantai == 2) {

        var params = {
          params: {
            "teamId": userInfo.doc.teamInfo.teamId,
            "typeId": e.currentTarget.dataset.inss,
            "status": 3,
            "startTime": mytime1,
            "endTime": mytime
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
            console.log(res.data, 63333)
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

            })
            that.logs()
          }
        })
      } else if (zhuantai == 3) {

        var params = {
          params: {
            "teamId": userInfo.doc.teamInfo.teamId,
            "typeId": e.currentTarget.dataset.inss,
            "status": 4,
            "startTime": mytime1,
            "endTime": mytime
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
            console.log(res.data, 63333)
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

            })
            that.logs()
          }
        })
      } else if (zhuantai == 4) {

        var params = {
          params: {
            "teamId": userInfo.doc.teamInfo.teamId,
            "typeId": e.currentTarget.dataset.inss,
            "status": 5,
            "startTime": mytime1,
            "endTime": mytime
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
            console.log(res.data, 63333)
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

            })
            that.logs()
          }
        })
      }

    } else if (zhuantai == "" && mytime != "") {
      var params = {
        params: {
          "teamId": userInfo.doc.teamInfo.teamId,
          "typeId": e.currentTarget.dataset.inss,

          "startTime": mytime1,
          "endTime": mytime
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
          console.log(res.data, 63333)
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

          })
          that.logs()
        }
      })

    }
    for (let i in lis) {
      if (e.currentTarget.dataset.ins == lis[i].num) {
        aa = lis[i].dicDsc
      }
    }
    that.setData({
      xianshi: "none",
      renqun: aa,
      xuans: e.currentTarget.dataset.inss
    })
    that.logs()
  },
  shuaxin2: function(e) {
    var that = this
    var lis = this.data.times
    var aa = ""
    var zhuantai = this.data.zhuantai
    var userInfo = wx.getStorageSync("userInfo");
    var xuans = this.data.xuans
    for (let i in lis) {
      if (e.currentTarget.dataset.ins == lis[i].num) {
        aa = lis[i].jihua
      }
    }
    var time = util.formatTime(new Date());
    var nian = time.slice(0, 4)
    var yue = time.slice(5, 7)
    var ri = time.slice(8, 10)
    var nian1 = ""
    var yue1 = ""
    var ri1 = ""
    if (e.currentTarget.dataset.ins == 1) {
      nian1 = parseInt(nian) - 1
      yue1 = yue,
        ri1 = ri
    } else if (e.currentTarget.dataset.ins == 2) {
      if (yue == "1") {
        nian1 = parseInt(nian) - 1
        yue1 = 12
        ri1 = ri
      } else {
        yue1 = parseInt(yue) - 1
        nian1 = nian
        ri1 = ri
      }
    } else if (e.currentTarget.dataset.ins == 3) {
      if (ri < 7) {
        if (yue == 3 || yue == 5 || yue == 7 || yue == 8 || yue == 10 || yue == 12) {
          console.log(nian, yue, ri)
          yue1 = parseInt(yue) - 1
          ri1 = 30 - 8 + parseInt(ri) + 1
          nian1 = nian
        } else if (yue == 4 || yue == 6 || yue == 9 || yue == 11) {
          console.log(nian, yue, ri)
          yue1 = parseInt(yue) - 1
          ri1 = 31 - 8 + parseInt(ri) + 1
          nian1 = nian
        } else if (yue == 1) {
          console.log(nian, yue, ri)
          nian1 = parseInt(nian) - 1
          yue1 = 12
          ri1 = 31 - 8 + parseInt(ri) + 1
        } else {
          console.log(nian, yue, ri)
          yue1 = parseInt(yue) - 1
          ri1 = 31 - 8 + parseInt(ri) + 1
          nian1 = nian
        }
      } else if (ri == 7) {
        console.log(nian, yue, ri)
        ri1 = 1
        yue1 = yue
        nian1 = nian
      } else {

        console.log(ri)
        ri1 = parseInt(ri - 7)
        nian1 = nian
        yue1 = yue
      }
    } else {
      console.log(nian, yue, ri)
      nian1 = nian
      yue1 = yue
      ri1 = ri
    }
    if (yue1.leng == 1) {
      yue1 = "0" + yue1
    }
    if (ri1.length == 1) {
      ri1 = "0" + ri1
    }
    var mytime = nian + "-" + yue + "-" + ri
    var mytime1 = nian1 + "-" + yue1 + "-" + ri1
    console.log(mytime, mytime1)

    if (zhuantai == "" && xuans == "") {
      var params = {
        params: {
          "teamId": userInfo.doc.teamInfo.teamId,
          "startTime": mytime1,
          "endTime": mytime
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
          console.log(res.data, 63333)
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
          })
          that.logs()
        }
      })
    } else if (zhuantai != "" && xuans == "") {
      if (zhuantai == 1) {
        var params = {
          params: {
            "teamId": userInfo.doc.teamInfo.teamId,
            "startTime": mytime1,
            "endTime": mytime
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
            console.log(res.data, 63333)
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
            })
            that.logs()
          }
        })
      } else if (zhuantai == 2) {
        var params = {
          params: {
            "teamId": userInfo.doc.teamInfo.teamId,
            "status": 3,
            "startTime": mytime1,
            "endTime": mytime
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
            console.log(res.data, 63333)
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
            })
            that.logs()
          }
        })
      } else if (zhuantai == 3) {
        var params = {
          params: {
            "teamId": userInfo.doc.teamInfo.teamId,
            "status": 4,
            "startTime": mytime1,
            "endTime": mytime
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
            console.log(res.data, 63333)
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
            })
            that.logs()
          }
        })
      } else if (zhuantai == 4) {
        var params = {
          params: {
            "teamId": userInfo.doc.teamInfo.teamId,
            "status": 5,
            "startTime": mytime1,
            "endTime": mytime
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
            console.log(res.data, 63333)
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
            })
            that.logs()
          }
        })
      }

    } else if (zhuantai != "" && xuans == "") {
      if (zhuantai == 1) {
        var params = {
          params: {
            "teamId": userInfo.doc.teamInfo.teamId,
            "startTime": mytime1,
            "endTime": mytime
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
            console.log(res.data, 63333)
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
            })
            that.logs()
          }
        })
      } else if (zhuantai == 2) {
        var params = {
          params: {
            "teamId": userInfo.doc.teamInfo.teamId,
            "status": 3,
            "startTime": mytime1,
            "endTime": mytime
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
            console.log(res.data, 63333)
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
            })
            that.logs()
          }
        })
      } else if (zhuantai == 3) {
        var params = {
          params: {
            "teamId": userInfo.doc.teamInfo.teamId,
            "status": 4,
            "startTime": mytime1,
            "endTime": mytime
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
            console.log(res.data, 63333)
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
            })
            that.logs()
          }
        })
      } else if (zhuantai == 4) {
        var params = {
          params: {
            "teamId": userInfo.doc.teamInfo.teamId,
            "status": 5,
            "startTime": mytime1,
            "endTime": mytime
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
            console.log(res.data, 63333)
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
            })
            that.logs()
          }
        })
      }

    } else if (zhuantai != "" && xuans != "") {
      if (zhuantai == 1) {
        var params = {
          params: {
            "teamId": userInfo.doc.teamInfo.teamId,
            "startTime": mytime1,
            "endTime": mytime,
            "typeId": xuans
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
            console.log(res.data, 63333)
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
            })
            that.logs()
          }
        })
      } else if (zhuantai == 2) {
        var params = {
          params: {
            "teamId": userInfo.doc.teamInfo.teamId,
            "status": 3,
            "startTime": mytime1,
            "endTime": mytime,
            "typeId": xuans
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
            console.log(res.data, 63333)
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
            })
            that.logs()
          }
        })
      } else if (zhuantai == 3) {
        var params = {
          params: {
            "teamId": userInfo.doc.teamInfo.teamId,
            "status": 4,
            "startTime": mytime1,
            "endTime": mytime,
            "typeId": xuans
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
            console.log(res.data, 63333)
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
            })
            that.logs()
          }
        })
      } else if (zhuantai == 4) {
        var params = {
          params: {
            "teamId": userInfo.doc.teamInfo.teamId,
            "status": 5,
            "startTime": mytime1,
            "endTime": mytime,
            "typeId": xuans
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
            console.log(res.data, 63333)
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
            })
            that.logs()
          }
        })
      }

    } else if (zhuantai == "" && xuans != "") {
      var params = {
        params: {
          "teamId": userInfo.doc.teamInfo.teamId,
          "startTime": mytime1,
          "endTime": mytime,
          "typeId": xuans
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
        success: function (res) {
          console.log(res.data, 63333)
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
          })
          that.logs()
        }
      })
    }
    that.setData({
      xianshi2: "none",
      timsw: aa,
      mytime: mytime,
      mytime1: mytime1
    })

  },
  shuasou: function() {
    var that = this
    that.shuaxins();
    wx.navigateTo({
      url: '../worksou/worksou',
    })

  },
  logs: function() {
    var mas = this.data.mas
    console.log(mas.length)
    if (mas.length == 0) {
      this.setData({
        guncu: "inline-block"
      })

    } else if (mas.length != 0) {
      this.setData({
        guncu: "none"
      })
    }
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
    this.huoqu()
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