const app = getApp()
const util = require('../../../../../utils/util.js');
const address = require('../../../../../utils/address.js');
Page({
  data: {
    member: {},
    relationArray: [],
    relationIndex: 0,
    sexArray: ['男', '女'],
    sexIndex: 0,
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
    sendText: '发送验证码',
    ifSelectAddress: true,
    ifChild: false,
    currentDate: util.formatTime(new Date()).split(' ')[0],
    addressTip: '',
    phoneTip: '',
    codeTip: '',
    idCardTip: '',
    childcodeTip: ''
  },
  onLoad: function (options) {
    var _this = this;
    var ifChild;
    //_this.getRelationList();
    console.log(options)
    options.idCard ? ifChild = false : ifChild = true;

    console.log(ifChild)
    var newDate = new Date();
    _this.setData({
      options: options,
      ifChild: ifChild,
      currentDate: util.formatTime(newDate).split(' ')[0],
      startDate: (newDate.getFullYear() - 6) + '-' + ((newDate.getMonth() + 1) > 9 ? (newDate.getMonth() + 1) : ('0' + (newDate.getMonth() + 1))) + '-' + (newDate.getDate() > 9 ? newDate.getDate() : ('0' + newDate.getDate()))
    })
    _this.getmemberInfo();
  },
  //日期选择
  bindBirthChange: function (e) {
    var birthDate = e.detail.value;
    var member = this.data.member;
    //年龄
    var strBirthday = birthDate.replace(/-/g, '/')
    console.log(strBirthday)
    //时间字符串里，必须是“/”
    var birthRexDate = new Date(strBirthday);
    var nowDateTime = new Date();
    member.age = nowDateTime.getFullYear() - birthRexDate.getFullYear() + '岁';
    if (member.age == '0岁') {
      member.age = nowDateTime.getMonth() - birthRexDate.getMonth() + '月龄';
    }
    if (member.age == '0月龄') {
      member.age = '新生儿';
    }
    this.setData({
      birthDate: e.detail.value,
      member: member
    })

  },
  //选择地址
  bindcolumnRegionchange: function (e) {
    var _this = this;
    address.selectAddress(_this, e)
  },
  //详细地址
  addressTap: function (e) {
    var _this = this;
    var member = _this.data.member;
    member.address = e.detail.value;
    _this.setData({
      member: member
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
  //手机号
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
  //医保卡号
  patMedicareCardTap: function (e) {
    var _this = this;
    var member = _this.data.member;
    member.patMedicareCard = e.detail.value;
    _this.setData({
      member: member
    })
    console.log(member)
  },
  bindPickerChange: function (e) {
    var _this = this;
    var relationList = _this.data.relationList;
    var member = _this.data.member;
    console.log(e.detail.value)
    console.log(relationList[e.detail.value].id)
    member.relation = relationList[e.detail.value].id;
    _this.setData({
      relationIndex: e.detail.value,
      member: member
    })
    console.log(member)
  },
  getRelationList: function (idCard) {//获取关系列表
    var _this = this;
    var relationArray = [];
    var params = {};
    idCard ? params = { 'dicType': '691093441931198465', 'idCard': idCard } : params = { 'dicType': '691093441931198465' };
    if (_this.data.ifChild) {
      params.sortNum = "1";
      if (_this.data.member.sex) {
        params.dicParam = _this.data.member.sex
      }
    }
    console.log('关系列表！~~~~~~~~~~~~~~~~~')
    console.log(params)
    app.request({
      url: '/familyUserMember/selectListRelation',
      header: {
        'content-type': 'application/json'
      },
      data: {
        params: params,
        pageSize: 20
      },
      method: "Get",
      success: function (res) {
        console.log('关系=============');
        console.log(res);
        if (res.code == 1) {
          var myData = res.data;
          var relationList = [];
          for (var i = 0; i < myData.length; i++) {
            if (myData[i].dicName !== '本人') {
              relationArray.push(myData[i].dicName)
              relationList.push(myData[i])
            }
          }
          var member = _this.data.member;
          console.log('0909938487```````````````')
          console.log(member.relation)
          if (member.relation) {
            var relationIndex = 0;
            for (var i = 0; i < myData.length; i++) {
              if (myData[i].id == member.relation) {
                relationIndex = i;
              }
            }
            console.log(relationIndex)
            _this.setData({
              relationIndex: relationIndex
            })
          } else {
            member.relation = relationList[_this.data.relationIndex].id;
          }
          _this.setData({
            relationList: relationList,
            relationArray: relationArray
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
  },
  /*
  *儿童
  */
  //儿童编码
  childcodeTap: function (e) {
    var _this = this;
    var member = _this.data.member;
    member.childcode = e.detail.value;
    _this.setData({
      member: member
    })
    if (e.detail.value) {
      _this.setData({
        childcodeTip: ''
      })
    } else {
      _this.setData({
        childcodeTip: '儿童编码不能为空'
      })
    }
  },
  bindSexChange: function (e) {
    var _this = this;
    var member = _this.data.member;
    member.sex = e.detail.value == 0 ? member.sex = 1 : member.sex = 2;
    _this.setData({
      sexIndex: e.detail.value,
      member: member
    })
    _this.getRelationList();
    console.log(member)
  },
  //选择头像
  chooseImageTap: function () {
    console.log(app.domain)
    var _this = this;
    var imgArr = _this.data.choosedImg;
    var imgIdArr = _this.data.imgId;
    console.log(imgArr)
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      //sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        console.log(res)
        var tempFilePaths = res.tempFilePaths;
        var tempFiles = res.tempFiles;
        wx.showLoading({
          title: '上传中',
        })
        wx.uploadFile({
          url: app.domain + '/file/uploadImage', //上传
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'fileUpload': JSON.stringify({
              'userId': _this.data.userInfo.id
            })
          },
          success: function (res) {
            console.log('------uploadImage-------')
            console.log(res)
            wx.hideLoading();

          },
          fail: function (res) {
            wx.hideLoading();
            wx.showToast({
              title: '上传失败，请稍后再试！',
              icon: 'none',
              duration: 2000
            })
          }
        })
      }
    })
  },
  //保存
  openSave: function () {
    console.log('保存编辑信息')
    if (this.data.ifChild) {
      this.childInsert();
    } else {
      this.adultInsert();
    }
  },
  //成人编辑
  adultInsert: function () {
    var _this = this;
    var userInfo = _this.data.userInfo;
    var provinceId = '';
    var cityId = '';
    var districtId = '';
    provinceId = _this.data.province.id ? _this.data.province.id : '';
    cityId = _this.data.city.id ? _this.data.city.id : '';
    districtId = _this.data.area.id ? _this.data.area.id : '';
    //var jsonObj = util.identityCodeValid(_this.data.member.idCard);
    _this.data.member.name ? _this.setData({ nameTip: '' }) : _this.setData({ nameTip: '姓名不能为空' });
    //_this.data.member.patMedicareCard ? _this.setData({ patMedicareCardTip: '' }) : _this.setData({ patMedicareCardTip: '医保卡号不能为空' });
    //_this.setData({ idCardTip: jsonObj.tip });
    //_this.data.code ? _this.setData({ codeTip: '' }) : _this.setData({ codeTip: '验证码不能为空' });
    var ifSelectAddress = _this.data.province.id && ((_this.data.city.id && _this.data.area.id) || (JSON.stringify(_this.data.city) == '{}' && JSON.stringify(_this.data.area) == '{}') || (_this.data.city.id && JSON.stringify(_this.data.area) == '{}'));
    _this.setData({
      ifSelectAddress: ifSelectAddress
    })
    _this.data.member.address ? _this.setData({ addressTip: '' }) : _this.setData({ addressTip: '地址不能为空' });
    //_this.data.member.mobile ? _this.setData({ phoneTip: '' }) : _this.setData({ phoneTip: '请输入正确的手机号码' });
    if (ifSelectAddress && !_this.data.addressTip && !_this.data.nameTip/* && !_this.data.patMedicareCardTip*/) {
      var params = {
        //"idCard": _this.data.member.idCard,
        //"sex": _this.data.member.sex,
        //"age": _this.data.member.age,
        "name": _this.data.member.name,
        //"cardType": "1",
        //"userId": res.data.id,
        "id": _this.data.member.id,
        "patMedicareCard": _this.data.member.patMedicareCard,
        "status": "1",
        //"cardType": "1",
        //"verCode": _this.data.code,
        "relation": _this.data.member.relation,
        //"imgUrl": _this.data.userInfo.userPic,
        "address": _this.data.member.address,
        "province": provinceId,
        "city": cityId,
        "district": districtId
      }
      console.log(params)

      app.request({
        url: '/familyUserMember/editExc',
        header: {
          'content-type': 'application/json'
        },
        data: {
          familyUserMember: params
        },
        method: "GET",
        success: function (res) {
          console.log(res)
          if (res.code == 1) {
            console.log('-------编辑成功-------------')
            console.log(res)
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000,
              success: function (res) {
                console.log('!~~~~')
                console.log(_this.data.options.backUrl + '?teamId=' + _this.data.options.tid + '&aId=' + _this.data.options.aid)
                if (_this.data.options.backUrl) {
                  wx.redirectTo({
                    url: _this.data.options.backUrl + '?tid=' + _this.data.options.tid + '&aid=' + _this.data.options.aid,
                  })
                } else {
                  wx.navigateBack({
                    delta: 1
                  })
                }
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
  },
  //儿童编辑
  childInsert: function () {
    var _this = this;
    var userInfo = _this.data.userInfo;
    var provinceId = '';
    var cityId = '';
    var districtId = '';
    provinceId = _this.data.province.id ? _this.data.province.id : '';
    cityId = _this.data.city.id ? _this.data.city.id : '';
    districtId = _this.data.area.id ? _this.data.area.id : '';
    _this.data.member.name ? _this.setData({ nameTip: '' }) : _this.setData({ nameTip: '姓名不能为空' });
    //_this.data.member.patMedicareCard ? _this.setData({ patMedicareCardTip: '' }) : _this.setData({ patMedicareCardTip: '医保卡号不能为空' });
    _this.data.member.childcode ? _this.setData({ childcodeTip: '' }) : _this.setData({ childcodeTip: '儿童编码不能为空' });
    var ifSelectAddress = _this.data.province.id && ((_this.data.city.id && _this.data.area.id) || (JSON.stringify(_this.data.city) == '{}' && JSON.stringify(_this.data.area) == '{}') || (_this.data.city.id && JSON.stringify(_this.data.area) == '{}'));
    _this.setData({
      ifSelectAddress: ifSelectAddress
    })
    _this.data.member.address ? _this.setData({ addressTip: '' }) : _this.setData({ addressTip: '地址不能为空' });
    if (ifSelectAddress && !_this.data.addressTip && !_this.data.nameTip && !_this.data.idCardTip && !_this.data.childcodeTip) {
      wx.getStorage({
        key: 'userInfo',
        success: function (res) {
          console.log(res.data)
          var params = {
            //"age": _this.data.member.age,
            "name": _this.data.member.name,
            "province": provinceId,
            "city": cityId,
            "district": districtId,
            "birthday": _this.data.birthDate,
            "code": _this.data.member.childcode,
            "address": _this.data.member.address,
            "sex": _this.data.member.sex,
            "id": _this.data.member.id,
            "relation": _this.data.member.relation
          }
          console.log(params)

          app.request({
            url: '/familyChildren/update',
            header: {
              'content-type': 'application/json'
            },
            data: {
              params: params
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
                    console.log('!~~~~')
                    console.log(_this.data.options.backUrl + '?teamId=' + _this.data.options.tid + '&aId=' + _this.data.options.aid)
                    if (_this.data.options.backUrl) {
                      wx.redirectTo({
                        url: _this.data.options.backUrl + '?tid=' + _this.data.options.tid + '&aid=' + _this.data.options.aid,
                      })
                    } else {
                      wx.navigateBack({
                        delta: 1
                      })
                    }
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
  },
  //获取成员详细信息
  getmemberInfo: function () {
    var _this = this;
    var member = {};
    if (_this.data.ifChild) {
      var url = '/familyChildren/select';
    } else {
      var url = '/familyUserMember/select';
    }
    app.request({
      url: url,
      header: {
        'content-type': 'application/json'
      },
      data: { id: _this.data.options.id },
      method: 'GET',
      success: function (res) {
        console.log('8888888888****************8888888')
        console.log(res)
        //if (res.obj.idCard) {
          var jsonObj = util.identityCodeValid(res.obj.idCard);
          //var userInfo = res.obj;
          member.imgUrl = res.obj.imgUrl;
          member.name = res.obj.name;
          member.relation = res.obj.relation;
          member.address = res.obj.address;
          member.id = res.obj.id;
          member.mobile = res.obj.mobile;
          member.provinceId = res.obj.province;
          member.cityId = res.obj.city;
          member.areaId = res.obj.district;
          if (!_this.data.ifChild) {//成人
            member.idCard = res.obj.idCard;
            member.birthDate = jsonObj.more.birthDate;
            member.age = jsonObj.more.age;
            member.patMedicareCard = res.obj.patMedicareCard;
            member.sex = jsonObj.more.sex == "女" ? 2 : 1;
            member.displayIdCard = util.secretData(member.idCard, 'idCard');
            member.displayMobile = util.secretData(member.mobile, 'phone');
            _this.setData({
              idCard: res.obj.idCard,
              member: member
            })
          } else {//儿童
            var sexIndex = 0;
            member.childcode = res.obj.code;
            member.sex = res.obj.sex;
            member.sex == 1 ? sexIndex = 0 : sexIndex = 1;
            console.log('4444444444444444')
            console.log(sexIndex)
            res.obj.birthday?member.birthDate = res.obj.birthday:member.birthDate = jsonObj.more.birthDate;
            var nowDateTime = new Date();
            var birthRexDate = new Date(member.birthDate);
            member.age = nowDateTime.getFullYear() - birthRexDate.getFullYear() + '岁';
            if (member.age == '0岁') {
              member.age = nowDateTime.getMonth() - birthRexDate.getMonth() + '月龄';
            }
            if (member.age == '0月龄') {
              member.age = '新生儿';
            }
            _this.setData({
              member: member,
              birthDate: member.birthDate,
              ifeditCode: res.obj.code,
              sexIndex: sexIndex
            })
          }
          _this.getRelationList(res.obj.idCard);
          wx.getStorage({
            key: 'userInfo',
            success: function (res) {
              _this.setData({
                userInfo: res.data
              })
              address.getRegion(_this, {
                provinceId: _this.data.member.provinceId,
                cityId: _this.data.member.cityId,
                districtId: _this.data.member.areaId
              });
            }
          })
        //} else {
          
        //}
        _this.setData({
          member: member,
          idCard: res.obj.idCard
        })
      }
    })
  },
  //删除弹窗
  openConfirm: function (e) {
    this.setData({
      showModal: true,
      currentId: e.currentTarget.dataset.id
    })
  },
  // 弹出框蒙层截断touchmove事件
  preventTouchMove: function () {
  },
  // 对话框取消按钮点击事件
  onCancel: function () {
    this.hideModal();
  },
  // 隐藏模态对话框
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  // 对话框确认按钮点击事件
  onConfirm: function () {
    this.hideModal();
    var _this = this;
    console.log(_this.data.ifChild)
    var myurl;
    _this.data.ifChild ? myurl = '/familyChildren/delete' : myurl = '/familyUserMember/deleteSpare'
    app.request({
      url: myurl,
      header: {
        'content-type': 'application/json'
      },
      method: "Get",
      data: {
        "id": _this.data.currentId
      },
      success: function (res) {
        console.log(res);
        if (res.code == 1) {
          wx.showToast({
            title: '已删除',
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