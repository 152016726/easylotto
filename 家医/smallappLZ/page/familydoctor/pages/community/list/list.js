//list.js
//获取应用实例
const app = getApp()

Page({
  data: {
    communityList: [],
    scroll: {
      ifNull: true,
      loadText: '加载中...',
      pageNum: 1,
      nullText: ''
    },
    height: 0,
  },
  //跳转社区资讯详情
  linkCDetail: function (e) {
    wx.navigateTo({
      url: '../../community/detail/detail?id=' + e.currentTarget.dataset.id
    })
  },
  onLoad: function (options) {
    var _this = this;
    var titleName = '资讯列表'
    console.log(titleName)
    console.log(options)
    _this.setData({
      categoryIds: options.categoryIds,
      newsCategory: options.newsCategory
    })
    if (options.newsCategory =='697348184457179136') {
      titleName = '社区活动'
    } else if (options.newsCategory == '697348950005063680') {
      titleName = '社区大事件'
    }
    wx.setNavigationBarTitle({
      title: titleName
    })
    //获取屏幕高度
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          height: res.windowHeight
        })
      }  
    })

  },
  onShow: function () {
    var _this = this;
    _this.setData({
      communityList: [],
      scroll: {
        ifNull: true,
        loadText: '加载中...',
        pageNum: 1,
        nullText: ''
      }
    })
    _this.getCommunityList(1);
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
      scroll: {
        ifNull: true,
        loadText: '加载中...',
        pageNum: 1,
        nullText: ''
      },
      communityList: []
    })
    _this.getCommunityList(1);
  },
  //上拉加载
  lower: function (e) {
    var _this = this;
    console.log("上拉加载")
    console.log(e)
    _this.getCommunityList(_this.data.scroll.pageNum);
  },
  getCommunityList: function (current) {//获取资讯
    var _this = this;
    var communityList = _this.data.communityList;
    var params = {
      news: {
        "status": 1
      },
      "pageNo": 1,
      "pageSize": 10
    };

    if (_this.data.categoryIds) { params.news.categoryIds = _this.data.categoryIds };
    if (_this.data.newsCategory) { params.news.newsCategory = _this.data.newsCategory };
    params.pageNo = current;
    console.log('~~~~~~~~~~~~~')
    console.log(params)
    if (params.pageNo) {
      app.request({
        url: '/news/selectList',
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
                communityList: communityList.concat(res.data),
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
