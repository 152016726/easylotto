const app = getApp()
const util = require('../../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTimeDialog: false,
    activeItem: '预约时间',
    weekDays: util.getWeekDays(2, '/')
  },
  closeTimeDialog: function(){
    this.setData({
      showTimeDialog: false
    })
  },
  exchange: function(e){
    console.log(e)
    this.setData({
      activeItem: e.currentTarget.dataset.name
    })
  },
  /**
   * 选择时间段弹框
   */
  pickerTimeTap: function (e) {
    var _this = this;
    console.log(e.currentTarget.dataset.period)
    if (e.currentTarget.dataset.id) {
      _this.getSequence({
        hospId: _this.data.options.hospId,
        schId: e.currentTarget.dataset.id,
        doctorId: _this.data.options.docId,
        timePeriod: e.currentTarget.dataset.period
      })
      var obj = e.currentTarget.dataset.obj
      obj.schDateStr = obj.schDate.split('-')[0] + '年' + obj.schDate.split('-')[1] + '月' + obj.schDate.split('-')[2] + '日'
      _this.setData({
        showTimeDialog: true,
        currentSequence: obj
      })
    }
  },
  /**
   * 选择挂号时间
   */
  selectedTap: function (e) {
    var _this = this;
    var sequence = _this.data.sequence;
    var item = e.currentTarget.dataset.item;
    console.log(e.currentTarget.dataset.item)
    for (var i = 0; i < sequence.length; i++){
      if (item.id == sequence[i].id) {
        if (sequence[i].checked) {
          sequence[i].checked = false;
        } else {
          sequence[i].checked = true;
        }
      } else {
        sequence[i].checked = false;
      }
    }
    _this.setData({
      sequence: sequence
    })
  },
  /**
   * 关注医生
   */
  attentionTap: function () {
    var _this = this;
    var userInfo = _this.data.userInfo;
    console.log(userInfo)
    var docDetail = _this.data.docDetail;
    if (docDetail.isAttention == 1) {
      //取消关注
      _this.attentionDoctor({
        url: '/attentionDoctor/delete',
        data: {
          attentionDoctor: {
            "doctorId": docDetail.id,
            "userId": userInfo.id
          }
        },
        settingData: '0'
      })
    } else {
      _this.attentionDoctor({
        url: '/attentionDoctor/insert',
        data: {
          attentionDoctor: {
            "doctorId": docDetail.id,
            "userId": userInfo.id
          }
        },
        settingData: '1'
      })
    }
  },
  /**
   * （取消）关注医生
   */
  attentionDoctor: function (opt) {
    var _this = this;
    var docDetail = _this.data.docDetail;
    app.request({
      url: opt.url,
      header: {
        'content-type': 'application/json'
      },
      method: "Get",
      data: opt.data,
      success: function (res) {
        console.log('222')
        console.log(res)
        if (res.code == 1) {
          docDetail.isAttention = opt.settingData;
          _this.setData({
            docDetail: docDetail
          })
        } else {
          console.log('code : 0')
        }
      }
    })
  },
  /**
   * 确定预约
   */
  confirmTap: function(){
    var _this = this;
    var sequence = _this.data.sequence;
    var options = _this.data.options;
    var ifChecked = false;
    for (var i = 0; i < sequence.length; i++) {
      if (sequence[i].checked) {
        ifChecked = true;
        wx.navigateTo({
          url: '../selectpatient/selectpatient?hospId=' + options.hospId + '&docId=' + options.docId + '&schId=' + sequence[i].schId + '&endTime=' + sequence[i].seqEndTime + '&beginTime=' + sequence[i].seqBeginTime + '&schDate=' + _this.data.currentSequence.schDateStr + '&timePeriod=' + sequence[i].timePeriod + '&schRegfee=' + _this.data.currentSequence.schRegfee
          
        })
      }
    }
    if (!ifChecked) {
      wx.showToast({
        title: '请先选择时间',
        icon: 'none',
        duration: 1000
      })
    }
  },
  /**
    *获取医生详情
  */
  getDoctorDetail: function (id) {
    var _this = this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        if (res.data.id) {
          _this.setData({
            userInfo: res.data
          })
          app.request({
            url: '/user/doctorDetail',
            header: {
              'content-type': 'application/json'
            },
            method: "Get",
            data: {
              "id": id,
              userId: res.data.id
            },
            success: function (res) {
              console.log('222')
              console.log(res)
              if (res.code == 1) {
                _this.setData({
                  docDetail: res.obj
                })
              } else {
                console.log('code : 0')
              }
            }
          })
        }
      }
    })
  },
  /**
    *获取医生排班
  */
  getSchedule: function (opt) {
    var _this = this;
    var params = {
      schedule: {
        hospId: opt.hospId,
        deptId: opt.deptId,
        doctorId: opt.doctorId
      }
    }
    app.request({
      url: '/schedule/selectList',
      header: {
        'content-type': 'application/json'
      },
      method: "Get",
      data: params,
      success: function (res) {
        console.log('222')
        console.log(res)
        if (res.code == 1) {
          var dataList = res.data;
          var weekDays = util.getWeekDays(2, '/')
          for (var i = 0; i < weekDays.length; i++){
            for (var j = 0; j < dataList.length; j++) {
              if (weekDays[i].locStr == dataList[j].schDate) {
                if (dataList[j].timePeriod == 1) {
                  weekDays[i].morning = dataList[j]
                } else if (dataList[j].timePeriod == 2) {
                  weekDays[i].afternoon = dataList[j]
                } else {
                  weekDays[i].night = dataList[j]
                }
              }
            }
          }
          console.log(weekDays)
          _this.setData({
            schedule: weekDays
          })
        } else {
          console.log('code : 0')
        }
      }
    })
  },
  /**
    *获取号源
  */
  getSequence: function (opt) {
    var _this = this;
    var params = {
      sequence: opt
    }
    app.request({
      url: '/sequence/selectList',
      header: {
        'content-type': 'application/json'
      },
      method: "Get",
      data: params,
      success: function (res) {
        console.log('sequence')
        console.log(res)
        if (res.code == 1) {
          _this.setData({
            sequence: res.data
          })
        } else {
          console.log('code : 0')
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var _this = this;
    _this.setData({
      options: options
    })
    _this.getDoctorDetail(options.docId);
    _this.getSchedule(options);
    console.log(_this.data.weekDays)
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