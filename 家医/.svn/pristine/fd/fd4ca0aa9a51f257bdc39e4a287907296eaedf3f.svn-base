import drawQrcode from '../../../utils/weapp.qrcode.esm.js';
var wxCharts = require('../../../utils/wxcharts-min.js');
var app = getApp();
var lineChart = null;
Page({
    data: {
        showDialogCode: false,
        bgMode:'scaleToFill',
        bgSrc:'../../../images/bg_sign.png',
        userInfo:{},
        orgId:"",
        teamId:"",
        docId:"",
        scanSignUrl:"",
    },
    onLoad: function () {
        var _this=this;
        wx.getStorage({
            key: 'userInfo',
            success: function (res) {
                _this.setData({
                    userInfo: res.data,
                    orgId:res.data.doc.orgId,
                    teamId:res.data.doc.teamInfo.teamId,
                    docId:res.data.doc.id,
                    scanSignUrl:res.data.doc.teamInfo.scanSignUrl,
                });
                drawQrcode({
                    width: 170,
                    height: 170,
                    canvasId: 'myQrcode',
                    text: _this.data.scanSignUrl,
                });
                _this.getCountList();
            }
        });
       
    },
    getDay:function(){
        var curDay = new Date();
        var newStartDate = new Date(curDay.getTime() - 1000*3600*24*5);
        var startDate = newStartDate.getFullYear() + '-'+((newStartDate.getMonth()+1)>9?(newStartDate.getMonth()+1):('0'+(newStartDate.getMonth()+1)))+'-'+(newStartDate.getDate()>9?newStartDate.getDate():('0'+newStartDate.getDate()));
        var newEndDate = new Date(curDay.getTime() - 1000*3600*24*1);
        var endDate = newEndDate.getFullYear() + '-'+((newEndDate.getMonth()+1)>9?(newEndDate.getMonth()+1):('0'+(newEndDate.getMonth()+1)))+'-'+((newEndDate.getDate()>9?newEndDate.getDate():('0'+newEndDate.getDate())));
        //返回当前五天对象数组
        var fiveDays = [];
        for (var i = 5; i >= 1; i--) {
            var day = new Date(curDay.getTime() - 1000*3600*24*i);
            fiveDays[5-i]=((day.getMonth()+1)>9?(day.getMonth()+1):('0'+(day.getMonth()+1)))+'-'+(day.getDate()>9?day.getDate():('0'+day.getDate()));
        }
        return {
            days: fiveDays, 
            startDate:startDate,
            endDate:endDate
        }
    },
    getCountList: function () {
        var _this=this;
        var interceptDate = _this.getDay();
        var params={
            params:{
                "orgId":_this.data.orgId,
                "teamId":_this.data.teamId,
                "startDate": interceptDate.startDate,
                "endDate":interceptDate.endDate
            }
        };
        app.request({
            url: '/doctor/familyUserSignMember/countOrgTeamMember',
            header: {
                'content-type': 'application/json'
            },
            method: "Get",
            data: params,
            success: function (res) {
                if (res.code == 1) {
                    var listData = res.data;
                    var teamCountArr = [];
                    var orgCountArr = [];
                    for(var i = listData.length - 1; i >= 0; i--){
                        orgCountArr.push(listData[i].orgTotal);
                        teamCountArr.push(listData[i].teamTotal);
                    }
                    var maxNum1 = Math.max.apply(null,orgCountArr); 
                    var maxNum2 = Math.max.apply(null,teamCountArr);
                    _this.setOptionCount(orgCountArr,teamCountArr,maxNum1,maxNum2);
                }else {
                    wx.showToast({
                        title:res.message,
                        icon:'none',
                        duration:2000
                    })
                }
            }
        })
    },
    touchHandler: function (e) { //提示框
        console.log(lineChart.getCurrentDataIndex(e));
        lineChart.showToolTip(e, {
            format: function (item, category) {
                return category + ' ' + item.name + ':' + item.data
            }
        });
    },
    setOptionCount: function (orgCountArr,teamCountArr,maxNum1,maxNum2) {
        var windowWidth = 320;
        try {
            var res = wx.getSystemInfoSync();
            windowWidth = res.windowWidth-20;
        } catch (e) {
            console.error('getSystemInfoSync failed!');
        }
        var interceptDate = this.getDay();
        lineChart = new wxCharts({
            canvasId: 'lineCanvas',
            type: 'line',
            categories: interceptDate.days, //x轴数据
            animation: true,
            series: [{
                name: '全院',
                data: orgCountArr,
                color:'#21a1f6',
            }, {
                name: '本团队',
                data: teamCountArr,
                color:'#ff918c',
            }],
            xAxis: {
                disableGrid: true, //不绘制X轴网格
                fontColor:'#bababa',
            },
            yAxis: {
                title: '',
                gridColor:'#e8e8e8',
                fontColor:'#bababa',
                min: 0,
            },
            width: windowWidth,
            height: 250,
            dataLabel: false, //是否在图表中显示数据内容值
            dataPointShape: true,
            legend:false,
            extra: {
                lineStyle: 'straight',
            },
        });
        //设置y轴最大值
        if(maxNum1<10 && maxNum2<10){
            lineChart.opts.yAxis.max = 10;
        }else{
            lineChart.opts.yAxis.max = null;
        }
    },
    //二维码弹出框
    showDialogCode: function () {
        this.setData({
            showDialogCode: true,
        });
    },
    onCancelDialog:function(){
        this.setData({
            showDialogCode:false,
        });
    },
});