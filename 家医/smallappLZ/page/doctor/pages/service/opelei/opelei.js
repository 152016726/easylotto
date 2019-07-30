//list.js
//获取应用实例
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
    console.log(options)
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
          console.log(res.data)
          var aa = res.data
          var cc=[]
          for (let i in aa) {
            aa[i].shijian = aa[i].updateTime.slice(0, 10);
            aa[i].shijian1 = aa[i].planTime.slice(0, 10);
            console.log(aa[i].id)
            if (options.id == aa[i].id){
              console.log(aa[i])
              cc = aa[i]
            }
          }

          that.setData({
            lis:cc,
            date: cc.shijian
          })
          console.log(that.data.lis)
        }
      })
    
  },
  bindDateChange: function (e) {
   
    this.setData({
      date: e.detail.value
    })
  },
  tongyi:function(){
    var that = this
    var userInfo = wx.getStorageSync("userInfo");
    var date=this.data.date
    var lis=this.data.lis
    date = date+"00:00:00"
    var params = {
      params: {
        "id": lis.id,
        "docId": userInfo.doc.id,
        "modifyDate": date
      }
    };
    app.request({
      url: '/plan/familyPlanDetailFlow/updateAgreeModify',
      header: {
        'content-type': 'application/json'
      },
      method: "Get",
      data: params,
      success: function (res) {
        console.log(res.code)
        if (res.code == 1) {
          wx.showToast({
            title: "修改成功",
            icon: '',
            duration: 2000
          });
          setTimeout(function () {
            wx.navigateBack()
          }, 2300);
        } else {
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
