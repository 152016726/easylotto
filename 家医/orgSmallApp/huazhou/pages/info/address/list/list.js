var app = getApp()
Page({
	data:{
		showModal:false,
    addressList:[],
    hasAddress: false,
    defaultCheck: true
  },
  onLoad: function (options) {
    console.log(options)
    this.setData({
      options: options
    })
  },
  onShow: function () {
    var _this = this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        _this.setData({
          userInfo: res.data
        })
        if (res.data.id) {
          _this.getList(res.data.id);
        } else {
          wx.redirectTo({
            url: '/pages/info/editinfo/editinfo',
          })
        }
      }
    })
  },
  getList: function (useId) {//获取地址列表
    var _this = this;
    app.request({
      url: '/user/address/selectList',
      header: {
        'content-type': 'application/json'
      },
      method: "Get",
      data: {
        params: {
          "userId": useId,
          "status": "1"
        }
      },
      success: function (res) {
        console.log(res);
        if (res.code == 1) {
          if (res.data.length > 0) {
            _this.setData({
              addressList: res.data,
              hasAddress: true
            })
          } else {
            _this.setData({
              addressList: res.data,
              hasAddress: false
            })
          }
          console.log('.......。。。。。。。。。。。。。。。。。。')
          console.log(_this.data.addressList)
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

    // 弹窗
	openConfirm:function (e) {
		this.setData({
			showModal: true,
      currentId: e.currentTarget.dataset.id
		})
    },

    // 弹出框蒙层截断touchmove事件
	preventTouchMove:function () {
    },

	// 隐藏模态对话框
	hideModal:function () {
		this.setData({
			showModal:false
		});
    },

	// 对话框确认按钮点击事件
	onConfirm:function () {
		this.hideModal();
    var _this = this;
    console.log(_this.data.currentId)
    app.request({
      url: '/user/address/delete',
      header: {
        'content-type': 'application/json'
      },
      method: "Get",
      data: {
        "id": _this.data.currentId
      },
      success: function (res) {
        console.log(res);
        if (res.code == 1) {
          _this.getList(_this.data.userInfo.id);
          wx.showToast({
            title: '已删除',
            icon: 'success',
            duration: 2000
          });
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
  //默认地址
  isDefaultChange: function (e) {
    console.log(e.detail.value)
    var _this = this;
    var isDefault;
    console.log(e)
    if (e.detail.value.length > 0){
      console.log(e.target.dataset.id)
      isDefault = "1";
      app.request({
        url: '/user/address/update',
        header: {
          'content-type': 'application/json'
        },
        method: "get",
        data: {
          params: {
            "id": e.target.dataset.id,
            "userId": _this.data.userInfo.id,
            "isDefault": isDefault
          }
        },
        success: function (res) {
          console.log(res);
          if (res.code == 1) {
            _this.getList(_this.data.userInfo.id);
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
      //isDefault = "0"; 
    }
    console.log({
      "id": e.target.dataset.id,
      "userId": _this.data.userInfo.id,
      "isDefault": isDefault
    })
  },
	// 对话框取消按钮点击事件
	onCancel:function () {
      this.hideModal();
  },

	navEdit:function(e){
		wx.navigateTo({
      url: '../edit/edit?id=' + e.currentTarget.dataset.id,
		})
	},

	navAdd:function(){
		wx.navigateTo({
			url: '../add/add',
		})
	}

});
