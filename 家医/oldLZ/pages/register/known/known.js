// pages/register/known/known.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        checkeVal: true,
        disabled: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    //是否已阅读并同意
    checkboxChange: function (e) {
        var _this = this;
        _this.setData({
            disabled: !e.detail.value[0]
        })
    }
})