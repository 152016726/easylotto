var dateTimePicker = require('./dis.js');
var deltaX = 0;
var minValue = 1;
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    kuandu: "274rpx",
    aa: 0,
    bb: 400,
    userId: "", //用户id
    typeNum: "", //体征类型
    title: "", //体征名称
    unit: "", //单位
    min: "", //体征标准值最小值
    max: "", //体征标准值最大值
    DBPValMin: "", //舒张压最小值
    DBPValMax: "", //舒张压最大值
    SBPValMin: "", //收缩压最小值
    SBPValMax: "", //收缩压最大值
    endDate: "", //最新日期
    remarkVal: "",
    navbar: true,
    navbar1: false,
    // currentTab: 0 ,
    navbarPress: true,
    navbarPress1: false,
    // pressTab: 0 ,
    entryDate: "选择录入时间", //预约框选择时间
    entryDateTip: "", //时间提错文字
    inputValTip: "", //体征输入框提错文字
    minIndiValueTip: "", //低压输入框提错文字
    standard: "", //值的状态正异常
    inputVal: 0, //体征输入框的值
    canvasHeight: 60,
    ruleminValue: 0,
    rulemaxValue: 100,
    rulecurrentValue: 0,
    canvasRuler: "",
    maxScope: 0,
    minScope: 0,
    juli: 0,
    chaju1: 0,
    canshu: 0,
    inputVal3: 0,
    inputVal4: 0,
    chuanpan: 0,
    diya: 234,
    time: "当前选择时分",
    date: '2018-10-01',
    time: '12:00',
    dateTimeArray: null,
    dateTime: null,
    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2000,
    endYear: 2050,
    nucce: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250, 260, 270, 280, 290, 300, 310],
    gaodu:70
  },

  /**
   * 生命周期函数--监听页面加载
   */

  bindscroll: function(e) {
    console.log(12333)
    var rulemaxValue = this.data.rulemaxValue
    var ruleminValue = this.data.ruleminValue
    console.log(rulemaxValue,"laji")
    console.log(ruleminValue, "alaji")

    var typeNum = this.data.typeNum
    if (typeNum == "1") {
      var aa = e.detail.scrollLeft / 10 .toFixed(1);
  
    } else if (typeNum == "7") {
      var aa = e.detail.scrollLeft / 10 .toFixed(1);

     
    } else {
      var aa = parseInt(e.detail.scrollLeft / 10)
      if (e.detail.scrollLeft >= 3200) {
        var aa = 320
      }
    }
    if (e.detail.scrollLeft>=3100){
      this.setData({
        inputVal:310,
        scrollLeft: 3100
      })
    }else{
      this.setData({
        inputVal: aa,
        scrollLeft: e.detail.scrollLeft
      })
    }
  },

  //切换状态栏
  navbarTap: function(e) {
    var _this = this;
    this.setData({
      navbar: true,
      navbar1: false,
    })
  },
  //切换状态栏
  navbarTap1: function(e) {
    var _this = this;
    this.setData({
      navbar: false,
      navbar1: true,
    })
  },
  //切换成高血压
  navbarPressTap: function(e) {
    // console.log(e)
    var _this = this;
    var inputVal = _this.data.inputVal;
    var inputVal4 = _this.data.inputVal4;
    var inputVal3 = _this.data.inputVal3;
    var aa = inputVal
    if (inputVal3 == 0) {

      this.setData({
        inputVal4: aa,
        scrollLeft: 115,
        navbarPress: true,
        navbarPress1: false,
        chuanpan: 1,
        diya: 234
      })
    } else {
      // inputVal3 = (inputVal3 - this.data.ruleminValue) * 10
      this.setData({
        inputVal4: aa,
        scrollLeft: inputVal3 * 10,
        navbarPress: true,
        navbarPress1: false,
        chuanpan: 2,
        diya: 234
      })
    }
    // console.log(this.data.inputVal3, this.data.inputVal4, "lll")

  },
  //切换成低血压
  navbarPressTap1: function(e) {
    // var _this = this;
    var inputVal = this.data.inputVal;
    var inputVal3 = this.data.inputVal3;
    var inputVal4 = this.data.inputVal4;
    if (inputVal4 == 0) {
      // console.log(inputVal4,"asd")
      this.setData({
        inputVal3: inputVal,
        navbarPress: false,
        navbarPress1: true,
        chuanpan: 3,
        scrollLeft: 750,
        diya: 123,
        inputVal: 75
      })
      console.log(this.data.inputVal,"755")
    } else {
      // inputVal4 = (inputVal4 - this.data.ruleminValue) * 10
      this.setData({
        inputVal3: inputVal,
        navbarPress: false,
        navbarPress1: true,
        chuanpan: 4,
        scrollLeft: inputVal4 * 10,
        diya: 123,
        inputVal: inputVal4
      })
    }

  },
  onLoad: function(options) {
    console.log(234)
    var _this = this;
    wx.setStorageSync("userId", options.userId);
    wx.setStorageSync("typeNum", options.type);
    var userId = options.userId;
    var typeNum = options.type;
    // console.log(userId)
    if (options.type=="2"){
      this.setData({
        gaodu:120
      })
    }else{
      this.setData({
        gaodu:70
      })
    }
    this.getHealthType();
    _this.setData({
      juli: 0,
      inputVal: 0,
      panduan: 1,
      rulemaxValue: 0,
      ruleminValue: 0,
      typeNum: typeNum,
      userId: userId
    })

    var curDay = new Date();
    var newEndDate = new Date(curDay.getTime());
    var endDate = newEndDate.getFullYear() + '-' + ((newEndDate.getMonth() + 1) > 9 ? (newEndDate.getMonth() + 1) : ('0' + (newEndDate.getMonth() + 1))) + '-' + ((newEndDate.getDate() > 9 ? newEndDate.getDate() : ('0' + newEndDate.getDate())));
    _this.setData({
      endDate: endDate
    })
    this.getHealthType()
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();

    this.setData({
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime
    });
    this.clss()
  },
  clss:function(){
    var kuan = wx.getSystemInfoSync().windowWidth
    if (kuan > 900){
      this.setData({
        kuandu: "339rpx"
      })
    }
    else if(kuan>700){
      this.setData({
      kuandu:"328rpx"
      })
    }else if(kuan>400){
      this.setData({
      kuandu: "287rpx"
      })
    }else{
      this.setData({
      kuandu: "274rpx"
      })
    }
  },
  changeDateTime1(e) {
    var aa=[]
    var timesd = e.detail.value
    var nian = timesd[0]
    var yue = timesd[1] .toString()
    var day = timesd[2].toString()
    var shi = timesd[3].toString()
    var fen = timesd[4].toString()
    
    // if(shi<9){
    //   shi=9
    //   fen=0
    // }else if(shi>=21){
    //   shi=21
    //   fen=0
    // }
 
    aa[0] =parseInt(nian)
    aa[1] = parseInt(yue)
    aa[2] =parseInt( day)
    aa[3] = parseInt(shi)
    aa[4] = parseInt(fen)

    console.log(aa)
    console.log(e.detail.value)
    this.setData({
      dateTime1: aa
    });
    
  },
  aa: function(e) {
    var _this = this;
    var juli = this.data.ruleratio
    var typeNum = this.data.typeNum
    var averageVal = this.data.averageVal1
    var inputVal = e.detail.value;
    var ruleminValue = this.data.ruleminValue
    var rulemaxValue = this.data.rulemaxValue
  
    if (typeNum=="1"){
      var cc = inputVal * 10
      var dd = cc / 10
      cc =cc.toFixed(1)
      dd = dd.toFixed(1)
      this.setData({
        scrollLeft: cc,
        inputVal:dd
      })
    } else if (typeNum == "7") {
      var cc = (inputVal * 10).toFixed(1)
      var dd = (cc / 10).toFixed(1)
      console.log(cc,dd,"asd")
      this.setData({
        scrollLeft: cc,
        inputVal:dd
      })
    }else{
      var cc = inputVal * 10
      this.setData({
        scrollLeft: cc
      })
    }
    console.log(this.data.inputVal,"gg")
  },

  onShow: function() {
    console.log(123)
    this.clss()
    var userInfo = wx.getStorageSync("userInfo");
    userInfo = userInfo.id
    var typeNum = wx.getStorageSync("typeNum");
    var min = wx.getStorageSync("min");
    var max = wx.getStorageSync("max");
    var _this = this;
    this.setData({
      userId: userInfo.id,
      typeNum: typeNum,
      panduan: 1,
      rulemaxValue: 0,
      ruleminValue: 0, //最小值
    })
    // console.log(this.data.min, this.data.max, 845)
    // var averageVal = parseFloat((parseFloat(min) + parseFloat(max)) / 2);
    /* 各项体征最大最小可取值范围
       type=1 血糖1~33     type=2 高压40~300 低压30~200    type=3 心率35~193 
       type=4 血氧60~100   type=5 脉搏40~160   type=6 呼吸10~160   
       type=7 体温34~45    type=8 体重0~300    type=9 体脂5~50   type=10 身高0~300*/
    // console.log(this.data.inputVal, "689")
  },

  //获取体征各指数极限值和类型参数
  getHealthType: function() {
    console.log(444)
    var _this = this;
    var params = {
      "userId": _this.data.userId
    };
    app.request({
      url: '/familyInstRecode/selectInstLimitType',
      header: {
        'content-type': 'application/json'
      },
      method: "Get",
      data: params,
      success: function(res) {
        if (res.code == 1) {
          var healthTypeList = res.obj;
          var typeNum = wx.getStorageSync("typeNum");
          for (let i in healthTypeList) {
            if (healthTypeList[i].key == typeNum) {
              console.log(healthTypeList[i], 333)
              var title = healthTypeList[i].value;
              var unit = healthTypeList[i].unit;
              var min = healthTypeList[i].min;
              var max = healthTypeList[i].max;
              var typeNum = healthTypeList[i].key;
              console.log(min, 85858)
              var dis = min.replace(/[,]/g, '~');
              var diss = max.replace(/[,]/g, '~');
              _this.setData({
                zuixiao: dis,
                zuida: diss
              })
              if (typeNum == "2") {
                // console.log(123)
                var DBPValMin = _this.data.min.slice(0, 2);
                var DBPValMax = _this.data.min.slice(3, 5);
                var SBPValMin = _this.data.max.slice(0, 2);
                var SBPValMax = _this.data.max.slice(3, 6);
                wx.setStorageSync("ty2min1", DBPValMin);
                wx.setStorageSync("ty2max1", DBPValMax);
                wx.setStorageSync("ty2min2", SBPValMin);
                wx.setStorageSync("ty2max2", SBPValMax);
                // console.log(DBPValMin, DBPValMax, SBPValMin, SBPValMax, "")
                var averageVal = parseFloat((parseFloat(DBPValMin) + parseFloat(DBPValMax)) / 2);
                _this.setData({
                  inputVal: 115,
                  scrollLeft:1150,
                  averageVal1: averageVal,
                  DBPValMin: DBPValMin,
                  DBPValMax: DBPValMax,
                  SBPValMin: SBPValMin,
                  SBPValMax: SBPValMax
                })
              } else {
                if (healthTypeList[i].min == "") {
                  min = 0;
                  max = 300;
                }
                _this.setData({
                  title: title,
                  unit: unit,
                  min: min,
                  max: max,
                  typeNum: typeNum
                })
                wx.setStorageSync("typeNum", healthTypeList[i].key);
                wx.setStorageSync("min", healthTypeList[i].min);
                wx.setStorageSync("max", healthTypeList[i].max);
                var averageVal = parseFloat((parseFloat(min) + parseFloat(max)) / 2);
                // console.log(averageVal, "5214")
                if (typeNum == "8") {
                  _this.setData({
                    inputVal: 150,
                    scrollLeft: 1500
                  })
                } else {
                  _this.setData({
                    inputVal: averageVal,
                    scrollLeft: averageVal * 10
                  })
                }


              }
              /* 各项体征最大最小可取值范围
                 type=1 血糖1~33     type=2 高压40~300 低压30~200    type=3 心率35~193 
                 type=4 血氧60~100   type=5 脉搏40~160   type=6 呼吸10~160   
                 type=7 体温34~45    type=8 体重0~300    type=9 体脂5~50   type=10 身高0~300*/
              if (typeNum == "1") {
                // console.log(123)
                _this.initRule({
                  rulemaxValue: 33, //最大值
                  ruleminValue: 1, //最小值
                  chaju1: 1,
                  scrollLeft: 160,
                  ruleratio: 10, //每个刻度所占位的px
                  canvasCursor: 'canvas-cursor', //游标箭头data-id
                  canvasRuler: 'canvas-ruler', //游标data-id
                });
              } else if (typeNum == "2") {
                _this.initRule({
                  rulemaxValue: 300, //最大值
                  ruleminValue: 40, //最小值
                  scrollLeft: 1150,

                  ruleratio: 10, //每个刻度所占位的px
                  canvasCursor: 'canvas-cursor', //游标箭头data-id
                  canvasRuler: 'canvas-ruler', //游标data-id
                });
              } else if (typeNum == '3') {
                _this.initRule({
                  rulemaxValue: 193, //最大值
                  ruleminValue: 35, //最小值

                  scrollLeft: 900,
                  ruleratio: 10, //每个刻度所占位的px
                  canvasCursor: 'canvas-cursor', //游标箭头data-id
                  canvasRuler: 'canvas-ruler', //游标data-id
                });
              } else if (typeNum == '4') {
                // console.log("cao")
                _this.initRule({
                  rulemaxValue: 100, //最大值
                  ruleminValue: 60, //最小值
                  scrollLeft: 960,

                  // inputVal: averageVal,
                  ruleratio: 10, //每个刻度所占位的px
                  canvasCursor: 'canvas-cursor', //游标箭头data-id
                  canvasRuler: 'canvas-ruler', //游标data-id
                });
              } else if (typeNum == "5") {
                _this.initRule({
                  rulemaxValue: 160, //最大值
                  ruleminValue: 40, //最小值
                  scrollLeft: 960,
                  ruleratio: 10, //每个刻度所占位的px
                  canvasCursor: 'canvas-cursor', //游标箭头data-id
                  canvasRuler: 'canvas-ruler', //游标data-id
                });
              } else if (typeNum == "6") {
                _this.initRule({
                  rulemaxValue: 160, //最大值
                  ruleminValue: 10, //最小值

                  scrollLeft: 750,
                  ruleratio: 10, //每个刻度所占位的px
                  canvasCursor: 'canvas-cursor', //游标箭头data-id
                  canvasRuler: 'canvas-ruler', //游标data-id
                });
              } else if (typeNum == "7") {
                _this.initRule({
                  rulemaxValue: 45, //最大值
                  ruleminValue: 34, //最小值
                  scrollLeft: 365,
                  ruleratio: 10, //每个刻度所占位的px
                  canvasCursor: 'canvas-cursor', //游标箭头data-id
                  canvasRuler: 'canvas-ruler', //游标data-id
                });
              } else if (typeNum == "9") {
                _this.initRule({
                  rulemaxValue: 50, //最大值
                  ruleminValue: 5, //最小值

                  scrollLeft: 350,
                  ruleratio: 10, //每个刻度所占位的px
                  canvasCursor: 'canvas-cursor', //游标箭头data-id
                  canvasRuler: 'canvas-ruler', //游标data-id
                });
              } else {
                _this.initRule({
                  rulemaxValue: 300, //最大值
                  ruleminValue: 0, //最小值
                  scrollLeft: 1500,
                  ruleratio: 10, //每个刻度所占位的px
                  canvasCursor: 'canvas-cursor', //游标箭头data-id
                  canvasRuler: 'canvas-ruler', //游标data-id
                });
              }
              if (typeNum == "10") {
                _this.setData({
                  min: "",
                  max: ""
                })
              } else if (typeNum == "8") {
                _this.setData({
                  min: "",
                  max: ""
                })
              } else {

              }
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
  //初始化标尺
  initRule: function(obj) {
    var _this = this;
    // 设备信息
    wx.getSystemInfo({
      success: function(res) {
        //初始化数据
        _this.setData({
          screenWidth: res.windowWidth,
          rulemaxValue: obj.rulemaxValue, //最大值
          ruleminValue: obj.ruleminValue, //最小值
          // rulecurrentValue: obj.rulecurrentValue,
          //当前刻度值
          ruleratio: obj.ruleratio, //每个刻度所占位的px
          canvasCursor: obj.canvasCursor, //游标箭头data-id
          canvasRuler: obj.canvasRuler, //游标data-id
        });
 
      }
    });
  },

  //加一减
  bindadd: function(e) {
    console.log(e.target.dataset)
    var juli = this.data.ruleratio
    var averageVal = this.data.averageVal1
    var inputVal = this.data.inputVal
    var ruleminValue = this.data.ruleminValue
    var rulemaxValue = this.data.rulemaxValue
    if (e.target.dataset.aa == "jia") {
      var cc = parseInt(inputVal) +1
      console.log(cc)
      this.setData({
        scrollLeft: cc*10,
        inputVal: cc
      })
    } else if (e.target.dataset.aa == "jian") {
      var cc = parseInt(inputVal - 1) 
      this.setData({
        scrollLeft: cc*10,
        inputVal: cc 
      })
    }

  },

  //选择发病时间
  bindDateChange: function(e) {
    
    var _this = this;
    var entryDate = _this.data.entryDate;
    if (e.detail.value) {
      entryDate = e.detail.value;
      _this.setData({
        entryDate: entryDate,
        entryDateTip: ''
      })
    } else {
      _this.setData({
        entryDateTip: '请输入录入时间'
      })
    }
  },
  //备注内容
  bindTextAreaBlur: function(e) {
    console.log(e.detail.value)
    var _this = this;
    _this.setData({
      remarkVal: e.detail.value
    })
  },
  //保存记录按钮
  bindTimeChange: function(e) {
    this.setData({
      time: e.detail.value
    })
  },
  bindSave: function() {
    var _this = this
    var userId = this.data.userId
    var typeNum = this.data.typeNum
    var inputVal3 = this.data.inputVal3
    var inputVal4 = this.data.inputVal4
    var recodeTime = this.data.entryDate
    var remarkVal = this.data.remarkVal
    var inputVal = this.data.inputVal

    // var time=this.data.time
    var userId = wx.getStorageSync("userInfo");
    var timesd = this.data.dateTime1
    var nian = timesd[0] + 2000
    var yue = (timesd[1] + 1).toString()
    var day = (timesd[2] + 1).toString()
    var shi = timesd[3].toString()
    var fen = timesd[4].toString()
 
    console.log(yue.length, 999, day.length)
    yue = yue.length == 1 ? "0" + yue : yue
    day = day.length == 1 ? "0" + day : day
    shi = shi.length == 1 ? "0" + shi : shi
    fen = fen.length == 1 ? "0" + fen : fen
    var disrecodeTime = nian + "-" + yue + "-" + day + " " + shi + ":" + fen
    userId = userId.id
    console.log(userId, 888)
    var _this = this,
      typeNum = _this.data.typeNum,
      title = _this.data.title,
      entryDate = _this.data.entryDate,
      inputVal = _this.data.inputVal,
      minIndiValue = _this.data.minIndiValue,
      min = _this.data.min,
      max = _this.data.max;
    var params = {
      params: {
        "userId": _this.data.userId,
        "type": _this.data.typeNum,
        "recodeTime": disrecodeTime,
        "recodeWay": "手动录入",
        "recodeMark": _this.data.remarkVal,
      }
    };
    if (typeNum == "2") {
      console.log(this.data.inputVal3, this.data.inputVal4)
      var diya = this.data.diya;

      if (diya == 234) {
        inputVal3 = inputVal
      } else if (diya == 123) {
        inputVal4 = inputVal
      }
      if (inputVal4 == 0) {
        wx.showToast({
          title: '请选择低压',
          icon: 'loading',
          duration: 1000
        })

      } else {
        if (diya == 0) {
          _this.setData({
            minIndiValueTip: '请输入低压值'
          });

        } else {
          var aa = 0;
          var bb = 0;
          var cc = 2;
          if (inputVal3 >= 140) {
            aa = 3
          } else if (inputVal3 <= 90) {
            aa = 1
          } else if (90 < inputVal3 < 140) {
            aa = 2
          }
          if (inputVal4 >= 90) {
            bb = 3
          } else if (inputVal4 <= 60) {
            bb = 1
          } else if (60 < inputVal4 < 90) {
            bb = 2
          }
          if (aa != 2 || bb != 2) {
            if (aa > bb) {
              cc = aa
            } else if (aa < bb) {
              cc = bb
            }
          } else {
            cc = 2
          }
          // console.log(9999)
          var params = {};
          params.minIndiValue = inputVal4
          params.type = typeNum
          params.maxIndiValue = inputVal3
          params.recodeTime = disrecodeTime
          params.userId = userId
          params.standard = cc
          params.recodeWay = 1
          // console.log(params)
          app.request({
            url: '/familyInstRecode/insert',
            header: {
              'content-type': 'application/json'
            },
            method: "Get",
            data: {
              params: params
            },
            success: function(res) {

              if (res.code == 1) {
                wx.showToast({
                  title: res.message,
                  icon: '',
                  duration: 2000
                });
                setTimeout(function() {
                  wx.navigateBack()
                }, 2300);
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
    } else {
      if (inputVal == "") {
        _this.setData({
          inputValTip: '请输入' + _this.data.title + '值'
        });
      } else {
        if (min != "") {
          var inputValue = parseFloat(inputVal),
            minVal = parseFloat(_this.data.min),
            minVal = parseFloat(_this.data.max);
          // console.log(min, max)
          if (inputValue >= min && inputValue <= max) {
            _this.setData({
              standard: '2'
            });
          } else if (inputValue < min) {
            _this.setData({
              standard: '1'
            });
          } else {
            _this.setData({
              standard: '3'
            });
          }
        } else {
          _this.setData({
            standard: ''
          });
        }
        var userId = wx.getStorageSync("userInfo");
        userId = userId.id
        params.params.standard = _this.data.standard,
          params.params.indiValue = _this.data.inputVal;
        params.params.userId = userId;
        params.recodeTime = disrecodeTime;
        params.type = typeNum

        app.request({
          url: '/familyInstRecode/insert',
          header: {
            'content-type': 'application/json'
          },
          method: "Get",
          data: params,
          success: function(res) {
            if (res.code == 1) {
              wx.showToast({
                title: res.message,
                icon: '',
                duration: 2000
              });
              setTimeout(function() {
                wx.navigateBack()
              }, 2300);
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
  },
})