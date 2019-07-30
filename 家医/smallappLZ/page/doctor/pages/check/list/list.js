//list.js
//获取应用实例
const app = getApp();
Page({
    data: {
        docId:"",
        navbar: ['待审核', '已审核'], 
        currentTab: 0 ,
        inputShowed: false,
        inputVal: "",
        scroll: {
            ifNull: true,
            loadText: '加载中...',
            pageNum: 1,
            nullText: '暂无数据'
        },
        height: 0,
        checkList:[],
        ifunGet: false                      //否执行下拉刷新 是为不刷新
    },
    onLoad: function (options) {
        var _this=this;
        this.setData({
            docId: options.docId,
        })
        _this.getCheckList(_this.data.scroll.pageNum);
        wx.getSystemInfo({
            success: function (res) {
                _this.setData({
                    height: res.windowHeight-98
                })
            }
        })
    },
    onShow:function(){
        var _this = this;
        _this.setData({
            checkList:[],
            scroll: {
                ifNull: true,
                loadText: '加载中...',
                pageNum: 1,
                nullText: '暂无数据'
            },
        })
        _this.getCheckList(_this.data.scroll.pageNum);
    },
    //下拉刷新
    upper: function (e) {
        var _this = this;
        if (!_this.data.ifunGet) {
            wx.showToast({
                title: '数据刷新中',
                icon: 'loading',
                duration: 10000,
                mask: true
            })
            _this.setData({
                checkList: [],
                scroll: {
                    pageNum: 1  //滚动的页数回到第一页
                }
            })
            _this.getCheckList(1); //刷新回到第一页
        }
    },
    //上拉加载
    lower: function (e) {
        var _this = this;
        _this.getCheckList(_this.data.scroll.pageNum);
    },
    //切换状态栏
    navbarTap: function(e){ 
        var _this = this;
        this.setData({ 
            currentTab: e.currentTarget.dataset.idx,
            checkList: [],
            scroll: {
                pageNum: 1  //滚动的页数回到第一页
            } 
        }) 
        _this.getCheckList(_this.data.scroll.pageNum);
    },
    //获取审核列表数据
    getCheckList: function (current) {
        var _this=this;
        var checkList = _this.data.checkList;
        var params={
            params:{
                "docId":_this.data.docId,
            }
        };
        //切换状态栏
        if (_this.data.currentTab == "0") {
            params.params.status ="0";
        }else{
            params.params.status ="-9";
        }
        //当搜索栏有值时参数status为空
        if (_this.data.inputVal!=="") {
            delete(params["params"]["status"]);
            params.params.inStatus="0,1,4";
            params.params.userName= _this.data.inputVal
        };
        params.pageNo = current;
        console.log(params)
        if (params.pageNo) {
            app.request({
                url: '/order/family/doctor/selectList',
                header: {
                    'content-type': 'application/json'
                },
                method: "Get",
                data: params,
                success: function (res) {
                    console.log(res)
                    if (res.code == 1) {
                        console.log(res)
                        if(res.data.length>0){
                            _this.setData({
                                checkList: checkList.concat(res.data),
                                scroll: {
                                    pageNum: current + 1,
                                    ifNull: false
                                },
                            })
                            var dataList = _this.data.checkList;
                            var checkListNew = [];
                            if(_this.data.inputVal){
                                for(var i=0;i<dataList.length;i++){
                                    var str=dataList[i].userName;
                                    var str1=str.replace(_this.data.inputVal,','+_this.data.inputVal+',');
                                    var arr=str1.split(',');
                                    dataList[i].userNameArr=arr;
                                }
                            }
                            _this.setData({
                                checkList:checkListNew.concat(dataList),
                                scroll:{
                                    pageNum:current +1,
                                    ifNull:false
                                }
                            })
                        }else {
                            if (res.pageNo <= 1) {
                                _this.setData({
                                    scroll: {
                                        ifNull: true,
                                        nullText: '暂无数据'
                                    }
                                })
                            }else {
                                _this.setData({
                                    scroll: {
                                        ifNull: false,
                                        loadText: '加载完毕'
                                    }
                                })
                            }
                        }
                        _this.setData({ifunGet: false})
                        wx.hideToast();
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
    //搜索栏聚焦显示
    showInput: function () {
        this.setData({
            inputShowed: true,
            checkList: [],
            ifunGet: true,
            scroll: {
                ifNull: true,
                loadText: '加载中...',
                pageNum: 1,
                nullText: ''
            }
        });
    },
    //点击取消按钮隐藏搜索输入框
    hideInput: function (e) {
        var _this = this;
        wx.getSystemInfo({
            success: function (res) {
                _this.setData({
                    height: res.windowHeight-98,
                    inputVal: "",
                    inputShowed: false,
                    checkList: [],
                    scroll: {
                        pageNum: 1  //滚动的页数回到第一页
                    } 
                })
            }
        })
        _this.getCheckList(_this.data.scroll.pageNum);
    },
    //清空搜索栏里的值
    clearInput: function () {
        this.setData({
            inputVal: "",
            checkList: [],
            ifunGet: true,
            scroll: {
                ifNull: true,
                loadText: '加载中...',
                pageNum: 1,
                nullText: ''
            }
        });
    },
    //搜索栏输入触发事件
    inputTyping: function (e) {
        var _this = this;
        if (e.detail.value) {
            console.log(e.detail.value)
            wx.getSystemInfo({
                success: function (res) {
                    _this.setData({
                        height: res.windowHeight-76,
                    });
                }
            });
            _this.setData({
                inputVal: e.detail.value,
                checkList:[],
                scroll: {
                    pageNum: 1 , //滚动的页数回到第一页
                } 
            });
            _this.getCheckList(_this.data.scroll.pageNum);
        }
    },
})
