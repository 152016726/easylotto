//detail.js
//获取应用实例
import drawQrcode from '../../../../utils/weapp.qrcode.esm.js'
const app = getApp()

Page({
    data: {
        motto: '审核详情',
        cancelSignDialog: false,
        hideCodeDialog: true,
        showRemoveSignDialog: false,
        orderInfo: [],
        userId: '',
        orderId: '',
        addressStr: '',
        member: ''
    },
    onLoad: function (options) {
        var _this = this;
        var orderId = options.id;
        //var userId ='757323004204404736';
        //var orderId ='757398284035104768';
        wx.getStorage({
            key: 'userInfo',
            success: function (res) {
                _this.setData({
                    userId: res.data.id,
                    // userId:userId,
                    orderId: orderId
                })
                app.request({
                    url: '/order/family/select',
                    header: {
                        'content-type': 'application/json'
                    },
                    data: {
                        params: {
                            id: orderId,
                            userId: res.data.id
                        }
                    },
                    method: "GET",
                    success: function (res) {
                      console.log(res)
                        if (res.code == 1) {
                            var addressStr = JSON.parse(res.obj.addressStr);
                            var member = JSON.parse(res.obj.serviceObject);
                            _this.setData({
                                orderInfo: res.obj,
                                addressStr: addressStr,
                                member: member,
                            });
                            //二维码
                            drawQrcode({
                                width: 170,
                                height: 170,
                                canvasId: 'myQrcode',
                                //typeNumber: 10,
                                text: orderId
                            });
                            _this.team(res.obj.teamId)
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
    },
    //解约团队信息
    team: function (teamId) {
        var _this = this;
        app.request({
            url: '/familyTeam/selectDetailWithBaseSerivce',
            header: {
                'content-type': 'application/json'
            },
            data: {id: teamId},
            method: "GET",
            success: function (res) {
                if (res.code == 1) {
                    _this.setData({
                        teamInfo: res.obj
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
    //二维码显示隐藏
    showCodeDialog: function () {
        this.setData({
            hideCodeDialog: false
        })
    },
    hideCodeDialog: function () {
        this.setData({
            hideCodeDialog: true
        })
    },
    /**
     * 弹出框蒙层截断touchmove事件
     */
    preventTouchMove: function () {
    },
    //取消签约对话框显示隐藏
    showCancelSignDialog: function () {
        this.setData({
            cancelSignDialog: true
        })
    },
    hideCancelSignDialog: function () {
        this.setData({
            cancelSignDialog: false
        })
    },
    //确定取消订单
    onconfirmCancel: function () {
        var _this = this;
        app.request({
            url: '/order/family/cancel',
            header: {
                'content-type': 'application/json'
            },
            data: {
                params: {
                    id: _this.data.orderId,
                    userId: _this.data.userId
                }
            },
            method: "GET",
            success: function (res) {
                if (res.code == 1) {
                    _this.hideCancelSignDialog();
                    _this.confirmToast();
                    setTimeout(function () {
                        wx.navigateBack({
                            delta: 1
                        })
                    }, 1000);
                }
            }
        })
    },
    onCancelCancel: function () {
        this.hideCancelSignDialog()
    },
    //解除签约弹窗
    showRemoveSignDialog: function () {
        this.setData({
            showRemoveSignDialog: true
        })
    },
    hideRemoveSignDialog: function () {
        this.setData({
            showRemoveSignDialog: false
        })
    },
    //确定解约
    confirmRemove: function () {
        var _this = this;
        app.request({
            url: '/order/family/cancel',
            header: {
                'content-type': 'application/json'
            },
            data: {
                params: {
                    id: _this.data.orderId,
                    userId: _this.data.userId
                }
            },
            method: "GET",
            success: function (res) {
                if (res.code == 1) {
                    _this.hideRemoveSignDialog();
                    _this.confirmToast();
                    setTimeout(function () {
                        wx.navigateBack({
                            delta: 1
                        })
                    }, 1000);
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
    cancelRemove: function () {
        this.hideRemoveSignDialog()
    },
    closeRemoveDialog: function () {
        this.hideRemoveSignDialog()
    },
    //取消成功toast
    confirmToast: function () {
        wx.showToast({
            title: '取消成功',
            icon: 'success',
            duration: 2000
        });
    }
})