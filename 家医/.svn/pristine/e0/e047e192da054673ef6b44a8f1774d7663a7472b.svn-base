// pages/info/report/detail/detail.js
const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        itemId:"",
        patientId:"",
        // itemId:"645046526708641794",
        // patientId:"756589298259910656",
        itemType:1,
        abnormalNum:0,
        checkObj:{},
        inspecObj:{},
        minValue:56,
        maxValue:80,
        checkValue:80,
        rangeLeft:560,
        resultMsg:[],
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var _this=this;
        var itemId=options.itemId;
        var patientId=options.patientId;
        var itemType=options.itemType;
        _this.setData({
            itemId:itemId,
            patientId:patientId,
            itemType:itemType
        })
        if(itemType==1){
            _this.getCheckDetail();
        }else{
            _this.getInspecDetail();
        }
    },
    //获取检验报告详情
    getCheckDetail: function () {
        var _this=this;
        var params={
            item:{
                "itemId": _this.data.itemId,
                "patientId": _this.data.patientId
            }
        };
        app.request({
            url: '/resultItem/check/selectDetail',
            header: {'content-type': 'application/json'},
            method: "Get",
            data: params,
            success: function (res) {
                console.log(res)
                if (res.code == 1) {
                    var checkObj= res.obj;
                    var checkObjData=res.obj.data;
                    var abnormalNum=_this.data.abnormalNum;
                    for(var i=0;i<checkObjData.length;i++){
                        for(var j=0;j<checkObjData[i].resultMsg.length;j++){
                            //遍历resultMsg，统计异常数量
                            if(checkObjData[i].resultMsg[j].isStandard&&checkObjData[i].resultMsg[j].isStandard!="1"){
                                abnormalNum+=1;
                            }
                            if(checkObjData[i].resultMsg[j].resultType==1){
                                //获取正常值范围
                                var regexp = /\d+(\.\d+)?/g; 
                                var referenceVal = checkObjData[i].resultMsg[j].reference.match(regexp);//正则获取正常范围值
                                var minValue=Number(referenceVal[0]); //正常范围最小值
                                var maxValue=Number(referenceVal[1]); //正常范围最大值
                                var checkValue=Number(checkObjData[i].resultMsg[j].resultMsg); //用户检测值
                                checkObjData[i].resultMsg[j].rangeType="";
                                checkObjData[i].resultMsg[j].rangeLeft=new Number();
                                checkObjData[i].resultMsg[j].minValue=minValue;
                                checkObjData[i].resultMsg[j].maxValue=maxValue;
                                var differenceTotal=Number(maxValue-minValue);
                                var differenceCheckValue=Number(checkValue-minValue);
                                var rangeLeft=Math.round((differenceCheckValue/differenceTotal)*560-16);
                                if(checkValue<minValue){
                                    checkObjData[i].resultMsg[j].rangeLeft="-30";
                                    checkObjData[i].resultMsg[j].rangeType="1";
                                }else if(checkValue>maxValue){
                                    checkObjData[i].resultMsg[j].rangeLeft="556";
                                    checkObjData[i].resultMsg[j].rangeType="3";
                                }else{
                                   checkObjData[i].resultMsg[j].rangeLeft=rangeLeft;
                                   checkObjData[i].resultMsg[j].rangeType="2";
                                }
                            }
                        }
                    }
                    _this.setData({
                        checkObj: checkObj,
                        abnormalNum:abnormalNum
                    })
                    wx.setNavigationBarTitle({ title: _this.data.checkObj.item.itemName})    
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
    //获取检查报告详情
    getInspecDetail: function () {
        var _this=this;
        var params={
            item:{
                "itemId": _this.data.itemId,
                "patientId": _this.data.patientId
            }
        };
        console.log(params)
        app.request({
            url: '/resultItem/inspec/selectDetail',
            header: {'content-type': 'application/json'},
            method: "Get",
            data: params,
            success: function (res) {
                console.log(res)
                if (res.code == 1) {
                    var inspecObj= res.obj;
                    _this.setData({
                        inspecObj: inspecObj,
                    })
                    wx.setNavigationBarTitle({ title: _this.data.inspecObj.item.itemName}) 
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
})