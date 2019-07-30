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
		checkAll:"",
		checkboxList:[
			{"name": "波妞","value":"13","imgUrl": "http://cda.heyuht.com:8181/image/big/129fd02c87a925fcdb2b299e314d5881.png", "relation": "母亲", "checked": "", "signStatus": "0"},
			{"name": "fggg","value":"23","imgUrl": "http://cda.heyuht.com:8181/image/big/90aef800f23dda5eb469ec3a1485d408.png", "relation": "表兄", "checked": "", "signStatus": "0"},
			{"name": "fg妞","value":"33","imgUrl": "http://cda.heyuht.com:8181/image/big/08ce4a035a60c4d783826d238348707a.png", "relation": "父亲", "checked": "", "signStatus": "1"},
			{"name": "妞gg","value":"43","imgUrl": "http://cda.heyuht.com:8181/image/big/08ce4a035a60c4d783826d238348707a.png", "relation": "祖父", "checked": "", "signStatus": "1"},
			{"name": "妞fg","value":"53","imgUrl": "http://cda.heyuht.com:8181/image/big/08ce4a035a60c4d783826d238348707a.png", "relation": "祖母", "checked": "", "signStatus": "1"},
		],//签约人
		showEdit: true, //地址栏显示编辑按钮
    	textareaDisabled:true, //地址栏多行输入框不可编辑
    	textVal:"肇庆市鼎湖区 莲花镇2组莲花小学对面肇庆市鼎湖区花镇2组莲花小学对面花", //地址栏输入框内容
		readChecked:false,  //签约协议未读状态
		signbtnDisabled:true, //签约协议按钮不可点击
	},
	onLoad: function () {

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
		// _this.setData({
		// 	radioVal:radioVal,
		// })
	},
	checkboxSelected: function (e) {
		console.log(e)
		var _this = this;
		var valArr = e.detail.value;
		var checkboxList = _this.data.checkboxList;
		var noSignNum = 0;
		var checkAll = _this.data.checkAll;
		for (var j = 0; j < checkboxList.length; j++) {
			checkboxList[j].checked = '';
			if (checkboxList[j].signStatus == '0') {
				noSignNum++;
			}
			for (var i = 0; i < valArr.length; i++) {
				if (valArr[i] == checkboxList[j].value) {
					checkboxList[j].checked = 'true';
				}
			}
		}
		if (valArr.length == 0) {
			for (var j = 0; j < checkboxList.length; j++) {
				checkboxList[j].checked = '';
			}
		}
		noSignNum == valArr.length ? checkAll = 'true' : checkAll ='';
		console.log({
			'valArr': valArr,
			'noSignNum': noSignNum,
			'checkboxList': checkboxList,
			'checkAll': checkAll
		})
		_this.setData({
			checkboxList: checkboxList,
			checkAll: checkAll
		})
	},
	checkAllChange: function (e) {
		var _this = this;
	    var ifChoosed = e.detail.value.length;//1选中，0未选中
	    var checkboxList = _this.data.checkboxList;
	    var checkAll = _this.data.checkAll;
	    for (var i = 0; i < checkboxList.length;i++) {
	    	if ((checkboxList[i].signStatus == '0') && (ifChoosed == 1)) {
	    		checkboxList[i].checked = 'true';
	    	} else {
	    		checkboxList[i].checked = '';
	    	}
	    }
	    ifChoosed == 1 ? checkAll = 'true' : checkAll = '';
	    _this.setData({
	    	checkboxList: checkboxList,
	    	checkAll: checkAll
	    })
	},
	linkAddMemberTap: function () {
		wx.redirectTo({
			url: '../../info/family/add/add',
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
	checkboxSign: function(e) {
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
		var _this=this;
		var checkboxList = _this.data.checkboxList;
		var valArr = [];
		for (var i = 0; i < checkboxList.length; i++) {
			if (checkboxList[i].checked == 'true') {
				valArr.push(checkboxList[i].value);
			}
		}
		console.log(valArr)
		if(valArr==""){
    		wx.showToast({
				title: "请选择签约人",
				icon:'none',
				duration:2000,
				mask:true
			})
    	}else{
    		wx.showToast({
				title: "跳转",
				icon:'none',
				duration:2000,
				mask:true
			})
    	}
	},
})
