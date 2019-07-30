const app = getApp()
Page({
  data: {
    detail: {},
    team: {},
    checkeVal: true,
    disabled: false
  },
  linkAgreeTap: function() {
    wx.navigateTo({
      url: '../agree/agree'
    })
  },
  linkTeamDetailTap: function(e) {
    console.log(e)
    wx.navigateTo({
      url: '../../../../info/pages/doctors/teamdetail/teamdetail?id=' + e.currentTarget.dataset.id
    })
  },
  checkboxChange: function (e) {
    var _this = this;
    if (e.detail.value[0]) {
      _this.setData({
        disabled: false
      })
    } else {
      _this.setData({
        disabled: true
      })
    }
  },
  confirmTap: function () {
    wx.navigateTo({
      url: '../confirm/confirm?tid=' + this.data.teamId
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    _this.setData({
      teamId: options.id
    })
    _this.getDetail();
    _this.getTeamNumber();
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
  getDetail: function () {//获取签约团队详情
    var _this = this;
    var params = {
      "id": _this.data.teamId
    };

    app.request({
      url: '/familyTeam/selectDetailWithBaseSerivce',
      header: {
        'content-type': 'application/json'
      },
      method: "Get",
      data: params,
      success: function (res) {
        console.log(res);
        if (res.code == 1) {
          _this.setData({
            detail: res.obj
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
  },
  getTeamNumber: function () {//获取团队列表
    var _this = this;
    var params = {
      "teamId": _this.data.teamId,
      "status": 1
    };
    console.log('---------------------------')
    console.log(params)
    app.request({
      url: '/familyTeamMember/selectByteam',
      header: {
        'content-type': 'application/json'
      },
      method: "Get",
      data: {params:params},
      success: function (res) {
        console.log(res);
        if (res.code == 1) {
          _this.setData({
            team: res.data
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
  }
})