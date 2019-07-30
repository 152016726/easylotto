const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.huoqu()
  },
  huoqu:function(){
    var that = this
    var userInfo = wx.getStorageSync("userInfo");
   console.log(userInfo)
    app.request({
      url: '/plan/familyPlanDetailFlow/selectByTeamId',
      header: {
        'content-type': 'application/json'
      },
      method: "Get",
      data: {
        teamId: userInfo.doc.teamInfo.teamId,
        pageNo: 1,
        pageSize: 9999,
      },
      success: function (res) {
        var aa = res.data
        for (let i in aa) {
          aa[i].shijian = aa[i].updateTime.slice(0, 10);
        }
        that.setData({
          lis: aa
        })
      }
    })
  },
  goodisa:function(e){

    var userInfo = wx.getStorageSync("userInfo");
    console.log(e.target.dataset.id)
    var params = {
      params:{
        "id":e.target.dataset.id,
        "docId": userInfo.doc.id,
        "modifyDate":""
      }
     
    };
    console.log(params)
    app.request({
      url: '/plan/familyPlanDetailFlow/updateAgreeModify',
      header: {
        'content-type': 'application/json'
      },
      method: "Get",
      data: params ,
      success: function (res) {
        console.log(res.code)
        if(res.code==1){
          this.huoqu()
        }else{
          wx.showToast({
            title: res.message,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.huoqu()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})