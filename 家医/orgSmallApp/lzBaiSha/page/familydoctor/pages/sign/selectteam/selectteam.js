const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teamList: [],
    scroll: {
      ifNull: true,
      loadText: '加载中...',
      pageNum: 1,
      nullText: ''
    },
    height: 0,
  },
  linkDetailTap: function (e) {
    wx.navigateTo({
      url: '../detail/detail?id=' + e.currentTarget.dataset.id
    })
  },
  onLoad: function (options) {
    var _this = this;
    _this.setData({
      orgId: options.id
    })
    //获取屏幕高度
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          height: res.windowHeight
        })
      }
    })
    _this.getList(_this.data.scroll.pageNum);

  },
  //下拉刷新
  upper: function (e) {
    var _this = this;
    wx.showToast({
      title: '数据刷新中',
      icon: 'loading',
      duration: 10000,
      mask: true
    })
    _this.setData({
      teamList: []
    })
    _this.getList(1);
  },
  //上拉加载
  lower: function (e) {
    var _this = this;
    console.log("上拉加载")
    console.log(e)
    _this.getList(_this.data.scroll.pageNum);
  },
  getList: function (current) {//获取社区
    var _this = this;
    var teamList = _this.data.teamList;
    var params = {
      "familyTeam": {
        "orgId": _this.data.orgId
      },
      "pageSize": 10
    };

    if (_this.data.name) { params.name = _this.data.name };
    params.pageNo = current;
    console.log('~~~~~~~~~~~~~')
    console.log(params)
    if (params.pageNo) {
      app.request({
        url: '/familyTeam/selectList',
        header: {
          'content-type': 'application/json'
        },
        method: "Get",
        data: params,
        success: function (res) {
          console.log(res);
          if (res.code == 1) {
            if (res.data.length > 0) {
              _this.setData({
                teamList: teamList.concat(res.data),
                scroll: {
                  pageNum: current + 1,
                  ifNull: false
                },
              })
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
                    loadText: '加载完毕'
                  }
                })
              }
            }
            wx.hideToast();
          } else {
            console.log('code : 0')
            wx.hideToast();
          }
        }
      })
    }
  }
})