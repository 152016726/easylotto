const app = getApp()
Page({
  data: {
    phoneNumber: '',
    idCard: '',
    userInfo: {}
  },
  linkBlockTap: function () {
    wx.showToast({
      title: '即将上线，敬请期待！',
      icon: 'none',
      duration: 1000
    })
  },
  onShow: function () {

    var _this = this;

    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        console.log(res)
        if (res.data.id) {
          //用户查询
          app.request({
            url: '/user/select',
            header: {
              'content-type': 'application/json'
            },
            data: {
              id: res.data.id
            },
            method: "GET",
            success: function (res) {
              console.log('----------用户查询-------------')
              console.log(res)
              if (res.code == 1) {
                
                //手机号码星号转化
                var tel = res.obj.userMobile;
                var reg = /^(\d{3})\d{4}(\d{4})$/;
                if (tel) {
                  tel = tel.replace(reg, "$1*****$2");
                };
                //身份证号星号转化
                var idCard = res.obj.idCard;
                if (idCard.length == 18) {
                  //console.log('是18');
                  idCard = idCard.substring(0, 4) + '**********' + idCard.substring(idCard.length - 4);
                } else {
                  //console.log('是15');
                  idCard = idCard.substring(0, 4) + '*******' + idCard.substring(idCard.length - 4);
                }

                _this.setData({
                  userInfo: res.obj,
                  idCard: idCard,
                  phoneNumber: tel
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
        } else {
          _this.setData({
            userInfo: res.data
          })
        }
      }
    })
  }
});
