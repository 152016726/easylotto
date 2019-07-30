
//index.js
//获取应用实例
const app = getApp()
import tempObj from '../../common/template/head/head.js'
Page({
  data: {
    webDomain: app.webDomain,
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
    orgList: [],
    ifSign: false
  },
  //医生端
  linkDoctors: function () {
    wx.navigateTo({
      url: '../../doctor/pages/index/index'
    })
  },
  linkBlockTap: function () {
    wx.navigateTo({
      url:"../../outpatientPayment/outpatientPayment"
    })
  },
  //扫码
  headScanTap: tempObj.scaneTap,
  //选择机构
  selectComTap: function(){
    if (this.data.inletType == '1') {
      wx.navigateTo({
        url: '../../familydoctor/pages/sign/selectcommunity/selectcommunity'
      })
    }
  },
  //跳转图片链接
  linkImageUrl: function (e) {
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

          wx.navigateTo({
            url: '../../info/pages/editinfo/editinfo'
          })
        }
      }
    })
  },
  //预约挂号
  linkReservationTap: function (e) {
    var _this = this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        if (res.data.id) {

          wx.navigateTo({
            url: '../../reservation/pages/selectorg/selectorg'
          })
        } else {
          wx.navigateTo({
            url: '../../info/pages/editinfo/editinfo'
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
          wx.navigateTo({
            url: '../../info/pages/editinfo/editinfo'
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
          wx.navigateTo({
            url: '../../info/pages/editinfo/editinfo'
          })
        }
      }
    })
  },
  //跳转体检查询
  linkExaminationTap: function (e) {
    var _this = this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        if (res.data.id) {

          wx.navigateTo({
            url: '../../info/pages/examination/list/list'
          })
        } else {
          wx.navigateTo({
            url: '../../info/pages/editinfo/editinfo'
          })
        }
      }
    })
  },
  //跳转健康管理
  linkHealMagTap: function (e) {
    var _this = this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        if (res.data.id) {

          wx.navigateTo({
            url: '../../info/pages/health/index/index'
          })
        } else {
          wx.navigateTo({
            url: '../../info/pages/editinfo/editinfo'
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
          _this.getUserSign({
            idCard: res.data.idCard
          })
        }
      })
      wx.getStorage({
        key: 'orgData',
        success: function (res) {
          _this.setData({
            inletType: res.data.inletType,
            orgId: res.data.orgId
          })
          _this.getBannerImg();
          if (res.data.inletType == '1') {
            _this.getOrgList();
          } else {
            //获取机构详情
            _this.data.getBigOrg();
          }
        }
      })
    } else {
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
              _this.getUserSign({
                idCard: res.data.idCard
              })
            }
          })
          wx.getStorage({
            key: 'orgData',
            success: function (res) {
              _this.setData({
                inletType: res.data.inletType,
                orgId: res.data.orgId
              })
              _this.getBannerImg();
              if (res.data.inletType == '1') {
                _this.getOrgList();
              } else {
                //获取机构详情
                _this.data.getBigOrg();
              }
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
    //选择返回二级机构id
    if (_this.data.smallOrgData) {
      wx.setStorageSync('smallOrgData', _this.data.smallOrgData)
    }
    _this.getCommunityList(1);
  },
  //获取机构
  getOrgList: function () {
    var _this = this;
    var params = {
      "params": {},
      "pageSize": 10,
      "pageNo": 1
    };
    if (_this.data.orgId) { params.params.orgId = _this.data.orgId };
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
            _this.setData({
              orgList: res.data
            })
            wx.setStorageSync('smallOrgData', {
              id: res.data[0].id,
              name: res.data[0].name
            })
          } else {
            //获取机构详情
            _this.data.getBigOrg();
          }
        } else {

          console.log('code : 0')
        }
      }
    })
  },

  //获取大机构详情
  getBigOrg: function () {
    app.request({
      url: '/org/familyDoctorOrg/select',
      header: {
        'content-type': 'application/json'
      },
      method: "Get",
      data: {
        id: _this.data.orgId
      },
      success: function (res) {
        if (res.code == 1) {
          wx.setStorageSync('smallOrgData', {
            id: res.obj.id,
            name: res.obj.name
          })
        } else {
          console.log('code : 0')

        }
      }
    })
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
          "orgId": _this.data.orgId,
          "position": "5"
        }
      },
      success: function (res) {
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
        if (res.code == 1) {
          _this.setData({ ifSign: true })
        } else {
          _this.setData({ ifSign: false })
        }
      }
    })
  }
})


