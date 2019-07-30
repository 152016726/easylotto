// page/inoculation/inoculation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    memberList:[
      {"name": '成员0', "value": '0',checked:'true'},
      {"name": '成员0', "value": '0'},
      {"name": '成员1', "value": '1'},
      {"name": '成员2', "value": '2'}
    ],
    allMemberListLength:8,//成员总数
    /*切换宝宝框*/
    hideBabyInfoDialog:true,//隐藏切换宝宝框，
    babyInfoDate:"请选择时间",//切换宝宝框选择时间
    babyInfoArray: ['女儿', '儿子', '孙女', '孙子'],//head选择关系
    babyInfoPickerIndex: 0,//选择关系索引
    /*预约框*/
    hideAppointmentDialog:true,//隐藏预约框，
    apptOrgArray: ['雷州市xx0社区卫生服务中心', '雷州市xx1社区卫生服务中心', '雷州市xx2社区卫生服务中心', '雷州市xx3社区卫生服务中心'],//head选择社区
    apptOrgPickerIndex: 0,//预约框选择机构选择索引
    apptDate:"请选择时间",//预约框选择时间
    /*手工录入*/
    hideManualDialog:true,//隐藏手工录入框，
    manualPartArray: ['手臂', '手', '臀部', '手臂'],//head选择社区
    manualPartPickerIndex: 0,//手工录入框选择接种部位
    manualDate:"请选择时间",//手工录入框选择时间
    //查看录入记录信息
    hideRecordedDialog:true,
    //切换switch说明信息
    hideStatementDialog:true,
    switchChecked:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  //切换疫苗switch按钮
  switchChange: function (e){
    var _this=this;
    console.log('switch1 发生 change 事件，携带值为', e.detail.value);
    _this.setData({
      switchChecked:e.detail.value,
      hideStatementDialog:false
    });
    setTimeout(function(){
      _this.setData({
        hideStatementDialog:true
      })
    },2000)
  },
  /**
   * 切换宝宝弹层框相关事件
   */
  radioChange: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    var _this=this;
    _this.setData({
      hideBabyInfoDialog:false
    })
  },
//选择宝宝信息时间
  bindBabyInfoDateChange: function(e) {
    var _this=this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    _this.setData({
      babyInfoDate: e.detail.value
    })
  },
  //隐藏切换宝宝框
  closeBabyInfoDialog:function(){
    var _this=this;
    _this.setData({
      hideBabyInfoDialog:true
    })
  },
  //切换宝宝提交
  babyInfoSubmit:function(){
    wx.showToast({
      title: '提交成功',
      icon:'success',
      duration:2000,
      mask:true
    });
  },

  /**
   * 接种预约框相关事件
   */
  //显示预约框
  showAppointmentDialog:function(){
    var _this=this;
    _this.setData({
      hideAppointmentDialog:false
    })
  },
  //隐藏预约框
  closeAppointmentDialog:function(){
    var _this=this;
    _this.setData({
      hideAppointmentDialog:true
    })
  },
  //预约提交
  appointmentSubmit:function(){
    wx.showToast({
      title: '提交成功',
      icon:'success',
      duration:2000,
      mask:true
    });
  },
  //选择接种时间
  bindApptDateChange: function(e) {
    var _this=this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    _this.setData({
      apptDate: e.detail.value
    })
  },
  /*选择接种机构*/
  apptOrgPickerChange:function(e){
    var _this=this;
    _this.setData({
      apptOrgPickerIndex: e.detail.value
    })
    console.log(_this.data.apptOrgPickerIndex);
  },
  /**
   * 手工录入相关事件
   */
  //显示手工录入框
  showManualDialog:function(){
    var _this=this;
    _this.setData({
      hideManualDialog:false
    })
  },
  //隐藏手工录入框
  closeManualDialog:function(){
    var _this=this;
    _this.setData({
      hideManualDialog:true
    })
  },
  //选择接种录入时间
  bindManualDateChange: function(e) {
    var _this=this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    _this.setData({
      manualDate: e.detail.value
    })
  },
  /*选择接种部位*/
  manualPartPickerChange:function(e){
    var _this=this;
    _this.setData({
      manualPartPickerIndex: e.detail.value
    })
    console.log(_this.data.manualPartPickerIndex);
  },
  //手工录入保存
  manualSubmit:function(){
    wx.showToast({
      title: '提交成功',
      icon:'success',
      duration:2000,
      mask:true
    });
  },
  /**
   * 查看记录框相关事件
   */
  showRecordedDialog:function(){
    var _this=this;
    _this.setData({
      hideRecordedDialog:false
    })
  },
  closeRecordedDialog:function(){
    var _this=this;
    _this.setData({
      hideRecordedDialog:true
    })
  },
  /**
   * switch说明框
   */
 /* showRecordedDialog:function(){
    var _this=this;
    _this.setData({
      hideRecordedDialog:false
    })
  },*/
  closeStatementDialog:function(){
    var _this=this;
    _this.setData({
      hideStatementDialog:true
    })
  }

})