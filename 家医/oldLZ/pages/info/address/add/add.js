const app = getApp()
var address = require('../../../../utils/address.js');
Page({
  data: {
    addressDetail: {},
    region: [],
    provinces: [],
    cities: [],
    areas: [],
    province: {
      name: '--省--',
      id: ''
    },
    city: {
      name: '--市--',
      id: ''
    },
    area: {
      name: '--区--',
      id: ''
    },
    addressArray: [['--省--'], ['--市--'], ['--区--']],
    addressIndex: [0, 0, 0],
    ifSelectAddress: true
  },
  onLoad: function () {
    var _this = this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        console.log(res)
        _this.setData({
          userInfo: res.data
        })
        if (res.data.id) {
          //地址查询
          address.getRegion(_this, { "provinceId": '', "cityId": '', "districtId": '' });
        } else {
          wx.redirectTo({
            url: '/pages/info/editinfo/editinfo',
          })
        }
      }
    })
  },
  //姓名
  nameInputTap: function (e) {
    var _this = this;
    var addressDetail = _this.data.addressDetail;
    if (e.detail.value) {
      addressDetail.name = e.detail.value;
      _this.setData({
        addressDetail: addressDetail,
        nameTip: ''
      })
    } else {
      _this.setData({
        nameTip: '姓名不能为空'
      })
    }
  },
  //手机号
  phoneInputTap: function (e) {
    var _this = this;
    var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
    var mobile = e.detail.value;
    if (phoneReg.test(mobile)) {
      var addressDetail = _this.data.addressDetail;
      addressDetail.mobile = mobile;
      _this.setData({
        addressDetail: addressDetail,
        phoneTip: ''
      })
    } else {
      _this.setData({
        phoneTip: '请输入正确的手机号'
      })
    }
    console.log('----------------------------')
    console.log(_this.data.userInfo)
  },
  //详细地址
  addressTap: function (e) {
    var _this = this;
    var addressDetail = _this.data.addressDetail;
    if (e.detail.value) {
      addressDetail.address = e.detail.value;
      _this.setData({
        addressDetail: addressDetail,
        addressTip: ''
      })
    } else {
      _this.setData({
        addressTip: '地址不能为空'
      })
    }
  },

  //选择地址
  bindcolumnRegionchange: function (e) {
    var _this = this;
    address.selectAddress(_this, e)
  },

  openSave: function () {
    var _this = this;
    var provinceId = '';
    var cityId = '';
    var districtId = '';
    provinceId = _this.data.province.id ? _this.data.province.id : '';
    cityId = _this.data.city.id ? _this.data.city.id : '';
    districtId = _this.data.area.id ? _this.data.area.id : '';
    var ifSelectAddress = _this.data.province.id && ((_this.data.city.id && _this.data.area.id) || (JSON.stringify(_this.data.city) == '{}' && JSON.stringify(_this.data.area) == '{}') || (_this.data.city.id && JSON.stringify(_this.data.area) == '{}'));
    _this.setData({
      ifSelectAddress: ifSelectAddress
    })
    if (ifSelectAddress && !_this.data.addressTip && !_this.data.nameTip && !_this.data.phoneTip) {
      console.log({
        "userId": _this.data.userInfo.id,
        "isDefault": "0",
        "mobile": _this.data.addressDetail.mobile,
        "name": _this.data.addressDetail.name,
        "address": _this.data.addressDetail.address,
        "proviceId": provinceId,
        "cityId": cityId,
        "districtId": districtId
      })
      app.request({
        url: '/user/address/insert',
        header: {
          'content-type': 'application/json'
        },
        method: "get",
        data: {
          params: {
            "userId": _this.data.userInfo.id,
            "isDefault": "0",
            "mobile": _this.data.addressDetail.mobile,
            "name": _this.data.addressDetail.name,
            "address": _this.data.addressDetail.address,
            "proviceId": provinceId,
            "cityId": cityId,
            "districtId": districtId
          }
        },
        success: function (res) {
          console.log(res);
          if (res.code == 1) {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000,
              success: function (res) {
                wx.navigateBack({
                  delta: 1
                })
              }
            });
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
  }

});