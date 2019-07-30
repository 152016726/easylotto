
const app = getApp();
const util = require('../../../../../utils/util.js');
Page({
	data: {
		scroll: {
			ifNull: false,
			loadText:'加载中...',
			pageNum:1,
			nullText:''
		},
		scrollboxList:[], //团队滚动栏
		phoneNumber:15689789562, //地址栏电话号码
    	idCard:45786545698789654, //地址栏身份证
    	showEdit: true, //地址栏显示编辑按钮
    	textareaDisabled:true, //地址栏多行输入框不可编辑
    	textVal:"肇庆市鼎湖区 莲花镇2组莲花小学对面肇庆市鼎湖区花镇2组莲花小学对面花", //地址栏输入框内容
		readChecked:true,
  },
  //选择地址
  selectAddressTap: function () {
    wx.redirectTo({
      url: '../selectaddress/selectaddress?typetag=ownsign&tid=' + this.data.radioVal
    })
  },
  //团队详情
  linkTeamDetailTap: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '../../../../info/pages/doctors/teamdetail/teamdetail?id=' + e.currentTarget.dataset.id
    })
  },
  confirmTap: function (e) {
    var _this = this;
    _this.getDetail();
    _this.setData({
      ifPlay: true
    })
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
      url: '../../../../common/webviewlink/webviewlink?url=ownsign&tid=' + _this.data.radioVal + '&aid=' + _this.data.aId
    })
  },
  //签约
  signConfirm: function (params) {
    var _this = this;
    var params = {
      "teamId": _this.data.radioVal,
      "sign": 1,
      "userId": _this.data.userInfo.id,
      "memberIds": wx.getStorageSync('memberId'),
      "addressId": _this.data.aId,
      "signature": 'http://' + _this.data.signurl
    }
    console.log('098785675456343-----------------------==============')
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
          wx.redirectTo({
            url: '../success/success'
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
  },
	onLoad: function (options) {
		console.log(this.data.focus)
    var _this = this;
    if (options.aid) {
      _this.setData({
        aId: options.aid,
        radioVal: options.tid
      })
    }
    _this.setData({
      options: options
    })
    wx.getStorage({
      key: 'smallOrgData',
      success: function (res) {
        console.log(1111111111111)
        console.log(res)
        if (res.data) {
          _this.setData({
            orgId: res.data.id
          })
          _this.getTeamList(1);
        }
      }
    })
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        var userInfo = res.data;
        _this.setData({
          userInfo: userInfo
        })
        if (userInfo.id) {
          _this.getAddressList(userInfo.id, options.aid);
          _this.getFamilyList(userInfo.id)
          if (options.signurl) {
            _this.setData({
              signurl: options.signurl
            })
            wx.showLoading({
              title: '签约中...',
            })
            _this.signConfirm()
          }

        } else {
          wx.redirectTo({
            url: '../../../../info/pages/editinfo/editinfo',
          })
        }
      }
    })

	},
	//下拉刷新
	upper: function(e){
		var _this = this;
		wx.showToast({
			title: '数据刷新中',
			icon:'loading',
			duration:1000,
			mask:true
		});
    _this.setData({
      scroll: {
        ifNull: false,
        loadText: '加载中...',
        pageNum: 1,
        nullText: ''
      },
      scrollboxList: []
		});
    _this.getTeamList(1);
	},
	//上拉加载
	lower:function(e){
    var _this = this;
    wx.showToast({
      title: '数据加载中',
      icon: 'loading',
      duration: 1000,
      mask: true
    });
	  _this.getTeamList(_this.data.scroll.pageNum);
  },
  getTeamList: function (current) {//获取团队
    var _this = this;
    var scrollboxList = _this.data.scrollboxList;
    var params = {
      "familyTeam": {
        "orgId": _this.data.orgId
      },
      "pageSize": 10
    };

    if (_this.data.name) { params.name = _this.data.name };
    params.pageNo = current;
    console.log('~~~~~~~~~~~~~')
    console.log(params)
    if (params.pageNo) {
      app.request({
        url: '/familyTeam/selectList',
        header: {
          'content-type': 'application/json'
        },
        method: "Get",
        data: params,
        success: function (res) {
          console.log(res);
          if (res.code == 1) {
            if (res.data.length > 0) {
              var list = scrollboxList.concat(res.data);
              for (var j = 0; j < list.length; j++) {
                if (_this.data.radioVal) {
                  if (list[j].id == _this.data.radioVal) {
                    list[j].checked = 'true';
                  } else {
                    list[j].checked = '';
                  }
                } else {
                  if (j == 0) {
                    list[j].checked = 'true';
                    wx.setStorageSync('radioVal', list[j].id);
                    _this.setData({
                      radioVal: list[j].id
                    })
                  } else {
                    list[j].checked = '';
                  }
                }
              }
              _this.setData({
                scrollboxList: list,
                scroll: {
                  pageNum: current + 1,
                  ifNull: false
                },
              })
              _this.getTeamDetail(_this.data.radioVal)
            } else {
              if (res.pageNo == 1) {
                _this.setData({
                  scroll: {
                    ifNull: true,
                    nullText: '暂时没有数据！'
                  }
                })
              } else {
                _this.setData({
                  scroll: {
                    ifNull: false,
                    loadText: '加载完毕'
                  }
                })
              }
            }
            wx.hideToast();
          } else {
            console.log('code : 0')
            wx.hideToast();
          }
        }
      })
    }
  },
  //选择团队
	radioChange: function(e) {
		var _this=this;
		var radioVal=e.detail.value;
		_this.setData({
			radioVal:radioVal,
    })
    _this.getTeamDetail(_this.data.radioVal)
	},
  //获取地址列表
  getAddressList: function (useId, addressId) {
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
          for (var i = 0; i < addressList.length; i++) {
            if (!addressId) {
              if (addressList[i].isDefault == '1') {
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
	//点击签约协议
	checkboxChange: function(e) {
		console.log(e.detail.value[0])
    	var _this=this;
    	var readCheckedVal=e.detail.value[0];
    	var signbtnDisabled = _this.data.signbtnDisabled;
    	if(!readCheckedVal){
    		signbtnDisabled=true;
    	}else{
    		signbtnDisabled=false;
    	}
		_this.setData({
			signbtnDisabled:signbtnDisabled,
		})
  },
  linkAgreeTap: function () {
    wx.navigateTo({
      url: '../agree/agree'
    })
  },
  //获取家庭成员列表
  getFamilyList: function (useId) {
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
          for (var i = 0; i < dataList.length; i++) {
            if (dataList[i].dicName == '本人') {

              _this.setData({
                phoneNumber: util.secretData(dataList[i].mobile, 'phone'),
                idCard: util.secretData(dataList[i].idCard, 'idCard')
              })
              wx.setStorageSync('memberId', dataList[i].id);
              _this.setData({
                memberId: dataList[i].id
              })
            }
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
  //获取签约团队详情
  getDetail: function () {
    var _this = this;
    var params = {
      "id": _this.data.radioVal
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
  },
  //获取团队信息
  getTeamDetail: function (teamId) {
    var _this = this;
    app.request({
      url: '/familyTeam/selectDetailWithBaseSerivce',
      header: {
        'content-type': 'application/json'
      },
      data: { id: teamId },
      method: "GET",
      success: function (res) {
        if (res.code == 1) {
          _this.setData({
            teamDetail: res.obj
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
