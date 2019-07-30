// page/online/pages/list/list.js
const app = getApp()
Page({
    data: {
        focusDisplay: false,
        deleteDisplay: 'none',
        inputVal: '',
        isNearest:false,
        statusIndex:0,
        statusArray: ['请选择状态','已回复', '未回复'],
        consultionList:[], 
        scroll: {
            ifNull: true,
            loadText: '加载中...',
            pageNum: 1,
            nullText: ''
        },
        height: 0,
        ifunGet: false,    
        btnDisplay:"block",
        status: ''
    },
    //生命周期函数--监听页面加载
    onLoad: function (options) {
 		var _this = this;
        //获取屏幕高度
        wx.getSystemInfo({
            success: function (res) {
                _this.setData({
                    height: res.windowHeight - 170
                })
            }
      })
      _this.getList(1);
    },
    //立即质询
    consulationTap: function () {
      wx.navigateTo({
        url: '../consultation/consultation'
      })
    },
    /**
    * 获取咨询列表
    */
    getList: function (current) {
      var _this = this;
      var consultionList = _this.data.consultionList;
      var params = {
        "params": {},
        "pageSize": 10
      };
      if (_this.data.inputVal !== '') { params.params.topicOrDoc = _this.data.inputVal };
      if (_this.data.status !== '') { params.params.status = _this.data.status };
      if (_this.data.timesort) {
        params.params.sort = {
          "createTime": _this.data.timesort
        }
      };
      params.pageNo = current;
      console.log(params)
      if (params.pageNo) {

        wx.getStorage({
          key: 'userInfo',
          success: function (res) {
            params.params.userId = res.data.id
            app.request({
              url: '/familyShortComment/selectList',
              header: {
                'content-type': 'application/json'
              },
              method: "Get",
              data: params,
              success: function (res) {
                console.log(res)
                if (res.code == 1) {
                  if (res.data.length > 0) {
                    var dataList = res.data;
                    if (_this.data.name) {
                      for (var i = 0; i < dataList.length; i++) {
                        var str = dataList[i].name;
                        var str1 = str.replace(_this.data.name, ',' + _this.data.name + ',');
                        var arr = str1.split(',');
                        dataList[i].nameArr = arr;
                      }
                    }
                    _this.setData({
                      consultionList: consultionList.concat(dataList),
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
                          nullText: '暂时没有数据！',
                          focusDisplay: true
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
                  wx.hideToast();
                } else {
                  console.log('code : 0')
                  wx.hideToast();
                }
              }
            })
          }
        })

      }
    },
    //下拉刷新
    upper: function (e) {
        var _this = this;
        if (!_this.data.ifunGet) {
            wx.showToast({
                title: '数据刷新中',
                icon: 'loading',
                duration: 1000,
                mask: true
            })
            _this.setData({
                checkList: [],
                scroll: {
                    pageNum: 1  //滚动的页数回到第一页
                }
            })
            _this.getList(1); //刷新回到第一页
        }
    },
    //上拉加载
    lower: function (e) {
        var _this = this;
        _this.getList(_this.data.scroll.pageNum);
    },
    //搜索栏获取焦点
    focusTap: function (e) {
        this.setData({
        	focusDisplay:true,
            consultionList: [],
            scroll: {
                ifNull: true,
                loadText: '',
                pageNum: 1,
                nullText: ''
            },
            ifunGet: true,
        })
    },
    //搜索栏输入时
    searchTap: function (e) {
    	var _this = this;
        if (e.detail.value) {
            console.log(e.detail.value)
            wx.getSystemInfo({
                success: function (res) {
                    _this.setData({
                        height: res.windowHeight-55,
                    });
                }
            });
            _this.setData({
            	focusDisplay:true,
            	deleteDisplay: 'block', 
                inputVal: e.detail.value,
                consultionList: [],
                scroll: {
                    pageNum: 1 , //滚动的页数回到第一页
                },
            });
            _this.getList(_this.data.scroll.pageNum);
        }else{
        	_this.setData({ 
        		deleteDisplay: 'none',
        	})
        }
    },
  	//取消搜索
    cancelTap: function (e) {
        var _this = this;
        wx.getSystemInfo({
            success: function (res) {
                _this.setData({
                    height: res.windowHeight-170,
                    focusDisplay: false,
                    deleteDisplay: 'none',
                    inputVal: "", 
                    consultionList: [],
                    scroll: {
                        pageNum: 1  //滚动的页数回到第一页
                    } 
                })
            }
        })
        _this.getList(_this.data.scroll.pageNum);
    },
    //清除搜索栏内容
    deleteSearchContentTap: function (e) {
      this.setData({
        inputVal: "",
        deleteDisplay: 'none',
        consultionList: [],
        ifunGet: true,
        scroll: {
            ifNull: true,
            loadText: '',
            pageNum: 1,
            nullText: ''
        }
      });
      this.getList(1);
    },
    //时间排序
    showNearest:function(e){
        var _this = this;
        console.log('时间排序')
        _this.setData({
          isNearest: !_this.data.isNearest,
          consultionList: [],
          scroll: {
            ifNull: true,
            loadText: '加载中...',
            pageNum: 1,
            nullText: ''
          }
        })
        if (_this.data.isNearest) {
          _this.setData({
            timesort: 1
          })
        } else {
          _this.setData({
            timesort: 2
          })
        }
        _this.getList(1);
    },
    bindPickerChange: function (e) {
      var _this = this;
      var val = '';
    	console.log('picker发送选择改变，携带值为', e.detail.value)
      if (e.detail.value=='1') {
        val = "1";
      } else if (e.detail.value == '2') {
        val = "0";
      }
    	this.setData({
        status: val,
        statusIndex: e.detail.value,
        consultionList: [],
        scroll: {
          ifNull: true,
          loadText: '加载中...',
          pageNum: 1,
          nullText: ''
        }
      })
      _this.getList(1);
    }

})