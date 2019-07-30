import drawQrcode from '../../../../utils/weapp.qrcode.esm.js'
import util from '../../../../utils/util.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clock:'',
    hideCodeDialog: true,
    disabled:false,
    idCard:'',
    showIDCardNum:true,
    hideOrderDialog: true
  },
  bindReasonTap: function (e) {
    this.setData({
      reasonVal: e.detail.value
    });
  },
  hideOrderTap: function (e) {
    this.setData({
      hideOrderDialog: true
    });
  },
  openOrderTap: function (e) {
    this.setData({
      hideOrderDialog: false
    });
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
        _this.getOrderDetail();
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
    return munite+':'+second;
  },
  /**
   * 取消订单
   */
  cancelTap: function() {
    var _this = this;
    app.request({
      url: "/order/registration/cancel",
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      data: {
        "order": {
          "id": _this.data.orderId,
          "reason": _this.data.reasonVal
        }
      },
      success: function (res) {
        console.log(res)
        if (res.code == 1) {
          wx.showToast({
            title: '已取消订单',
            icon: 'none',
            duration: 2000
          })
          _this.setData({
            hideOrderDialog: true
          });
          _this.getOrderDetail();
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
  /**
   * 支付
   */
  payTap: function(e){
    var _this = this;
    var orderId = e.currentTarget.dataset.id;
    wx.showToast({
      title: '加载中...',
      icon: 'none',
      duration: 20000
    })
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        if (res.data.id) {
          _this.setData({
            userInfo: res.data
          })
          app.request({
            url: "/tx/pay/payParams",
            header: {
              'content-type': 'application/json'
            },
            method: "GET",
            data: {
              "payOrder": {
                "orderId": orderId,
                "body": "预约挂号",
                "tradeType": "JSAPI",
                "thirdAccount": res.data.thirdAccount
              }
            },
            success: function (res) {
              console.log(res)
              if (res.code == 1) {
                console.log(
                  {
                    timeStamp: res.obj.timeStamp,
                    nonceStr: res.obj.nonceStr,
                    package: res.obj.package,
                    signType: res.obj.signType,
                    paySign: res.obj.sign
                  }
                )
                wx.hideToast();
                wx.requestPayment({
                  timeStamp: res.obj.timeStamp,
                  nonceStr: res.obj.nonceStr,
                  package: res.obj.package,
                  signType: res.obj.signType,
                  paySign: res.obj.sign,
                  success: res => {
                    console.log('success------')
                    console.log(res)
                    if (_this.data.flag == 'list') {
                      wx.navigateBack({
                        delta: 1
                      })
                    } else {
                      wx.navigateTo({
                        url: '../../../info/pages/reservation/list/list'
                      })
                    }
                  },
                  fail: res => {
                    console.log('fail------')
                    console.log(res)
                    wx.showToast({
                      title: res.errMsg,
                      icon: 'none',
                      duration: 2000
                    })
                  },
                  complete: res => {
                    wx.hideToast();
                  }
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
      }
    })
  },
  /**
   * 获取订单详情
   */
  getOrderDetail: function () {
    var _this = this;
    var params = {
      "id": _this.data.orderId
    };
    app.request({
      url: "/order/registration/select",
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      data: params,
      success: function (res) {
        console.log(res)
        var orderDetail = res.obj;
        if (res.code == 1) {
          switch (orderDetail.payStatus) {
            case '0':
              orderDetail.payStatusDec = '待支付'
              break;
            case '1':
              orderDetail.payStatusDec = '部分支付'
              break;
            case '2':
              orderDetail.payStatusDec = '已支付'
              break;
            case '3':
              orderDetail.payStatusDec = '待退费'
              break;
            case '4':
              orderDetail.payStatusDec = '已退费'
              break;
            case '5':
              orderDetail.payStatusDec = '已取消'
              break;
            case '6':
              orderDetail.payStatusDec = '现场窗口退费'
              break;
          }
          orderDetail.dateDec = orderDetail.treatTime.split(' ')[0];
          orderDetail.timeDec = orderDetail.treatTime.split(' ')[1];
          _this.setData({
            orderDetail: orderDetail,
          });
          if (orderDetail.validTime > 0) {
            _this.stampToDate(orderDetail.validTime)
          }
          _this.getMemberDetail(res.obj.patientId)
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
  /**
   * 获取就诊人信息
   */
  getMemberDetail: function (id) {
    var _this = this;
    var params = {
      "id": id
    };
    app.request({
      url: "/patient/select",
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      data: params,
      success: function (res) {
        console.log(res)
        if (res.code == 1) {
          _this.setData({
            memberDetail: res.obj
          });
          _this.setData({
            idCard: _this.data.memberDetail.patIdcard
          })
          //健康卡二维码生成
          if (_this.data.memberDetail.patHealthCard) {
            drawQrcode({
              width: 220,
              height: 220,
              canvasId: 'myQrcode',
              text: _this.data.memberDetail.patHealthCard
            });
          }
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    _this.setData({
      orderId: options.id,
      flag: options.flag
    })

  },
  onShow: function () {
    var _this = this;
    _this.getOrderDetail();
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
  preventTouchMove: function (){},
  //身份证星号显示隐藏
  IDCardShow:function(){
    var _this = this;
    var idCard = _this.data.memberDetail.patIdcard;
    _this.setData({
      showIDCardNum:!_this.data.showIDCardNum
    });
    if(_this.data.showIDCardNum){//切换显示全部数字
      _this.setData({
        idCard:idCard
      })
    }else{//显示部分带星号
      
      _this.setData({
        idCard: util.secretData(idCard, 'idCard')
      })
    }

  }

})