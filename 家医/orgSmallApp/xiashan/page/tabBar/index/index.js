
//index.js
//获取应用实例
const app = getApp()
import tempObj from '../../common/template/head/head.js'
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
    item: {
      array: ['雷州市xx社区卫生服务中心', '雷州市xx社区卫生服务中心', '雷州市xx社区卫生服务中心', '雷州市xx社区卫生服务中心'],//head选择社区
      pickerIndex: 0,//选择索引
    },
    ifSign: false
  },
  //医生端
  linkDoctors: function () {
    wx.navigateTo({
      url: '../doctor/index/index'
    })
  },
  linkBlockTap: function () {
    wx.showToast({
      title: '即将上线，敬请期待！',
      icon: 'none',
      duration: 1000
    })
  },
  //扫码
  headScanTap: tempObj.scaneTap,
  //跳转图片链接
  linkImageUrl: function (e) {
    console.log(e.currentTarget.dataset.url)
    var url = e.currentTarget.dataset.url;
    if (this.data.userInfo.id && url) {
      wx.navigateTo({
        url: '../../common/webviewlink/webviewlink?url=' + url
      })
    }
  },
  //跳转健康档案
  linkHealthTap: function (e) {
    var _this = this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        if (res.data.id) {

          wx.navigateTo({
            url: '../../healthrecords/healthrecords'
          })
        } else {
          wx.showToast({
            title: '您的信息还未完善！',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  //跳转家庭医生
  linkFamilyTap: function (e) {
    var _this = this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        if (res.data.id) {

          wx.navigateTo({
            url: '../../familydoctor/pages/index/index'
          })
        } else {
          wx.showToast({
            title: '您的信息还未完善！',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  //跳转接种管理
  linkInoculationTap: function (e) {
    var _this = this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        if (res.data.id) {

          wx.navigateTo({
            url: '../../inoculation/inoculation'
          })
        } else {
          wx.showToast({
            title: '您的信息还未完善！',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  //跳转在线问诊
  linkOnlineTap: function(e) {
    var _this = this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        if (res.data.id && _this.data.ifSign) {

          wx.navigateTo({
            url: '../../info/pages/online/consultation/consultation'
          })
        } else {
          wx.showToast({
            title: '您还未签约家庭医生！',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  /*单项选择社区*/
  pickerChange: function (e) {
    var _this = this;
    _this.setData({
      pickerIndex: e.detail.value
    })
    console.log(_this.data.pickerIndex);
  },
  //跳转社区资讯列表
  linkCList: function () {
    wx.navigateTo({
      url: '../../community/list/list'//?categoryIds=677306557456486489
    })
  },
  //跳转社区资讯详情
  linkCDetail: function (e) {
    wx.navigateTo({
      url: '../../community/detail/detail?id=' + e.currentTarget.dataset.id
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
          height: (res.windowHeight / 2) - 20
        })
      }
    })
    console.log('onLoad-----------------')

    _this.getBannerImg();
  },
  onShow: function () {
    var _this = this;

    if (app.globalData.employData && app.globalData.employData != '') {
      wx.getStorage({
        key: 'userInfo',
        success: function (res) {
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
          console.log('2222222222222222222222222222222222222222222----')
          console.log(res.data)
        }
      })
      wx.getStorage({
        key: 'orgId',
        success: function (res) {
          _this.setData({
            orgId: res.data
          })
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
              console.log('11111111111111111111111111111----')
              console.log(res.data)
            }
          })
          wx.getStorage({
            key: 'orgId',
            success: function (res) {
              _this.setData({
                orgId: res.data
              })
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
        //"categoryIds": "677306557456486489",
        "status": 1
      },
      "pageNo": current,
      "pageSize": 10
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
        console.log(res)
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
        }
      }
    })
  },
  //获取广告
  getBannerImg: function (e) {
    var _this = this;
    app.request({
      url: '/banner/selectList',
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      data: {
        "banner": {
          "orgId": "744278088727510001",
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
  },
  //判断用户是否签约
  getUserSign: function (params) {
    var _this = this;
    params.isCheckHealthRecord = '1';
    app.request({
      url: '/doctor/familyUserSignMember/isSignUserMember',
      header: {
        'content-type': 'application/json'
      },
      method: "Get",
      data: {params: params},
      success: function (res) {
        console.log('判断用户------------------')
        console.log(res)
        if (res.code == 1) {
          _this.setData({ ifSign: true })
        } else {
          _this.setData({ ifSign: false })
        }
      }
    })
  },
  //获取机构
  getOrg: function (e) {
    var _this = this;
    var communityList = _this.data.communityList;
    var params = {
      "params": {},
      "pageSize": 10
    };

    if (_this.data.name) { params.params.name = _this.data.name };
    if (_this.data.cityData) { params.params.cityId = _this.data.cityData.cityId };
    params.pageNo = current;
    if (params.pageNo) {
      app.request({
        url: '/org/familyDoctorOrg/selectList',
        header: {
          'content-type': 'application/json'
        },
        method: "Get",
        data: params,
        success: function (res) {
          if (res.code == 1) {
            if (res.data.length > 0) {
              var dataList = res.data;
              if (_this.data.name) {
                for (var i = 0; i < dataList.length; i++) {
                  var str = dataList[i].name;
                  var str1 = str.replace(_this.data.name, ',' + _this.data.name + ',');
                  var arr = str1.split(',');
                  dataList[i].nameArr = arr;
                }
              }
              _this.setData({
                communityList: communityList.concat(dataList),
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


