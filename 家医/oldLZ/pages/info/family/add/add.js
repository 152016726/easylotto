const app = getApp()
var util = require('../../../../utils/util.js');
Page({
	data: {
		member: {},
    relationArray:[],
    relationIndex: 0
	},
  onLoad: function (options) {
    var _this = this;
    _this.getRelationList();
    console.log(options)
    _this.setData({
      options: options
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
      _this.setData({
        member: member,
        idCardTip: ''
      })
      _this.getRelationList(e.detail.value);
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
    app.request({
      url: '/familyUserMember/selectListRelation',
      header: {
        'content-type': 'application/json'
      },
      data: {
        params: params,
        'pageSize': 20
      },
      method: "Get",
      success: function (res) {
        console.log(res);
        if (res.code == 1) {
          var myData = res.data;
          var relationList = [];
          for (var i = 0; i < myData.length;i++){
            if (myData[i].dicName !== '本人') {
              relationArray.push(myData[i].dicName)
              relationList.push(myData[i])
            }
          }
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
            "cardType": "1",
            "userId": res.data.id,
            "status": "1",
            "relation": _this.data.member.relation
          })

          app.request({
            url: '/familyUserMember/insertSpare',
            header: {
              'content-type': 'application/json'
            },
            data: {
              familyUserMember: {
                "idCard": _this.data.member.idCard,
                "sex": _this.data.member.sex,
                "age": _this.data.member.age,
                "name": _this.data.member.name,
                "cardType": "1",
                "userId": res.data.id,
                "status": "1",
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
	}
})