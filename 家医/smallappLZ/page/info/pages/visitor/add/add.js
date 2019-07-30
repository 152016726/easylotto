const app = getApp()
var util =  require('../../../../../utils/util.js');
const address = require('../../../../../utils/address.js');
Page({
  data: {
    member: {
      isDefault:'0'
    },
    relationArray: [],
    relationIndex: 0,
    ifSelectAddress: true,
    provinces: [],
    cities: [],
    areas: [],
    addressData:[],
    addressIndex: [0, 0, 0],
    imgSrc:"",
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
  },
  onLoad: function () {
    let that = this;
    app.request({
      url: '/address/getCityTree',
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        if (res.code == 1){
          let data = res.data;
          let arrProvice = [];
          for (let i = 0; i < data.length;i++){
            arrProvice.push(data[i].Name)
          }
          console.log(data)
          that.setData({
            addressData:data,
            ["addressArray[" + 0 + "]"]: ['--省--', ...arrProvice]
          })
        }
      }
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
      member.birthDate = jsonObj.more.birthDate
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
      member: member
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
  bindRegionChange(e){
    console.log(e) // [2,0,0]  这里不是索引不是索引

  },
  uploadImg(){ //上传图片
    console.log("res");
    let that = this;
    wx.chooseImage({
      success: function(res) {
        console.log(res)
        that.setData({
          imgSrc: res.tempFiles[0].path
        })
      },
    })
  },
  //选择地址
  bindcolumnRegionchange: function (e) {
    let column = e.detail.column;
    let value = e.detail.value;
    // switch (column){
    //      case 0: //选择省份
    //         console.log(e);
    //         console.log(this.data.addressData);
    //         let cityArr = [],areaArr = [];
    //         let value = e.detail.value;
    //         for (let i = 0; i < this.data.addressData.length;i++){
    //           if (value - 1  == i){
    //              let cities = this.data.addressData[i].cities
    //                 for (let k = 0; k < cities.length;k++){
    //                   cityArr.push(cities[k].Name)
    //                 }
    //                 this.setData({ ["addressArray[" + value + "]"]: ['--市--', ...cityArr] })
    //                 areaArr = [...cities[i].areas]
    //           }
    //         }
    //                 console.log(areaArr)
    //       break;
    //       case 1://选择城市
    //         console.log(e);
    //       break;
    //       case 2://选择地区

    // }
    //console.log(this.data.provinces)
    
    // var _this = this;
    // address.selectAddress(_this, e)
  },
  //默认地址
  isDefaultChange: function (e) {
    var _this = this;
    var isDefault = e.detail.value[0] ? e.detail.value[0]:'0';
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
            url: '/patient/insertPatient',
            header: {
              'content-type': 'application/json'
            },
            data: {
              patient: {
                "userId": res.data.id,
                "patName": _this.data.member.name,
                "patMobile": _this.data.member.mobile,
                "isDefault": _this.data.member.isDefault,
                "patIdcard": _this.data.member.idCard,
                "patSex": _this.data.member.sex,
                "patBirthday": _this.data.member.birthDate,
                "age": _this.data.member.age,
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