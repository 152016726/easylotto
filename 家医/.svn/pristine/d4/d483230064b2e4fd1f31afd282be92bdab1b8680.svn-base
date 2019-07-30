const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toView: '',
    letterTag: ['A', 'B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
    cityList: [],
    hotCities: [],
    letterArr:[],
    selectCities: [],
    city: "",
    height: 0,
    deleteDisplay: 'none',
    deleteCityDisplay: 'none',
    focusDisplay: false,
    name: ''
  },
  /**
    *搜索栏
  */
  searchCityTap: function (e) {
    var _this = this;
    e.detail.value ? _this.setData({ deleteCityDisplay: 'block' }) : _this.setData({ deleteCityDisplay: 'none' })
    console.log(e.detail.value)
    console.log(_this.data.cityList)
    var cities = _this.data.cityList,
        selectCities = [];
    for (var i = 0; i < cities.length; i++) {
      if ((e.detail.value) && (cities[i].name.indexOf(e.detail.value) !== -1)) {
        selectCities.push(cities[i])
      }
    }
    console.log(selectCities)
    _this.setData({
      name: e.detail.value,
      selectCities: selectCities
    })
  },
  /**
    *字母导航
  */
  tabLinkTap: function (e) {
    console.log(e.currentTarget.dataset.id)
    this.setData({
      toView: e.currentTarget.dataset.id
    })
  },
  /**
    *搜索栏获取焦点
  */
  focusTap: function (e) {
    console.log(e)
    this.setData({
      focusDisplay: true
    })
  },
  /**
    *取消
  */
  cancelTap: function (e) {
    var _this = this;
    _this.setData({
      name: '',
      focusDisplay: false,
      deleteCityDisplay: 'none',
      selectCities: []
    })
  },
  /**
    *清除搜索栏内容
  */
  cancelCityTap: function (e) {
    var _this = this;
    _this.setData({
      name: '',
      deleteCityDisplay: 'none',
      selectCities: []
    })
  },
  /**
    *选择城市
  */
  selectedTap: function(e){
    console.log(e)
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面

    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      cityData: {
        cityId: e.currentTarget.dataset.id,
        cityName: e.currentTarget.dataset.name
      }
    })
    wx.navigateBack();
  },
  onLoad: function (options) {
    var _this = this;
    if (options.cityname !== '请选择城市') {
      _this.setData({
        city: options.cityname
      })
    }
    //获取屏幕高度
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          height: res.windowHeight
        })
      }
    })
    _this.getHotCities();
    _this.getList();

  },
  /**
    *获取城市列表
  */
  getList: function () {
    var _this = this;
    var cityList = _this.data.cityList;
    var params = {
      "city": { "levelType": 2 },
      "pageSize": 2147483647,
      "pageNum": 1
    };

    if (_this.data.name) { params.params.name = _this.data.name };
    console.log('~~~~~~~~~~~~~')
    console.log(params)
    app.request({
      url: '/address/selectCityList',
      header: {
        'content-type': 'application/json'
      },
      method: "Get",
      data: params,
      success: function (res) {
        console.log(res);
        if (res.code == 1) {
          if (res.data.length > 0) {
            var data = res.data;
            var letterArr = [],
              arr = [];
            var json = {};
            for (var i = 0; i < data.length; i++) {
              data[i].letter = data[i].pinyin.substring(0, 1);
              letterArr.push(data[i].pinyin.substring(0, 1))
            }
            var contactLetterArr = _this.data.letterArr.concat(letterArr);
            for (var i = 0; i < contactLetterArr.length; i++) {
              if (!json[contactLetterArr[i]]) {
                arr.push(contactLetterArr[i])
                json[contactLetterArr[i]] = 1;
              }
            }
            _this.setData({
              cityList: data,
              letterArr: arr
            })
          } else {
          }
        } else {
          console.log('code : 0')
        }
      }
    })
  },
  /**
    *获取热门城市
  */
  getHotCities: function () {
    var _this = this;
    var hotCities = _this.data.hotCities;
    var params = {
      "params": {},
      "pageSize": 100
    };
      app.request({
        url: '/address/selectHotCity',
        header: {
          'content-type': 'application/json'
        },
        method: "Get",
        //data: params,
        success: function (res) {
          console.log('-===================');
          console.log(res);
          if (res.code == 1) {
            if (res.data.length > 0) {
              var data = res.data;
              _this.setData({
                hotCities: res.data
              })
            } else {
            }
          } else {
            console.log('code : 0')
          }
        }
      })
  }
})