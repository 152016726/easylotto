// page/appointment/page/orderDetail/orderDetail.js
import drawQrcode from '../../../../utils/weapp.qrcode.esm.js'
import util from '../../../../utils/util.js'
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        clock: '',
        hideCodeDialog: true,//二维码弹层隐藏与否
        disabled: false,
        idCard: '123456789012345678',
        memberDetail:{
            patHealthCard:"782731992",
        },
        showIDCardNum: true,
        hideOrderDialog: true,
        reasonVal:""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        var _this= this;
        //健康卡二维码生成
        if (_this.data.memberDetail.patHealthCard) {
            drawQrcode({
                width: 220,
                height: 220,
                canvasId: 'myQrcode',
                text: _this.data.memberDetail.patHealthCard
            });
        }
        _this.stampToDate(1800000);//模拟时间倒计时调用
    },

    /**
     * 订单有效时间倒计时
     */
    stampToDate: function (timestamp) {
        var _this = this;
        var seconds = parseInt(timestamp/1000);
        function time(o) {
            if (seconds < 0) {
                wx.showToast({
                    title: '您的订单已过时！请重新下单。',
                    icon: 'none',
                    duration: 3000
                })
               /* _this.getOrderDetail();*/
            } else {
                _this.setData({
                    countText: _this.timeToString(seconds)
                })
                seconds--;
                setTimeout(function () {
                    time(o)
                }, 1000)
            }
        }
        time(seconds)
    },
     /**
     * 时间转化分秒格式
     */
    timeToString: function (time) {
        var _this = this,
            munite = parseInt(time / 60) < 10 ? ('0' + parseInt(time / 60)) : parseInt(time / 60),
            second = time % 60 < 10 ? ('0' + (time % 60)) : (time % 60);
         //return munite+':'+second;
         return munite+'分'+second+'秒';
    },


    //身份证星号显示隐藏
    IDCardShow: function () {
        var _this = this;
        var idCard = '123456789012345678';
        _this.setData({
            showIDCardNum: !_this.data.showIDCardNum
        });
        if (_this.data.showIDCardNum) {//切换显示全部数字
            _this.setData({
                idCard:idCard
            })
        } else {//显示部分带星号
            _this.setData({
                idCard: util.secretData(idCard, 'idCard')
            })
        }
    },
    //二维码显示隐藏
    showCodeDialog: function () {
        this.setData({
            hideCodeDialog: false
        })
    },
    //二维码显示隐藏
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
    //取消签约理由文本框
    bindReasonTap: function (e) {
        this.setData({
            reasonVal: e.detail.value
        });
    },
    //隐藏取消订单弹层
    hideCancelOrderDialog: function (e) {
        this.setData({
            hideOrderDialog: true
        });
    },
    //隐藏取消订单弹层
   showCancelOrderDialog: function (e) {
        this.setData({
            hideOrderDialog: false
        });
    },

    /**
     * 取消订单
     */
    cancelOrderTap: function() {
        var _this = this;
        _this.setData({
            hideOrderDialog: true
        });
    }
})