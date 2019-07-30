const app = getApp()
Page({
	data: {
		scroll: {
			ifNull: false,
			loadText:'加载中...',
			pageNum:1,
			nullText:''
		},
    scrollboxList: [], //团队滚动栏
    detail: {},
    address: {},
    members: [],
    checkboxList: [],
    checkAll: '',
    ifPlay: false,
    signImage: '',
    ifSign: false,
    ifshow: true,
    readChecked:true
	},
  onLoad: function (options) {
    var _this = this;
    if (options.aid) {
      _this.setData({
        aId: options.aid
      })
    }
    _this.setData({
      radioVal: options.tid,
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
  //跳转团队详情
  linkTeamDetailTap: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '../../../../info/pages/doctors/teamdetail/teamdetail?id=' + e.currentTarget.dataset.id
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
		// _this.getDoctorList(1);
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
  //选择团队
  radioChange: function (e) {
    var _this = this;
    var radioVal = e.detail.value;
    _this.setData({
      radioVal: radioVal,
    })
    _this.getTeamDetail(_this.data.radioVal)
  },
  //选择地址
  selectAddressTap: function () {
    wx.redirectTo({
      url: '../selectaddress/selectaddress?typetag=familysign&tid=' + this.data.radioVal
    })
  },
  //儿童不可签约提示
  tipChildTap: function (e) {
    wx.showToast({
      title: '儿童暂不可签约',
      icon: 'none',
      duration: 2000
    })
  },
  //单选
	checkboxSelected: function (e) {
		console.log(e)
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
  //全选
	checkAllChange: function (e) {
		var _this = this;
	    var ifChoosed = e.detail.value.length;//1选中，0未选中
	    var checkboxList = _this.data.checkboxList;
	    var checkAll = _this.data.checkAll;
      var hasChild = false;
	    for (var i = 0; i < checkboxList.length;i++) {
        if ((checkboxList[i].idCard) && (checkboxList[i].signStatus == '0') && (ifChoosed == 1) && (checkboxList[i].dicName != '本人')) {
	    		checkboxList[i].checked = 'true';
	    	} else {
	    		checkboxList[i].checked = '';
	    	}
        if (!checkboxList[i].idCard) {
          hasChild = true;
        }
	    }
	    if (ifChoosed == 1) {
        checkAll = 'true'
        if (hasChild) {
          wx.showToast({
            title: '儿童暂不可签约',
            icon: 'none',
            duration: 2000
          })
        }
      } else {
        checkAll = ''
      }
	    _this.setData({
	    	checkboxList: checkboxList,
	    	checkAll: checkAll
	    })
  },
  confirmTap: function (e) {
    var _this = this;
    var checkboxList = _this.data.checkboxList;
    var valArr = [];

    _this.getDetail();

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
      url: '../../../../common/webviewlink/webviewlink?url=familysign&tid=' + _this.data.radioVal + '&aid=' + _this.data.aId
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
          "teamId": _this.data.radioVal,
          "sign": 1,
          "userId": _this.data.userInfo.id,
          "memberIds": valArr.join(';'),
          "addressId": _this.data.aId,
          "signature": 'http://' + _this.data.signurl
        }
        console.log('789999999999999999999-------------------------')
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
  linkAddMemberTap: function () {
    var aId = this.data.options.aid ? this.data.options.aid : '';
		wx.redirectTo({
      url: '../../../../info/pages/family/add/add?backUrl=../../../../familydoctor/pages/sign/familysign/familysign&tid=' + this.data.radioVal + '&aid=' + aId,
		})
	},
	//点击签约协议
	checkboxSign: function(e) {
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
          var item, checkboxList = [];
          for (var i = 0; i < dataList.length; i++) {
            item = {
              "name": dataList[i].name,
              "imgUrl": dataList[i].imgUrl,
              "value": dataList[i].id,
              "checked": '',
              "signStatus": dataList[i].signStatus,
              "sex": dataList[i].sex,
              "idCard": dataList[i].idCard,
              "dicName": dataList[i].dicName
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
  //获取团队列表
  getTeamList: function (current) {
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
  },
})
