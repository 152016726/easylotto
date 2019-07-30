const app = getApp()
const util = require('../../../utils/util.js');
const address = require('../../../utils/address.js');
Page({
  data: {
    userInfo: {},
    code: '',
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
    ifForm: false,
    sendText: '发送验证码',
    ifSelectAddress: true
	},
  //选择地址
  bindcolumnRegionchange: function (e) {
    var _this = this;
    address.selectAddress(_this, e)
  },
  //保存信息
	openSaveTap:function(){
    this.save();
  },
  save: function () {
    var _this = this;
    var userInfo = _this.data.userInfo;
    var provinceId = '';
    var cityId = '';
    var districtId = '';
    var phoneReg = /^[1][0-9]{10}$/;
    var jsonObj = util.identityCodeValid(_this.data.userInfo.idCard);
    provinceId = _this.data.province.id ? _this.data.province.id : '';
    cityId = _this.data.city.id ? _this.data.city.id : '';
    districtId = _this.data.area.id ? _this.data.area.id : '';
    var ifSelectAddress = _this.data.province.id && ((_this.data.city.id && _this.data.area.id) || (JSON.stringify(_this.data.city) == '{}' && JSON.stringify(_this.data.area) == '{}') || (_this.data.city.id && JSON.stringify(_this.data.area) == '{}'));
    _this.setData({
      ifSelectAddress: ifSelectAddress
    })
    _this.data.userInfo.address ? _this.setData({ addressTip: '' }) : _this.setData({ addressTip: '地址不能为空' });
    _this.data.userInfo.userName ? _this.setData({ nameTip: '' }) : _this.setData({ nameTip: '姓名不能为空' });
    _this.data.code ? _this.setData({ codeTip: '' }) : _this.setData({ codeTip: '验证码不能为空' });
    phoneReg.test(_this.data.userInfo.userMobile) ? _this.setData({ phoneTip: '' }) : _this.setData({ phoneTip: '请输入正确的手机号码' });
    jsonObj.pass ? _this.setData({ idCardTip: '' }) : _this.setData({ idCardTip: '请输入正确的身份证号' });
    //if (userInfo.id) {
    if (ifSelectAddress && !_this.data.addressTip && !_this.data.nameTip && !_this.data.phoneTip && !_this.data.idCardTip && ((!userInfo.id && !_this.data.codeTip) || userInfo.id)) {
      console.log(_this.data.userInfo)
      console.log({
        "sessionId": _this.data.sessionId,
        "idCard": _this.data.userInfo.idCard,
        "mobile": _this.data.userInfo.userMobile,
        "type": 2,
        "code": _this.data.code,
        "gender": _this.data.userInfo.agent,
        "age": _this.data.userInfo.age,
        "thirdNickname": _this.data.userInfo.userName,
        "headimgurl": _this.data.userInfo.userPic,
        "address": _this.data.userInfo.address,
        "provinceId": provinceId,
        "cityId": cityId,
        "districtId": districtId
      })
      app.request({
        url: '/user/insertMiniAppSaveInfo',
        header: {
          'content-type': 'application/json'
        },
        data: {
          params: {
            "sessionId": _this.data.sessionId,
            "idCard": _this.data.userInfo.idCard,
            "mobile": _this.data.userInfo.userMobile,
            "type": 2,
            "code": _this.data.code,
            "gender": _this.data.userInfo.agent,
            "age": _this.data.userInfo.age,
            "thirdNickname": _this.data.userInfo.userName,
            "headimgurl": _this.data.userInfo.userPic,
            "address": _this.data.userInfo.address,
            "provinceId": provinceId,
            "cityId": cityId,
            "districtId": districtId
          }
        },
        method: "GET",
        success: function (res) {
          console.log('---信息验证---')
          console.log(res)
          if (res.code == 1) {
            _this.setData({
              userInfo: res.obj
            })
            wx.setStorage({
              key: "userInfo",
              data: res.obj
            })
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
          } else if (res.code == 42007) {
            // 重新登录
            wx.login({
              success: res => {
                var code = res.code;
                var params = {};
                params.code = code;
                //params.orgId = '773745954466103297'
                // 获取用户信息
                wx.getUserInfo({
                  lang: 'zh_CN',
                  success: res => {
                    params.thirdNickname = res.userInfo.nickName;
                    params.province = res.userInfo.province;
                    params.city = res.userInfo.city;
                    params.country = res.userInfo.country;
                    params.headimgurl = res.userInfo.avatarUrl;
                    params.sex = res.userInfo.agent;
                    _this.login(params);
                  },
                  fail: res => {
                    _this.login(params);
                  }
                })
              }
            })
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
    //}
  },
  login: function (params) {
    var _this = this;
    app.request({
      url: '/user/miniAppLogin',
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      data: { params: params },
      success: function (res) {
        if (res.code == 1) {
          var userInfo = res.obj;
          wx.setStorage({
            key: "userInfo",
            data: userInfo
          })
          wx.setStorage({
            key: "sessionId",
            data: userInfo.sessionId
          })
          _this.save();
        } else {
          wx.showToast({
            title: res.message,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  //发送验证码
  sendCodeTap: function (e) {
    var _this = this;
    var mobile = _this.data.userInfo.userMobile;
    var phoneReg = /^[1][0-9]{10}$/;
    if (phoneReg.test(mobile)) {
      var wait = 60;
      function time(o) {
        if (wait == 0) {
          _this.setData({
            sendText: '发送验证码'
          })
          wait = 60;
        } else {
          _this.setData({
            sendText: '' + wait + 's后重发'
          })
          wait--;
          setTimeout(function () {
            time(o)
          },
            1000)
        }
      }
      time(e)
      _this.setData({
        phoneTip: ''
      })
      app.request({
        url: '/message/insert',
        header: {
          'content-type': 'application/json'
        },
        data: {
          message: {
            mobile: mobile
          }
        },
        method: "GET",
        success: function (res) {
          if (res.code == 1) {
            wx.showToast({
              title: '信息已发送',
              icon: 'none',
              duration: 2000
            })
          } else {

            wx.showToast({
              title: res.message,
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    } else {
      _this.setData({
        phoneTip: '请输入正确的手机号'
      })
    }
  },
  //验证码
  codeInputTap: function (e) {
    var _this = this;
    _this.setData({
      code: e.detail.value
    })
    if (e.detail.value) {
      _this.setData({
        codeTip: ''
      })
    } else {
      _this.setData({
        codeTip: '验证码不能为空'
      })
    }
  },
  //姓名
  nameInputTap: function (e) {
    var _this = this;
    var userInfo = _this.data.userInfo;
    userInfo.userName = e.detail.value;
    _this.setData({
      userInfo: userInfo
    })
    if (e.detail.value) {
      _this.setData({
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
    var phoneReg = /^[1][0-9]{10}$/;
    var mobile = e.detail.value;
    var userInfo = _this.data.userInfo;
    userInfo.userMobile = mobile;
    _this.setData({
      userInfo: userInfo
    })
    if (phoneReg.test(mobile)) {
      _this.setData({
        phoneTip: ''
      })
    } else {
      _this.setData({
        phoneTip: '请输入正确的手机号'
      })
    }
  },
  //详细地址
  addressTap: function (e) {
    var _this = this;
    var userInfo = _this.data.userInfo;
    userInfo.address = e.detail.value;
    _this.setData({
      userInfo: userInfo
    })
    if (e.detail.value) {
      _this.setData({
        addressTip: ''
      })
    } else {
      _this.setData({
        addressTip: '地址不能为空'
      })
    }
  },
  //身份证
  idCardCheckTap: function (e) {
    var _this = this;
    //e.detail.value,identityCodeValid
    console.log('----------------')
    console.log(e.detail.value)
    var jsonObj = util.identityCodeValid(e.detail.value);
    var userInfo = _this.data.userInfo;
    userInfo.age = jsonObj.more.age;
    userInfo.agent = jsonObj.more.sex == "女" ? 2 : 1;
    userInfo.idCard = e.detail.value;
    _this.setData({
      userInfo: userInfo
    })
    if (jsonObj.pass) {
      console.log('idCard pass')
      _this.setData({
        idCardTip: ''
      })
    } else {
      console.log('idCard nopass')
      _this.setData({
        idCardTip: jsonObj.tip
      })
    }
  },
  onLoad: function () {
    var _this = this;
    wx.getStorage({
      key: 'sessionId',
      success: function (res) {
        _this.setData({
          sessionId: res.data
        })
      }
    })
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {

        if (res.data.id) {
          //用户查询
          app.request({
            url: '/user/select',
            header: {
              'content-type': 'application/json'
            },
            data: {
              id: res.data.id
            },
            method: "GET",
            success: function (res) {
              if (res.code == 1) {
                var jsonObj = util.identityCodeValid(res.obj.idCard);
                var userInfo = res.obj;
                userInfo.age = jsonObj.more.age;
                userInfo.agent = jsonObj.more.sex == "女" ? 2 : 1;
                //wx.setStorage({
                  //key: "userInfo",
                  //data: userInfo
                //})
                address.getRegion(_this, res.obj);
                _this.setData({
                  userInfo: userInfo
                })

              } else {
                wx.showToast({
                  title: res.message,
                  icon: 'none',
                  duration: 2000
                })
              }
            }
          })
        } else {
          address.getRegion(_this, {});
          _this.setData({
            userInfo: res.data
          })
        }
      }
    })

  }
});