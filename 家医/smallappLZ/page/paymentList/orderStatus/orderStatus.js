// page/paymentList/pendingPayment/pendingPayment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderStatus:"",
    list:[
       {
        medicinesList:[
            {
              name: "啊莫西林",
              num:1,
              price:"1.1元",
              unit:"盒"
           },{
              name: "卡界苗",
              num: 2,
              price: "1.1元",
              unit: "盒"
           }
        ],
           item:"药品",
           subTotal:"2.2元",
           show: false
      }, 
      {
        medicinesList: [
          {
            name: "B超",
            num: 2,
            price: "1.1元",
            unit: "次"
          }
        ],
           item: "检查",
           subTotal: "1.1元",
           show: false
      }
    ]
  },
  toggleShow(e){ //点击显示隐藏
    const index = e.currentTarget.dataset.index;
    let show = this.data.list[index].show;
    this.setData({
       ["list[" + [ index ] + "].show"]:!show
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
  */

  onLoad: function (options) {
    let that = this;
    title: wx.getStorage({
      key: 'orderStatus',
      success: function (res) {
        console.log(res);
        wx.setNavigationBarTitle({
          title: res.data + "详情"
        })
        that.setData({ orderStatus: res.data  })
      },
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