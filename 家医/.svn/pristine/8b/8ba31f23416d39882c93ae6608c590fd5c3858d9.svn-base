//获取应用实例
const app = getApp();
Page({
    data: {
        examinationList: [],
        userInfo: {},
        recordId:"",//健康档案id
        userName:"",//用户姓名
        "startTime":(new Date().getFullYear()-9)+'-01-01',
        "endTime":(new Date().getFullYear())+'-12-31',
        scroll: {
            ifNull: false,
            loadText:'加载中...',
            pageNum:1,
            nullText:''
        },
        isData:false,//判断页面是否有数据
        height:0
    },
    onLoad: function () {
        var _this = this;
        /*var userInfo={
            id:"726227641791442944"
        }
        wx.setStorageSync("userInfo", userInfo);*/
        wx.getStorage({
            key: 'userInfo',//获取用户信息
            success: function (res) {
                _this.setData({
                    userInfo: res.data//data设置获取用户信息
                });
                /*console.log("有用户id----")
                console.log(res.data.id);*/
                if(res.data.id){//如果有用户
                    wx.getSystemInfo({
                        success: function (res) {
                            _this.setData({
                                height: res.windowHeight
                            })
                        }
                    });
                    _this.getRecordId(res.data.id);
                }else{
                    wx.navigateTo({
                        url: '../../editinfo/editinfo'//注册用户页面
                    })
                }
            }
        })
    },
    //下拉刷新
    upper: function(e){
        var _this = this;
        wx.showToast({
            title: '数据刷新中',
            icon:'loading',
            duration:10000,
            mask:true
        });
        _this.setData({
            examinationList: []
        });
        _this.getExaminationList(1);
    },
    //上拉加载
    lower:function(e){
        var _this=this;
        _this.getExaminationList(_this.data.scroll.pageNum);
    },
    /**
     * 获取健康档案id
     * params userId
     * */
    getRecordId:function(userId){
        var _this=this;
        var params={
            "userId": userId
        }
        app.request({
            url:"/health/selectRecordIdByUserId",
            header:{
                'content-type': 'application/json'
            },
            method:"GET",
            data:params,
            success: function (res) {
                /*console.log("用户健康档案id");
                console.log(res);*/
                if(res.code==1){
                    console.log(res.obj);
                    _this.setData({
                        "recordId":res.obj
                    });
                    _this.getInfo();//获取个人信息'
                    //_this.getExaminationList(_this.data.scroll.pageNum);//获取体检列表数据-在获取个人信息之后获取
                } else {
                    wx.hideToast();
                    _this.setData({
                        scroll: {
                            ifNull: true,
                            nullText:'暂时没有数据！'
                        }
                    });
                    wx.showToast({
                        title: res.message,
                        icon:'none',
                        duration:2000
                    })
                }
            }
        })

    },
    /**
     * 获取个人信息
     * params id 档案id
     * */
    getInfo:function(){
        var _this=this;
        var params = {
            'id': _this.data.recordId
        };
        app.request({
            url:"/health/selectById",
            header:{
                'content-type': 'application/json'
            },
            method:"GET",
            data:params,
            success: function (res) {
                /*console.log("用户信息");
                console.log(res);*/
                if(res.code==1){
                    _this.setData({
                        "userName":res.obj.name
                    });
                    _this.getExaminationList(_this.data.scroll.pageNum);//有个人信息之后，获取数据列表
                } else {
                    wx.hideToast();
                    _this.setData({
                        scroll: {
                            ifNull: true,
                            nullText:'暂时没有数据！'
                        }
                    });
                     wx.showToast({
                     title: res.message,
                     icon:'none',
                     duration:2000
                     })
                }
            }
        })
    },
    /**
     * 获取个人健康体检列表
     *
     * */
    getExaminationList:function(current){
        var _this=this;
        var examinationList=_this.data.examinationList;
        var params={
            params:{
                "startTime" : _this.data.startTime ,//data中获取用户id
                "id" : _this.data.recordId,
                "endTime" : _this.data.endTime,
                actTypeET:6,
                "pageNo":1,
                "pageSize":10
            },
        };
        params.params.pageNo=current;
        if(params.params.pageNo){
            app.request({
                url:"/health/selectList",
                header:{
                    'content-type': 'application/json'
                },
                method:"GET",
                data:params,

                success: function (res) {
                    if(res.code==1){
                        if(res.data.length>0){
                            if(current<=1){
                                _this.setData({
                                    isData: true
                                });
                            }
                            _this.setData({
                                examinationList:examinationList.concat(res.data),
                                scroll: {
                                    ifNull: false,
                                    pageNum:current + 1 //当前值加1
                                }
                            });
                        }else{
                            if(res.pageNo == 1){
                                if(_this.data.isData){//发现接口返回回来如果到了第二页还是显示pageNo == 1，数据又是正常的，暂时做此处理,接口已恢复pageNo == 2，此处暂时保留此行代码
                                    _this.setData({
                                        scroll: {
                                            ifNull: false,
                                            loadText:'加载完毕！'
                                        }
                                    })
                                }else{
                                    _this.setData({
                                         scroll: {
                                         ifNull: true,
                                         nullText:'暂时没有数据！'
                                         }
                                    })
                                }
                            }else{
                                _this.setData({
                                    scroll: {
                                        ifNull: false,
                                        loadText:'加载完毕！'
                                    }
                                })
                            }
                        }
                        wx.hideToast();
                    } else {
                        wx.hideToast();
                        wx.showToast({
                            title: res.message,
                            icon:'none',
                            duration:2000
                        })
                    }
                }
            })

        }
    }
})
