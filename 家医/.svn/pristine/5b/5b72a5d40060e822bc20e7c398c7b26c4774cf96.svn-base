// pages/info/report/list/list.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
    data: {
        isShow:false,
        navbar: ['检验报告', '检查报告'], 
        currentTab: 0 ,
        userId:"",
        patientId:"",
        // userId:"745710101555404800", //对接测试用户
        // patientId:"756589298259910656", //对接测试用户
        patientIndex:0,    //当前就诊人
        patientArray: [],  //就诊人数组
        patientIdArray:[], //就诊人id数组
        scroll: {
            ifNull: true,
            loadText: '加载中...',
            pageNum: 1,
            nullText: '暂无数据'
        },
        height: 0,
        reportList:[],
        ifunGet: false   
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
                    userId: res.data.id,
                });
                _this.getPatientList();
            }
        });
        wx.getSystemInfo({
            success: function (res) {
                _this.setData({
                    height: res.windowHeight-98
                })
            }
        });
    },
    onShow:function(){
        var _this = this;
        _this.setData({
            reportList:[],
            scroll: {
                ifNull: true,
                loadText: '加载中...',
                pageNum: 1,
                nullText: '暂无数据'
            },
        })
        wx.getStorage({
            key: 'userInfo',
            success: function (res) {
                _this.setData({
                    userId: res.data.id,
                });
                _this.getPatientList();
            }
        });
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
                reportList: [],
                scroll: {
                    pageNum: 1  //滚动的页数回到第一页
                }
            })
            _this.getReportList(1); //刷新回到第一页
        }
    },
    //上拉加载
    lower: function (e) {
        var _this = this;
        _this.getReportList(_this.data.scroll.pageNum);
    },
    //切换状态栏
    navbarTap: function(e){ 
        var _this = this;
        this.setData({ 
            currentTab: e.currentTarget.dataset.idx,
            reportList: [],
            scroll: {
                pageNum: 1  //滚动的页数回到第一页
            } 
        }) 
        _this.getReportList(_this.data.scroll.pageNum);
    },
    //获取就诊人列表
    getPatientList: function () {
        var _this=this;
        var params={
            "userId":_this.data.userId
        };
        app.request({
            url: '/patient/selectPatientList',
            header: {'content-type': 'application/json'},
            method: "Get",
            data: params,
            success: function (res) {
                if (res.code == 1) {
                    var dataList = res.data;
                    var patientArray = [];
                    var patientIdArray = [];
                    for (var i = 0; i < dataList.length; i++) {
                        var patientName = dataList[i].patName;
                        var patientId =  dataList[i].id;
                        patientArray.push(patientName);
                        patientIdArray.push(patientId);
                    }
                    _this.setData({
                        patientId:patientIdArray[0],
                        patientArray: patientArray,
                        patientIdArray:patientIdArray,
                    })
                    if(patientArray.length!=0){
                        _this.getReportList(_this.data.scroll.pageNum)
                    }else{
                        wx.showToast({
                            title:"暂无就诊人",
                            icon:'none',
                            duration:2000
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
    //切换箭头向上
    arrowChange:function(){
        var _this = this;
        _this.setData({
            isShow:true,
        }) 
    },
    //切换箭头向下
    bindcancel:function(e){
        var _this = this;
        _this.setData({
            isShow:false,
        }) 
    },
    //选择患者
    bindPatientChange: function (e) {
        var _this = this;
        var patientSelected = e.detail.value;
        var patientIdArray = _this.data.patientIdArray;
        var patientId ="";
        //当选择人的id赋值
        for (var i = 0; i < patientIdArray.length; i++) {
            patientId = patientIdArray[patientSelected]
        }
        this.setData({
            isShow:false,
            patientId: patientId,
            patientIndex: e.detail.value,
            reportList: [],
            scroll: {
                ifNull: true,
                loadText: '加载中...',
                pageNum: 1,
                nullText: ''
            }
        })
        _this.getReportList(1);
    },
    //获取报告数据
    getReportList: function(current){
        var _this=this;
        var reportList = _this.data.reportList;
        var params={
            item:{
                "patientId":_this.data.patientId,
                "itemType":1
            }
        };
        //切换状态栏
        if (_this.data.currentTab === 0) {
            params.item.itemType = 1;
        }else{
            params.item.itemType = 2;
        }
        params.pageNo = current;
        if (params.pageNo) {
            app.request({
                url: '/resultItem/selectList',
                header: {
                    'content-type': 'application/json'
                },
                method: "Get",
                data: params,
                success: function (res) {
                    if (res.code == 1) {
                        if(res.data.length>0){
                            _this.setData({
                                reportList: reportList.concat(res.data),
                                scroll: {
                                    pageNum: current + 1,
                                    ifNull: false
                                },
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
})