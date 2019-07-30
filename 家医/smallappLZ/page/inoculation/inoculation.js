// page/inoculation/inoculation.js
const app = getApp();
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    memberList: [],//儿童列表
    childinit: false,
    today: util.formatTime(new Date()).split(' ')[0],
    /*切换宝宝框
    //showBabyInfoDialog:false,//隐藏切换宝宝框，
    babyInfoDate:"",//切换宝宝框选择时间
    babyInfoArray: [],//选择关系
    babyInfoPickerIndex: 0,//选择关系索引*/
    /*一类疫苗预约*/
    hideAppointmentDialog: true,//隐藏预约框，
    appointDetailDialog: true,//隐藏预约详情框，
    apptDate: util.formatTime(new Date()).split(' ')[0],//预约--选择时间
    apptOrg: '',
    freeManualPartArray: [],//预约--接种部位
    freeManualPartPickerIndex: 0,
    apptVacIds: [],
    /*二类疫苗新增*/
    showManualDialog:false,//显示录入框，
    manualAgeArray: [],//接种月龄
    manualAgePickerIndex: 0,
    manualDoseArray: [],//接种剂次
    manualDosePickerIndex: 0,
    manualPartArray: [],//接种部位
    manualPartPickerIndex: 0,
    manualDate: util.formatTime(new Date()).split(' ')[0],//接种时间
    /*一类疫苗完善资料*/
    showManualEditDialog: false,//显示录入框，
    manualEditDate: util.formatTime(new Date()).split(' ')[0],//接种日期
    manualEditOrg: '',//接种机构
    manualEditPartArray: [],//接种部位
    manualEditPartPickerIndex: 0,
    //查看一类疫苗录入信息--已打勾
    showRecordedDialog:false,
    //切换一类二类疫苗
    switchChecked:true,
    //下次接种
    nextVacDetail:{},
    week:"",
    //接种卡列表
    cardVacList:[],
    vacType:"1",//"Integer, 疫苗类型 1:一类（免费） 2:二类（自费） 3:其他 必填"
    scroll: {
      ifNull: true,
      loadText: '加载中...',
      pageNum: 1,
      nullText: ''
    },
    height: 0
  },

  //上拉加载
  lower: function (e) {
    var _this = this;
    _this.getCarList('/familyChildrenVaccinationPlan/selectRecords', _this.data.scroll.pageNum);
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this;

    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          height: (res.windowHeight / 2)
        })
      }
    })

    _this.getsysDictList("VACCINATION_PARTS");//获取接种部位
    _this.getsysDictList("VACCINATION_MONTH");//获取接种月龄
    _this.getsysDictList("VACCINATION_DOSE_NUM");//获取接种剂次


    wx.getStorage({
      key: 'smallOrgData',
      success: function (res) {
        _this.setData({
          apptOrg: res.data.name,
          manualEditOrg: res.data.name,
          manualOrg: res.data.name
        })
      }
    })
    
    
  },
  onShow: function () {
    var _this = this;

    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        //res.data.id = '745710101555404800';
        _this.setData({
          userInfo: res.data
        })
        _this.getChildList()//获取儿童列表
      }
    })
  },

  //切换疫苗switch按钮事件
  switchChange: function (e){
    var _this=this;
    console.log('switch1 发生 change 事件，携带值为', e.detail.value);
    _this.setData({
      switchChecked:e.detail.value,
      cardVacList: [],
      scroll: {
        ifNull: true,
        loadText: '加载中...',
        pageNum: 1,
        nullText: ''
      }
    })
    if(e.detail.value){
      /*_this.setData({
        vacType:1//"Integer, 疫苗类型 1:一类（免费） 2:二类（自费） 3:其他 必填"
      });*/
      _this.getCarList('/familyChildrenVaccinationPlan/selectRecords',1)//获取一类（免费）接种卡
    }else{
      /*_this.setData({
        vacType:2//"Integer, 疫苗类型 1:一类（免费） 2:二类（自费） 3:其他 必填"
      });*/
      _this.getCarList('/familyChildrenVaccinationFree/selectRecords',1)//获取二类（自费）接种卡
    }
  },

  /**
   * 切换宝宝
   */
  radioChange: function(e) {
    var _this = this;
    var memberList = _this.data.memberList,
      currentMember = {};
    for (var i = 0; i < memberList.length; i++) {
      if (memberList[i].id == e.detail.value) {
        console.log('radio发生change事件，携带value值为：', e.detail.value)
        memberList[i].checked = true;
        currentMember = memberList[i];
      } else {
        memberList[i].checked = false;
      }
    }
    _this.setData({
      memberList: memberList,
      currentMember: currentMember,
      cardVacList: [],
      scroll: {
        ifNull: true,
        loadText: '加载中...',
        pageNum: 1,
        nullText: ''
      }
    })

    if (currentMember.code) {
      _this.getNextVacDetail();//获取下次接种
      if (_this.data.switchChecked) {
        console.log('免费接种卡')
        _this.getCarList('/familyChildrenVaccinationPlan/selectRecords', 1)//获取免费接种卡
      } else {
        console.log('二类接种卡')
        _this.getCarList('/familyChildrenVaccinationFree/selectRecords', 1)//获取二类（自费）接种卡
      }
    }
  },
