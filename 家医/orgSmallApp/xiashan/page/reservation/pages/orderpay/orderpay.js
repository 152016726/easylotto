// pages/register/orderpay/orderpay.js
//获取应用实例
import drawQrcode from '../../../../utils/weapp.qrcode.esm.js'
const app = getApp();
// 定义一个总秒数，支付时长30分钟
var totalSecond = 30 * 60;
// 时间格式化输出，如30时00秒。每1000ms都会调用一次
function dateFormat(second) {
  // 总秒数
  var second =second;
  // 分钟位
  var min = fillZeroPrefix(Math.floor(second / 60));
  // 秒位
  var sec = fillZeroPrefix((second - min * 60));// equal to => var sec = second % 60;
  return  min + "分" + sec + "秒";
}
// 位数不足补零
function fillZeroPrefix(num) {
  return num < 10 ? "0" + num : num
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clock:'',
    hideCodeDialog: true,
    disabled:false,
    idCard:'123456789012345679',
    showIDCardNum:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this;
    _this.countDown(_this);//调用倒计时函数
    //二维码生成
    drawQrcode({
      width: 220,
      height: 220,
      canvasId: 'myQrcode',
      //typeNumber: 10,
      text: '782731992'
    });

  },
  //二维码显示隐藏
  showCodeDialog: function () {
    this.setData({
      hideCodeDialog: false
    })
  },
  hideCodeDialog: function () {
    this.setData({
      hideCodeDialog: true
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function (){},
  //身份证星号显示隐藏
  IDCardShow:function(){
    var idCard='123456789012315679';
    //console.log("身份证长度**"+idCard.length)
    var _this=this;
    _this.setData({
      showIDCardNum:!_this.data.showIDCardNum
    });
    if(_this.data.showIDCardNum){//切换显示全部数字
      _this.setData({
        idCard:idCard
      })
    }else{//显示部分带星号
      //console.log("身份证长度**"+idCard.length)
      if(idCard.length==18){
        //console.log('是18');
        idCard=idCard.substring(0,4)+'**********'+idCard.substring(idCard.length-4);
        _this.setData({
          idCard:idCard
        })
      }else{
        //console.log('是15');
        idCard=idCard.substring(0,4)+'*******'+idCard.substring(idCard.length-4);
        _this.setData({
          idCard:idCard
        })
      }

    }

  },
  /* 秒级倒计时 */
  countDown:function(){
    var _this=this;
    // 渲染倒计时时钟
    _this.setData({
      clock: dateFormat(totalSecond)
    });
    if (totalSecond <= 0) {
      _this.setData({
        clock: "已经截止",
        disabled:true  //支付按钮不可点击
      });
      // timeout则跳出递归
      return;
    }
    setTimeout(function () {
      // 放在最后--
      totalSecond -= 1;
      _this.countDown();
    }, 1000)
  }

})