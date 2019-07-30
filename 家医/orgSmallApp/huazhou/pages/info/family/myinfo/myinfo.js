// pages/info/family/myinfo/myinfo.js
const app = getApp()
Page({
    data: {
        myInfo: [],
        userAge: '',
        userSex: ''
    },
    onLoad: function () {
        var _this = this;
        wx.getStorage({
            key: 'userInfo',
            success: function (res) {
                var userSex = '';
                _this.setData({
                    myInfo: res.data
                })
								// 已认证用户
                if (res.data.id) {
                    app.request({
                        url: '/user/select',
                        header: {
                            'content-type': 'application/json'
                        },
                        data: {id: res.data.id},
                        method: 'GET',
                        success: function (res) {
													if(res.code==1){
														_this.setData({
															myInfo: res.obj
														})
														// 身份证获取年龄和性别
														var idCard = _this.data.myInfo.idCard;
														var myDate = new Date();
														var month = myDate.getMonth() + 1;
														var day = myDate.getDate();
														var userAge = myDate.getFullYear() - idCard.substring(6, 10) - 1;
														if (idCard.substring(10, 12) < month || idCard.substring(10, 12) == month && idCard.substring(12, 14) <= day) {
															userAge++;
														}
														if (parseInt(idCard.substr(16, 1)) % 2 == 1) {
															userSex = '男';
														} else {
															userSex = '女';
														}
														_this.setData({
															userAge: userAge,
															userSex: userSex
														})
													} else {
														wx.showToast({
															title: res.message,
															icon: 'none',
															duration: 2000
														})
													} 
                        }
                    })
										// 未认证用户
                } else {
                    if (res.data.sex == 1) {
                        userSex = '男'
                    } else {
                        userSex = '女'
                    }
                    _this.setData({
                        userSex: userSex
                    })
                }
            }
        })
    }

})