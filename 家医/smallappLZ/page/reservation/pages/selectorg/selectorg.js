const app = getApp()
var bmap = require('../../../../utils/bmap-wx.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    communityList: [],
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
  choosedTap: function (e) {
    console.log(e)
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    //wx.navigateTo({
    //url: '../selectteam/selectteam?id=' + e.currentTarget.dataset.id
    //})
    prevPage.setData({
      smallOrgData: {
        id: e.currentTarget.dataset.id,
        name: e.currentTarget.dataset.name
      }
    })
    wx.navigateBack();
  },
  //距离最近
  showNearest: function (e) {
    var _this = this;
    _this.setData({
      isNearest: !_this.data.isNearest
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
    //获取屏幕高度
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          height: res.windowHeight - 45
        })
      }
    })
    _this.getList(1);

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
    console.log('加载中')
    var _this = this;
    _this.getList(_this.data.scroll.pageNum);
  },
  /**
    *获取医院
  */
  getList: function (current) {
    var _this = this;
    var communityList = _this.data.communityList;
    var params = {
      "hospital": {},
      "pageSize": 10
    };

    if (_this.data.name) { params.hospital.hospName = _this.data.name };
    //if (_this.data.cityData) { params.params.cityId = _this.data.cityData.cityId };
    params.pageNo = current;
    if (params.pageNo) {
      app.request({
        url: '/hospital/selectList',
        header: {
          'content-type': 'application/json'
        },
        method: "Get",
        data: params,
        success: function (res) {
          console.log('000000000000000000000000')
          console.log(res)
          if (res.code == 1) {
            if (res.data.length > 0) {
              var dataList = res.data;
              if (_this.data.name) {
                for (var i = 0; i < dataList.length; i++) {
                  var str = dataList[i].hospName;
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