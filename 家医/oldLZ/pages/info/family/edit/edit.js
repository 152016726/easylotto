const app = getApp()
var util = require('../../../../utils/util.js');
Page({
  data: {
    member: {},
    relationArray: [],
    relationIndex: 0
  },
  onLoad: function (options) {
    var _this = this;
    _this.setData({
      options: options
    })
    _this.getmemberInfo();
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
  bindPickerChange: function (e) {
    var _this = this;
    var relationList = _this.data.relationList;
    var member = _this.data.member;
    console.log(e.detail.value)
    console.log(relationList)
    console.log(relationList[e.detail.value].id)
    member.relation = relationList[e.detail.value].id;
    _this.setData({
      relationIndex: e.detail.value,
      member: member
    })
    console.log(member)
  },
  getRelationList: function (relation) {//获取关系列表
    var _this = this;
    var relationArray = _this.data.relationArray;
    app.request({
      url: '/familyUserMember/selectListRelation',
      header: {
        'content-type': 'application/json'
      },
      data: {
        params: {
          'dicType': '691093441931198465',
          'idCard': _this.data.member.idCard
        },
        'pageSize': 20
      },
      method: "Get",
      success: function (res) {
        console.log(res);
        if (res.code == 1) {
          var myData = res.data;
          var relationList = [];
          for (var i = 0; i < myData.length; i++) {
            if (myData[i].dicName !== '本人') {
              console.log(myData[i].dicName)
              relationArray.push(myData[i].dicName)
              relationList.push(myData[i])
            }
            if (myData[i].id == relation) {
              console.log('2222222222')
              console.log(i)
              _this.setData({
                relationIndex: i
              })
            }
          }
          console.log(relationList)
          var member = _this.data.member;
          member.relation = relationList[_this.data.relationIndex].id;
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
  getmemberInfo: function () {//获取成员详细信息
    var _this = this;
    var member = {};
    app.request({
      url: '/familyUserMember/select',
      header: {
        'content-type': 'application/json'
      },
      data: { id: _this.data.options.id },
      method: 'GET',
      success: function (res) {
        console.log(res)
        var jsonObj = util.identityCodeValid(res.obj.idCard);
        var userInfo = res.obj;
        member.age = jsonObj.more.age;
        member.sex = jsonObj.more.sex == "女" ? 2 : 1;
        member.name = res.obj.name;
        member.relation = res.obj.relation;
        member.idCard = res.obj.idCard;
        member.id = res.obj.id;
        _this.setData({
          member: member
        })
        _this.getRelationList(member.relation);
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
    console.log(_this.data.currentId)
    app.request({
      url: '/familyUserMember/deleteSpare',
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
  },
  openSave: function () {
    var _this = this;
    var jsonObj = util.identityCodeValid(_this.data.member.idCard);
    _this.data.member.name ? _this.setData({ nameTip: '' }) : _this.setData({ nameTip: '姓名不能为空' });
     _this.setData({ idCardTip: jsonObj.tip });
    if (!_this.data.nameTip && !_this.data.idCardTip) {
      wx.getStorage({
        key: 'userInfo',
        success: function (res) {
          console.log(res.data)
          console.log({
            "idCard": _this.data.member.idCard,
            "sex": _this.data.member.sex,
            "age": _this.data.member.age,
            "name": _this.data.member.name,
            "id": _this.data.member.id,
            "relation": _this.data.member.relation
          })
          app.request({
            url: '/familyUserMember/editExc',
            header: {
              'content-type': 'application/json'
            },
            data: {
              familyUserMember: {
                "idCard": _this.data.member.idCard,
                "sex": _this.data.member.sex,
                "age": _this.data.member.age,
                "name": _this.data.member.name,
                "id": _this.data.member.id,
                "relation": _this.data.member.relation
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