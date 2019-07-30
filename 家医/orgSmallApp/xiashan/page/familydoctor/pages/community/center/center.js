//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    mode: "scaleToFill",
    imgArr: [],
    indicatorDots: false,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    scroll: {
      ifNull: true,
      loadText: '加载中...',
      pageNum: 1,
      nullText: ''
    },
    height: 0,
    communityList: []
  },
  //跳转社区资讯列表
  linkCList: function () {
    wx.navigateTo({
      url: '../list/list?categoryIds=697348950005063680;697348184457179136'
    })
  },
  //跳转社区活动列表
  linkActivityCList: function () {
    wx.navigateTo({
      url: '../list/list?newsCategory=697348184457179136'
    })
  },
  //跳转社区大事件列表
  linkEventCList: function () {
    wx.navigateTo({
      url: '../list/list?newsCategory=697348950005063680'
    })
  },
  //跳转社区资讯详情
  linkCDetail: function (e) {
    wx.navigateTo({
      url: '../detail/detail?id=' + e.currentTarget.dataset.id
    })
  },
  //上拉加载
  lower: function (e) {
    var _this = this;
    console.log("上拉加载")
    console.log(e)
    _this.getCommunityList(_this.data.scroll.pageNum);
  },
  onLoad: function () {
    var _this = this;
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          height: (res.windowHeight / 2) - 5
        })
        console.log(res.windowHeight)
      }
    })

    _this.getBannerImg();

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
  getCommunityList: function (current) {//获取资讯
    var _this = this;
    var communityList = _this.data.communityList;
    var params = {
      news: {
        "categoryIds": "697348950005063680;697348184457179136",
        "status": 1
      },
      "pageNo": 1,
      "pageSize": 10
    };
    params.pageNo = current;
    console.log('++++++++++++++++++++')
    console.log(params.pageNo)
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
        } else {
          console.log('code : 0')
        }
      }
    })
  },
  getBannerImg: function (e) {
    var _this = this;
    app.request({
      url: '/banner/selectList?banner＝{"position":6}',
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log(res)
        if (res.code == 1) {
          //轮播图
          var array = _this.data.imgArr;
          for (let i = 1; i < 3; i++) {
            array.push(res.data[i].picUrl);
          }
          _this.setData({  imgArr: array })

        } else {

        }
      }
    })
  }
})
