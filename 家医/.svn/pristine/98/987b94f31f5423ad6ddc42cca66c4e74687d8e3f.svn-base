//index.js
//获取应用实例
const app = getApp();
const util = require('../../../../utils/util.js');

Page({
  data: {
    mode: "scaleToFill",
    imgArr: [],
    indicatorDots: false,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    circular: true,
    scroll: {
      ifNull: true,
      loadText: '加载中...',
      pageNum: 1,
      nullText: ''
    },
    userInfo: {},
    navTab:['本人','家人1','家人2','家人3','家人4','家人5','家人6','家人7','家人7'],
    currentIndex:0,//本人家人索引
    phoneNumber:'',//手机号
    idCard:'',//身份证号
    ifOwnSign: '0',
    ownOrderId: ''
  },
  linkDoctors: function () {
    wx.navigateTo({
      url: '../doctor/index/index'
    })
  },
  linkBlockTap: function () {
    wx.showToast({
      title: '即将上线，敬请期待！',
      icon: 'none',
      duration: 1000
    })
  },
  //跳转立即签约
  /*linkSign: function() {
    if (this.data.userInfo.id) {
      wx.navigateTo({
        url: '../sign/selectcommunity/selectcommunity'
      })
    } else {
      wx.navigateTo({
        url: '../info/editinfo/editinfo'
      })
    }
  },*/
  onLoad: function () {
    var _this = this;

  },
  onShow: function () {
    var _this = this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        _this.setData({
          userInfo: res.data
        })
        _this.getMemberList()
      }
    })
  },
  linkAddMemberTap: function () {
    wx.navigateTo({
      url: '../../../info/pages/family/add/add',
    })
  },
  //tab切换显示本人，家人
  changeTab:function(e){
    var _this=this;
    var memberId = e.currentTarget.dataset.id;
    var memberList = _this.data.memberList;
    var currentMember;
    for (var i = 0; i < memberList.length; i++) {
      if (memberList[i].id == memberId) {
        memberList[i].checked = 'true';
        currentMember = memberList[i]
      } else {
        memberList[i].checked = '';
      }
    }
    console.log('-------------currentMember')
    console.log(currentMember)

    currentMember.idCardnum = util.secretData(currentMember.idCard, 'idCard');
    currentMember.phoneNumber = util.secretData(currentMember.mobile, 'phone');
    _this.setData({
      memberList: memberList,
      currentMember: currentMember

    });
  },
  //获取家庭成员列表
  getMemberList: function () {
    var _this = this;
    var params = {
      familyUserMember: {
        "userId": _this.data.userInfo.id,
        "status": "1"
      }
    };
    app.request({
      url: "/familyUserMember/selectListUsermember",
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      data: params,
      success: function (res) {
        console.log(res)
        if (res.code == 1) {
          if (res.data.length > 0) {
            var memberList = res.data;
            var currentMember, ifOwnSign, ownOrderId;
            for (var i = 0; i < memberList.length; i++) {
              if (memberList[i].dicName == "本人") {
                memberList[i].checked = 'true';
                currentMember = memberList[i];
                ifOwnSign = memberList[i].signStatus;
                ownOrderId = memberList[i].orderId;
              } else {
                memberList[i].checked = '';
              }
            }
            console.log('-------------currentMember')
            console.log(currentMember)
            currentMember.idCardnum = util.secretData(currentMember.idCard, 'idCard');
            currentMember.phoneNumber = util.secretData(currentMember.mobile, 'phone');
            _this.setData({
              memberList: memberList,
              currentMember: currentMember,
              ifOwnSign: ifOwnSign,
              ownOrderId: ownOrderId
            });

          }
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
  //判断用户是否签约
  getUserSign: function (params) {
    var _this = this;
    params.isCheckHealthRecord = '1';
    app.request({
      url: '/doctor/familyUserSignMember/isSignUserMember',
      header: {
        'content-type': 'application/json'
      },
      method: "Get",
      data: { params: params },
      success: function (res) {
        console.log('判断用户------------------')
        console.log(res)
        if (res.code == 1) {
          _this.setData({ ifSign: true })
        } else {
          _this.setData({ ifSign: false })
        }
      }
    })
  }
})
