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
    circular: true,
    scroll: {
      ifNull: true,
      loadText: '加载中...',
      pageNum: 1,
      nullText: ''
    },
    height: 0,
    communityList: [],
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  linkDoctors: function () {
    wx.navigateTo({
      url: '../doctor/index/index'
    })
  },
  //跳转图片链接
  linkImageUrl: function (e) {
    console.log(e.currentTarget.dataset.url)
    var url = e.currentTarget.dataset.url;
    if (this.data.userInfo.id && url) {
      wx.navigateTo({
        url: '../webviewlink/webviewlink?url=' + url
      })
    }
  },
  //跳转立即签约
  linkSign: function() {
    if (wx.getStorageSync('userInfo').id) {
      if (wx.getStorageSync('inletType') == '1') {
        wx.navigateTo({
          url: '../sign/selectcommunity/selectcommunity'
        })
      } else {
        wx.navigateTo({
          url: '../sign/selectteam/selectteam?id=' + wx.getStorageSync('orgId')
        })
      }
    } else {
      wx.navigateTo({
        url: '../info/editinfo/editinfo'
      })
    }
  },
  //跳转社区资讯列表
  linkCList: function () {
    wx.navigateTo({
      url: '../community/list/list?categoryIds=677306557456486489'
    })
  },
  //跳转社区资讯详情
  linkCDetail: function (e) {
    wx.navigateTo({
      url: '../community/detail/detail?id=' + e.currentTarget.dataset.id
    })
  },
  //上拉加载
  lower: function (e) {
    var _this = this;
    _this.getCommunityList(_this.data.scroll.pageNum);
  },
  onLoad: function (options) {
    var _this = this;
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          height: (res.windowHeight / 2) + 20
        })
      }
    })


    

  },
  onShow: function () {
    var _this = this;
    if (app.globalData.employData && app.globalData.employData != '') {
      wx.getStorage({
        key: 'userInfo',
        success: function (res) {
          console.log(11111111)
          _this.setData({
            userInfo: res.data
          })
        }
      })
      wx.getStorage({
        key: 'inletType',
        success: function (res) {
          _this.setData({
            inletType: res.data
          })
        }
      })
      wx.getStorage({
        key: 'orgId',
        success: function (res) {
          _this.setData({
            orgId: res.data
          })
          _this.getBannerImg();
        }
      })
    } else {
      //canIUse: wx.canIUse('button.open-type.getUserInfo')
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.employDataCallback = employData => {
        if (employData != '') {
          wx.getStorage({
            key: 'userInfo',
            success: function (res) {
              console.log(22222)
              _this.setData({
                userInfo: res.data
              })
            }
          })
          wx.getStorage({
            key: 'inletType',
            success: function (res) {
              _this.setData({
                inletType: res.data
              })
            }
          })
          wx.getStorage({
            key: 'orgId',
            success: function (res) {
              _this.setData({
                orgId: res.data
              })
              _this.getBannerImg();
            }
          })
        }
      }
    }
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
        "categoryIds": "677306557456486489",
        "status": 1
      },
      "pageNo": current,
      "pageSize": 5
    };
    params.pageNo = current;
    app.request({
      url: '/news/selectList',
      header: {
        'content-type': 'application/json'
      },
      method: "Get",
      data: params,
      success: function (res) {
        if (res.code == 1) {
          if (res.data.length > 0) {
            _this.setData({
              communityList: communityList.concat(res.data),
              scroll: {
                pageNum: current+1,
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
        }
      }
    })
  },
  bindGetUserInfo: function (e) {
  },
  getBannerImg: function(e) {//获取广告
    var _this = this;
    app.request({
      url: '/banner/selectList',
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      data: {
        "banner": {
          "orgId": _this.data.orgId,
          "position": "5"
        }
      },
      success: function (res) {
        console.log(res)
        if (res.code == 1) {
          //轮播图
          //var array = _this.data.imgArr;
          //for (let i = 0; i < res.data.length; i++) {
            //array.push(res.data[i].picUrl);
          //}
          _this.setData({ imgArr: res.data })

        } else {

        }
      }
    })
  }
})
