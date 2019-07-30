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