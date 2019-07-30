const app = getApp()
const util = require('../../../../../utils/util.js');
Page({
    data: {
        readChecked: false,  //签约协议未读状态
        submitbtnDisabled: false, //签约协议按钮不可点击
        diseaseDate: "",//预约框选择时间
        today: util.formatTime(new Date()).split(' ')[0],
        themeVal: "",//症状输入值
        symptomVal: "",//症状输入值
        checkboxList: [],//签约人
        userInfo: "",
        recrTeamId:"",//被咨询的团队id
        recrOrgId:"",//被咨询的机构id
        recrFdocId:"",//被咨询的医生id
    },
    onLoad: function () {
        var _this = this;
        _this.setData({
            diseaseDate: util.formatTime(new Date()).split(' ')[0]
        })
        wx.getStorage({
            key: 'userInfo',//获取用户信息
            success: function (res) {
                _this.setData({
                    userInfo: res.data//data设置获取用户信息
                });
                if (res.data.id) {//如果有用户
                    console.log("用户id")
                    console.log(res.data.id)
                    _this.getDoctorList();//获取医生团队
                }else{
                    /*wx.navigateTo({
                        url: '../../editinfo/editinfo'//注册用户页面
                    })*/
                }
            }
        })

    },
    //咨询主题
    themeInputTap: function (e) {
        var _this = this;
        var themeVal = e.detail.value;
        ;
        _this.setData({
            themeVal: themeVal
        });
        if (e.detail.value) {
            _this.setData({
                themeTip: ''
            })
        } else {
            _this.setData({
                themeTip: '咨询主题不能为空'
            })
        }
    },
    //选择发病时间
    binDiseaseDateChange: function (e) {
        var _this = this;
        _this.setData({
            diseaseDate: e.detail.value
        })
    },
    //主要症状
    symptomInputTap: function (e) {
        var _this = this;
        var symptomVal = e.detail.value;
        _this.setData({
            symptomVal: symptomVal
        })
        if (e.detail.value) {
            _this.setData({
                symptomTip: ''
            })
        } else {
            _this.setData({
                symptomTip: '主要症状不能为空'
            })
        }
    },
    //就诊经历
    experienceInputTap: function (e) {
        var _this = this;
        var experienceVal = e.detail.value;
        _this.setData({
            experienceVal: experienceVal
        })
    },
    //点击签约协议
    checkboxConsult: function (e) {
        //console.log(e.detail.value[0])
        var _this = this;
        var readCheckedVal = e.detail.value[0];
        var submitbtnDisabled = _this.data.submitbtnDisabled;
        if (!readCheckedVal) {
            submitbtnDisabled = true;
        } else {
            submitbtnDisabled = false;
        }
        _this.setData({
            submitbtnDisabled: submitbtnDisabled,
        })
    },
    //点击提交按钮
    bindSubmit: function () {
        var _this = this;
        console.log(123)
        _this.data.themeVal ? _this.setData({themeTip: ''}) : _this.setData({themeTip: '咨询主题不能为空'});
        _this.data.symptomVal ? _this.setData({symptomTip: ''}) : _this.setData({symptomTip: '主要症状不能为空'});
        if (!_this.data.themeTip && !_this.data.symptomTip) {
           /* console.log("传入参数值");
            console.log({
                "therapyRecode": _this.data.experienceVal,//"string,就诊经历",
                "disorder": _this.data.symptomVal,//"string,症状",
                "diseaseTime": _this.data.diseaseDate,//"string,发病时间",
                "recrTeamId":  _this.data.recrTeamId,//"long,被咨询团队",
                "recrFdocId":  _this.data.recrFdocId,//"long,被咨询医生",
                "topic":  _this.data.themeVal,//"string,主题",
                "userId": "773418517108051968", //"string,用户ID",_this.data.userInfo.id
                "recrOrgId": _this.data.recrOrgId//"long,机构ID"
            });*/
          if (_this.data.recrTeamId || _this.data.recrFdocId) {
            wx.getStorage({
              key: 'smallOrgData',
              success: function (res) {
                console.log(1111111111111)
                console.log(res)
                var smallOrgData = res.data;
                if (smallOrgData.id) {
                  var params = {
                    "therapyRecode": _this.data.experienceVal,//"string,就诊经历",
                    "disorder": _this.data.symptomVal,//"string,症状",
                    "diseaseTime": _this.data.diseaseDate,//"string,发病时间",
                    "recrTeamId": _this.data.recrTeamId,//"long,被咨询团队",
                    "recrFdocId": _this.data.recrFdocId,//"long,被咨询医生",
                    "topic": _this.data.themeVal,//"string,主题",
                    "userId": _this.data.userInfo.id,//data中获取用户id
                    //"userId": "773418517108051968", //"string,用户ID",_this.data.userInfo.id
                    "recrOrgId": smallOrgData.id//"long,机构ID"
                  };
                  console.log(params)
                  app.request({
                    //url: "http://10.1.125.81:8080/api/doctor/familyUserSignMember/selectSignTeamMembersWithUser",
                    url: "/familyShortComment/insert",
                    header: {
                      'content-type': 'application/json'
                    },
                    method: "GET",
                    data: {
                      params: params
                    },
                    success: function (res) {
                      console.log(res);
                      console.log("接口数据----")
                      if (res.code == 1) {
                        wx.showToast({
                          title: '提交成功',
                          icon: 'success',
                          duration: 2000,
                          success: function (res) {
                            wx.redirectTo({
                              url: '../list/list'//咨询列表页
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
              }
            })
          } else {
            wx.showModal({
              title: '提示',
              content: '患者只能在其签约家庭医生的所在机构发起免费健康咨询。也可以先解除旧的签约，然后再回到本处签约新的家庭医生，即可免费咨询健康问题。',
              showCancel: false
            })
          }

        }
    },
    //选择医生团队信息
    checkboxSelected: function (e) {
        var _this = this;
        var recrTeamId,recrOrgId,recrFdocId;
        var thidId = e.currentTarget.dataset.id;
        var checkboxList = _this.data.checkboxList;
        for (var j = 0; j < checkboxList.length; j++) {
            if (thidId == checkboxList[j].id) {
                recrTeamId=checkboxList[j].teamId;
                recrOrgId=checkboxList[j].orgId;
                if (checkboxList[j].active == '') {
                    checkboxList[j].active = 'active';
                    recrFdocId=checkboxList[j].docId
                } else {
                    checkboxList[j].active = '';
                    recrFdocId="";
                }
            } else {
                checkboxList[j].active = '';
            }
        }
        _this.setData({
            checkboxList: checkboxList,
            recrTeamId: recrTeamId,
            recrOrgId:recrOrgId,
            recrFdocId:recrFdocId
        })
    },
    //获取咨询医生成员列表
    getDoctorList: function () {
        var _this = this;
        var params = {
            params: {
                "userId":_this.data.userInfo.id ,//data中获取用户id
                //"userId": "773418517108051968",//data中获取用户id
            },
            "pageSize": 2147483647
        };
        app.request({
            url: "/doctor/familyUserSignMember/selectSignTeamMembersWithUser",
            header: {
                'content-type': 'application/json'
            },
            method: "GET",
            data: params,
            success: function (res) {
              console.log(res)
                if (res.code == 1) {
                    if (res.data.length > 0) {
                        var checkboxList = res.data;
                        _this.setData({
                            checkboxList: checkboxList,
                            recrTeamId: res.data[0].teamId,
                            recrOrgId:res.data[0].orgId,
                            recrFdocId:""
                        });
                        for (var j = 0; j < checkboxList.length; j++) {
                            checkboxList[j].active = '';
                        }
                        console.log(checkboxList);
                        _this.setData({
                            checkboxList: checkboxList
                        })
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
    }
})
