//获取应用实例
const app = getApp()
Page({
  data: {
    doctorList: [],
    userInfo: {},
    scroll: {
      ifNull: false,
      loadText:'加载中...',
      pageNum:1,
      nullText:''
    },
    height:0
  },
  onLoad: function () {
    var _this = this;
    wx.getStorage({
      key: 'userInfo',//获取用户信息
      success: function (res) {
        _this.setData({
          userInfo: res.data//data设置获取用户信息
        });
        if(res.data.id){//如果有用户
          wx.getSystemInfo({
            success: function (res) {
              _this.setData({
                height: res.windowHeight
              })
            }
          });
          _this.getDoctorList(_this.data.scroll.pageNum);//调用我的医生团队信息
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
      doctorList: []
    });
    _this.getDoctorList(1);
  },
  //上拉加载
  lower:function(e){
    var _this=this;
    _this.getDoctorList(_this.data.scroll.pageNum);
  },
  getDoctorList:function(current){
    var _this=this;
    var doctorList=_this.data.doctorList;
    var params={
      params:{
        "userId":_this.data.userInfo.id ,//data中获取用户id
        "status": "1"
      },
      "pageNo":1,
      "pageSize":10
    };
    params.pageNo=current;
    if(params.pageNo){
      app.request({
        url:"/doctor/familyUserSign/selectSignDocTeamMsg",
        header:{
          'content-type': 'application/json'
        },
        method:"GET",
        data:params,
        success: function (res) {
          console.log(res)
          if(res.code==1){
            if(res.data.length>0){
              _this.setData({
                doctorList:doctorList.concat(res.data),
                scroll: {
                  ifNull: false,
                  pageNum:current + 1 //当前值加1
                }
              });
            }else{
              console.log(res.pageNo)
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
            })
          }
        }
      })

    }
  }
})
