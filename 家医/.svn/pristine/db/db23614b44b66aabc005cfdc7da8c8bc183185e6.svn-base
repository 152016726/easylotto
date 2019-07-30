// pages/info/mediciner/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTab:['我签约的医生','关注的医生'],
    "currentIndex":0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  //tab切换显示待支付、已支付
  changeTab:function(e){
    var _this=this;
    console.log(e);
    var target = e.target;
    _this.setData({
      //menuHide:!_this.data.menuHide
      currentIndex:target.dataset.index
    })
  },

})