//选择宝宝信息时间
  /*bindBabyInfoDateChange: function(e) {
    var _this=this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    _this.setData({
      babyInfoDate: e.detail.value
    })
  },*/
  //隐藏切换宝宝框
  /*closeBabyInfoDialog:function(){
    var _this=this;
    _this.setData({
      showBabyInfoDialog:false
    })
  },
  //切换宝宝提交
  babyInfoSubmit:function(){
    var _this=this;
    _this.setData({
      showBabyInfoDialog:false
    })
    wx.showToast({
      title: '提交成功',
      icon:'success',
      duration:2000,
      mask:true
    });
  },*/

  /**
   * 接种预约框相关事件
   */
  //显示预约框
  showAppointmentDialog:function(){
    var _this = this;
    //已预约-初始化
    if (_this.data.nextVacDetail.status == 1) {
      _this.getPlanDetail()
    } else {
      var arrs = [];
      var nextVacDetail = _this.data.nextVacDetail,
          vacs = nextVacDetail.vacs;
      for (var j = 0; j < vacs.length; j++) {
        vacs[j].check = true;
        arrs.push(vacs[j].vacId);
      }
      nextVacDetail.vacs = vacs;
      _this.setData({
        apptDate: util.formatTime(new Date()).split(' ')[0],
        apptMobile: '',
        apptDescription: '',
        apptOrg: wx.getStorageSync('smallOrgData').name,
        apptVacIds: arrs,
        apptVacIdsTip: '',
        apptOrgTip: '',
        apptMobileTip: '',
        nextVacDetail: nextVacDetail
      })
    }
    _this.setData({
      hideAppointmentDialog:false
    })
  },
  //隐藏预约框
  closeAppointmentDialog:function(){
    var _this=this;
    _this.setData({
      hideAppointmentDialog:true
    })
  },
  //显示预约详情框
  showAppointDetailDialog: function (e) {
    var _this = this;
    var id = e.currentTarget.dataset.id;
    console.log(id)
    _this.getPlanDetail(id)
    _this.setData({
      appointDetailDialog: false
    })
  },
  //隐藏预约详情框
  closeAppointDetailDialog: function () {
    var _this = this;
    _this.setData({
      appointDetailDialog: true
    })
  },
  //选择预约的疫苗
  checkPlanChange: function (e) {
    var _this = this;
    console.log('疫苗ID')
    console.log(e)
    _this.setData({
      apptVacIds: e.detail.value
    })
  },
  //接种预约选择时间
  bindApptDateChange: function(e) {
    var _this=this;
    console.log('预约时间：', e.detail.value)
    _this.setData({
      apptDate: e.detail.value
    })
  },
  //接种预约填写机构
  apptOrgPickerTap:function(e){
    var _this = this;
    console.log(e.detail.value);
    _this.setData({
      apptOrg: e.detail.value
    })
  },
  //接种预约填写家长电话
  apptVacPhoneTap: function (e) {
    var _this = this;
    console.log(e.detail.value);
    _this.setData({
      apptMobile: e.detail.value
    })
  },
  //接种预约填写备注
  apptDescriptionTap: function (e) {
    var _this = this;
    console.log(e.detail.value);
    _this.setData({
      apptDescription: e.detail.value
    })
  },
  //接种预约选择接种部位
  freeManualEditPartPickerChange: function (e) {
    var _this = this;
    var freeManualPartData = _this.data.freeManualPartData;
    var freeCurrentPart = freeManualPartData[e.detail.value].value;
    _this.setData({
      freeCurrentPart: freeCurrentPart,
      freeManualPartPickerIndex: e.detail.value
    })
    console.log(freeCurrentPart);
  },
  //预约提交
  appointmentSubmit: function () {
    var _this = this;
    var ifSubmit = false;
    var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
    console.log(_this.data.apptVacIds)
    if (phoneReg.test(_this.data.apptMobile) && _this.data.apptOrg && _this.data.apptVacIds.length>0) {
      ifSubmit = true;
    } else {
      if (!_this.data.apptVacIds.length > 0) {
        _this.setData({
          apptVacIdsTip: '请选择要预约的疫苗'
        })
      } else {
        _this.setData({
          apptVacIdsTip: ''
        })
      }
      if (!phoneReg.test(_this.data.apptMobile)) {
        _this.setData({
          apptMobileTip: '请输入正确的手机号'
        })
      } else {
        _this.setData({
          apptMobileTip: ''
        })
      }
      if (!_this.data.apptOrg) {
        _this.setData({
          apptOrgTip: '不能为空'
        })
      } else {
        _this.setData({
          apptOrgTip: ''
        })
      }
    }
    if (ifSubmit) {
      var params = {
        params: {
          "userMemberId": _this.data.currentMember.id,
          "userId": _this.data.userInfo.id,
          "vacIds": _this.data.apptVacIds.join(','),
          "vacPlanId": _this.data.nextVacDetail.id,
          "vacTime": _this.data.apptDate,
          "mobile": _this.data.apptMobile,
          "description": _this.data.apptDescription,
          "vacOrg": _this.data.apptOrg
        }
      };
      console.log(params)
      app.request({
        //app.request({
        //  url:"/familyChildrenVaccinationPlan/selectRecords",
        url: "/familyChildrenVaccinationOrder/insert",
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        data: params,
        success: function (res) {
          console.log("接种预约");
          console.log(res);
          if (res.code == 1) {
            _this.getNextVacDetail();//获取下次接种

            _this.setData({
              cardVacList: [],
              scroll: {
                ifNull: true,
                loadText: '加载中...',
                pageNum: 1,
                nullText: ''
              }
            })
            _this.getCarList('/familyChildrenVaccinationPlan/selectRecords', 1)//获取免费接种卡

            wx.showToast({
              title: '预约成功',
              icon: 'success',
              duration: 2000,
              mask: true
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

      _this.setData({
        hideAppointmentDialog: true
      })
    }
  },
  //预约修改
  appointmentEdit: function () {
    var _this = this;
    var ifSubmit = false;
    var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
    console.log(_this.data.apptVacIds)
    if (phoneReg.test(_this.data.apptMobile) && _this.data.apptOrg && _this.data.apptVacIds.length > 0) {
      ifSubmit = true;
    } else {
      if (!_this.data.apptVacIds.length > 0) {
        _this.setData({
          apptVacIdsTip: '请选择要预约的疫苗'
        })
      } else {
        _this.setData({
          apptVacIdsTip: ''
        })
      }
      if (!phoneReg.test(_this.data.apptMobile)) {
        _this.setData({
          apptMobileTip: '请输入正确的手机号'
        })
      } else {
        _this.setData({
          apptMobileTip: ''
        })
      }
      if (!_this.data.apptOrg) {
        _this.setData({
          apptOrgTip: '不能为空'
        })
      } else {
        _this.setData({
          apptOrgTip: ''
        })
      }
    }
    if (ifSubmit) {
      var params = {
        params: {
          "vacIds": _this.data.apptVacIds.join(','),
          "id": _this.data.nextVacDetail.orderId,
          "vacTime": _this.data.apptDate,
          "mobile": _this.data.apptMobile,
          "description": _this.data.apptDescription,
          "vacOrg": _this.data.apptOrg
        }
      };
      console.log(params)
      app.request({
        url: "/familyChildrenVaccinationOrder/update",
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        data: params,
        success: function (res) {
          console.log("接种预约");
          console.log(res);
          if (res.code == 1) {
            _this.getNextVacDetail();//获取下次接种

            _this.setData({
              cardVacList: [],
              scroll: {
                ifNull: true,
                loadText: '加载中...',
                pageNum: 1,
                nullText: ''
              }
            })
            _this.getCarList('/familyChildrenVaccinationPlan/selectRecords', 1)//获取免费接种卡

            wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 2000,
              mask: true
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

      _this.setData({
        hideAppointmentDialog: true
      })
    }
  },

  /**
   * 查看一类疫苗录入信息
   */
  //显示资料信息弹窗
  showRecordedDialog: function (e) {
    var _this = this;
    var id = e.currentTarget.dataset.id,
      vacRecordStatus = e.currentTarget.dataset.vrstatus;
    _this.getRecordedDetail(id);
    if (vacRecordStatus == 1) {
      _this.setData({
        showRecordedDialog: true
      })
    }
  },
  //关闭资料信息弹窗
  closeRecordedDialog: function () {
    var _this = this;
    _this.setData({
      showRecordedDialog: false
    })
  },
  //一类疫苗完善资料编辑
  /*recordedEdit: function () {
    var _this = this;
    _this.setData({
      showManualEditDialog: true,
      showRecordedDialog: false
    })
  },*/
  //一类疫苗资料信息删除
  recordedDelete: function (e) {
    var _this = this;
    wx.showModal({
      title: '提示',
      content: '是否删除该记录详情？',
      success: function (res) {
        if (res.confirm) {
          app.request({
            url: "/familyChildrenVaccinationPlanDetail/deleteRecord",
            header: {
              'content-type': 'application/json'
            },
            method: "GET",
            data: {
              id: e.currentTarget.dataset.id
            },
            success: function (res) {
              console.log("删除录入的资料");
              console.log(res);
              if (res.code == 1) {
                _this.setData({
                  cardVacList: [],
                  scroll: {
                    ifNull: true,
                    loadText: '加载中...',
                    pageNum: 1,
                    nullText: ''
                  }
                });
                _this.getNextVacDetail();//获取下次接种
                _this.getCarList('/familyChildrenVaccinationPlan/selectRecords', 1)//获取免费接种卡
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 2000,
                  mask: true
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
          _this.setData({
            showRecordedDialog: false
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 一类疫苗完善资料
   */
  //显示完善资料录入框（添加/编辑）
  showManualEditDialog: function (e) {
    var _this = this,
      currentEditVacDetail = {};
    if (e.currentTarget.dataset.opentype == 'add') {//添加
      var cardVacList = _this.data.cardVacList,
        currentId = e.currentTarget.dataset.id,
        vacRecordStatus = e.currentTarget.dataset.vrstatus;
      for (var i = 0; i < cardVacList.length; i++) {
        var vacList = cardVacList[i].details;
        for (var j = 0; j < vacList.length; j++) {
          if (vacList[j].id == currentId) {
            vacList[j].vacMonthDesc = cardVacList[i].vacMonthDesc;
            currentEditVacDetail = vacList[j];
          }
        }
      }
      _this.setData({
        manualEditDate: util.formatTime(new Date()).split(' ')[0],//接种日期
        manualEditOrg: wx.getStorageSync('smallOrgData').name,//接种机构
        manualEditPartPickerIndex: 0
      })
      if (vacRecordStatus == 1) {
        _this.setData({
          showManualEditDialog: true
        })
      }
    } else {//编辑
      var partArray = _this.data.manualEditPartArray,
          partIdx = 0;
      currentEditVacDetail = _this.data.vacEditDetail;
      currentEditVacDetail.vacMonthDesc = currentEditVacDetail.vacMonthName;
      for (var i = 0; i < partArray.length; i++) {
        if (partArray[i] == currentEditVacDetail.vacPartName) {
          partIdx = i;
        }
      }
      console.log(partArray)
      _this.setData({
        manualEditDate: currentEditVacDetail.actualVacTime,
        manualEditOrg: currentEditVacDetail.vacOrg,
        manualEditCurrentPart: currentEditVacDetail.vacParts,
        manualEditPartPickerIndex: partIdx
      })
      _this.setData({
        showManualEditDialog: true
      })
    }
    console.log(currentEditVacDetail)
    _this.setData({
      showRecordedDialog: false,//资料编辑
      currentEditVacDetail: currentEditVacDetail
    })
  },
  //隐藏完善资料录入框
  closeManualEditDialog: function () {
    var _this = this;
    _this.setData({
      showManualEditDialog: false
    })
  },
  //选择接种录入时间
  bindManualEditDateChange: function (e) {
    var _this = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    _this.setData({
      manualEditDate: e.detail.value
    })
  },
  //选择接种部位
  manualEditPartPickerChange: function (e) {
    var _this = this;
    var manualEditPartData = _this.data.manualEditPartData;
    var manualEditCurrentPart = manualEditPartData[e.detail.value].value;
    console.log(manualEditPartData);
    console.log(manualEditCurrentPart);
    _this.setData({
      manualEditCurrentPart: manualEditCurrentPart,
      manualEditPartPickerIndex: e.detail.value
    })
    console.log(_this.data.manualEditCurrentPart);
  }, 
  //填写机构
  manualEditOrgChange: function (e) {
    var _this = this;
    console.log(e.detail.value);
    _this.setData({
      manualEditOrg: e.detail.value
    })
  },
  //保存资料
  manualEditSubmit: function () {
    var _this = this;
    console.log(_this.data.manualEditCurrentPart)
    console.log(_this.data.manualEditPartPickerIndex)
    console.log({
      "vacParts": _this.data.manualEditCurrentPart,
      "actualVacTime": _this.data.manualEditDate,
      "id": _this.data.currentEditVacDetail.id,
      "vacOrg": _this.data.manualEditOrg
    })

    if (_this.data.manualEditOrg) {
      var params = {
        params: {
          //"vacOrgId": "string,机构ID, 非必填",
          "vacParts": _this.data.manualEditCurrentPart,
          "actualVacTime": _this.data.manualEditDate,
          "id": _this.data.currentEditVacDetail.id,
          "vacOrg": _this.data.manualEditOrg
        }
      };
      app.request({
        url: "/familyChildrenVaccinationPlanDetail/updateRecord",
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        data: params,
        success: function (res) {
          console.log("完善接种信息");
          console.log(res);
          if (res.code == 1) {
            _this.setData({
              cardVacList: [],
              scroll: {
                ifNull: true,
                loadText: '加载中...',
                pageNum: 1,
                nullText: ''
              },
              manualEditOrgTip: ''
            })
            _this.getCarList('/familyChildrenVaccinationPlan/selectRecords', 1)//获取免费接种卡

            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 2000,
              mask: true
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
      _this.setData({
        showManualEditDialog: false
      })
    } else {
      _this.setData({
        manualEditOrgTip: '不能为空'
      })
    }

  },

  /**
    * 新增二类疫苗
  */
  //显示新增录入框
  showManualDialog:function(){
    var _this=this;
    _this.setData({
      showManualDialog:true
    })
  },
  //隐藏新增录入框
  closeManualDialog:function(){
    var _this=this;
    _this.setData({
      showManualDialog:false
    })
  },
  /*选择接种年龄*/
  manualAgeChange:function(e){
    var _this = this;
    var manualAgeData = _this.data.manualAgeData;
    var currentAge = manualAgeData[e.detail.value].value;
    _this.setData({
      currentAge: currentAge,
      manualAgePickerIndex: e.detail.value
    })
    console.log(currentAge);
  },
  //选择接种录入时间
  bindManualDateChange: function(e) {
    var _this=this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    _this.setData({
      manualDate: e.detail.value
    })
  },
  /*选择接种剂次*/
  manualDoseChange:function(e){
    var _this = this;
    var manualDoseData = _this.data.manualDoseData;
    var currentDose = manualDoseData[e.detail.value].value;
    _this.setData({
      currentDose: currentDose,
      manualDosePickerIndex: e.detail.value
    })
    console.log(currentDose);
  },
  /*选择接种部位*/
  manualPartPickerChange:function(e){
    var _this = this;
    var manualPartData = _this.data.manualPartData;
    var currentPart = manualPartData[e.detail.value].value;
    _this.setData({
      currentPart: currentPart,
      manualPartPickerIndex: e.detail.value
    })
    console.log(currentPart);
  },
  /*填写机构*/
  manualOrgInputTap:function(e) {
    var _this = this;
    console.log(e.detail.value);
    _this.setData({
      manualOrg: e.detail.value
    })
  }, 
  /*填写疫苗种类*/
  manualVacInputTap: function(e) {
    var _this = this;
    console.log(e.detail.value);
    _this.setData({
      manualVacName: e.detail.value
    })
  },
  //新增自费接种疫苗记录
  manualSubmit:function(){
    var _this = this;
    var ifSubmit = false;
    console.log({
      "vacMonth": _this.data.currentAge,
      "orgName": _this.data.manualOrg,
      "userMemberId": _this.data.currentMember.id,
      "vacParts": _this.data.currentPart,
      "doseNum": _this.data.currentDose,
      "vacTime": _this.data.manualDate,
      "userId": _this.data.userInfo.id,
      "vacName": _this.data.manualVacName
    })
    if (_this.data.manualVacName && _this.data.manualOrg) {
      ifSubmit = true;
    } else {
      if (!_this.data.manualVacName) {
        _this.setData({
          manualVacTip: '不能为空'
        })
      } else {
        _this.setData({
          manualVacTip: ''
        })
      }
      if (!_this.data.manualOrg) {
        _this.setData({
          manualOrgTip: '不能为空'
        })
      } else {
        _this.setData({
          manualOrgTip: ''
        })
      }
    }
    if (ifSubmit) {
        var params = {
          params: {
            "vacMonth": _this.data.currentAge,
            "orgName": _this.data.manualOrg,
            "userMemberId": _this.data.currentMember.id,
            "vacParts": _this.data.currentPart,
            "doseNum": _this.data.currentDose,
            "vacTime": _this.data.manualDate,
            "userId": _this.data.userInfo.id,
            "vacName": _this.data.manualVacName
          }
        };
        app.request({
          //app.request({
          //  url:"/familyChildrenVaccinationPlan/selectRecords",
          url: "/familyChildrenVaccinationFree/insert",
          header: {
            'content-type': 'application/json'
          },
          method: "GET",
          data: params,
          success: function (res) {
            console.log("新增二类疫苗");
            console.log(res);
            if (res.code == 1) {
              _this.setData({
                manualVacName: '',
                manualVacTip: '',
                cardVacList: [],
                scroll: {
                  ifNull: true,
                  loadText: '加载中...',
                  pageNum: 1,
                  nullText: ''
                }
              })
              _this.getCarList('/familyChildrenVaccinationFree/selectRecords', 1)//获取二类（自费）接种卡

              wx.showToast({
                title: '提交成功',
                icon: 'success',
                duration: 2000,
                mask: true
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
        _this.setData({
          showManualDialog: false
        })
    }
  },

  //查看一类疫苗详情
  showDetail: function (e) {
    var _this = this;
    var id = e.currentTarget.dataset.id;
    console.log(id)
    _this.getVacDetail(id);
    _this.setData({
      showDetailDialog: true
    })
  },
  //关闭一类疫苗详情框
  closeDetail: function () {
    var _this = this;
    _this.setData({
      showDetailDialog: false
    })
  },


  //获取预约详情信息
  getPlanDetail: function (id) {
    var _this = this;
    var planId;
    if (id) {
      planId = id;
    } else {
      //if (_this.data.nextVacDetail.status == 1) {
        planId = _this.data.nextVacDetail.id;
      //}
    }
    app.request({
      //app.request({
      url: "/familyChildrenVaccinationOrder/selectDetailByPlan",
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      data: {
        params: {
          planId: planId
        }
      },
      success: function (res) {
        console.log("预约详情");
        console.log(res);
        if (res.code == 1) {
          _this.setData({
            planDetail: res.obj
          });
          if (!id) {//下次接种已预约
            var vacList = res.obj.detais,
                vacIdArr = [],
                nextVacDetail = _this.data.nextVacDetail,
                nextVacList = nextVacDetail.vacs;
            for (var i = 0; i < vacList.length; i++) {
              for (var j = 0; j < nextVacList.length; j++) {
                if (vacList[i].status == '1') {
                  console.log(vacList[i].vacId)
                  console.log(nextVacList[j].vacId)
                  if (nextVacList[j].vacId == vacList[i].vacId) {
                    nextVacList[j].check = true;
                  }
                  vacIdArr.push(vacList[i].vacId)
                }
              }
            }
            nextVacDetail.vacs = nextVacList;
            _this.setData({
              apptDate: res.obj.vacTime,
              apptMobile: res.obj.mobile,
              apptDescription: res.obj.description,
              apptOrg: res.obj.vacOrg,
              apptVacIds: vacIdArr,
              nextVacDetail: nextVacDetail,
              apptVacIdsTip: '',
              apptOrgTip: '',
              apptMobileTip: ''
            })
            console.log(nextVacDetail)
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
  //获取下次接种信息
  getNextVacDetail:function(){
    var _this=this;
    console.log("下次接种");

    var params={
      params:{
        //"userMemberId": _this.data.userMemberId,//"Long, 成员ID 必填",
        "userMemberId": _this.data.currentMember.id//"Long, 成员ID 必填",
      }
    };
    app.request({
      url:"/familyChildrenVaccinationPlan/selectNextRecord",
      header:{
        'content-type': 'application/json'
      },
      method:"GET",
      data:params,
      success:function(res){
        console.log("下次接种");
        console.log(res);
        if(res.code==1){
          //if (res.obj) {
            _this.setData({
              nextVacDetail: res.obj,
              endSvenDay: util.getDateAfter(res.obj.planDate)
            });
            console.log(res.obj.vacDate);
            _this.getWeekDay(res.obj.vacDate);
            console.log(_this.nextVacDetail)
          /*} else {
            _this.setData({
              nextVacDetail: {},
              endSvenDay: ''
            });
          }*/
        }else{
          wx.showToast({
            title: res.message,
            icon:'none',
            duration:2000
          })
        }
      }
    })
  },
  //获取接种卡列表
  getCarList: function (myurl, current){
    var _this = this;
    if (current) {
      var cardVacList = _this.data.cardVacList;
      var params={
        params:{
          //"userMemberId": _this.data.userMemberId,//"Long, 成员ID 必填",
          "userMemberId": _this.data.currentMember.id,//"Long, 成员ID 必填",
          //"vacType": this.data.vacType//"Integer, 疫苗类型 1:一类（免费） 2:二类（自费） 3:其他 必填"
        },
        "pageNo": current,
        "pageSize": 10
      };
      console.log(params)
      app.request({
        url:myurl,
        header:{
          'content-type': 'application/json'
        },
        method:"GET",
        data:params,
        success:function(res){
          console.log("接种卡");
          console.log(res);
          if (res.code == 1) {
            if (res.data.length > 0) {
              _this.setData({
                cardVacList: cardVacList.concat(res.data),
                scroll: {
                  pageNum: current + 1,
                  ifNull: false
                },
              })
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
            console.log(res.data)
          }else{
            wx.showToast({
              title: res.message,
              icon:'none',
              duration:2000
            })
          }
        }
      })
    }
  },

  //获取疫苗详情信息
  getVacDetail: function (id) {
    var _this = this;
    app.request({
      //app.request({
      url: "/familyChildrenVaccine/select",
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      data: {
        id: id
      },
      success: function (res) {
        console.log("疫苗详情");
        console.log(res);
        if (res.code == 1) {
          _this.setData({
            vacDetail: res.obj
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
  //获取星期几
  getWeekDay:function(date){
    var _this=this;
    var dateIdx=new Date(date).getDay();
    switch (dateIdx) {
      case 0:
        _this.setData({
          weekDay:"星期日"
        });
        break;
      case 1:
        _this.setData({
          weekDay:"星期一"
        });
        break;
      case 2:
        _this.setData({
          weekDay:"星期二"
        });
        break;
      case 3:
        _this.setData({
          weekDay:"星期三"
        });
        break;
      case 4:
        _this.setData({
          weekDay:"星期四"
        });
        break;
      case 5:
        _this.setData({
          weekDay:"星期五"
        });
        break;
      case 6:
        _this.setData({
          weekDay:"星期六"
        });
        break;
    }
  },
  //获取儿童列表
  getChildList: function () {
    var _this = this;
    var params = {
      //params: {
      "userId": _this.data.userInfo.id
      //}
    };
    app.request({
      url: "/familyChildren/selectByUserId",
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      data: params,
      success: function (res) {
        console.log('儿童')
        console.log(res)
        if (res.code == 1) {
          if (res.data.length > 0) {
            var memberList = [],
                memberList = res.data,
                currentMember = {};
            for (var i = 0; i < memberList.length; i++) {
              if (i == 0) {
                memberList[i].checked = true;
                currentMember = memberList[i];
              } else {
                memberList[i].checked = false;
              }
            }
            _this.setData({
              memberList: memberList,
              childinit: true,
              currentMember: currentMember,
              cardVacList: [],
              scroll: {
                ifNull: true,
                loadText: '加载中...',
                pageNum: 1,
                nullText: ''
              }
            });
            if (currentMember.code) {
              _this.getNextVacDetail();//获取下次接种
              console.log('免费接种卡')
              _this.getCarList('/familyChildrenVaccinationPlan/selectRecords', 1)//获取免费接种卡
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
  //获取接种部位列表,月龄，剂次
  getsysDictList: function (myKey) {
    var _this = this;
    var params = {
      "key": myKey
    };
    app.request({
      url: "/sysDict/selectDatasByKey",
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      data: params,
      success: function (res) {
        if (myKey == "VACCINATION_PARTS") {//接种部位
          console.log('接种部位')
          console.log(res)
          var manualPartData = res.data;
          var arr = [], currentPart;
          for (var i = 0; i < manualPartData.length; i++) {
            arr.push(manualPartData[i].name);
            if (i == 0) {
              currentPart = manualPartData[i].value;
            }
          }
          _this.setData({
            manualPartData: manualPartData,
            manualPartArray: arr,
            manualPartPickerIndex: 0,
            currentPart: currentPart,
            freeManualPartData: manualPartData,
            freeManualPartArray: arr,
            freeManualPartPickerIndex: 0,
            freeCurrentPart: currentPart,
            manualEditPartData: manualPartData,
            manualEditPartArray: arr,
            manualEditPartPickerIndex: 0,
            manualEditCurrentPart: currentPart,
          });
        } else if (myKey == "VACCINATION_MONTH") {//月龄
          console.log('接种月龄')
          console.log(res)
          var manualAgeData = res.data;
          var arr = [], currentAge;
          for (var i = 0; i < manualAgeData.length; i++) {
            arr.push(manualAgeData[i].name);
            if (i == 0) {
              currentAge = manualAgeData[i].value;
            }
            
          }
          _this.setData({
            manualAgeData: manualAgeData,
            manualAgeArray: arr,//接种月龄
            manualAgePickerIndex: 0,
            currentAge: currentAge
          })

        } else if (myKey == "VACCINATION_DOSE_NUM") {//剂次
          console.log('接种剂次')
          console.log(res)
          var manualDoseData = res.data;
          var arr = [], currentDose;
          for (var i = 0; i < manualDoseData.length; i++) {
            arr.push(manualDoseData[i].name);
            if (i == 0) {
              currentDose = manualDoseData[i].value;
            }
          }
          _this.setData({
            manualDoseData: manualDoseData,
            manualDoseArray: arr,//接种月龄
            manualDosePickerIndex: 0,
            currentDose: currentDose
          })
        }
        
      }
    })
  },
  //获取接种资料信息详情
  getRecordedDetail: function (recordId) {
    var _this = this;
    app.request({
      //app.request({
      url: "/familyChildrenVaccinationPlanDetail/select",
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      data: {
        id: recordId
      },
      success: function (res) {
        console.log("接种资料信息详情");
        console.log(res);
        if (res.code == 1) {
          _this.setData({
            vacEditDetail: res.obj
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

})