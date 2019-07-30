//detail.js
//获取应用实例
const app = getApp()
Page({
    data: {},
    onLoad: function (options) {
        var _this = this;
        var teamId = options.id;
        /* 参数*/
        _this.teamDetail(teamId);
        _this.isSign(teamId);
        _this.getTeamNumber(teamId);
    },
    // 团队信息
    teamDetail: function (teamId) {
        var _this = this;
        app.request({
            url: '/familyTeam/selectDetail',
            header: {
                'content-type': 'application/json'
            },
            data: {id: teamId},
            method: "GET",
            success: function (res) {
              console.log(res)
                if (res.code == 1) {
                    _this.setData({
                        detailList: res.obj
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
    // 医生信息读取
    getDoctorDetail: function (docId) {
      var _this = this;
      app.request({
        url: '/familyTeamDoctor/select',
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        data: { id: docId },
        success: function (res) {
          console.log(res)
          if (res.code == 1) {
            var data = res.obj;
            _this.setData({
              docDetail: data
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
    getTeamNumber: function (teamId) {//获取团队列表
      var _this = this;
      var params = {
        "teamId": teamId,
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
        data: { params: params },
        success: function (res) {
          console.log(res);
          if (res.code == 1) {
            _this.setData({
              teamMember: res.data,
              currentDocId: res.data[0].docId
            })
            _this.getDoctorDetail(_this.data.currentDocId);
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
    changeDoctor: function(e) {
      var _this = this;
      var id = e.currentTarget.dataset.id
      if (_this.data.currentDocId != id) {
        this.getDoctorDetail(id);
        _this.setData({
          currentDocId: id
        })
      }
    },
    // 是否签约判断
    isSign: function (teamId) {
        var _this = this;
        // var teamId ='699857505507360768';   /*测试已签约数据*/
        wx.getStorage({
            key: 'userInfo',
            success: function (res) {
                app.request({
                    url: '/doctor/familyUserSign/selectSignDocTeam',
                    header: {
                        'content-type': 'application/json'
                    },
                    data: {
                        params: {
                            teamId: teamId,
                            userId: res.data.id,
                            inStatus: '1'
                        }
                    },
                    method: "GET",
                    success: function (res) {
                        if (res.code == 1) {
                            _this.setData({
                                isSign: res.obj
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
    }
})