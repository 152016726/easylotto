//detail.js
//获取应用实例
const app = getApp()

Page({
	data: {
        docId:"",                         //医生id
        id:"",                            //页面参数id
        orgId:"",                         //机构id
        signId:"",                        //签约id
        detail:{},                        //详情页面信息
        contactInfo:{},                   //联系人信息
        signMembers:[],                   //签约家庭成员数组
		showDialogSelectStatus: false,    //选择人群分类弹窗
		showDialogRejectStatus:false,     //拒绝弹窗
        refuseReason:[],                  //拒绝理由
        categoryNames:[],                 //人群分类标签名
        currentIdcard:"",                 //点击当前成员的idCard
        currentMemberId:"",               //点击当前成员的memberId
        currentId:"",                     //点击当前成员的id
        currentReasonId:"",               //选择的理由
        selectId:"",                      //选择标签对应的id
    },
	onLoad: function(options) {  
		var _this=this;
        _this.setData({
            docId: options.docId,
            id: options.id,
        });
        _this.getCheckDetail();
	},
    //获取详情页数据
    getCheckDetail: function () {
        var _this=this;
        var params={
            params:{
                "docId": _this.data.docId,
                "id":_this.data.id, 
            }
        };
        app.request({
            url: '/order/family/doctor/select',
            header: {'content-type': 'application/json'},
            method: "Get",
            data: params,
            success: function (res) {
                if (res.code == 1) {
                    var contactInfo = JSON.parse(res.obj.addressStr); 
                    var signMembers = JSON.parse(res.obj.signMembers);
                    _this.setData({
                        detail: res.obj,
                        contactInfo:contactInfo, //联系人联系方式
                        signMembers:signMembers, //签约成员
                        orgId:res.obj.orgId,
                        signId:res.obj.signId,
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
    //选择人群分类弹出框（获取当前成员分类参数）
    showDialogSelect: function (e) {
        this.setData({
            showDialogSelectStatus: true,
            currentIdcard: e.currentTarget.dataset.idcard,
            currentMemberId: e.currentTarget.dataset.memid,
            currentId: e.currentTarget.dataset.id,
        });
        this.initCategory();
    },
    //初始化标签分类
    initCategory:function(){
        var _this=this;
        var params={
            params:{
                "idCard":_this.data.currentIdcard,
            },
            "pageSize": 1000
        };
        app.request({
            url: '/doctor/familyUserSignMemberCategory/selectFilterInitCategories',
            header: {'content-type': 'application/json'},
            method: "Get",
            data: params,
            success: function (res) {
                var listData=res.data;
                if (res.code == 1) {
                    for(var i = 0;i<listData.length ; i++){
                        listData[i].checked = '';
                    }
                    _this.setData({
                        categoryNames:listData,
                    })
                    console.log(listData)
                    _this.getSelectedMember()
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
    //获取当前成员选择的标签
    getSelectedMember:function () {
        var _this=this;
        var params={
            params:{
                "memberSignId":_this.data.currentId,
            }
        };
        app.request({
            url: '/doctor/familyUserSignMemberCategory/selectList',
            header: {'content-type': 'application/json'},
            method: "Get",
            data: params,
            success: function (res) {
                if (res.code == 1) {
                    var listData = res.data;
                    var categoryNames = _this.data.categoryNames;
                    var selectId = [];
                    for(var i = 0; i<listData.length; i++){
                        selectId.push(listData[i].dicId)
                        for(var j = 0; j<categoryNames.length; j++){
                            if (listData[i].dicId == categoryNames[j].id) {
                                categoryNames[j].checked = 'true'
                            }
                        }
                    }
                    _this.setData({
                        categoryNames: categoryNames,
                        selectId: selectId.join(";")
                    })
                    console.log(categoryNames)
                    console.log(selectId)
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
    //选择分类选择标签点击事件
    checkboxChange: function(e) {
      console.log(e)
        this.setData({
            selectId: e.detail.value.join(";")
        })
    },
    //点击选择分类弹窗确定按钮并上传分类
    onConfirmSelect:function(){
        this.hideDialog();
        var _this=this;
        var params={
            params:{
                'memberSignId': _this.data.currentId,
                'memberId':_this.data.currentMemberId,
                'sysDicIds':_this.data.selectId, 
                'signId': _this.data.signId, 
                'orgId':_this.data.orgId,
            }
        };
        app.request({
            url: '/doctor/familyUserSignMemberCategory/insert',
            header: {'content-type': 'application/json'},
            method: "Get",
            data: params,
            success: function (res) {
                if (res.code == 1) {
                    _this.getCheckDetail();
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
    //选择拒绝理由弹出框
    showDialogReject: function () {
        this.setData({
            showDialogRejectStatus: true,
        });
        var _this=this;
        var params={
            params:{
                "orgId":_this.data.orgId,
                "typeId":"0",
                "status":"1"
            }
        };
        app.request({
            url: '/refuseReasonDetail/selectList',
            header: {'content-type': 'application/json'},
            method: "Get",
            data: params,
            success: function (res) {
                if (res.code == 1) {
                    _this.setData({
                        refuseReason:res.data
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
    //获取选择拒绝理由
    radioChange:function (e) {
        this.setData({
            currentReasonId: e.currentTarget.dataset.id,
        });
    },
    //点击拒绝理由弹窗确定按钮
    onConfirmReject:function(){
        var _this=this;
        if(_this.data.currentReasonId==""){
            wx.showToast({
                title: '请选择拒绝理由',
                icon: 'none',
                duration: 2000
            });
        }else{
            this.hideDialog();
            var params={
                params:{
                   "id":_this.data.id, 
                   "docId":_this.data.docId,
                   "status":"4",
                   "reasonId":_this.data.currentReasonId
                }
            };
            app.request({
                url: '/order/family/doctor/verify',
                header: {'content-type': 'application/json'},
                method: "Get",
                data: params,
                success: function (res) {
                    console.log(res)
                    if (res.code == 1) {
                        wx.showToast({
                            title: '已拒绝',
                            icon: '',
                            duration: 2000
                        });
                        _this.getCheckDetail();
                        setTimeout(function(){
                            wx.navigateTo({
                                url: "/pages/doctor/check/list/list?docId="+_this.data.docId
                            })
                        },2300);
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
    //已同意上传信息
    onConfirm: function () {
        var _this=this;
        var params={
            params:{
               "id":_this.data.id, 
               "docId":_this.data.docId,
               "status":"1",
            }
        };
        app.request({
            url: '/order/family/doctor/verify',
            header: {'content-type': 'application/json'},
            method: "Get",
            data: params,
            success: function (res) {
                if (res.code == 1) {
                    wx.showToast({
                        title: '已同意',
                        icon:'',
                        duration: 2000
                    });
                    _this.getCheckDetail();
                    setTimeout(function(){
                        wx.navigateTo({
                            url: "/pages/doctor/check/list/list?docId="+_this.data.docId
                        })
                    },2300);
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
    //点击关闭拒绝理由、选择分类弹窗
    hideDialog: function () {
        this.setData({
            showDialogRejectStatus: false,
            showDialogSelectStatus: false,
        });
    },
    onCancelDialog:function(){
        this.hideDialog();
    },
})