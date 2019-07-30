// page/quicksign/signresult/signresult.js
const app = getApp();
Page({
    data: {
        detail:{}
    },
 
   /**
    * 生命周期函数--监听页面加载
    */
    onLoad: function (options) {
       var _this=this;
       _this.setData({
           id:options.id
       });
       //获取咨询详情信息
       _this.getConsultDetail();
    },
    //获取咨询详情
    getConsultDetail:function(){
        var _this=this;
        var params = {
            "id": _this.data.id
            //"id": 774202072215195648

        };
        app.request({
            url:"/familyShortComment/select",
            header:{
                'content-type': 'application/json'
            },
            method:"GET",
            data:params,
            success:function(res){
              console.log(res)
                if(res.code==1){
                  var detail = res.obj;
                  detail.createTime = detail.createTime.split(' ')[0]
                    _this.setData({
                      detail: detail
                    })
                }else{
                    wx.showToast({
                        title: res.message,
                        icon:'none',
                        duration:2000
                    })
                }
            }
        })
    }
})