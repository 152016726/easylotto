Page({

  /**
   * 页面的初始数据
   */
  data: {
    sirs:"",
    lis: [],
    imgs:"",
    pos:"none",
    pas:"block",
    scrollTop: 100,
    userPic: '../../../images/user_img.png'
  },
  list:function(e){
    // console.log(e)
    var ctas = e.detail.value.replace(/\s/g, "");
    if (ctas==""){
      wx.showToast({
        title: '输入有误',
        icon: 'loading',
        duration: 500
      })
      this.setData({
        sirs: "",
      })
    }else{
      var scrollTop = this.data.scrollTop
      var date = new Date();
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate()
      var hour = date.getHours()
      var minute = date.getMinutes()
      hour = "" + hour
      minute = "" + minute
      if (minute.length == 1) {
        minute = "0" + minute
      }
      if (hour.length == 1) {
        hour = "0" + hour
      }

      var times = year + "/" + month + "/" + day + " " + hour + ":" + minute
      
      var lis = this.data.lis

      var regNum = new RegExp('[0-9]', 'g');
      var rsNum = regNum.exec(e.detail.value);
      console.log(rsNum,"asdasd")

      var num = parseInt(e.detail.value)
      wx.showToast({
        title: '加载中',
        icon: 'loading',
        duration: 500
      })
      if (isNaN(parseInt(e.detail.value))) {
        lis = lis.concat({ "opo": e.detail.value, "dis": '请输入1~4进行咨询选择', "time": times, lia: 0 })
        this.setData({
          sirs: "",
          lis: lis
        })
      } else {
        if (num == "1") {
          lis = lis.concat({ "opo": e.detail.value, "dis": '', "time": times, ima: "../../../images/healthPic.png", lia: 2 })
          this.setData({
            sirs: "",
            lis: lis,
        
          })
        } else if (num == "2") {
          lis = lis.concat({ "opo": e.detail.value, "dis": '', "time": times, ima: "../../../images/healPavd.jpg", lia: 2 })
          this.setData({
            sirs: "",
            lis: lis,
    
          })
        } else if (num == "3") {
          lis = lis.concat({ "opo": e.detail.value, "dis": '', "time": times, ima: "../../../images/healPavd.jpg", lia: 3 })
          this.setData({
            sirs: "",
            lis: lis,
        
          })
        } else if (num == "4") {
          lis = lis.concat({ "opo": e.detail.value, "dis": '', "time": times, ima: "../../../images/healPavd.jpg", lia: 4 })
          this.setData({
            sirs: "",
            lis: lis,

          })
        }
         else {
          lis = lis.concat({ "opo": e.detail.value, "dis": '请输入1~4进行咨询选择', "time": times, lia: 0 })
          this.setData({
            sirs: "",
            lis: lis
          })
        }
      }
      this.setData({
        scrollTop: scrollTop + 1000
      })
    }
  },
  imgshow:function(e){
    console.log(e.target.dataset.img)
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 500
    })
    if (e.target.dataset.img=="../../../images/healthPic.png"){
      this.setData({
        imgs: e.target.dataset.img,
        pos: "block",
        pas: "none",
        num:"110"
      })
    } else if (e.target.dataset.img =="../../../images/healPavd.jpg"){
      this.setData({
        imgs: e.target.dataset.img,
        pos: "block",
        pas: "none",
        num: "165"
      })
    }

    
    
  },
  imghow: function () {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 500
    })
    this.setData({
      imgs: "",
      pos: "none",
      pas: "block"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userInfo = wx.getStorageSync("userInfo");
    if (userInfo.userPic == "") {
      if (userInfo.userSex == '2') {
        this.setData({
          userPic: '../../../images/img_famFemale.png'
        })
      } else if (userInfo.userSex == '1') {
        this.setData({
          userPic: '../../../images/img_famMale.png'
        })
      } else {
        this.setData({
          userPic: '../../../images/user_img.png'
        })
      }

    } else {
      this.setData({
        userPic: userInfo.userPic
      })
    }
   
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
    var userInfo = wx.getStorageSync("userInfo");
    if (userInfo.userPic == "") {
      if (userInfo.userSex == '2') {
        this.setData({
          userPic: '../../../images/img_famFemale.png'
        })
      } else if (userInfo.userSex == '1') {
        this.setData({
          userPic: '../../../images/img_famMale.png'
        })
      } else {
        this.setData({
          userPic: '../../../images/user_img.png'
        })
      }

    } else {
      this.setData({
        userPic: userInfo.userPic
      })
    }
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