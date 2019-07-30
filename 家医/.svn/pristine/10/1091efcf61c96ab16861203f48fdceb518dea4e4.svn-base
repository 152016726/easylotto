//detail.js
//获取应用实例
const app = getApp()
Page({
	data: {
        docId:"",                          //医生id
        id:"",     
        detail:{},                         //详情列表
        userName:'',                       //患者姓名
        userMobile:'',                     //患者手机号
    },
	onLoad: function(options) {
		var _this=this;
        _this.setData({
            docId: options.docId,
            id: options.id,
        });
        _this.getDetail();
	},
    //获取详情页数据
    getDetail: function () {
        var _this=this;
        var detail=_this.data.detail;
        var params={
            "id":_this.data.id, 
        };
        app.request({
            url: '/familyShortComment/select',
            header: {'content-type': 'application/json'},
            method: "Get",
            data: params,
            success: function (res) {
                console.log(res)
                if (res.code == 1) {
                    var dataList = res.obj;
                    _this.setData({
                        detail:  res.obj, 
                    })
                    //如果患者咨询的是团队则被咨询医生id为空，做信息隐私处理
                    var userName = dataList.userName;
                    var userMobile = dataList.userMobile;
                    var recrFdocId = dataList.recrFdocId;
                    if(recrFdocId==""){
                        if (userMobile) {
                            var reg = /^(\d{3})\d{5}(\d{3})$/;
                            userMobile = userMobile.replace(reg, "$1*****$2");
                            _this.setData({
                                userMobile:  userMobile
                            })
                        }
                        if (userName) {
                            // userName = userName.replace(/.(?=.)/g, '*');
                            _this.setData({
                                userName:  userName
                            })
                        }
                    }else{
                        _this.setData({
                            userName:userName,
                            userMobile: userMobile
                        }) 
                    }
                }else {
                    console.log('code : 0')
                    wx.hideToast();
                }
            }
        })
    },
    //提交回复信息
    onConfirm: function (e) {
        console.log(e.detail.value.textarea)
        var _this=this;
        var repayContent=e.detail.value.textarea;
        if(repayContent==""){
            wx.showToast({
                title:"请输入您的答复",
                icon:'none',
                duration:2000
            })
        }else{
            var params={
                params:{
                    "repayContent": repayContent,
                    "repayId": _this.data.docId,
                    "id": _this.data.id,
                }
            };
            app.request({
                url: '/familyShortComment/repay',
                header: {'content-type': 'application/json'},
                method: "Get",
                data: params,
                success: function (res) {
                    if (res.code == 1) {
                        wx.showToast({
                            title: '已提交',
                            icon:'',
                            duration: 2000,
                        });
                        setTimeout(function(){
                            wx.navigateBack()
                        },2300);
                        _this.getDetail();
                    }else {
                        wx.showToast({
                            title:res.message,
                            icon:'none',
                            duration:2000
                        })
                    }
                }
            })
        }
    },
})