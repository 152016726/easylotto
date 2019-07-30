//mine.js
//获取应用实例
const app = getApp();
Page({
    data: {
        recordId: "",
        examCode: "",
        hospHisCode: "",
        healthAssessment: "",
        healthGuide: "",
        reportData: {}
    },
    onLoad: function (options) {
        var _this = this;
        _this.setData({
            recordId: options.id,
            examCode: options.examCode,
            hospHisCode: options.hospHisCode
        });
       /* _this.setData({
            recordId: "726227641951748096",
            examCode: "222",
            hospHisCode: "12445224719353907B"
        });*/
        //获取健康评估报告examCode=222&hospHisCode=12445224719353907B&id=726227641951748096
        _this.getReport();
    },
    //获取健康评估报告
    getReport: function () {
        var _this = this;
        var params = {
            params: {
                "id": _this.data.recordId,//健康档案id
                "examCode": _this.data.examCode,//data中获取用户id
                "hospHisCode": _this.data.hospHisCode,
            },
        };
        app.request({
            url: "/health/selectPhysicalExamDetail",
            header: {
                'content-type': 'application/json'
            },
            method: "GET",
            data: params,
            success: function (res) {
                if (res.code == 1) {
                    _this.setData({
                        reportData: res.obj
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
});

