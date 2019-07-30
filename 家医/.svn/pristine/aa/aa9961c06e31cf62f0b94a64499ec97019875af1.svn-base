// page/paymentList/paymentList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:"",//记录当前点击了 患者还是状态
    checkedItem:"全部", //记录用户当前选择的是哪种项目
    btnList:[
      {
        select:"",
        off:true,
        index:0,
        text:"患者",
      
      },{
        select: "",
        off: true,
        index:1,
        text: "状态"
      }
    ],
    resultList: [], //按用户点击患者还是状态  显示patientList或者paymentStatus
    patientList: [
      {
        name: "全部"
      },
      {
        name: "张三"
      }, {
        name: "李四"
      }, {
        name: "王五"
      }
    ],
    paymentStatus:[
        {
          name: "全部",
        },
        {
          name:"待缴费",
        }, 
        {
          name: "已缴费",
        }, 
        {
          name: "已退费",
        }
    ],
    paymentList:[   //所有数据
      { 
        subName:"心血管科",
        price:"1毛",
        patient:"张三",
        time:"2014-10-11",
        status:"待缴费"
      }, {
        subName: "心血管科",
        price: "2毛",
        patient: "李四",
        time: "2014-10-11",
        status: "已缴费" 
      }, {
        subName: "心血管科",
        price: "3毛",
        patient: "王五",
        time: "2014-10-11",
        status: "已退费"
      }, {
        subName: "心血管科",
        price: "3毛",
        patient: "王五",
        time: "2014-10-11",
        status: "已退费"
      }, {
        subName: "心血管科",
        price: "3毛",
        patient: "王五",
        time: "2014-10-11",
        status: "已缴费"
      }
    ]
  },

  checkPatient(e) { //按条件查询病人
    let id = e.currentTarget.dataset.id;
    let off = this.data.btnList[id].off;
    let select = e.currentTarget.dataset.select;
    for (let i = 0; i < this.data.btnList.length; i++){
      this.setData({
        ["btnList[" + i + "].off"]: true,
      })
      if(this.data.btnList[i].index == id){
         this.setData({
          ["btnList[" + this.data.btnList[i].index + "].off"]: !off,
           index: id
         })
      }

    }
    
    // 根据按患者还是 状态查询 显示
    id === 0 ? this.setData({ resultList: this.data.patientList }):this.setData({ resultList: this.data.paymentStatus });
    ( !off ) && this.setData({resultList: []}) // 只要当前不被点亮 就隐藏列表
    //当用户在患者和状态之间切换时 高亮显示当前选中项
    select === "" ? this.setData({ checkedItem:"全部" }) : this.setData({checkedItem:select})

  },


  hidePatientList() { //点击遮罩层隐藏筛选列表
    for(let i = 0;i<this.data.btnList.length;i++){
      this.setData({
        ["btnList[" + i + "].off"]: true,
        resultList:[]
      })
    }
  },


  itemClickHandler(e) { // 点击患者列表触发
    let text = e.currentTarget.dataset.text;
    let index = this.data.index;
    let paymentList = [...this.data.paymentList];
    for (let i = 0;i < this.data.btnList.length;i++){
      if (i === index){
        this.setData({
          ["btnList[" + i + "].select"]: text,
          ["btnList[" + i + "].off"]: true,
          resultList:[],
          checkedItem: text,//把当前选择的列表项赋值到select
        })
      }
     }

  },

  lookDetail(e){ //查看订单详情
    let status = e.currentTarget.dataset.status;
    wx.navigateTo({ url: "./../paymentList/orderStatus/orderStatus" })
    switch (status){
      case "待缴费":
        wx.setStorageSync("orderStatus", '待缴费')
        break;
      case "已退费":
        wx.setStorageSync("orderStatus", '已退费')
        break;
      case "已缴费":
        wx.setStorageSync("orderStatus", '已缴费')
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(){

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
   
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage () {

  }
})