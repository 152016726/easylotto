const app = getApp()
var util = require('../../../../../utils/util.js');
Page({
  data: {
    member: {
      isDefault: '0'
    },
    relationArray: [],
    relationIndex: 0
  },
  onLoad: function (options) {
    var _this = this;
    console.log(options)
    var member = {};
    var jsonObj = util.identityCodeValid(options.patIdcard);
    console.log(jsonObj)
    member.name = options.patName;
    member.id = options.id;
    member.mobile = options.patMobile;
    member.idCard = options.patIdcard;
    member.age = jsonObj.more.age;
    member.sex = jsonObj.more.sex == "女" ? 2 : 1;
    member.birthDate = jsonObj.more.birthDate;
    member.isDefault = options.isDefault;
    member.patMedicareCard = options.patMedicareCard;
    member.displayIdCard = util.secretData(member.idCard, 'idCard');
    _this.setData({
      idCard: options.patIdcard,
      member: member
    })
  },
  //身份证
  idCardCheckTap: function (e) {
    var _this = this;
    var jsonObj = util.identityCodeValid(e.detail.value);
    var member = _this.data.member;
    member.idCard = e.detail.value;
    if (jsonObj.pass) {
      console.log(member)
      member.age = jsonObj.more.age;
      member.sex = jsonObj.more.sex == "女" ? 2 : 1;
      member.birthDate = jsonObj.more.birthDate;
      _this.setData({
        member: member,
        idCardTip: ''
      })
    } else {
      console.log(member)
      _this.setData({
        member: member,
        idCardTip: jsonObj.tip
      })
    }
  },
  //姓名
  nameInputTap: function (e) {
    var _this = this;
    var member = _this.data.member;
    member.name = e.detail.value;
    _this.setData({
      member: member
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
    console.log(member)
  },
  //就诊卡号
  patMedicareCardTap: function (e) {
    var _this = this;
    var member = _this.data.member;
    member.patMedicareCard = e.detail.value;
    _this.setData({
      member: member
    })
    console.log(member)
  },
  //手机号码
  phoneInputTap: function (e) {
    var _this = this;
    var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
    var mobile = e.detail.value;
    var member = _this.data.member;
    member.mobile = mobile;
    _this.setData({
      member: member,
      phoneTip: ''
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

  //默认地址
  isDefaultChange: function (e) {
    var _this = this;
    var isDefault = e.detail.value[0] ? e.detail.value[0] : '0';
    var member = _this.data.member;
    member.isDefault = isDefault;
    _this.setData({
      member: member
    })
  },
  openSave: function () {
    var _this = this;
    var jsonObj = util.identityCodeValid(_this.data.member.idCard);
    var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
    _this.data.member.name ? _this.setData({ nameTip: '' }) : _this.setData({ nameTip: '姓名不能为空' });
    phoneReg.test(_this.data.member.mobile) ? _this.setData({ phoneTip: '' }) : _this.setData({ phoneTip: '请输入正确的手机号码' });
    _this.setData({ idCardTip: jsonObj.tip });
    if (!_this.data.nameTip && !_this.data.idCardTip && !_this.data.phoneTip) {
      wx.getStorage({
        key: 'userInfo',
        success: function (res) {
          console.log(res.data)
          app.request({
            url: '/patient/update',
            header: {
              'content-type': 'application/json'
            },
            data: {
              patient: {
                "id": _this.data.member.id,
                "userId": res.data.id,
                "patName": _this.data.member.name,
                "patMobile": _this.data.member.mobile,
                "isDefault": _this.data.member.isDefault,
                //"patIdcard": _this.data.member.idCard,
                //"patSex": _this.data.member.sex,
                //"age": _this.data.member.age,
                "patMedicareCard":_this.data.member.patMedicareCard
              }
            },
            method: "GET",
            success: function (res) {
              console.log(res)
              if (res.code == 1) {
                console.log('-------保存成功-------------')
                console.log(res)
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
      })
    }
  }
})