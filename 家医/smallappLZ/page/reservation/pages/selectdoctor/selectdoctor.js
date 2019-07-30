const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: 0,
    letterTag: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  },
  selectClasstap: function(e) {
    var _this = this;
    console.log(e)
    _this.setData({
      currentDept: e.currentTarget.dataset
    })
    _this.getDoctorList(e.currentTarget.dataset.id)
  },
  /**
    *获取科室
  */
  getClassList: function () {
    var _this = this;
    var params = {
      "hospId": _this.data.orgId,
      "isTopChildren": 1
    };

    app.request({
      url: '/department/selectList',
      header: {
        'content-type': 'application/json'
      },
      method: "Get",
      data: {
        "pageSize": 99999,
        "department": params
      },
      success: function (res) {
        console.log('222')
        console.log(res)
        if (res.code == 1) {
          if (res.data.length > 0) {
            var dataList = res.data;
            var letterTag = _this.data.letterTag;
            var newLetterTag = [];
            for (var i = 0; i < dataList.length; i++){
              dataList[i].letter = dataList[i].deptSpell.toUpperCase().substring(0, 1)
            }
            for (var i = 0; i < letterTag.length; i++) {
              var letter = letterTag[i];
              for (var j = 0; j < dataList.length; j++) {
                if (letter == dataList[j].letter) {
                  newLetterTag.push(letter)
                }
              }
            }
            _this.setData({
              classList: dataList,
              letterTag: _this.sortArray(newLetterTag)
              /*currentDept: {
                desc: dataList[0].deptDesc,
                id: dataList[0].id,
                name: dataList[0].aliasName
                }*/
            })
            _this.getDoctorList(dataList[0].id)
            console.log(dataList)
          } else {
            _this.setData({
              classList: [],
              letterTag: []
            })
          }
        } else {
          console.log('code : 0')
        }
      }
    })
  },
  sortArray: function (array) {
    var r = [];
    for(var i = 0, l = array.length; i<l; i++) {
      for (var j = i + 1; j < l; j++)
        if (array[i] == array[j]) j == ++i;
      r.push(array[i]);
    }
    return r;
  },
  /**
    *获取医生列表
  */
  getDoctorList: function (deptId) {
    var _this = this;
    var params = {
      "doctor": {
        "deptId": deptId
      },
      "pageSize": 99999
    };

    app.request({
      url: '/doctor/selectList',
      header: {
        'content-type': 'application/json'
      },
      method: "Get",
      data: params,
      success: function (res) {
        console.log('222')
        console.log(res)
        if (res.code == 1) {
          if (res.data) {
            var dataList = res.data;
            _this.setData({
              docList: dataList
            })
          }
        } else {
          console.log('code : 0')
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var _this = this;
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          height: res.windowHeight,
          hospId: options.id
        })
      }
    })
    _this.setData({
      orgId: options.id
    })
    _this.getClassList()
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