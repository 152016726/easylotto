Page({
	data: {
		scroll: {
			ifNull: false,
			loadText:'加载中...',
			pageNum:1,
			nullText:''
		},
		scrollboxList:[
			{"checked": "true","value":"5","teamName":"第一团队团队名称队","teamNum":"10","teamLeader":"李夏明","signNum":"2058","serveNum":"45"},
			{"checked": "","value":"1","teamName":"第一团队团队名称队","teamNum":"10","teamLeader":"李夏明","signNum":"2058","serveNum":"45"},
			{"checked": "","value":"7","teamName":"第一团队团队名称队","teamNum":"10","teamLeader":"李夏明","signNum":"2058","serveNum":"45"},
			{"checked": "","value":"9","teamName":"第一团队团队名称队","teamNum":"10","teamLeader":"李夏明","signNum":"2058","serveNum":"45"},
		], //团队滚动栏
		phoneNumber:15689789562, //地址栏电话号码
    	idCard:45786545698789654, //地址栏身份证
    	showEdit: true, //地址栏显示编辑按钮
    	textareaDisabled:true, //地址栏多行输入框不可编辑
    	textVal:"肇庆市鼎湖区 莲花镇2组莲花小学对面肇庆市鼎湖区花镇2组莲花小学对面花", //地址栏输入框内容
		readChecked:false,  //签约协议未读状态
		signbtnDisabled:true, //签约协议按钮不可点击
	},
	onLoad: function () {
		console.log(this.data.focus)
		var _this=this;
	    //手机号码星号转化
	    var tel = "13122223333";
	    var reg = /^(\d{3})\d{5}(\d{3})$/;
	    if(tel){
	    	tel = tel.replace(reg, "$1*****$2");
	    	_this.setData({
	    		phoneNumber:tel
	    	})
	    };
	    //身份证号星号转化
	    var idCard="45786545698789654";
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
	},
	//下拉刷新
	upper: function(e){
		var _this = this;
		wx.showToast({
			title: '数据刷新中',
			icon:'loading',
			duration:1000,
			mask:true
		});
		_this.setData({
			// scrollboxList: []
		});
		// _this.getDoctorList(1);
	},
	//上拉加载
	lower:function(e){
	  	var _this=this;
	  	// _this.getDoctorList(_this.data.scroll.pageNum);
	},
	radioChange: function(e) {
		console.log(e)
		console.log('radio发生change事件，携带value值为：', e.detail.value);
		var _this=this;
		var radioVal=e.detail.value;
		_this.setData({
			radioVal:radioVal,
		})
	},
	//点击编辑按钮
	bindEditTap: function(){
		var _this=this;
		_this.setData({
			showEdit:false,
			textareaDisabled:false,
		})
	},
	//点击取消按钮
	bindQuitEdit: function(){
		var _this=this;
		var textVal=_this.data.textVal;
		_this.setData({
			showEdit:true,
			textareaDisabled:true,
			textVal:textVal,
		})
	},
	//点击保存按钮
	bindFormSubmit: function(e) {
		var _this=this;
		console.log(e.detail.value.textarea)
		_this.setData({
			showEdit:true,
			textareaDisabled:true,
		})
	},
	//点击签约协议
	checkboxChange: function(e) {
		console.log(e.detail.value[0])
    	var _this=this;
    	var readCheckedVal=e.detail.value[0];
    	var signbtnDisabled = _this.data.signbtnDisabled;
    	if(!readCheckedVal){
    		signbtnDisabled=true;
    	}else{
    		signbtnDisabled=false;
    	}
		_this.setData({
			signbtnDisabled:signbtnDisabled,
		})
  	},
	//点击签约按钮
	bindSign:function(){
		
	},
})
