const app = getApp()
var bmap = require('../../../../../utils/bmap-wx.min.js'); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    communityList:[],
    city: "",
    scroll: {
      ifNull: true,
      loadText: '加载中...',
      pageNum: 1,
      nullText: ''
    },
    height: 0,
    deleteDisplay: 'none',
    focusDisplay: false,
    name: ''
  },
  linkTeamTap: function (e) {
    wx.navigateTo({
      url: '../selectteam/selectteam?id=' + e.currentTarget.dataset.id
    })
  },
  /**
    *搜索栏
  */
  searchTap: function (e) {
    var _this = this;
    e.detail.value ? _this.setData({ deleteDisplay: 'block' }) : _this.setData({ deleteDisplay: 'none' })
    _this.setData({
      name: e.detail.value,
      communityList: []
    })
    if (!e.detail.value) {

      _this.setData({
        scroll: {
          ifNull: true,
          loadText: '加载中...',
          pageNum: 1,
          nullText: ''
        },
        name: '',
      })
    } else {
      _this.getList(1);
    }
  },
  /**
    *搜索栏获取焦点
  */
  focusTap: function (e) {
    this.setData({
      communityList: [],
      scroll: {
        ifNull: true,
        loadText: '加载中...',
        pageNum: 1,
        nullText: ''
      },
      focusDisplay: true
    })
  },
  /**
    *取消搜索
  */
  cancelTap: function (e) {
    var _this = this;
    _this.setData({
      communityList: [],
      scroll: {
        ifNull: true,
        loadText: '加载中...',
        pageNum: 1,
        nullText: ''
      },
      name: '',
      focusDisplay: false
    })
    _this.getList(1);
  },
  locationTap: function (e) {
    wx.navigateTo({
      url: '../selectcity/selectcity?cityname=' + this.data.city
    })
  },
  /**
    *清除搜索栏内容
  */
  deleteSearchContentTap: function (e) {
    if (this.data.name) {
      this.setData({
        name: '',
        deleteDisplay: 'none',
        communityList: [],
        scroll: {
          ifNull: true,
          loadText: '加载中...',
          pageNum: 1,
          nullText: ''
        }
      })
    }
  },
  onLoad: function (options) {
    var _this = this;
    _this.setData({
      options: options
    })
    console.log(options)
    if (_this.data.options.cityId) {
      _this.setData({
        cityData: {
          cityId: _this.data.options.cityId,
          cityName: _this.data.options.cityName,
          city: _this.data.options.cityName
        }
      })
    }
    //获取屏幕高度
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          height: res.windowHeight-45
        })
      }
    })

  },
  //获取当前城市
  initLocation: function (callback) {
    var _this = this;
    var BMap = new bmap.BMapWX({
      ak: 'SrybdalKgr8oj0SbB0mbacrwnNsc5rBg'
    });
    var fail = function (data) {
      console.log(data)
      wx.showToast({
        title: '获取定位失败',
        icon: 'none',
        duration: 2000,
        mask: true
      })
      _this.setData({
        city: '请选择城市'
      })
      _this.getList(1);
    };
    var success = function (data) {
      console.log(data)
      //使用wxMarkerData获取数据  
      var wxMarkerData = data.wxMarkerData;
      app.request({
        url: '/address/geocoder',
        header: {
          'content-type': 'application/json'
        },
        data: {
          lat: wxMarkerData[0].latitude,
          lng: wxMarkerData[0].longitude
        },
        method: "GET",
        success: function (res) {
          console.log(res)
          if (res.code == 1) {
            _this.setData({
              cityData: {
                cityName: res.obj.cityName,
                cityId: res.obj.cityId
              },
              city: res.obj.cityName
            })
            _this.getList(1);
          } else {
            fail();
          }
        }
      })
    }
    // 发起regeocoding检索请求   
    BMap.regeocoding({
      fail: fail,
      success: success
    });  
  },
  onShow: function () {
    var _this = this;
    _this.setData({
      communityList: []
    })
    _this.getList(1);
    /*console.log('-----')
    console.log(_this.data.cityData)
    if (_this.data.cityData) {
      _this.setData({
        city: _this.data.cityData.cityName
      })
      _this.getList(1);
    } else {
      _this.initLocation();
    }*/
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
      communityList: [],
      scroll: {
        ifNull: true,
        loadText: '加载中...',
        pageNum: 1,
        nullText: ''
      }
    })
    _this.getList(1);
  },
  //上拉加载
  lower: function (e) {
    var _this = this;
    _this.getList(_this.data.scroll.pageNum);
  },
  /**
    *获取社区
  */
  getList: function (current) {
    var _this = this;
    var communityList = _this.data.communityList;
    var params = {
      "params": {},
      "pageSize": 10
    };

    if (_this.data.name) { params.params.name = _this.data.name };
    //if (_this.data.cityData) { params.params.cityId = _this.data.cityData.cityId };
    params.pageNo = current;
    if (params.pageNo) {

      wx.getStorage({
        key: 'orgId',
        success: function (res) {
          _this.setData({
            orgId: res.data
          })
          if (_this.data.orgId) { params.params.orgId = _this.data.orgId };
          app.request({
            url: '/org/familyDoctorOrg/selectList',
            header: {
              'content-type': 'application/json'
            },
            method: "Get",
            data: params,
            success: function (res) {
              console.log(res)
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
      })
    }
  }
})