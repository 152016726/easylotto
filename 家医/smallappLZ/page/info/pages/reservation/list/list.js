//mine.js
//获取应用实例
const app = getApp()

Page({
  data: {
    navbar: ['全部', '未就诊','已就诊'], 
    currentTab: 0,
    orderList: [],
    scroll: {
      ifNull: false,
      loadText: '加载中...',
      pageNum: 1,
      nullText: ''
    },
    height: 0

  },
  //切换状态栏
  navbarTap: function(e){
    var _this = this;
    console.log(e.currentTarget.dataset.idx)
    this.setData({ 
      currentTab: e.currentTarget.dataset.idx,
      orderList: []
    });
    _this.getReservationList(1);
      
  },
  getReservationList: function (current) {
    var _this = this;
    var orderList = _this.data.orderList;
    var params = {
      "order": {
        "userId": _this.data.userInfo.id
      },
      "pageNo": 1,
      "pageSize": 10
    };
    if (_this.data.currentTab == 1) {
      params.order.status = '0'
    } else if (_this.data.currentTab == 2) {
      params.order.status = '1'
    }
    params.pageNo = current;
    if (params.pageNo) {
      app.request({
        url: "/order/registration/selectList",
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        data: params,
        success: function (res) {
          console.log(res)
          if (res.code == 1) {

            if (res.data.length > 0) {
              _this.setData({
                orderList: orderList.concat(res.data),
                scroll: {
                  ifNull: false,
                  pageNum: current + 1 //当前值加1
                }
              });
            } else {
              if (res.pageNo == 1) {
                _this.setData({
                  scroll: {
                    ifNull: true,
                    nullText: '暂时没有数据！'
                  }
                })
              } else {
                _this.setData({
                  scroll: {
                    ifNull: false,
                    loadText: '加载完毕！'
                  }
                })
              }
            }
            wx.hideToast();
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
  },
  //下拉刷新
  upper: function (e) {
    var _this = this;
    wx.showToast({
      title: '数据刷新中',
      icon: 'loading',
      duration: 10000,
      mask: true
    });
    _this.setData({
      orderList: []
    });
    _this.getReservationList(1);
  },
  //上拉加载
  lower: function (e) {
    var _this = this;
    _this.getReservationList(_this.data.scroll.pageNum);
  },
  onShow: function () {
    var _this = this;
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          height: res.windowHeight - 50
        })
      }
    });
    wx.getStorage({
      key: 'userInfo',//获取用户信息
      success: function (res) {
        _this.setData({
          userInfo: res.data
        });
        if (res.data.id) {
          //获取列表数据
          _this.getReservationList(1)
        } else {
          wx.navigateTo({
            url: '../../editinfo/editinfo'//注册用户页面
          })
        }
      }
    });
  }
})
