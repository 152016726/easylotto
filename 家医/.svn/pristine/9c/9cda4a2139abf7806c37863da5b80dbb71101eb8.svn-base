const app = getApp()

Page({
  data: {
    detail: {},
    address: {},
    members: [],
    checkboxList:[],
    checkAll: '',
    ifPlay: false,
    signImage: '',
    ifSign: false,
    ifshow: true
  },

  selectAddressTap: function () {
    wx.redirectTo({
      url: '../selectaddress/selectaddress?tid=' + this.data.teamId
    })
  },
  checkboxChange: function (e) {
    var _this = this;
    var valArr = e.detail.value;
    var checkboxList = _this.data.checkboxList;
    var noSignNum = 0;
    var checkAll = _this.data.checkAll;
      for (var j = 0; j < checkboxList.length; j++) {
        checkboxList[j].checked = '';
        if (checkboxList[j].signStatus == '0') {
          noSignNum++;
        }
        for (var i = 0; i < valArr.length; i++) {
          if (valArr[i] == checkboxList[j].value) {
            checkboxList[j].checked = 'true';
          }
        }
    }
    if (valArr.length == 0) {
      for (var j = 0; j < checkboxList.length; j++) {
          checkboxList[j].checked = '';
      }
    }
    noSignNum == valArr.length ? checkAll = 'true' : checkAll ='';
    console.log({
      'valArr': valArr,
      'noSignNum': noSignNum,
      'checkboxList': checkboxList,
      'checkAll': checkAll
    })
    _this.setData({
      checkboxList: checkboxList,
      checkAll: checkAll
    })
  },
  checkAllChange: function (e) {
    var _this = this;
    var ifChoosed = e.detail.value.length;//1选中，0未选中
    var checkboxList = _this.data.checkboxList;
    var checkAll = _this.data.checkAll;
    for (var i = 0; i < checkboxList.length;i++) {
      if ((checkboxList[i].signStatus == '0') && (ifChoosed == 1)) {
        checkboxList[i].checked = 'true';
      } else {
        checkboxList[i].checked = '';
      }
    }
    ifChoosed == 1 ? checkAll = 'true' : checkAll = '';
    _this.setData({
      checkboxList: checkboxList,
      checkAll: checkAll
    })
  },
  confirmTap: function (e) {
    var _this = this;
    var checkboxList = _this.data.checkboxList;
    console.log(checkboxList)
    var valArr = [];
    for (var i = 0; i < checkboxList.length; i++) {
      if (checkboxList[i].checked == 'true') {
        valArr.push(checkboxList[i].value);
      }
    }
    if (valArr.length > 0) {
      wx.setStorage({
        key: "checkboxArr",
        data: valArr,
        success: function (res) {

          _this.setData({
            ifPlay: true
          })
        }
      })
    } else {
      wx.showToast({
        title: '请选择成员',
        icon: 'none',
        duration: 2000
      })
    }
  },
  cancelDialogTap: function () {
    var _this = this;
    _this.setData({
      ifPlay: false
    })
  },
  //确定签约
  confirmDialogTap: function () {
    var _this = this;
    wx.redirectTo({
      url: '../../../../common/webviewlink/webviewlink?url=sign&tid=' + _this.data.teamId + '&aid=' + _this.data.aId
    })
  },
  //签约
  signConfirm: function (params) {
    var _this = this;
    var checkboxList = _this.data.checkboxList;
    var valArr = [];
    wx.getStorage({
      key: 'checkboxArr',
      success: function (res) {
        valArr = res.data;
        console.log(res)
        var params = {
          "teamId": _this.data.teamId,
          "sign": 1,
          "userId": _this.data.userInfo.id,
          "memberIds": valArr.join(';'),
          "addressId": _this.data.aId,
          "signature": 'http://' + _this.data.signurl
        }
        console.log(params)
        app.request({
          url: '/order/family/insert',
          header: {
            'content-type': 'application/json'
          },
          method: "Get",
          data: {
            params: params
          },
          success: function (res) {
            console.log(res);
            wx.hideLoading()
            if (res.code == 1) {
              wx.removeStorage({
                key: 'checkboxArr',
                success: function (res) {
                  wx.redirectTo({
                    url: '../success/success'
                  })
                }
              })
            } else {
              wx.showToast({
                title: res.message,
                icon: 'none',
                duration: 2000
              })
              console.log('code : 0')
            }
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    console.log('~~~~~~~~~~')
    console.log(options)
    if (options.aid) {
      _this.setData({
        aId: options.aid
      })
    }
    _this.setData({
      teamId: options.tid,
      options: options
    })
    _this.getDetail();
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        _this.setData({
          userInfo: res.data
        })
        if (res.data.id) {
          _this.getAddressList(_this.data.userInfo.id, options.aid);
          _this.getFamilyList(_this.data.userInfo.id);
        } else {
          wx.redirectTo({
            url: '../../../../info/pages/editinfo/editinfo',
          })
        }
      }
    })

    if (options.signurl) {
      _this.setData({
        signurl: options.signurl
      })
      wx.showLoading({
        title: '签约中...',
      })
      _this.signConfirm()
    }

  },
  linkAddMemberTap: function () {
    var aId = this.data.options.aid ? this.data.options.aid:''
    wx.redirectTo({
      url: '../../../../info/pages/family/add/add?backUrl=../../../../familydoctor/pages/sign/confirm/confirm&tid=' + this.data.options.tid + '&aid=' + aId,
    })
  },
  getAddressList: function (useId,addressId) {//获取地址列表
    var _this = this;
    app.request({
      url: '/user/address/selectList',
      header: {
        'content-type': 'application/json'
      },
      method: "Get",
      data: {
        params: {
          "userId": useId,
          "status": "1"
        }
      },
      success: function (res) {
        console.log(res);
        if (res.code == 1) {
          var addressList = res.data;
          var address = {};
          for (var i = 0; i < addressList.length;i++){
            if (!addressId){
              if (addressList[i].isDefault == '1'){
                address = addressList[i]
              }
            } else {
              if (addressList[i].id == addressId) {
                address = addressList[i]
              }
            }
          }
          _this.setData({
            address: address,
            aId: address.id
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
  getFamilyList: function (useId) {//获取家庭成员列表
    var _this = this;
    app.request({
      url: '/familyUserMember/selectListUsermember',
      header: {
        'content-type': 'application/json'
      },
      method: "Get",
      data: {
        familyUserMember: {
          "userId": useId,
          "status": "1"
        }
      },
      success: function (res) {
        console.log(res);
        if (res.code == 1) {
          var dataList = res.data;
          var item,checkboxList=[];
          for (var i = 0; i < dataList.length;i++) {
            item = {
              "name": dataList[i].name,
              "imgUrl": dataList[i].imgUrl,
              "value": dataList[i].id,
              "checked": '',
              "signStatus": dataList[i].signStatus,
              "sex": dataList[i].sex
            }
            checkboxList.push(item)
          }
          console.log(checkboxList)
          _this.setData({
            members: res.data,
            checkboxList: checkboxList
          })

          wx.getStorage({
            key: 'checkboxArr',
            success: function (res) {
              var checkboxArr = res.data;
              for (var i = 0; i < checkboxList.length; i++) {
                for (var j = 0; j < checkboxArr.length; j++) {
                  if (checkboxArr[j] == checkboxList[i].value) {
                    checkboxList[i].checked == 'true'
                  }
                }
              }
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
  },
  getDetail: function () {//获取签约团队详情
    var _this = this;
    var params = {
      "id": _this.data.teamId
    };

    app.request({
      url: '/familyTeam/selectDetailWithBaseSerivce',
      header: {
        'content-type': 'application/json'
      },
      method: "Get",
      data: params,
      success: function (res) {
        console.log('---');
        console.log(res);
        if (res.code == 1) {
          _this.setData({
            detail: res.obj
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
})