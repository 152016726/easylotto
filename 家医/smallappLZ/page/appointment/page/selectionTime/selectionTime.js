// page/appointment/page/selectionTime/selectionTime.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        followCheckBoxVal: {
            value: "关注",
            checked: false
        },
        hiddenOrderDialog:true,
        timeList:[
            {
                id:"0",
                time:"08:30-09:00",
                surplus:5,
            },{
                id:"1",
                time:"08:30-09:00",
                surplus:5,
            },{
                id:"2",
                time:"08:30-09:00",
                surplus:5,
            },{
                id:"3",
                time:"08:30-09:00",
                surplus:0,
            },{
                id:"4",
                time:"08:30-09:00",
                surplus:5,
            },{
                id:"5",
                time:"08:30-09:00",
                surplus:0,
            },
        ],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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

    },
    //关注医生按钮
    checkboxFollowChange: function(e){
        var _this = this;
        e.detail.value[0] ? _this.setData({'followCheckBoxVal.checked': true}) : _this.setData({'followCheckBoxVal.checked': false});
        console.log("是否关注" + _this.data.followCheckBoxVal.checked)
    },
    //显示时间段弹层
    toOrderDialog: function(){
        var _this =this;
        _this.setData({hiddenOrderDialog: false})
    },
    //关闭时间段弹层
    closeOrderDialog: function(){
        var _this = this;
        _this.setData({hiddenOrderDialog: true})
    },
    //选择时间段效果
    selectTime: function(e){
        console.log(e);
        var _this = this;
        var currentId = e.currentTarget.dataset.id;
        var timeList = _this.data.timeList;
        //判断显示激活效果
        for(var i= 0;i < _this.data.timeList.length; i++){
            if( currentId == timeList[i].id){
                if(timeList[i].checked){
                    timeList[i].checked = false
                }else{
                    timeList[i].checked = true
                }
            }else{
                timeList[i].checked = false
            }
        }
        _this.setData({
            timeList: timeList
        });

    },
    //确定时间段
    comfirmOrder:function(){
        var _this = this;
        var timeList = _this.data.timeList;
        console.log(timeList);
        var isSelectTime = false;
        for(var i=0;i<timeList.length;i++){
            if(timeList[i].checked == true){
                isSelectTime = true;
                wx.navigateTo({
                    url: '../appointmentInfo/appointmentInfo'
                })
            }
        }
        if(!isSelectTime){
            wx.showToast({
                title: '请先选择时间',
                icon: 'none',
                duration: 1000
            })
        }

    }
})