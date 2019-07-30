// pages/info/treatment/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow:false,
    list: [
      {
        id: 'form',
        name: '药品',
        open: true,
        pages: ['button', 'list', 'input', 'slider', 'uploader']
      },
      {
        id: 'widget',
        name: '检验',
        open: false,
        pages: ['article', 'badge', 'flex', 'footer']
      },
      {
        id: 'feedback',
        name: '检查',
        open: false,
        pages: ['actionsheet', 'dialog', 'msg', 'picker', 'toast']
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /*infoToggle:function (e) {
    var _this=this;
    _this.setData({
      isShow:!_this.data.isShow
    })
  },*/
  //药品/检查/检验信息展开收起
  infoToggle:function (e) {
    console.log('dfjsldf');
    console.log(e);
      var id = e.currentTarget.id, list = this.data.list;
    console.log(id);
    console.log(list);
      for (var i = 0, len = list.length; i < len; ++i) {
        if (list[i].id == id) {
          list[i].open = !list[i].open
        }
        /*else {//如果需要其他的收起
          list[i].open = false
        }*/
      }
      this.setData({
        list: list
      });
  },


})