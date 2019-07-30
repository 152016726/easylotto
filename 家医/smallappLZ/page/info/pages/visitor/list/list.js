


Page({
  data: {
    manageList: [
      {
        name: "张三",
        age: "18岁",
        sex: "男",
        show:true,
        isChecked: false,
        card: "440***********1234",
        phone: "135****3456",
        cardimgSrc: "./images/card_user.png",
        phoneimgSrc: "./images/phone_user.png"
      }, {
        name: "李四",
        age: "34岁",
        sex: "女",
        show: false,
        isChecked: false,
        card: "440***********4356",
        phone: "188****3156",
        cardimgSrc: "./images/card_user.png",
        phoneimgSrc: "./images/phone_user.png"
      }
    ],
    num: 8,
    inx:"",//判断当前操作的是那条数据
  },
  longtapHandler(e){ //长按
    const index = e.currentTarget.dataset.index;
      this.setData({
        inx: index
      })
    
  },
  cancelHandler(){ //取消
    this.setData({
      inx: ""
    })
  },
  deleteHandler(e){
     console.log(e)
  },
  addPatient(){
    wx.navigateTo({
      url: '../add/add'
    })
  },
  changeStatus(e) {

    let status = e.currentTarget.dataset.status;
    const index = e.currentTarget.dataset.index;
    for (let i = 0; i < this.data.manageList.length; i++) {
      this.setData({
        ["manageList[" + i + "].isChecked"]: false
      })
      if (i === index) {
        this.setData({
          ["manageList[" + index + "].isChecked"]: !status
        })
      }

    }

  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  onShow: function () {

  }
})