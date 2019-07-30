// pages/info/healthyhouse/healthyhouse.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{},
    healthData:{},
    isNullData:true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this;
    wx.getStorage({
      key: 'userInfo',//获取用户信息
      success: function (res) {
        _this.setData({
          userInfo: res.data//data设置获取用户信息
        });
        if(res.data.id){//如果有用户
          _this.getUser();//调用用户信息
        }else{
          wx.navigateTo({
            url: '../../info/editinfo/editinfo'//注册用户页面
          })
        }
      }
    })
  },
  //调用用户信息
  getUser:function(){
    var _this=this;
    var params={
      "id":_this.data.userInfo.id //data中获取用户id
    };
    app.request({
      url:"/user/select",
      header:{
        'content-type': 'application/json'
      },
      method:"GET",
      data:params,
      success:function(res){
        console.log(res)
        if(res.code==1){
          _this.setData({
            user: res.obj
          });
          if(res.obj.idCard){
            var idCard=res.obj.idCard
            _this.setData({
              isNullData:false,
            });
            _this.healthData(idCard);//调用健康信息
          }else{
            _this.setData({
              isNullData:true
            })
          }
        }else{
          wx.showToast({
            title: res.message,
            icon:'none',
            duration:2000
          });
        }
      }
    })
  },
  //根据身份证号获取智康小屋最近体检信息
  healthData:function(idCard){
    var _this=this;
    var params={
        identity:idCard
        //identity:'440103199312242111'
        //identity:'420621199108284521'
    }
    console.log(idCard)
    app.request({
      // var signDataUrl = 'http://zqdhkk.jiankang120.com.cn/family/healthy/hut/send?func=WITHUT/patient/health/report/query?identity='+idCard;
      url:"/healthy/hut/send",
      header:{
        'content-type': 'application/json'
      },
      method:"GET",
      data:params,
      success:function(res){
        console.log(res)
        if (res.obj.resultCode==1){
          if (res.obj.resultObj.isHaving){
            _this.setData({
              healthData: res.obj.resultObj.report
            });
          }else{
            _this.setData({
              isNullData:true//无数据
            })
          }
        }else{
          wx.showToast({
            title: res.obj.resultMsg,
            icon:'none',
            duration:2000
          });
        }
      }
    })
  }

})