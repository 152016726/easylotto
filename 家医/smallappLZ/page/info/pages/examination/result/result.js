// pages/info/report/detail/detail.js
const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        recordId: "",
        examCode: "",
        hospHisCode: "",
        detailTitle:"",
        detailCode:"",
        generalData1:{},
        generalData2:{},
        dentitionStr:"",
        internalData:{},
        detailItemName:"",
        detailDesc:"",
        detailOtherDesc:"",
        checkObjDataNone:true,
        checkObjData:[],
    },
    /**
    * 生命周期函数--监听页面加载
    */
    onLoad: function (options) {
        var _this=this;
        _this.setData({
            recordId: options.id,
            examCode: options.examCode,
            hospHisCode: options.hospHisCode,
            detailTitle:options.detailTitle,
            detailCode:options.detailCode,
        });
        wx.setNavigationBarTitle({ 
            title: _this.data.detailTitle
        }) 
        if(_this.data.detailCode=="1"||_this.data.detailCode=="2"||_this.data.detailCode=="3"){
            _this.getGeneralData1();
            _this.getGeneralData2();
            _this.getInternalData();
        }else if(_this.data.detailCode=="DBQX"||_this.data.detailCode=="YXGY"||_this.data.detailCode=="GJTP"||_this.data.detailCode=="FBBC"||_this.data.detailCode=="XBXX"||_this.data.detailCode=="XDT"){
            _this.getFZJCData1();
        }else{
            _this.getFZJCData2();
        }
    },
    //一般项目中的基本体征
    getGeneralData1: function () {
        var _this=this;
        var params = {
            params: {
                "id": _this.data.recordId,//健康档案id
                "examCode": _this.data.examCode,//data中获取用户id
                "hospHisCode": _this.data.hospHisCode,
            },
        };
        app.request({
            url: '/health/selectPhysicalExamDetail',
            header: {'content-type': 'application/json'},
            method: "Get",
            data: params,
            success: function (res) {
                if (res.code == 1) {
                    _this.setData({
                        generalData1: res.obj
                    });
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
    //一般项目中的视力听力、外科口腔及运动能力
    getGeneralData2: function () {
        var _this=this;
        var params = {
            params: {
                "id": _this.data.recordId,//健康档案id
                "examCode": _this.data.examCode,//data中获取用户id
                "hospHisCode": _this.data.hospHisCode,
                "itemCode":"ZQGN",
            },
        };
        app.request({
            url: '/health/selectExamItemDetail',
            header: {'content-type': 'application/json'},
            method: "Get",
            data: params,
            success: function (res) {
                if (res.code == 1) {
                    var objData = res.obj;
                    _this.setData({
                        generalData2: objData,
                    });
                    var dentition=objData.dentition.split("|");
                    var dentitionStr = '';
                    for(var i=0;i<dentition.length;i++){
                        dentitionStr+=dentition[i]
                        dentitionStr+=`\n`
                    }
                    _this.setData({
                        dentitionStr:dentitionStr,
                    });
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
    //内外科项目
    getInternalData: function () {
        var _this=this;
        var params = {
            params: {
                "id": _this.data.recordId,//健康档案id
                "examCode": _this.data.examCode,//data中获取用户id
                "hospHisCode": _this.data.hospHisCode,
                "itemCode":"CT",
            },
        };
        app.request({
            url: '/health/selectExamItemDetail',
            header: {'content-type': 'application/json'},
            method: "Get",
            data: params,
            success: function (res) {
                if (res.code == 1) {
                    _this.setData({
                        internalData: res.obj
                    });
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
    //辅助检查项目(大便潜血、乙型肝炎、宫颈涂片、超声检查室、放射科、心电图室)
    getFZJCData1:function () {
        var _this=this;
        var params = {
            params: {
                "id": _this.data.recordId,//健康档案id
                "examCode": _this.data.examCode,//data中获取用户id
                "hospHisCode": _this.data.hospHisCode,
                "itemCode":"FZJC",
            },
        };
        app.request({
            url: '/health/selectExamItemDetail',
            header: {'content-type': 'application/json'},
            method: "Get",
            data: params,
            success: function (res) {
                if (res.code == 1) {
                    var projectList=res.obj.items;
                    var detailCode=_this.data.detailCode;
                    var detailItemName="";
                    var detailDesc="";
                    var detailOtherDesc="";
                    for(var i=0;i<projectList.length;i++){
                        if(projectList[i].code==detailCode){
                            detailItemName=projectList[i].itemName;
                            detailDesc=projectList[i].desc;
                            detailOtherDesc=projectList[i].otherDesc;
                        }
                    }
                    _this.setData({
                        detailItemName:detailItemName,
                        detailDesc: detailDesc,
                        detailOtherDesc:detailOtherDesc,
                    })
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
    //辅助检查项目(血常规、尿常规、实验室检查)
    getFZJCData2: function () {
        var _this=this;
        var params = {
            params: {
                "id": _this.data.recordId,//健康档案id
                "examCode": _this.data.examCode,//data中获取用户id
                "hospHisCode": _this.data.hospHisCode,
                "itemCode":"FZJC",
                "code":_this.data.detailCode,
            },
        };
        app.request({
            url: '/health/selectAuxiliaryExaminationDetail',
            header: {'content-type': 'application/json'},
            method: "Get",
            data: params,
            success: function (res) {
                if (res.code == 1) {
                    var checkObjData=res.data;
                    if(checkObjData.length==0){
                        _this.setData({
                            checkObjDataNone:true,
                        })
                    }else{
                        for(var i=0;i<checkObjData.length;i++){
                            if(checkObjData[i].type==1){
                                //获取正常值范围
                                var regexp = /\d+(\.\d+)?/g; 
                                var minValue=Number(checkObjData[i].min); //正常范围最小值
                                var maxValue=Number(checkObjData[i].max); //正常范围最大值
                                var checkValue=Number(checkObjData[i].value); //用户检测值
                                checkObjData[i].rangeType="";
                                checkObjData[i].rangeLeft=new Number();
                                var differenceTotal=Number(maxValue-minValue);
                                var differenceCheckValue=Number(checkValue-minValue);
                                var rangeLeft=Math.round((differenceCheckValue/differenceTotal)*560-16);
                                if(checkValue<minValue){
                                    checkObjData[i].rangeLeft="-30";
                                    checkObjData[i].rangeType="1";
                                }else if(checkValue>maxValue){
                                    checkObjData[i].rangeLeft="556";
                                    checkObjData[i].rangeType="3";
                                }else{
                                   checkObjData[i].rangeLeft=rangeLeft;
                                   checkObjData[i].rangeType="2";
                                }
                            }
                        }
                        _this.setData({
                            checkObjData: checkObjData,
                            checkObjDataNone:false
                        })
                    }
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