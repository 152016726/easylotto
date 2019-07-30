// pages/info/report/list/list.js
var app = getApp();
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
    var that=this
    var userId=wx.getStorageSync("userInfo");
    console.log(userId)
    var params = {
      params: {
        "userId": userId.id,
      },
      "pageNo":1,
      "pageSize": 999
    };
    console.log(params)
    app.request({
      url: '/plan/familyPlanDetail/selectList',
      header: {
        'content-type': 'application/json'
      },
      method: "POST",
      data: params,
      success: function (res){
          that.setData({
            mar:res.data
          })
          var mar=that.data.mar
          var aa=[]
          for(let i in mar){
            mar[0].tupian ="../../../images/blue.png"
            mar[1].tupian = "../../../images/green.png"
            mar[2].tupian = "../../../images/Violet.png"
            aa[0] = mar[0]
            aa[1] = mar[1]
            aa[2] = mar[2]
          }
          console.log(res.data)
          for(let l in res.data){
            if (res.data[l].nameAs =="高血压随访服务"){
              res.data[l].tupian = "../../../images/Hypertension.png"
            } else if (res.data[l].nameAs == "肺结核患者随访服务"){
              res.data[l].tupian = "../../../images/Lungs.png"
            } else if (res.data[l].nameAs == "肺结核第一次入户随访") {
              res.data[l].tupian = "../../../images/Lungs.png"
            } else if (res.data[l].nameAs == "精神障碍随访计划") {
              res.data[l].tupian = "../../../images/disease.png"
            } else if (res.data[l].nameAs == "精神障碍随访计划") {
              res.data[l].tupian = "../../../images/disease.png"
            } else if (res.data[l].nameAs == "糖尿病患者随访计划") {
              res.data[l].tupian = "../../../images/Diabetes.png"
            } else if (res.data[l].nameAs == "2型糖尿病患者随访服务") {
              res.data[l].tupian = "../../../images/Diabetes.png"
            }else{
              res.data[l].tupian = "../../../images/Geriatric.png"
            }
          }
        that.setData({
          lis: res.data,
          aa:aa
        })
        console.log(that.data.lis)
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