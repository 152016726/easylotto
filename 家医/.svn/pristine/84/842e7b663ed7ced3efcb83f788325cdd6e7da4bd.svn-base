//获取应用实例
const app = getApp()

Page({
  data: {
    //showRemoveSignDialog:false,
    signList:[],
    scroll: {
      ifNull: false,
      loadText:'加载中...',
      pageNum:1,
      nullText:''
    },
    height:0
  },
//解除签约弹窗--本期不考虑注释
  /*showRemoveSignDialog:function(e){
    var _this=this;
    this.setData({
      showRemoveSignDialog: true
    })

  },
  hideRemoveSignDialog:function(){
    this.setData({
      showRemoveSignDialog: false
    })
  },
  confirmRemove:function(){
    this.hideRemoveSignDialog();
    wx.showToast({
      title: '保存成功',
      icon: 'success',
      duration: 2000
    });
  },
  cancelRemove:function(){
    this.hideRemoveSignDialog()
  },
  closeRemoveDialog:function(){
    this.hideRemoveSignDialog()
  },
  /!**
   * 弹出框蒙层截断touchmove事件
   *!/
  preventTouchMove: function () {
  },*/
  onLoad: function () {
    var _this=this;
    wx.getStorage({
      key:'userInfo',
      success:function(res){
        _this.setData({
          userInfo:res.data
        });
        if(res.data.id){//如果用用户
          wx.getSystemInfo({
            success: function (res) {
              _this.setData({
                height: res.windowHeight
              })
            }
          });
          _this.setData({
            signList: []
          });
          _this.getSignList(1);//调用我的签约列表函数_this.data.scroll.pageNum
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
      signList: []
    });
    _this.getSignList(1);
  },
  //上拉加载
  lower:function(e){
    var _this=this;
    _this.getSignList(_this.data.scroll.pageNum);
  },
  //获取列表
  getSignList:function(current){
    var _this=this;
    var signList=_this.data.signList;
    var params={
      params:{
        "userId": _this.data.userInfo.id//data中获取用户id
      },
      "pageNo":1,
      "pageSize":10
    };
    params.pageNo=current;
    if(params.pageNo){
      app.request({
        url:"/order/family/selectList",
        header:{
          'content-type':'application/json'
        },
        method:"GET",
        data:params,
        success: function (res) {
          console.log(res)
          if(res.code==1){
            if(res.data.length>0){
              _this.setData({
                signList:signList.concat(res.data),
                scroll: {
                 ifNull: false,
                 pageNum:current + 1 //当前值加1
                 }
              });
            }else{
              if(res.pageNo == 1){
                _this.setData({
                  scroll: {
                    ifNull: true,
                    nullText:'暂时没有数据！'
                  }
                })
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
            });
          }
        }
      })
    }
  }
})
