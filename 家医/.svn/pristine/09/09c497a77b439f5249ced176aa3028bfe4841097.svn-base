var wxCharts = require('../../../../../utils/wxcharts-min.js');
var app = getApp();
var lineChart = null;
Page({
  data: {
    shijian: 0,
    userId: "", //用户id
    type: "", //体征类型
    title: "", //体征名称
    unit: "", //单位
    navbar: ['日', '周', '月', '季', '年'],
    currentTab: 0,
    statValue: {}, //最低最高平均值
    chartLength: "", //图表数据长度
    recodeTimeArr: [], //图表测量时间数组
    seriesList: [], //图表y轴数据
    startDate: "", //接口参数开始时间
    endDate: "", //接口参数结束时间
    indiValuelatest: "", //最新体征值
    maxIndiValuelatest: "", //最新高压值
    minIndiValuelatest: "", //最新低压值
    recodeTimelatest: "", //最新测量时间
    scroll: {
      ifNull: false,
      loadText: '加载中...',
      pageNum: 1,
      nullText: ''
    },
    communityList: [],
    height: 0,
  },
  onLoad: function (options) {
    console.log(options)
    var _this = this;
    this.setData({
      userId: options.userId,
      type: options.type,
    })
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          height: (res.windowHeight / 2) - 20
        })
      }
    });
  },
  qiehuan: function (e) {

    var _this = this
    var currentTab = this.data.currentTab
    _this.setData({
      maxIndiValuelatest: "",
      minIndiValuelatest: "",
    })
    console.log(this.data.currentTab, "1951")
    var recodeTimelatest = this.data.endDate
    var shijian = this.data.shijian


    var kaitime = _this.data.startDate
    var jietime = _this.data.endDate
    console.log(currentTab, recodeTimelatest, jietime, "1951")
    // if (recodeTimelatest==0){
    //   recodeTimelatest = jietime
    // }
    console.log(currentTab, 2, recodeTimelatest, 1, jietime, "1951")
    recodeTimelatest = recodeTimelatest.replace(/[-]/g, '');
    kaitime = kaitime.replace(/[-]/g, '');
    jietime = jietime.replace(/[-]/g, '');
    var nian = recodeTimelatest.slice(0, 4)
    var yue = recodeTimelatest.slice(4, 6)
    var day = recodeTimelatest.slice(6, 9)
    //开始时间
    var nian1 = kaitime.slice(0, 4)
    var yue1 = kaitime.slice(4, 6)
    var day1 = kaitime.slice(6, 9)
    //结束时间
    var nian2 = jietime.slice(0, 4)
    var yue2 = jietime.slice(4, 6)
    var day2 = jietime.slice(6, 9)
    day = parseInt(day)
    yue = parseInt(yue)
    nian = parseInt(nian)
    day1 = parseInt(day1)
    yue1 = parseInt(yue1)
    nian1 = parseInt(nian1)
    day2 = parseInt(day2)
    yue2 = parseInt(yue2)
    nian2 = parseInt(nian2)
    if (currentTab == 0) {
      if (e.target.dataset.dis == "0") {
        //减
        console.log(recodeTimelatest)
        if (shijian == 0) {
          if (day == 1) {
            console.log(day, "123")
            if (yue == 1) {
              nian = nian - 1
              yue = 12
              day = 31
            } else {
              yue = yue - 1
              if (yue == 3 || yue == 5 || yue == 7 || yue == 8 || yue == 10 || yue == 12) {
                day = 31
              } else if (yue == 4 || yue == 6 || yue == 9 || yue == 11) {
                day = 30
              } else if (yue == 2) {
                if (nian % 100 == 0 && nian % 400 != 0 || nian % 4 != 0) {
                  day = 28
                } else {
                  day = 29
                }
              }
            }

            console.log(nian, yue, day)
          } else {
            day = day - 1
          }
          console.log(nian, yue, day)
        }
      } else if (e.target.dataset.dis == "1") {
        //加
        if (shijian == 0) {

          if (day == 28) {
            if (yue == 2) {
              if (nian % 100 == 0 && nian % 400 != 0 || nian % 4 != 0) {
                day = 1
                yue = yue + 1
              } else {
                day = day + 1
              }
            } else {
              day = day + 1
            }
          } else if (day == 29) {
            if (nian % 100 != 0 && nian % 400 == 0 || nian % 4 == 0) {
              yue = yue + 1
              day = 1
            } else {
              day = day + 1
            }
          } else if (day == 30) {
            if (yue == 4 || yue == 6 || yue == 9 || yue == 11) {
              yue = yue + 1
              day = 1
            } else {
              day = day + 1
            }
          } else if (day == 31) {
            if (yue == 12) {
              nian = nian + 1
              yue = 1
              day = 1
            } else {
              yue = yue + 1
              day = 1
            }
          } else {
            day = day + 1
          }
        }
        console.log(nian, yue, day)
      }
      nian = nian.toString()
      yue = yue.toString()
      day = day.toString()
      if (yue.length == 1) {
        yue = "0" + yue
      }
      if (day.length == 1) {
        day = "0" + day
      }
      this.setData({
        endDate: nian + "-" + yue + "-" + day
      })
      var params = {
        params: {
          "userId": _this.data.userId,
          "type": _this.data.type,
          "startDate": nian + "-" + yue + "-" + day,
          "endDate": nian + "-" + yue + "-" + day,
        
        },
        "pageNo": 1,
        "pageSize": 999
      };
      console.log(params)
      app.request({
        url: '/familyInstRecode/selectList',
        header: {
          'content-type': 'application/json'
        },
        method: "Get",
        data: params,
        success: function (res) {
          console.log(res)
          _this.setData({
            maxIndiValueArr: "",
            minIndiValueArr: "",
            indiValuelatest: ""
          })
          if (res.code == 1) {
            //获取图表的值
            var listData = res.data,
              chartLength = listData.length,
              maxIndiValueArr = [],
              minIndiValueArr = [],
              indiValueArr = [],
              recodeTimeArr = [],
              indiValuelatest = "",
              maxIndiValuelatest = "",
              minIndiValuelatest = "",
              recodeTimelatest = "";
            if (chartLength != 0) {
              for (var i = 0; i < chartLength; i++) {
                indiValuelatest = listData[chartLength - 1].indiValue,
                  maxIndiValuelatest = listData[chartLength - 1].maxIndiValue,
                  minIndiValuelatest = listData[chartLength - 1].minIndiValue,
                  recodeTimelatest = listData[chartLength - 1].recodeTime.slice(0, 10);
                indiValueArr.push(listData[i].indiValue);
                maxIndiValueArr.push(listData[i].maxIndiValue);
                minIndiValueArr.push(listData[i].minIndiValue);
                recodeTimeArr.push(listData[i].recodeTime.slice(0, 10));
              }
              _this.setData({
                statValue: res.obj,
                chartLength: chartLength,
                indiValuelatest: indiValuelatest,
                maxIndiValuelatest: maxIndiValuelatest,
                minIndiValuelatest: minIndiValuelatest,
                recodeTimelatest: recodeTimelatest,
                recodeTimeArr: recodeTimeArr,
              })
              if (_this.data.type == "2") {
                var series1 = {};
                series1.name = '高压';
                series1.data = maxIndiValueArr;
                series1.color = '#59a1f4';
                var series2 = {};
                series2.name = '低压';
                series2.data = minIndiValueArr;
                series2.color = '#ffba66';
                var seriesList1 = [series1, series2];
                _this.setData({
                  seriesList: seriesList1,
                })
                _this.setOptionCount();
              } else {
                var series = {};
                series.name = _this.data.title;
                series.data = indiValueArr;
                series.color = '#59a1f4';
                var seriesList2 = [series];
                _this.setData({
                  seriesList: seriesList2,
                })
                _this.setOptionCount();
              }
            } else {
              _this.setData({
                statValue: {},
                chartLength: 0,
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
    } else if (currentTab == 1) {
      if (e.target.dataset.dis == "0") {
        if (yue1 == 1) {
          if (day1 < 7) {
            nian1 = nian1 - 1
            yue1 = yue1 = 12
            day1 = 31 - 7 + day1
          } else {
            day1 = day1 - 7
          }
        } else {
          if (day1 < 7) {
            yue1 = yue1 - 1
            if (yue1 == 1 || yue1 == 3 || yue1 == 5 || yue1 == 7 || yue1 == 8 || yue1 == 10) {
              day1 = 31 - 7 + day1
            } else if (yue1 == 4 || yue1 == 6 || yue1 == 9 || yue1 == 11) {
              day1 = 30 - 7 + day1
            } else if (yue1 == 2) {
              if (nian1 % 100 == 0 && nian1 % 400 != 0 || nian1 % 4 != 0) {
                day1 = 28 - 7 + day1
              } else {
                day1 = 29 -7 + day1
              }
            }
          } else {
            day1 = day1 - 7
          }

        }
        if (yue2 == 2) {
          if (day2 < 7) {
            nian2 = nian2 - 1
            yue2 = yue2 = 12
            day2 = 31 - 7 + day2
          } else {
            day2 = day2 - 7
          }
        } else {
          if (day2 <= 7) {
            yue2 = yue2 - 1
            if (yue2 == 1 || yue2 == 3 || yue2 == 5 || yue2 == 7 || yue2 == 8 || yue2 == 10) {
              day2 = 31 - 7 + day2
            } else if (yue2 == 4 || yue2 == 6 || yue2 == 9 || yue2 == 11) {
              day2 = 30 - 7 + day2
            } else if (yue2 == 2) {
              if (nian2 % 100 == 0 && nian2 % 400 != 0 || nian2 % 4 != 0) {
                day2 = 28 - 7 + day2
              } else {
                day2 = 29 - 7 + day2
              }
            }
          } else {
            day2 = day2 - 7
          }
        }

      } else if (e.target.dataset.dis == "1") {
        if (day1 > 20) {
          if (yue1 == 2) {
            if (nian1 % 100 == 0 && nian1 % 400 != 0 || nian1 % 4 != 0) {
              yue1 = yue1 + 1
              day1 = 7- 28 + day1
            } else {
              if (day1 > 21) {
                yue1 = yue1 + 1
                day1 = 7- 29 + day1
              } else {
                day1 = day1 + 7
              }
            }
          } else if (yue1 == 1 || yue1 == 3 || yue1 == 5 || yue1 == 7 || yue1 == 8 || yue1 == 10) {
            if (day1 > 23) {
              yue1 = yue1 + 1
              day1 = 7- 31 + day1
            } else {
              day1 = day1 + 7
            }
          } else if (yue1 == 4 || yue1 == 6 || yue1 == 9 || yue1 == 11) {
            if (day1 > 22) {
              yue1 = yue1 + 1
              day1 = 7 - 30 + day1
            } else {
              day1 = day1 + 7
            }
          } else if (yue1 == 12) {
            if (day1 > 23) {
              nian1 = nian1 + 1
              yue1 = 1
              day1 = 7 - 31 + day1
            } else {
              day1 = day1 + 7
            }
          }
        } else {
          day1 = day1 + 7
        }
        if (day2 > 20) {
          if (yue2 == 2) {
            if (nian2 % 100 == 0 && nian2 % 400 != 0 || nian2 % 4 != 0) {
              yue2 = yue2 + 1
              day2 = 7 - 28 + day2
            } else {
              if (day2 > 21) {
                yue2 = yue2 + 1
                day2 = 7 - 29 + day2
              } else {
                day2 = day2 + 7
              }
            }
          } else if (yue2 == 1 || yue2 == 3 || yue2 == 5 || yue2 == 7 || yue2 == 8 || yue2 == 10) {
            if (day2 > 23) {
              yue2 = yue2 + 1
              day2 = 7- 31 + day2
            } else {
              day2 = day2 + 7
            }
          } else if (yue2 == 4 || yue2 == 6 || yue2 == 9 || yue2 == 11) {
            if (day2 > 22) {
              yue2 = yue2 + 1
              day2 =7 - 30 + day2
            } else {
              day2 = day2 +7
            }
          } else if (yue2 == 12) {
            if (day2 > 23) {
              nian2 = nian2 + 1
              yue2 = 1
              day2 = 7 - 31 + day2
            } else {
              day2 = day2 + 7
            }
          }
        } else {
          day2 = day2 + 7
        }

      }
      nian1 = nian1.toString()
      yue1 = yue1.toString()
      day1 = day1.toString()
      if (yue1.length == 1) {
        yue1 = "0" + yue1
      }
      if (day1.length == 1) {
        day1 = "0" + day1
      }
      nian2 = nian2.toString()
      yue2 = yue2.toString()
      day2 = day2.toString()
      if (yue2.length == 1) {
        yue2 = "0" + yue2
      }
      if (day2.length == 1) {
        day2 = "0" + day2
      }
      this.setData({
        startDate: nian1 + "-" + yue1 + "-" + day1,
        endDate: nian2 + "-" + yue2 + "-" + day2,
        recodeTimelatest: nian2 + "-" + yue2 + "-" + day2,
      })
      var params = {
        params: {
          "userId": _this.data.userId,
          "type": _this.data.type,
          "startDate": nian1 + "-" + yue1 + "-" + day1,
          "endDate": nian2 + "-" + yue2 + "-" + day2,
         
        },
        "pageNo": 1,
        "pageSize": 999
      };
      console.log(params)
      app.request({
        url: '/familyInstRecode/selectList',
        header: {
          'content-type': 'application/json'
        },
        method: "Get",
        data: params,
        success: function (res) {
          console.log(res)
          _this.setData({
            maxIndiValueArr: "",
            minIndiValueArr: "",
            indiValuelatest: ""
          })
          if (res.code == 1) {
            //获取图表的值
            var listData = res.data,
              chartLength = listData.length,
              maxIndiValueArr = [],
              minIndiValueArr = [],
              indiValueArr = [],
              recodeTimeArr = [],
              indiValuelatest = "",
              maxIndiValuelatest = "",
              minIndiValuelatest = "",
              recodeTimelatest = "";
            if (chartLength != 0) {
              for (var i = 0; i < chartLength; i++) {
                indiValuelatest = listData[chartLength - 1].indiValue,
                  maxIndiValuelatest = listData[chartLength - 1].maxIndiValue,
                  minIndiValuelatest = listData[chartLength - 1].minIndiValue,
                  recodeTimelatest = listData[chartLength - 1].recodeTime.slice(0, 10);
                indiValueArr.push(listData[i].indiValue);
                maxIndiValueArr.push(listData[i].maxIndiValue);
                minIndiValueArr.push(listData[i].minIndiValue);
                recodeTimeArr.push(listData[i].recodeTime.slice(0, 10));
              }
              _this.setData({
                statValue: res.obj,
                chartLength: chartLength,
                indiValuelatest: indiValuelatest,
                maxIndiValuelatest: maxIndiValuelatest,
                minIndiValuelatest: minIndiValuelatest,
                recodeTimelatest: recodeTimelatest,
                recodeTimeArr: recodeTimeArr,
              })
              if (_this.data.type == "2") {
                var series1 = {};
                series1.name = '高压';
                series1.data = maxIndiValueArr;
                series1.color = '#59a1f4';
                var series2 = {};
                series2.name = '低压';
                series2.data = minIndiValueArr;
                series2.color = '#ffba66';
                var seriesList1 = [series1, series2];
                _this.setData({
                  seriesList: seriesList1,
                })
                _this.setOptionCount();
              } else {
                var series = {};
                series.name = _this.data.title;
                series.data = indiValueArr;
                series.color = '#59a1f4';
                var seriesList2 = [series];
                _this.setData({
                  seriesList: seriesList2,
                })
                _this.setOptionCount();
              }
            } else {
              _this.setData({
                statValue: {},
                chartLength: 0,
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
    } else if (currentTab == 2) {
      if (e.target.dataset.dis == "0") {
        if (yue1 <= 1) {
          console.log(1)
          yue1 = 12
          nian1 - 1

        } else {
          yue1 = yue1 - 1
          if (day1 > 28) {
            if (yue1 == 1 || yue1 == 3 || yue1 == 5 || yue1 == 7 || yue1 == 8 || yue1 == 10) {

            } else if (yue1 == 4 || yue1 == 6 || yue1 == 9 || yue1 == 11) {
              if (day1 > 30) {
                day1 = 30
              } else {

              }
            } else if (yue1 == 2) {
              if (day1 > 28) {
                day1 = 28
              } else {
                day1 = 28
              }
            }
          } else {

          }
        }
        if (yue2 <= 1) {
          console.log(1)
          yue2 = 12
          nian2 - 1

        } else {
          yue2 = yue2 - 1
          if (day2 > 28) {
            if (yue2 == 1 || yue2 == 3 || yue2 == 5 || yue2 == 7 || yue2 == 8 || yue2 == 10) {

            } else if (yue2 == 4 || yue2 == 6 || yue2 == 9 || yue2 == 11) {
              if (day2 > 30) {
                day2 = 30
              } else {

              }
            } else if (yue2 == 2) {
              if (day2 > 28) {
                day2 = 28
              } else {
                day2 = 28
              }
            }
          } else {

          }
        }
        nian1 = nian1.toString()
        yue1 = yue1.toString()
        day1 = day1.toString()
        if (yue1.length == 1) {
          yue1 = "0" + yue1
        }
        if (day1.length == 1) {
          day1 = "0" + day1
        }
        nian2 = nian2.toString()
        yue2 = yue2.toString()
        day2 = day2.toString()
        if (yue2.length == 1) {
          yue2 = "0" + yue2
        }
        if (day2.length == 1) {
          day2 = "0" + day2
        }
        this.setData({
          startDate: nian1 + "-" + yue1 + "-" + day1,
          endDate: nian2 + "-" + yue2 + "-" + day2
        })
        var params = {
          params: {
            "userId": _this.data.userId,
            "type": _this.data.type,
            "startDate": nian1 + "-" + yue1 + "-" + day1,
            "endDate": nian2 + "-" + yue2 + "-" + day2,

          },
          "pageNo": 1,
          "pageSize": 999
        };
        console.log(params)
        app.request({
          url: '/familyInstRecode/selectList',
          header: {
            'content-type': 'application/json'
          },
          method: "Get",
          data: params,
          success: function (res) {
            console.log(res)
            if (res.code == 1) {
              //获取图表的值
              var listData = res.data,
                chartLength = listData.length,
                maxIndiValueArr = [],
                minIndiValueArr = [],
                indiValueArr = [],
                recodeTimeArr = [],
                indiValuelatest = "",
                maxIndiValuelatest = "",
                minIndiValuelatest = "",
                recodeTimelatest = "";
              if (chartLength != 0) {
                for (var i = 0; i < chartLength; i++) {
                  indiValuelatest = listData[chartLength - 1].indiValue,
                    maxIndiValuelatest = listData[chartLength - 1].maxIndiValue,
                    minIndiValuelatest = listData[chartLength - 1].minIndiValue,
                    recodeTimelatest = listData[chartLength - 1].recodeTime.slice(0, 10);
                  indiValueArr.push(listData[i].indiValue);
                  maxIndiValueArr.push(listData[i].maxIndiValue);
                  minIndiValueArr.push(listData[i].minIndiValue);
                  recodeTimeArr.push(listData[i].recodeTime.slice(0, 10));
                }
                _this.setData({
                  statValue: res.obj,
                  chartLength: chartLength,
                  indiValuelatest: indiValuelatest,
                  maxIndiValuelatest: maxIndiValuelatest,
                  minIndiValuelatest: minIndiValuelatest,
                  recodeTimelatest: recodeTimelatest,
                  recodeTimeArr: recodeTimeArr,
                })
                if (_this.data.type == "2") {
                  var series1 = {};
                  series1.name = '高压';
                  series1.data = maxIndiValueArr;
                  series1.color = '#59a1f4';
                  var series2 = {};
                  series2.name = '低压';
                  series2.data = minIndiValueArr;
                  series2.color = '#ffba66';
                  var seriesList1 = [series1, series2];
                  _this.setData({
                    seriesList: seriesList1,
                  })
                  _this.setOptionCount();
                } else {
                  var series = {};
                  series.name = _this.data.title;
                  series.data = indiValueArr;
                  series.color = '#59a1f4';
                  var seriesList2 = [series];
                  _this.setData({
                    seriesList: seriesList2,
                  })
                  _this.setOptionCount();
                }
              } else {
                _this.setData({
                  statValue: {},
                  chartLength: 0,
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
      } else if (e.target.dataset.dis == "1") {
        if (yue1 > 12) {
          nian1 = nian1 + 1
          yue1 = 1
        } else {
          yue1 = yue1 + 1
          if (yue1 == 4 || yue1 == 6 || yue1 == 9 || yue1 == 11) {
            if (day1 > 30) {
              day1 = 30
            } else {

            }
          } else if (yue1 == 2) {
            if (day1 > 28) {
              day1 = 28
            } else {

            }
          }
        }




        if (yue2 > 12) {
          nian2 = nian2 + 1
          yue2 = 1
        } else {
          yue2 = yue2 + 1
          if (yue2 == 4 || yue2 == 6 || yue2 == 9 || yue2 == 11) {
            if (day2 > 30) {
              day2 = 30
            } else {

            }
          } else if (yue2 == 2) {
            if (day2 > 28) {
              day2 = 28
            } else {

            }
          }
        }


        nian1 = nian1.toString()
        yue1 = yue1.toString()
        day1 = day1.toString()
        if (yue1.length == 1) {
          yue1 = "0" + yue1
        }
        if (day1.length == 1) {
          day1 = "0" + day1
        }
        nian2 = nian2.toString()
        yue2 = yue2.toString()
        day2 = day2.toString()
        if (yue2.length == 1) {
          yue2 = "0" + yue2
        }
        if (day2.length == 1) {
          day2 = "0" + day2
        }
        this.setData({
          startDate: nian1 + "-" + yue1 + "-" + day1,
          endDate: nian2 + "-" + yue2 + "-" + day2,
          recodeTimelatest: nian2 + "-" + yue2 + "-" + day2
        })
        var params = {
          params: {
            "userId": _this.data.userId,
            "type": _this.data.type,
            "startDate": nian1 + "-" + yue1 + "-" + day1,
            "endDate": nian2 + "-" + yue2 + "-" + day2,
 
          },
          "pageNo": 1,
          "pageSize": 999
        };
        console.log(params)
        app.request({
          url: '/familyInstRecode/selectList',
          header: {
            'content-type': 'application/json'
          },
          method: "Get",
          data: params,
          success: function (res) {
            console.log(res)
            _this.setData({
              maxIndiValueArr: "",
              minIndiValueArr: "",
              indiValuelatest: ""
            })
            if (res.code == 1) {
              //获取图表的值
              var listData = res.data,
                chartLength = listData.length,
                maxIndiValueArr = [],
                minIndiValueArr = [],
                indiValueArr = [],
                recodeTimeArr = [],
                indiValuelatest = "",
                maxIndiValuelatest = "",
                minIndiValuelatest = "",
                recodeTimelatest = "";
              if (chartLength != 0) {
                for (var i = 0; i < chartLength; i++) {
                  indiValuelatest = listData[chartLength - 1].indiValue,
                    maxIndiValuelatest = listData[chartLength - 1].maxIndiValue,
                    minIndiValuelatest = listData[chartLength - 1].minIndiValue,
                    recodeTimelatest = listData[chartLength - 1].recodeTime.slice(0, 10);
                  indiValueArr.push(listData[i].indiValue);
                  maxIndiValueArr.push(listData[i].maxIndiValue);
                  minIndiValueArr.push(listData[i].minIndiValue);
                  recodeTimeArr.push(listData[i].recodeTime.slice(0, 10));
                }
                _this.setData({
                  statValue: res.obj,
                  chartLength: chartLength,
                  indiValuelatest: indiValuelatest,
                  maxIndiValuelatest: maxIndiValuelatest,
                  minIndiValuelatest: minIndiValuelatest,
                  recodeTimelatest: recodeTimelatest,
                  recodeTimeArr: recodeTimeArr,
                })
                if (_this.data.type == "2") {
                  var series1 = {};
                  series1.name = '高压';
                  series1.data = maxIndiValueArr;
                  series1.color = '#59a1f4';
                  var series2 = {};
                  series2.name = '低压';
                  series2.data = minIndiValueArr;
                  series2.color = '#ffba66';
                  var seriesList1 = [series1, series2];
                  _this.setData({
                    seriesList: seriesList1,
                  })
                  _this.setOptionCount();
                } else {
                  var series = {};
                  series.name = _this.data.title;
                  series.data = indiValueArr;
                  series.color = '#59a1f4';
                  var seriesList2 = [series];
                  _this.setData({
                    seriesList: seriesList2,
                  })
                  _this.setOptionCount();
                }
              } else {
                _this.setData({
                  statValue: {},
                  chartLength: 0,
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
    } else if (currentTab == 3) {
      if (e.target.dataset.dis == "0") {
        if (yue1 <= 3) {
          yue1 = 12 + yue1 - 4
          nian1 = nian1 - 1

        } else {
          yue1 = yue1 - 3

        }
        if (yue1 == 4 || yue1 == 6 || yue1 == 9 || yue1 == 11) {
          if (day1 > 30) {
            day1 = 30
          } else {

          }
        } else if (yue1 == 2) {
          if (day1 > 28) {
            day1 = 28
          } else {

          }
        }



        if (yue2 <= 3) {
          yue2 = 12 + yue2 - 4
          nian2 = nian2 - 1

        } else {
          yue2 = yue2 - 3

        }
        if (yue2 == 4 || yue2 == 6 || yue2 == 9 || yue2 == 11) {
          if (day2 > 30) {
            day2 = 30
          } else {

          }
        } else if (yue2 == 2) {
          if (day2 > 28) {
            day2 = 28
          } else {

          }
        }
      } else if (e.target.dataset.dis == "1") {
        if (yue1 > 9) {
          nian1 = nian1 + 1
          yue1 = yue1 - 12 + 4

        } else {
          yue1 = yue1 + 3
        }
        if (yue1 == 4 || yue1 == 6 || yue1 == 9 || yue1 == 11) {
          if (day1 > 30) {
            day1 = 30
          }
        } else if (yue1 == 2) {
          if (day1 > 28) {
            day1 = 28
          }
        } else {

        }


        if (yue2 > 9) {
          nian2 = nian2 + 1
          yue2 = yue2 - 12 + 4

        } else {
          yue2 = yue2 + 3
        }
        if (yue2 == 4 || yue2 == 6 || yue2 == 9 || yue2 == 11) {
          if (day2 > 30) {
            day2 = 30
          }
        } else if (yue2 == 2) {
          if (day2 > 28) {
            day2 = 28
          }
        } else {
        }
      }
      nian1 = nian1.toString()
      yue1 = yue1.toString()
      day1 = day1.toString()
      if (yue1.length == 1) {
        yue1 = "0" + yue1
      }
      if (day1.length == 1) {
        day1 = "0" + day1
      }
      nian2 = nian2.toString()
      yue2 = yue2.toString()
      day2 = day2.toString()
      if (yue2.length == 1) {
        yue2 = "0" + yue2
      }
      if (day2.length == 1) {
        day2 = "0" + day2
      }
      this.setData({
        startDate: nian1 + "-" + yue1 + "-" + day1,
        endDate: nian2 + "-" + yue2 + "-" + day2,
        recodeTimelatest: nian2 + "-" + yue2 + "-" + day2
      })
      var params = {
        params: {
          "userId": _this.data.userId,
          "type": _this.data.type,
          "startDate": nian1 + "-" + yue1 + "-" + day1,
          "endDate": nian2 + "-" + yue2 + "-" + day2,
         
        },
        "pageNo": 1,
        "pageSize": 999
      };
      console.log(params)
      app.request({
        url: '/familyInstRecode/selectList',
        header: {
          'content-type': 'application/json'
        },
        method: "Get",
        data: params,
        success: function (res) {
          console.log(res)
          _this.setData({
            maxIndiValueArr: "",
            minIndiValueArr: "",
            indiValuelatest: ""
          })

          if (res.code == 1) {
            //获取图表的值
            var listData = res.data,
              chartLength = listData.length,
              maxIndiValueArr = [],
              minIndiValueArr = [],
              indiValueArr = [],
              recodeTimeArr = [],
              indiValuelatest = "",
              maxIndiValuelatest = "",
              minIndiValuelatest = "",
              recodeTimelatest = "";
            if (chartLength != 0) {
              for (var i = 0; i < chartLength; i++) {
                indiValuelatest = listData[chartLength - 1].indiValue,
                  maxIndiValuelatest = listData[chartLength - 1].maxIndiValue,
                  minIndiValuelatest = listData[chartLength - 1].minIndiValue,
                  recodeTimelatest = listData[chartLength - 1].recodeTime.slice(0, 10);
                indiValueArr.push(listData[i].indiValue);
                maxIndiValueArr.push(listData[i].maxIndiValue);
                minIndiValueArr.push(listData[i].minIndiValue);
                recodeTimeArr.push(listData[i].recodeTime.slice(0, 10));
              }
              _this.setData({
                statValue: res.obj,
                chartLength: chartLength,
                indiValuelatest: indiValuelatest,
                maxIndiValuelatest: maxIndiValuelatest,
                minIndiValuelatest: minIndiValuelatest,
                recodeTimelatest: recodeTimelatest,
                recodeTimeArr: recodeTimeArr,
              })
              if (_this.data.type == "2") {
                var series1 = {};
                series1.name = '高压';
                series1.data = maxIndiValueArr;
                series1.color = '#59a1f4';
                var series2 = {};
                series2.name = '低压';
                series2.data = minIndiValueArr;
                series2.color = '#ffba66';
                var seriesList1 = [series1, series2];
                _this.setData({
                  seriesList: seriesList1,
                })
                _this.setOptionCount();
              } else {
                var series = {};
                series.name = _this.data.title;
                series.data = indiValueArr;
                series.color = '#59a1f4';
                var seriesList2 = [series];
                _this.setData({
                  seriesList: seriesList2,
                })
                _this.setOptionCount();
              }
            } else {
              _this.setData({
                statValue: {},
                chartLength: 0,
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
    } else if (currentTab == 4) {
      if (e.target.dataset.dis == "0") {
        nian1 = nian1 - 1

      } else if (e.target.dataset.dis == "1") {
        nian1 = nian1 + 1
      }
      if (e.target.dataset.dis == "0") {
        nian2 = nian2 - 1

      } else if (e.target.dataset.dis == "1") {
        nian2 = nian2 + 1
      }
      nian1 = nian1.toString()
      yue1 = yue1.toString()
      day1 = day1.toString()
      if (yue1.length == 1) {
        yue1 = "0" + yue1
      }
      if (day1.length == 1) {
        day1 = "0" + day1
      }
      nian2 = nian2.toString()
      yue2 = yue2.toString()
      day2 = day2.toString()
      if (yue2.length == 1) {
        yue2 = "0" + yue2
      }
      if (day2.length == 1) {
        day2 = "0" + day2
      }
      this.setData({
        startDate: nian1 + "-" + yue1 + "-" + day1,
        endDate: nian2 + "-" + yue2 + "-" + day2,
        recodeTimelatest: nian2 + "-" + yue2 + "-" + day2
      })
      var params = {
        params: {
          "userId": _this.data.userId,
          "type": _this.data.type,
          "startDate": nian1 + "-" + yue1 + "-" + day1,
          "endDate": nian2 + "-" + yue2 + "-" + day2,
     
        }, 
        "pageNo": 1,
        "pageSize": 999
      };
      console.log(params)
      app.request({
        url: '/familyInstRecode/selectList',
        header: {
          'content-type': 'application/json'
        },
        method: "Get",
        data: params,
        success: function (res) {
          console.log(res)
          _this.setData({
            maxIndiValueArr: "",
            minIndiValueArr: "",
            indiValuelatest: ""
          })
          if (res.code == 1) {
            //获取图表的值
            var listData = res.data,
              chartLength = listData.length,
              maxIndiValueArr = [],
              minIndiValueArr = [],
              indiValueArr = [],
              recodeTimeArr = [],
              indiValuelatest = "",
              maxIndiValuelatest = "",
              minIndiValuelatest = "",
              recodeTimelatest = "";
            if (chartLength != 0) {
              for (var i = 0; i < chartLength; i++) {
                indiValuelatest = listData[chartLength - 1].indiValue,
                  maxIndiValuelatest = listData[chartLength - 1].maxIndiValue,
                  minIndiValuelatest = listData[chartLength - 1].minIndiValue,
                  recodeTimelatest = listData[chartLength - 1].recodeTime.slice(0, 10);
                indiValueArr.push(listData[i].indiValue);
                maxIndiValueArr.push(listData[i].maxIndiValue);
                minIndiValueArr.push(listData[i].minIndiValue);
                recodeTimeArr.push(listData[i].recodeTime.slice(0, 10));
              }
              _this.setData({
                statValue: res.obj,
                chartLength: chartLength,
                indiValuelatest: indiValuelatest,
                maxIndiValuelatest: maxIndiValuelatest,
                minIndiValuelatest: minIndiValuelatest,
                recodeTimelatest: recodeTimelatest,
                recodeTimeArr: recodeTimeArr,
              })
              if (_this.data.type == "2") {
                var series1 = {};
                series1.name = '高压';
                series1.data = maxIndiValueArr;
                series1.color = '#59a1f4';
                var series2 = {};
                series2.name = '低压';
                series2.data = minIndiValueArr;
                series2.color = '#ffba66';
                var seriesList1 = [series1, series2];
                _this.setData({
                  seriesList: seriesList1,
                })
                _this.setOptionCount();
              } else {
                var series = {};
                series.name = _this.data.title;
                series.data = indiValueArr;
                series.color = '#59a1f4';
                var seriesList2 = [series];
                _this.setData({
                  seriesList: seriesList2,
                })
                _this.setOptionCount();
              }
            } else {
              _this.setData({
                statValue: {},
                chartLength: 0,
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
  },

  onShow: function () {
    var _this = this;
    _this.setData({
      communityList: [],
      scroll: {
        ifNull: true,
        loadText: '加载中...',
        pageNum: 1,
        nullText: ''
      }
    })
    _this.getCommunityList(1);
    _this.getHealthType();
    _this.getChartData();
  },
  //获取体征各指数极限值和类型参数
  getHealthType: function () {
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
      success: function (res) {
        console.log(res)
        if (res.code == 1) {
          var healthType = res.obj,
            healthTypeList = [],
            type = _this.data.type,
            title = "",
            unit = "";
          for (var i in healthType) {
            healthTypeList.push(healthType[i]);
          }
          for (var i = 0; i < healthTypeList.length; i++) {
            if (healthTypeList[i].key == type) {
              title = healthTypeList[i].value;
              unit = healthTypeList[i].unit;
            }
          }
          healthTypeList = healthTypeList.reverse();
          _this.setData({
            title: title,
            unit: unit,
          })
          wx.setNavigationBarTitle({
            title: _this.data.title + "体征"
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
  //切换状态栏
  navbarTap: function (e) {
    var _this = this;
    this.setData({
      currentTab: e.currentTarget.dataset.idx,
    })
    console.log(this.data.currentTab, "asd")
    _this.getChartData();
  },
  //获取图表数据
  getChartData: function () {
    var _this = this;
    var currentTab = _this.data.currentTab;
    var curDay = new Date();
    var newEndDate = new Date(curDay.getTime());
    var endDate = newEndDate.getFullYear() + '-' + ((newEndDate.getMonth() + 1) > 9 ? (newEndDate.getMonth() + 1) : ('0' + (newEndDate.getMonth() + 1))) + '-' + ((newEndDate.getDate() > 9 ? newEndDate.getDate() : ('0' + newEndDate.getDate())));

    console.log(endDate)
    var yearNewStartDate = new Date(curDay.getTime() - 1000 * 3600 * 24 * 364);
    var yearStartDate = yearNewStartDate.getFullYear() + '-' + ((yearNewStartDate.getMonth() + 1) > 9 ? (yearNewStartDate.getMonth() + 1) : ('0' + (yearNewStartDate.getMonth() + 1))) + '-' + (yearNewStartDate.getDate() > 9 ? yearNewStartDate.getDate() : ('0' + yearNewStartDate.getDate()));
    var quarterNewStartDate = new Date(curDay.getTime() - 1000 * 3600 * 24 * 89);
    var quarterStartDate = quarterNewStartDate.getFullYear() + '-' + ((quarterNewStartDate.getMonth() + 1) > 9 ? (quarterNewStartDate.getMonth() + 1) : ('0' + (quarterNewStartDate.getMonth() + 1))) + '-' + (quarterNewStartDate.getDate() > 9 ? quarterNewStartDate.getDate() : ('0' + quarterNewStartDate.getDate()));
    var monthNewStartDate = new Date(curDay.getTime() - 1000 * 3600 * 24 * 29);
    var monthStartDate = monthNewStartDate.getFullYear() + '-' + ((monthNewStartDate.getMonth() + 1) > 9 ? (monthNewStartDate.getMonth() + 1) : ('0' + (monthNewStartDate.getMonth() + 1))) + '-' + (monthNewStartDate.getDate() > 9 ? monthNewStartDate.getDate() : ('0' + monthNewStartDate.getDate()));
    var weekNewStartDate = new Date(curDay.getTime() - 1000 * 3600 * 24 * 6);
    var weekStartDate = weekNewStartDate.getFullYear() + '-' + ((weekNewStartDate.getMonth() + 1) > 9 ? (weekNewStartDate.getMonth() + 1) : ('0' + (weekNewStartDate.getMonth() + 1))) + '-' + (weekNewStartDate.getDate() > 9 ? weekNewStartDate.getDate() : ('0' + weekNewStartDate.getDate()));

    console.log(endDate, 7777)
    if (currentTab == "0") {
      _this.setData({
        startDate: endDate,
        endDate: endDate
      })
    } else if (currentTab == "4") {
      _this.setData({
        startDate: yearStartDate,
        endDate: endDate
      })
    } else if (currentTab == "3") {
      _this.setData({
        startDate: quarterStartDate,
        endDate: endDate
      })
    } else if (currentTab == "2") {
      _this.setData({
        startDate: monthStartDate,
        endDate: endDate
      })
    } else {
      _this.setData({
        startDate: weekStartDate,
        endDate: endDate
      })
    }
    console.log(_this.data.startDate, 77)
    console.log(_this.data.endDate, 88)
    var params = {
      params: {
        "userId": _this.data.userId,
        "type": _this.data.type,
        "startDate": _this.data.startDate,
        "endDate": _this.data.endDate,
  
      },
      "pageNo": 1,
      "pageSize": 999
    };
    console.log(params)
    app.request({
      url: '/familyInstRecode/selectList',
      header: {
        'content-type': 'application/json'
      },
      method: "Get",
      data: params,
      success: function (res) {
        console.log(res)
        if (res.code == 1) {
          //获取图表的值
          var listData = res.data,
            chartLength = listData.length,
            maxIndiValueArr = [],
            minIndiValueArr = [],
            indiValueArr = [],
            recodeTimeArr = [],
            indiValuelatest = "",
            maxIndiValuelatest = "",
            minIndiValuelatest = "",
            recodeTimelatest = "";
          if (chartLength != 0) {
            for (var i = 0; i < chartLength; i++) {
              indiValuelatest = listData[chartLength - 1].indiValue,
                maxIndiValuelatest = listData[chartLength - 1].maxIndiValue,
                minIndiValuelatest = listData[chartLength - 1].minIndiValue,
                recodeTimelatest = listData[chartLength - 1].recodeTime.slice(0, 10);
              indiValueArr.push(listData[i].indiValue);
              maxIndiValueArr.push(listData[i].maxIndiValue);
              minIndiValueArr.push(listData[i].minIndiValue);
              recodeTimeArr.push(listData[i].recodeTime.slice(0, 10));
            }
            _this.setData({
              statValue: res.obj,
              chartLength: chartLength,
              indiValuelatest: indiValuelatest,
              maxIndiValuelatest: maxIndiValuelatest,
              minIndiValuelatest: minIndiValuelatest,
              recodeTimelatest: recodeTimelatest,
              recodeTimeArr: recodeTimeArr,
            })
            if (_this.data.type == "2") {
              var series1 = {};
              series1.name = '高压';
              series1.data = maxIndiValueArr;
              series1.color = '#59a1f4';
              var series2 = {};
              series2.name = '低压';
              series2.data = minIndiValueArr;
              series2.color = '#ffba66';
              var seriesList1 = [series1, series2];
              _this.setData({
                seriesList: seriesList1,
              })
              _this.setOptionCount();
            } else {
              var series = {};
              series.name = _this.data.title;
              series.data = indiValueArr;
              series.color = '#59a1f4';
              var seriesList2 = [series];
              _this.setData({
                seriesList: seriesList2,
              })
              _this.setOptionCount();
            }
          } else {
            _this.setData({
              statValue: {},
              chartLength: 0,
            })
          }
        } else {
          wx.showToast({
            title: res.message,
            icon: 'none',
            duration: 2000
          })
        }
        console.log(endDate, "951")
      }
    })
  },
  //chart双曲线图表
  touchHandler: function (e) { //提示框
    console.log(lineChart.getCurrentDataIndex(e));
    lineChart.showToolTip(e, {
      format: function (item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  },
  setOptionCount: function () {
    var _this = this;
    var windowWidth = 320;
    console.log(_this.data.recodeTimeArr,"ws")
    console.log(_this.data.startDate, 77)
    console.log(_this.data.endDate, 88)
    var dis=[]
    dis[0] = _this.data.startDate
    dis[1] = _this.data.endDate
    console.log(dis)
    console.log(_this.data.seriesList,7555)
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth - 20;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    lineChart = new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      categories: _this.data.recodeTimeArr, //x轴数据
     
      animation: false,
      series: _this.data.seriesList,
      xAxis: {
        disableGrid: true, //不绘制X轴网格
        fontColor: '#b2b2b2',
        // min:2011,
        // max: 2088
      },
      yAxis: {
        title: '',
        gridColor: '#e8e8e8',
        fontColor: '#b2b2b2',
        min: 0,
      },
      width: windowWidth,
      height: 235,
      dataLabel: false, //是否在图表中显示数据内容值
      dataPointShape: true,
      legend: true,
      extra: {
        lineStyle: 'curve',
      },
    });
  },
  //新增记录按钮
  bindRecord: function () {
    var _this = this;
    wx.navigateTo({
      url: '../entry/entry?userId=' + _this.data.userId + '&type=' + _this.data.type
    })
  },
  getCommunityList: function (current) { //获取资讯
    var _this = this;
    var communityList = _this.data.communityList;
    var params = {
      news: {
        // "categoryIds": "677306557456486489",
        "status": 1
      },
      "pageNo": 1,
      "pageSize":999
    };
    params.pageNo = current;
    app.request({
      url: '/news/selectList',
      header: {
        'content-type': 'application/json'
      },
      method: "Get",
      data: params,
      success: function (res) {
        // console.log(res)
        if (res.code == 1) {
          if (res.data.length > 0) {
            _this.setData({
              communityList: communityList.concat(res.data),
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
        } else { }
      }
    })
  },
  //上拉加载
  lower: function (e) {
    var _this = this;
    _this.getCommunityList(_this.data.scroll.pageNum);
  },
  //跳转社区资讯列表
  linkCList: function () {
    wx.navigateTo({
      url: '../../../../community/list/list' //?categoryIds=677306557456486489
    })
  },
  //跳转社区资讯详情
  linkCDetail: function (e) {
    wx.navigateTo({
      url: '../../../../community/detail/detail?id=' + e.currentTarget.dataset.id
    })
  },
})