// pages/register/selectorg/selectorg.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        communityList:[],
        scroll: {
            ifNull: true,
            loadText: '加载中...',
            pageNum: 1,
            nullText: ''
        },
        height: 0,
        deleteDisplay: 'none',
        focusDisplay: false,
        name: '',
        isNearest:false
    },
    /**
     *搜索栏
     */
    searchTap: function (e) {
        var _this = this;
        e.detail.value ? _this.setData({ deleteDisplay: 'block' }) : _this.setData({ deleteDisplay: 'none' })
        _this.setData({
            name: e.detail.value,
            communityList: []
        })
        if (!e.detail.value) {

            _this.setData({
                scroll: {
                    ifNull: true,
                    loadText: '加载中...',
                    pageNum: 1,
                    nullText: ''
                },
                name: '',
            })
        } else {
            _this.getList(1);
        }
    },
    /**
     *搜索栏获取焦点
     */
    focusTap: function (e) {
        this.setData({
            communityList: [],
            scroll: {
                ifNull: true,
                loadText: '加载中...',
                pageNum: 1,
                nullText: ''
            },
            focusDisplay: true
        })
    },
    /**
     *取消搜索
     */
    cancelTap: function (e) {
        var _this = this;
        _this.setData({
            communityList: [],
            scroll: {
                ifNull: true,
                loadText: '加载中...',
                pageNum: 1,
                nullText: ''
            },
            name: '',
            focusDisplay: false
        })
        _this.getList(1);
    },
    /**
     *清除搜索栏内容
     */
    deleteSearchContentTap: function (e) {
        if (this.data.name) {
            this.setData({
                name: '',
                deleteDisplay: 'none',
                communityList: [],
                scroll: {
                    ifNull: true,
                    loadText: '加载中...',
                    pageNum: 1,
                    nullText: ''
                }
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var _this = this;
        //获取屏幕高度
        wx.getSystemInfo({
            success: function (res) {
                _this.setData({
                    height: res.windowHeight - 53
                })
            }
        })
    },
    //距离最近
    showNearest:function(e){
        var _this=this;
        _this.setData({
            isNearest:!_this.data.isNearest
        })

    },
    getList:function(e){

    }

})