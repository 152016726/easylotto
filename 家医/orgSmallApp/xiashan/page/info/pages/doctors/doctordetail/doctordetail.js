//detail.js
//获取应用实例
const app = getApp()
Page({
    data: {},
    onLoad: function (options) {
        var _this = this;
        _this.setData({
            id:options.id
        });
        /*传参options.id*/
        _this.doctor();
    },
    // 医生信息读取
    doctor: function () {
        var _this = this;
        app.request({
            url: '/familyTeamDoctor/select',
            header: {
                'content-type': 'application/json'
            },
            method: "GET",
            data: {id: _this.data.id},
            success: function (res) {
                if (res.code == 1) {
                    var data = res.obj;
                    _this.setData({
                        docDetail: data
                    });
                    _this.team(data.teams[0].teamId);
                    _this.isSign(data.teams[0].teamId);

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
    // 团队列表信息读取
    team: function (teamId) {
        var _this = this;
        app.request({
            url: '/familyTeamMember/selectByteam',
            header: {
                'content-type': 'application/json'
            },
            method: "GET",
            data: {
                params: {
                    teamId: teamId,
                    status: "1"
                }
            },
            success: function (res) {
                if (res.code == 1) {
                    _this.setData({
                        teamDetail: res.data
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
    //点击成员事件
    changeMember:function(e){
        var _this=this;
        _this.setData({
            id: e.currentTarget.dataset.id
        });
        _this.doctor();
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