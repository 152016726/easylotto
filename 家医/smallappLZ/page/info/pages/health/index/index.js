const app = getApp()
Page({
	data: {
        userId:"",
        healthTypeList:[],
		scroll: {
            ifNull: false,
            loadText:'加载中...',
            pageNum:1,
            nullText:''
        },
        communityList: [],
        height:0,
	},
	onLoad: function () {
        var _this = this;
        wx.getSystemInfo({
            success: function (res) {
                _this.setData({
                    height: (res.windowHeight / 2) - 20
                })
            }
        });
	},
    onShow: function () {
        var _this = this;
        wx.getStorage({
            key: 'userInfo',
            success: function (res) {
                console.log('---------------')
                console.log(res)
                _this.setData({
                    userId: res.data.id,
                });
                _this.getHealthType();
            }
        });
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
    },
    //获取体征各指数极限值和类型参数
    getHealthType:function(){
        var _this=this;
        var params={
            "userId":_this.data.userId
        };
        app.request({
            url: '/familyInstRecode/selectInstLimitType',
            header: {'content-type': 'application/json'},
            method: "Get",
            data: params,
            success: function (res) {
                console.log(res)
                if (res.code == 1) {
                    var healthType = res.obj;
                    var healthTypeList =[];
                    for(var i in healthType){
                        healthTypeList.push(healthType[i]);
                    }
                    console.log(healthTypeList)
                    for(var i=0;i<healthTypeList.length;i++){
                        healthTypeList[i].indiValue = "";
                        healthTypeList[i].standard = "";
                        healthTypeList[i].maxIndiValue = "";
                        healthTypeList[i].minIndiValue = "";
                    }
                    healthTypeList=healthTypeList.reverse();
                    _this.setData({
                        healthTypeList:healthTypeList,
                    })
                    _this.getInstLatest();
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
    //最新的体征数据列表
    getInstLatest:function(){
        var _this=this;
        var params={
            "userId":_this.data.userId
        };
        app.request({
            url: '/familyInstRecode/selectInstLatest',
            header: {'content-type': 'application/json'},
            method: "Get",
            data: params,
            success: function (res) {
                console.log(res)
                if (res.code == 1) {
                    var latestList = res.data;
                    var healthTypeList = _this.data.healthTypeList;
                    for(var i=0;i<latestList.length;i++){
                       for(var j=0;j<healthTypeList.length;j++){
                            if(latestList[i].type == healthTypeList[j].key){
                                healthTypeList[j].indiValue = latestList[i].indiValue;
                                healthTypeList[j].standard = latestList[i].standard;
                                healthTypeList[j].maxIndiValue = latestList[i].maxIndiValue;
                                healthTypeList[j].minIndiValue = latestList[i].minIndiValue;
                            }
                        }
                    }
                    _this.setData({
                        healthTypeList:healthTypeList
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
    getCommunityList: function (current) {//获取资讯
        var _this = this;
        var communityList = _this.data.communityList;
        var params = {
                news: {
                // "categoryIds": "677306557456486489",
                "status": 1
            },
            "pageNo": current,
            "pageSize": 10
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
                } else {
                }
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
            url: '../../../../community/list/list'//?categoryIds=677306557456486489
        })
    },
    //跳转社区资讯详情
    linkCDetail: function (e) {
        wx.navigateTo({
            url: '../../../../community/detail/detail?id=' + e.currentTarget.dataset.id
        })
    },
})
