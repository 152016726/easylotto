// pages/info/report/detail/detail.js
const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        userInfo:{},
        recordId: "",
        examCode: "",
        hospHisCode: "",
        userName:"",
        recordTime:"",
        reportData:{},
        checkList1:[
            {detailTitle:"一般项目",detailCode:"1"},
            {detailTitle:"内科项目",detailCode:"2"},
            {detailTitle:"外科项目",detailCode:"3"},
            {detailTitle:"血常规",detailCode:"XCG"},
            {detailTitle:"尿常规",detailCode:"NCG"},
        ],
        checkList2:[
            {detailTitle:"超声检查室",detailCode:"FBBC"},
            {detailTitle:"放射科",detailCode:"XBXX"},
            {detailTitle:"心电图室",detailCode:"XDT"},
        ],
        isFold:true,
        projectList:[
            {code: "GGN", itemName: "肝功能"},
            {code: "SGN", itemName: "肾功能"},
            {code: "KFXT", itemName: "空腹血糖"},
            {code: "XZ", itemName: "血脂"},
            {code: "NWLDB", itemName: "尿微量蛋白"},
            {code: "THXHDB", itemName: "糖化血红蛋白"},
            {code: "DBQX", itemName: "大便潜血"},
            {code: "YXGY", itemName: "乙型肝炎"},
        ],
        // isShow:false,  //需要关注异常项
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var _this=this;
        wx.getStorage({
            key: 'userInfo',
            success: function (res) {
                _this.setData({
                    userInfo: res.data
                })
            }
        })
        _this.setData({
            recordId: options.id,
            examCode: options.examCode,
            hospHisCode: options.hospHisCode,
            userName:options.userName,
            recordTime:options.recordTime,
        });
        // _this.setData({
        //     recordId: "738128173688823808",
        //     examCode: "222",
        //     hospHisCode: "12445224719353907B",
        //     userName:"布墊",
        //     recordTime:"2018-08-03",
        // });
        _this.getReport();
    },
    //获取体检报告详情
    getReport: function () {
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
                        reportData: res.obj
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
    //点击实验室检查展开项目
    labCheckToggle:function () {
        var _this = this;
        var  isFold=_this.data. isFold;
        if( isFold===false){
            _this.setData({
                isFold:true,
            }) 
        }else{
            _this.setData({
                isFold:false,
            }) 
        }
    },
    //需重点关注的项目展开收起
    // infoToggle:function () {
    //     var _this = this;
    //     var isShow=_this.data.isShow;
    //     if(isShow===false){
    //         _this.setData({
    //             isShow:true,
    //         }) 
    //     }else{
    //         _this.setData({
    //             isShow:false,
    //         }) 
    //     }
    // },
})