// pages/info/treatment/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //menuHide:true,
    isShow:false,
    navTab:['待支付','已支付'],
    "currentIndex":0,
    array: ['中国', '美国', '日本', '韩国'],
    pickIndex: 0,
    list:[
      {
        value:0,
        signStatus:0,//0，待支付，1已支付，
        title:'药品/检验/检查',
        price:2100.11,
        name:'张三',
        checked:true
      },
      {
        value:1,
        signStatus:0,//0，待支付，1已支付，
        title:'药品/检验/检查2',
        price:2110.11,
        name:'张三2',
        checked:false
      },
      {
        value:2,
        signStatus:0,//0，待支付，1已支付，
        title:'药品/检验/检查',
        price:2100.11,
        name:'张三',
        checked:'',
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('totalPrice');

    var _this=this;
    var totalPrice=0;//默认全选
    //赋值数值
    /*var list=_this.data.list;
    for(var i=0;i<list.length;i++){
      list[i].price=parseFloat(list[i]).toFixed(2);
    }
    _this.setData({
      list:list
    });*/
    console.log(_this.data.list.length);
    //初始化总价格
    for(var i=0;i<_this.data.list.length;i++){
      if(_this.data.list[i].checked){
        totalPrice +=parseFloat(parseFloat(_this.data.list[i].price).toFixed(2));
      }
    }
    console.log('*****');
    console.log('totalPrice'+totalPrice);
    _this.setData({
      totalPrice:totalPrice
    })
    var b=4;
    b +=4;
    console.log(b);
  
  },
  //下拉菜单显示-选择就诊人
 /* changeMenu:function(e){
    var _this=this;
    _this.setData({
      //menuHide:!_this.data.menuHide
      isShow:!_this.data.isShow
    })

  },*/
  pickChange:function(e){
    var _this=this;
    _this.setData({
      //menuHide:!_this.data.menuHide
      //isShow:!_this.data.isShow,//箭头udshow
      pickIndex: e.detail.value

    })
    console.log(_this.data.pickIndex)

  },
  //tab切换显示待支付、已支付
  changeTab:function(e){
    var _this=this;
    console.log(e);
    var target = e.target;
    _this.setData({
      //menuHide:!_this.data.menuHide
      currentIndex:target.dataset.index
    })
  },
  //待支付 复选框变化事件
  checkboxChange:function(e){
    var _this=this;
    var _list=_this.data.list;
    var valArr=e.detail.value;
    console.log('checkboxChange');
    //event.preventDefault();
    console.log(e);
    console.log(e.detail);
    console.log(valArr);
    //读取设置复选框的值
    for(var i=0;i< _list.length;i++){//_list.length要写在外层
      _list[i].checked=false;
      for(var j=0;j<valArr.length;j++){
        console.log(valArr[j]);
        if(valArr[j]==_list[i].value){
          _list[i].checked=true;
        }
      }
    }
    _this.setData({
      list:_list
    });
    //计算总价格
    console.log(_this.data.list);
    var totalPrice=0;
    console.log(_this.data.list.length);
    for(var i=0;i<_this.data.list.length;i++){
      if(_this.data.list[i].checked){
        totalPrice +=parseFloat(parseFloat(_this.data.list[i].price).toFixed(2));
      }
    }
    console.log('*****');
    console.log('totalPrice'+totalPrice);
    _this.setData({
      totalPrice:totalPrice
    })


  },
  //待支付复选框title阻止跳转事件
 /* checkboxTitle:function(e){
    console.log('checkboxTitle');
    console.log(e);
    return false;
  }*/

})