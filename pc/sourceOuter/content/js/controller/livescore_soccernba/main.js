divMain = document.getElementById('MSLiveMain');
divLeft = document.getElementById('MSLiveLeft');
divRight = document.getElementById('MSLiveRight');
divMessage = document.getElementById('MSLiveMessage2');
divPlaySound = document.getElementById('MSPlaySound');
divAlert = document.getElementById('MSAlert');
// divMain.innerHTML = 'loading<marquee direction="right" width="50" scrolldelay="'+MARQUEEDelay+'" scrollamount="'+MARQUEEAmount+'" loop="'+MARQUEELoop+'">. . .</marquee>';
divMain.innerHTML = '<div class="loaders"><div class="loader"><div style="backgroundColor:black" class="ball-pulse-rise"><div></div><div></div><div></div><div></div><div></div></div></div></div>';
var selected_tour = sresult =[];
var optionArr = [];
var langstring_multiple = ['(可多選)', '(可多选)', '(multiple)'][lang_id];
var _req = false;
optionArr.push({label: ShowSelected,value: ShowSelected+langstring_multiple, name:'all'});
	function Init() {
		var t;
		try {
			if (window.location.search != null && window.location.search.length > 1) {
				t = window.location.search.replace(/^\?/, ' &').replace(/%26/g, '&') + '& ';
				if (t.indexOf('&sport=1&') > 0) {
					SportID = FB;
				}
				if (t.indexOf('&sport=2&') > 0) {
					SportID = BB;
				}
				if (t.indexOf('&lang=CN&') > 0) {
					LangID = TW;
				}
				if (t.indexOf('&lang=SC&') > 0) {
					LangID = CN;
				}
				if (t.indexOf('&lang=en&') > 0) {
					LangID = EN;
				}
				if (t.indexOf('&group=0&') > 0) {
					IsGroupStatusDisplay = false;
				}
				if (t.indexOf('&mp=') > 0) {
					mp = t.replace(/.*&mp=([0-9,]+).*/, ',$1,');
				}
				//console.log('mp: [' + mp + ']');
			}
		} catch (e) {
		}
	}

	function getStyle(s, n) {
		var i = 0;
		var j = 0;
		var tmp = null;
		var tmp2 = null;
		var r = null;

		try {
			for (i=0; i<document.styleSheets.length; i++) {
				tmp = document.styleSheets[i];
				if (tmp.rules) {
					tmp2 = tmp.rules;
				} else {
					tmp2 = tmp.cssRules;
				}
				for (j=0; j<tmp2.length; j++) {
					if ((''+tmp2[j].selectorText+'') == s || (''+tmp2[j].selectorText+'').toLowerCase() == s.toLowerCase()) {
						eval("r=tmp2[j].style."+n+";");
						break;
					}
				}
			}
		} catch (e) {
			r = null;
		}

		return r;
	}
	function changeStyle(s, n, v) {
		var i = 0;
		var j = 0;
		var tmp = null;
		var tmp2 = null;

		try {
			for (i=0; i<document.styleSheets.length; i++) {
				tmp = document.styleSheets[i];
				if (tmp.rules) {
					tmp2 = tmp.rules;
				} else {
					tmp2 = tmp.cssRules;
				}
				for (j=0; j<tmp2.length; j++) {
					if ((''+tmp2[j].selectorText+'') == s || (''+tmp2[j].selectorText+'').toLowerCase() == s.toLowerCase()) {
						eval("tmp2[j].style."+n+"='"+v+"';");
						break;
					}
				}
			}
		} catch (e) {
		}
	}
	function changeFontSize(s, n, v) {
		var o;
		o = (''+getStyle(s, n)).replace(/([0-9]+).*/, '$1');
		o = eval(o + ' + (' + v +');');
		if (o < 8) o = 8;
		if (o > 20) o = 20;
		changeStyle(s, n, o+'px');
	}
	Init();


	function updateSort(v) {
		IsGroupStatusDisplay = v;
		UpdatePage();
	}
	function UpdatePage() {
		if (LiveObj.UpdateStatus == LiveObj.Normal) {
			window.clearTimeout(LiveObj.TimeoutID);
			LiveObj.TimeoutID = window.setTimeout('LiveObj.download(LiveObj.ModeNormal);', DownloadDelay);
		}
	}

	function updateAlert(t, v) {
		if (t) {
			LiveObj.IsAlert = LiveObj.IsAlert | v;
		} else {
			LiveObj.IsAlert = (LiveObj.IsAlert | v) - v;
		}
	}
	var EventsSelect = '', _f = 1;
	function genTourSelection(sresult) {
	//alert("call genTourSelection of livescore.htm");
		var divTourSelection;		
		var fixtureCount = xmlGetLength(LiveObj.XML[LiveObj.CONFIG].getRoot(), '/ROWSET/ROW');
		var tourArray = new Array();
		var count = 0;
		var tourName = '';
		var isExist = false;
		var content = content_change = '';

		for (var i = 1; i <= fixtureCount; i ++) {
			tourName = xmlGet(LiveObj.XML[LiveObj.CONFIG].getRoot(), '/ROWSET/ROW['+i+']/TOURNAMENT_NAME');
			isExist = false;

			for (var j = 0; j < tourArray.length; j++) {
				if ( tourArray[j] == tourName) {
					isExist = true;
					break;
				}
			}

			if(!isExist) {
				tourArray[count++] = tourName;
			}
			
		}

		var optionArr = [];
		optionArr.push({
			label: ShowSelected+langstring_multiple,
			value: 0,
			name: 'all'
		});
		for (var i = 0; i < tourArray.length; i++) {		
			optionArr.push({
				label: tourArray[i],
				value: i+1,
				name: tourArray[i]
			})
		}

		EventsSelect = $("#EventsSelect").EventsSelect({
		    mult:true,
		    option:optionArr
		});
		if( _f == 1 || sresult.length == 0){
			EventsSelect.setResult(["0"])
		}else{
			EventsSelect.setResult(sresult)
		}

	}

	function submitEvents(){
		_req = true;
		selected_tour = new Array(),
		sresult = new Array(),
		data_lens = 0,
		_i = 0;
		$('.EventsSelect-option').css({'height':"500px",'opacity':"1"})
		$('.EventsSelect-option').find('div.options').each(function(){
			if( $(this).hasClass('selected')){
				selected_tour.push($(this).attr('data-name'));
				sresult.push($(this).attr('data-value'));
				_i ++;
			}

			data_lens++;
		})
		SingleSelect = ' , ';
		FilterTourList = ' , ';
		// ApplySingleSelect();
		if(_i>0){
			$('#_tips').html('')
			LiveObj.updateLivescore();
		}

		if(_i==0){
			$(".EventsSelect-option").animate({height:"600px",opacity:"1"},"1","swing")
			$('#_tips').html(['請至少選擇一個聯賽','请至少选择一个联赛','Please select at least one tournament'][lang_id])
		}
		
	}

	function resetEvents(){
		_req = true;
		$('.Select_options div').removeClass("selected");
		$('#sall').addClass('selected')
		selected_tour = new Array(),
		sresult = new Array();
		$('.EventsSelect-option').find('div.options').each(function(){
			if( $(this).hasClass('selected')){
				selected_tour.push($(this).attr('data-name'))
				sresult.push($(this).attr('data-value'))
			}
			// if(TmpForceDisplayTourList.indexOf(','+$(this).attr('data-name')+',') < 0){
			// 	TmpForceDisplayTourList = TmpForceDisplayTourList.replace('\,', ','+$(this).attr('data-name')+',');
			// }
			// if (TmpFilterTourList.indexOf(','+$(this).attr('data-name')+',') < 0) {
			// 	TmpFilterTourList = TmpFilterTourList.replace('\,', ','+$(this).attr('data-name')+',');
			// }
			// TmpFilterTourList = TmpFilterTourList.replace('\,', ','+$(this).attr('data-name')+',');
		})
		// ApplySingleSelect();
		// console.log(SingleSelectDisplay)
		SingleSelect = ' , ';
		FilterTourList = ' , ';
		// TmpForceDisplayTourList = ' , ';
		LiveObj.updateLivescore();
		$('.options').removeClass('selected');
		EventsSelect.setResult(["0"]);
		
	}


	// function DisplayAllTourSelection(count) {
	// 	// console.log(count)
	// 	for ( var i = 0; i < count; i++) {
	// 		sel = $('.EventsSelect-option .options').attr('data-value');

	// 		if (TmpForceDisplayTourList.indexOf(','+sel+',') < 0) {
	// 			TmpForceDisplayTourList = TmpForceDisplayTourList.replace('\,', ','+sel+',');
	// 		}

	// 		if (TmpFilterTourList.indexOf(','+sel+',') < 0) {
	// 			TmpFilterTourList = TmpFilterTourList.replace('\,', ','+sel+',');
	// 		}
	// 	};
	// 	ApplySingleSelect();
	// }

	function updateTourSelection(checked, value, updateSingle) {
	//alert("call updateTourSelection");
		var fixtureList;
		if (checked) {
			if (TmpFilterTourList.indexOf(','+value+',') < 0) {
				TmpFilterTourList = TmpFilterTourList.replace('\,', ','+value+',');
			}
		} else {
			TmpFilterTourList = TmpFilterTourList.replace(','+value+',', ',');
		}
		if (document.getElementsByName(value).length == 0 ) {
			if (checked) {
				if (TmpForceDisplayTourList.indexOf(','+value+',') < 0) {
					TmpForceDisplayTourList = TmpForceDisplayTourList.replace('\,', ','+value+',');
				}
			} else {
				TmpForceDisplayTourList = TmpForceDisplayTourList.replace(','+value+',', ',');
			}
		}

		if (updateSingle) {
			fixtureList = document.getElementsByName(value);

			for(var i = 0; i < fixtureList.length; i++) {
				fixtureList[i].checked = checked;
				UpdateSingleSelect(checked, fixtureList[i].value);		
			}
		}


	}

	function genOption() {
		divOption = document.getElementById('MSOption');

		divOption.innerHTML ='<div>'+
			((SportID==FB)?
				'<p style="color:#1f644f;line-height:30px;">'+LangStringAlertWay[LangID]+':'+LangStringAlertFixtures[LangID]+'</p><ul class="radioList">'
				+'<li><ul>'
					+'<li><input type="checkbox" onclick="javascript:updateAlert(this.checked, LiveObj.AlertSound);"'+(((LiveObj.IsAlert & LiveObj.AlertSound)==LiveObj.AlertSound)?' checked':'')+'>'+LangStringAlertSound[LangID]
					+'</li><li><input type="radio" name=r1 onclick="javascript:updateAlert(true, LiveObj.AlertSoundSelected);"'+(((LiveObj.IsAlert & LiveObj.AlertSoundSelected)==LiveObj.AlertSoundSelected)?' checked':'')+'>'+LangStringAlertSelectOnly[LangID]
					+'</li><li><input type="radio" name=r1 onclick="javascript:updateAlert(false, LiveObj.AlertSoundSelected);"'+(((LiveObj.IsAlert & LiveObj.AlertSoundSelected)==LiveObj.AlertSoundSelected)?'':' checked')+'>'+LangStringAlertAll[LangID]
					+'</li><li><input type="button" value="'+LangStringTest[LangID]+'" onClick="javascript:LiveObj.GenAlertSound();"></li>'
				+'</ul></li><li><ul>'
					+'<li><input type="checkbox" onclick="javascript:updateAlert(this.checked, LiveObj.AlertPopup);"'+(((LiveObj.IsAlert & LiveObj.AlertPopup)==LiveObj.AlertPopup)?' checked':'')+'>'+LangStringAlertPopup[LangID]+'<i>*</i>'
					+'</li><li><input type="radio" name=r2 onclick="javascript:updateAlert(true, LiveObj.AlertPopupSelected);"'+(((LiveObj.IsAlert & LiveObj.AlertPopupSelected)==LiveObj.AlertPopupSelected)?' checked':'')+'>'+LangStringAlertSelectOnly[LangID]
					+'</li><li><input type="radio" name=r2 onclick="javascript:updateAlert(false, LiveObj.AlertPopupSelected);"'+(((LiveObj.IsAlert & LiveObj.AlertPopupSelected)==LiveObj.AlertPopupSelected)?'':' checked')+'>'+LangStringAlertAll[LangID]
					+'</li><li><input type="button" value="'+LangStringTest[LangID]+'" onClick="javascript:LiveObj.GenAlertPopupWindowTest();"></li>'
				+'</ul></li><li><ul>'
					+'<li><input type="checkbox" onclick="javascript:updateAlert(this.checked, LiveObj.AlertDiv);"'+(((LiveObj.IsAlert & LiveObj.AlertDiv)==LiveObj.AlertDiv)?' checked':'')+'>'+LangStringAlertDiv[LangID]
					+'</li><li>&nbsp;</li>'
					+'</li><li>&nbsp;</li>'
					+'</li><li><input type="button" value="'+LangStringTest[LangID]+'" onClick="javascript:LiveObj.GenAlertDiv(true);"></li>'
				+ '</ul></li></ul>'
			:'')
				+'<ul class="sortList"><li>'
					+LangStringSortWay[LangID]+': <input type="radio" name=r4'+(IsGroupStatusDisplay?' checked':'')+' onclick="javascript:updateSort(true);">'+LangStringSortByPlaying[LangID]
					+' &nbsp; <input type="radio" name=r4'+(IsGroupStatusDisplay?'':' checked')+' onclick="javascript:updateSort(false);">'+LangStringSortByTime[LangID]
				+'</li><li>'+LangStringAlertRemark[LangID]+'</li><li><input type=button onClick="javascript:ShowOption();" value="'+LangStringClose[LangID]+'" style="background:#c5c5c5;color:#000;"></li></ul></div>';
	}

	function ShowOption() {
		

		if (getStyle('DIV#MSOption', 'visibility') == 'hidden' || getStyle('DIV#MSOption', 'display') == 'none') {
			genOption();
			
			changeStyle('DIV#MSOption', 'visibility', 'visible');
			changeStyle('DIV#MSOption', 'display', '');
		} else {
			changeStyle('DIV#MSOption', 'visibility', 'hidden');
			changeStyle('DIV#MSOption', 'display', 'none');
		}
	}
	function openScorer(id) {
		var w;
		w = window.open('../page/soccer/livescore/player-scorer.html?id='+ id +'&lang='+lang+'&nocache=' + ('' + (new Date())).replace(/ /g, ''), 'MSSoccerScorer', 'width=800,height=400,scrollbars=yes,resizable=yes');
		w.focus();
	}

	function openTeam(p) {
		var w;
		w = window.open(((LangID==CN)?FJTWEBSer:WEBSer)+p, 'MSNBATeam', 'width=800,height=550,scrollbars=yes,resizable=yes');
		w.focus();
	}

	
	function openRemark() {
		var w;
		w = window.open(((LangID==CN)?FJTWWWSer:WWWSer)+'/'+SportString[SportID]+'/html/result/'+LangStringFJT[LangID]+'-remark.html', 'MSRemark', 'width=550,height=500,scrollbars=yes,resizable=yes');
		w.focus();
	}

	function openPayoutTime() {
		var w;
		w = window.open(((LangID==CN)?FJTWEBSer:WEBSer)+'/slot/html/corprofile/timepaid/'+LangStringENOnly[LangID]+'timepaid.html', 'MSPayoutTime', 'width=800,height=500,scrollbars=yes,resizable=yes');
		w.focus();
	}

	function openResult() {
		var w;
		w = window.open(WEBSer+'/'+SportString[SportID]+'/html/result/'+LangString[LangID]+'-news.html?', 'MSResult', 'width=800,height=500,scrollbars=yes,resizable=yes');
		w.focus();
	}

	function UpdateSingleSelect(cb, id, tour) {
		// console.log(document.getElementsByName(tour))
		if (cb) {
			if (SingleSelectDisplay.indexOf(','+id+',') < 0 && document.getElementsByName(tour).length==0) {
				SingleSelectDisplay = SingleSelectDisplay.replace('\,', ','+id+',');
			}
				// console.log()
		} else {
				SingleSelectDisplay = SingleSelectDisplay.replace(','+id+',', ',');
		}
		
		if(tour) {
			var fixtureList = document.getElementsByName(tour);
			var isChecked = false;
			for( var i = 0; i < fixtureList.length; i++) {
				// console.log(fixtureList[i].checked)
				if (fixtureList[i].checked) {
					isChecked = true;
				}
			}
			updateTourSelection(isChecked,tour,false);
			// genTourSelection(sresult)
			EventsSelect.setResult(sresult)
			ApplySingleSelect();
		} 

	}


	function ApplySingleSelect() {
		// Chooseinput = 'yes';
		if (LiveObj.UpdateStatus == LiveObj.Normal) {
			SingleSelect = SingleSelectDisplay;
			FilterTourList = TmpFilterTourList;
			ForceDisplayTourList = TmpForceDisplayTourList;
			TmpForceDisplayTourList = ' , ';
			// console.log( 'SingleSelectDisplay:'+SingleSelectDisplay  )
			// console.log( 'TmpFilterTourList:'+TmpFilterTourList  )
			// console.log( 'TmpForceDisplayTourList:'+TmpForceDisplayTourList  )
			LiveObj.updateLivescore();
		}


	}

	function AdjustWidth(ie) {
		return;
		try {
			if (document.body.clientWidth <= MinWidth) {
				divMain.style.marginLeft = FrameLeftMin + 'px';
				divMain.style.marginRight = (FrameRightMin + FrameRightScroll) + 'px';
				if (ie) {
					divMain.style.width = document.body.clientWidth - FrameLeftMin - FrameRightMin - FrameRightScroll;
				}
			} else {
				divMain.style.marginLeft = FrameLeft + 'px';
				divMain.style.marginRight = (FrameRight + FrameRightScroll) + 'px';
				if (ie) {
					divMain.style.width = document.body.clientWidth - FrameLeft - FrameRight - FrameRightScroll;
				}
			}
		} catch (e) {
		}
	}
	document.body.onresize = function() {AdjustWidth(true);}
	window.onresize = function() {AdjustWidth(false);}


	function LIVESCOREOBJ() {
		// alert("call LIVESCOREOBJ of livescore.htm");
		function GenFST(FST) {
			return '<img src="../images/icons/fst.png" alt="最先入球球隊">';
		}
		function GenRedCard(i) {
			// return '<img src="/soccer/images/result/redcard'+i+'.gif">';
			return '<span style="background:red;color:white;">&nbsp;'+((i>1)?i:'1')+'&nbsp;</span>';
			// return '<div style="background:red;color:white;width:12px;align:center;display:inline;">'+((i>1)?i:'1')+'</div>';
		}
		function GenMoney() {
			return '<img src="../images/icons/money.png"  alt="完場派彩">';
		}
		function GenRedLamp() {
			return '<img src="../images/icons/offline.png"  alt="紅燈代表未開場或未確認派彩">';
		}
		function GenGreenLamp() {
			return '<img src="../images/icons/online.png"  alt="綠燈代表賽事進行中">';
		}
		function GenBIR() {
			return '<img src="/soccer/images/result/bir.gif"  alt="即場投注">';
		}
		function GenHTB() {
			return '<img src="../images/icons/Half17x17.gif"  alt="中場盤">';
		}
		function GenMP1() {
			var t;

			if (LangID == CN) {
				t = '<a href="https://www.mplus-live.com/" title="m直播" target="_blank" onClick="ga(\'send\', \'event\', \'mplus_click_count\', \'to_mplus\', \'livescore_button\');">';
			} else if (LangID == EN) {
				t = '<a href="https://www.mplus-live.com/" title="m Plus" target="_blank" onClick="ga(\'send\', \'event\', \'mplus_click_count\', \'to_mplus\', \'livescore_button\');">';
			} else {
				t = '<a href="https://www.mplus-live.com/" title="m直播" target="_blank" onClick="ga(\'send\', \'event\', \'mplus_click_count\', \'to_mplus\', \'livescore_button\');">';
			}

			return t;
		}
		function GenMP() {
			var t;

			t = GenMP1();

			if (LangID == CN) {
				t += '<img src="../images/icons/fl.png" border="0" alt="m直播"></a>';
			} else if (LangID == EN) {
				t += '<img src="../images/icons/fl.png" border="0" alt="m Plus"></a>';
			} else {
				t += '<img src="../images/icons/fl.png" border="0" alt="m直播"></a>';
			}

			return t;
		}
		function GenNBABIR() {
			return '<img src="../images/icons/LB-Basketball17x17.gif" alt="本賽事將提供下半場讓分盤及下半場上下盤">';
		}
		function GenNBASHB() {
			return '<img src="../images/icons/bbir.gif" alt="走地盤">';
		}
		this.GenTV = function(TV) {
			var TVs;
			var r = new Array();
			try{
				if (TV.length > 0) {
					TVs = TV.split(',');
					r.push('<img src="/logo/live_tv.png" title="');
					for (i=0; i<TVs.length; i++) {
						r.push(xmlGet(this.XML[this.CONFIG].getRoot(), '/ROWSET/TVDATA/TV[@id='+TVs[i]+']/'+LangStringTV[LangID]+'t', '')+((i<TVs.length-1)?', \n':''));
					}
					r.push('" style="cursor: pointer;">');
				}
				return r.join('');
			}catch (e) {
			//alert("livescore xmlget call error is "+e.message);
			}
		}
		this.init = function() {
			//alert("call init of livescore.htm");
		
			var i;
			for (i=0; i<this.XMLPath.length; i++) {
				this.XML[i] = null;
				this.XML[i] = new XMLOBJ(this.XMLPath[i]);
				//alert("xmlpath of livescore is "+this.XMLPath[i]);
				this.XML[i].init();
			}

			this.UpdateStatus = this.INIT;
		}

		this.download = function(mode) {
			//alert("call download of livescore.htm");
			var i;
			var _self = this;
			var NeedDownload = true;

			window.clearTimeout(this.TimeoutID);

			this.UpdateStatus = this.Downloading;
			document.body.style.cursor = 'progress';

			//alert('Download Times: ' + this.DownloadTimes);
			if (mode == this.ModeNormal) {
				this.DownloadTimes = 1;
				NeedDownload = true;
			} else {
				this.DownloadTimes++;
				if (this.DownloadTimes > MaxDownloadErrorRetry) {
					//alert('Error: ' + this.DownloadTimes + ' - ' + this.FirstTime);
					if (this.FirstTime) {	// if error Max Times and never show the page, gen no data;
						// this.Fixtures = 0;
						// this.CurrentFixture = 0;
						// this.CurrentDisplayFixture = 0;
						// this.HasAlert = true;
						// this.NeedAlertSound = false;
						//alert('Hello Download');
						this.TimeoutID = window.setTimeout(function(){_self.updateLivescore()}, UpdateLivescoreDelay);
						NeedDownload = false;
					} else {	// Continue download
						//this.TimeoutID = window.setTimeout(function(){_self.download(_self.ModeRetry)}, ErrorReloadDelay);
						NeedDownload = true;
					}
				}
			}

			if (NeedDownload) {
			
				//alert("NeedDownload XPath Length is "+this.XMLPath.length);
				for (i=0; i<this.XMLPath.length; i++) {
					if (
							((mode == this.ModeNormal || mode == this.ModeRetry) && (
							(this.XMLMode[i] == this.ModeFirst && this.XML[i].status != this.XML[i].Ready) ||
							(this.XMLMode[i] == this.ModeEverytime) ||
							(this.XMLMode[i] == this.ModeCheckID && this.XML[i].status != this.XML[i].Ready)
							)) ||
							(mode == this.ModeCheckID && this.XMLMode[i] == this.ModeCheckID)
						) {
						this.XML[i].download();
					}
				}

				window.clearTimeout(this.TimeoutID);
				this.TimeoutID = window.setTimeout(function(){_self.checkStatus()}, CheckStatusDelay);
			}
		}

		this.checkStatus = function() {
			//alert("call checkstatus of livescore.htm");
			//alert("XPath length is "+this.XMLPath.length);
			var i, j, l, s;
			var _self = this;

			window.clearTimeout(this.TimeoutID);

			j = 0;
			l = 0;
			try{
			
			for (i=0; i<this.XMLPath.length; i++) {
				if (this.XML[i].status == this.XML[i].Ready || this.XML[i].status == this.XML[i].Fail) {
					j++;
					l += this.XML[i].status;
				}
			}

			if (j < this.XMLPath.length) {
				//alert("call XMLPath checkStatus");			
				this.TimeoutID = window.setTimeout(function(){_self.checkStatus()}, CheckStatusDelay);
			} else {
				if (l == this.XML[0].Ready * this.XML.length) {
					//alert("call XMLPath check ID123");
					this.TimeoutID = window.setTimeout(function(){_self.checkID()}, UpdateLivescoreDelay);
				} else {
					//alert("call XMLPath Download");
					this.TimeoutID = window.setTimeout(function(){_self.download(_self.ModeRetry)}, ReloadDelay);
				}
			}
			}catch (e) {
				//alert("check status of livescore.htm error is "+e.message);
			}
		}

		this.checkID = function() {
		try{
					var id1, id2;
			var _self = this;
			var i;

			window.clearTimeout(this.TimeoutID);
			//alert("this XML this config Root is "+this.XML[this.CONFIG].getRoot());
			//alert("this XML this config Root is "+this.XML[this.LIVE].getRoot());
			id1 = xmlGet(this.XML[this.CONFIG].getRoot(), '/ROWSET/CSUM/VALUE', -1);
			id2 = xmlGet(this.XML[this.LIVE].getRoot(), '/LIVESCORE/CSUM/@value', -2);

			//alert('Here ' + id1 + ' - ' + id2);
			if (id1 != id2) {
				if (this.DownloadTimes < MaxDownloadErrorRetry+1) {
					this.TimeoutID = window.setTimeout(function(){_self.download(_self.ModeCheckID)}, ChangeIDReloadDelay);
				} else {
					this.TimeoutID = window.setTimeout(function(){_self.download(_self.ModeNormal)}, ChangeIDReloadDelay);
				}
			} else {
				this.UpdateFixtureIDs();
				/*
				this.Fixtures = xmlGetLength(this.XML[this.CONFIG].getRoot(), '/ROWSET/ROW');
				this.CurrentFixture = 0;
				this.CurrentDisplayFixture = 0;
				*/
				this.HasAlert = false;
				this.NeedAlertSound = false;
				this.TimeoutID = window.setTimeout(function(){_self.updateLivescore()}, UpdateLivescoreDelay);
			}
			}catch(e){
				//alert("check ID error is "+e.message);
			}
		}

		this.updateLivescore = function() {
			//alert("call updateLivescore of livescore.htm");
			window.clearTimeout(this.TimeoutID);

			//if (this.Contents) this.Contents.clear();
			this.Contents = null;
			//if (this.AlertContents) this.AlertContents.clear();
			this.AlertContents = null;
			if ((this.IsAlert & (this.AlertPopup + this.AlertDiv)) > this.NoAlert) {
				//if (this.AlertContents != null) this.AlertContents.clear();
				this.AlertContents = null;
				this.AlertContents = new Array();
				if (this.AlertPopupWindow != null) {
					try {
						this.AlertPopupWindow.close();
						this.AlertPopupWindow = null;
					} catch(e) {
					}
				}
				divPlaySound.innerHTML = '';
			}

			this.UpdateStatus = this.Updating;
			document.body.style.cursor = 'wait';

			this.LastRowDate = 'dummy';
			this.LastRowTour = 'dummy';
			this.CurrentFixture = 0;
			this.CurrentDisplayFixture = 0;
			this.Contents = new Array();

			// this.Contents.push('<table id="tableButton" width="100%" cellspacing="0" cellpadding="2"><tr><td>');
			if (true || SportID == FB) {
				this.Contents.push('<ul class="select_title">'
									+'<li><div class="bg'+ (SportID != BB?'':'_nba') +' " id="get_result"><a href="'+(show_type==2?'javascript:GetResult_scoernba();':'javascript:GetResult_scoer();')+'">'+ FinishedMatches +'</a></div></li>'
									+'<li><div class="bg'+ (SportID != BB?'':'_nba') +' odds_time'+ (lang=='en'?'_en':'') +'"><a href="javascript:openPayoutTime();">'+ PayoutSchedule +'</a></div></li>'
									+'<li><div class="bg'+ (SportID != BB?'':'_nba') +' backup"><a href="javascript:openRemark();">'+ Note +'</a></div></li>'
									+'<li><div class="bg'+ (SportID != BB?'':'_nba') +' settings"><a href="javascript:ShowOption();">'+ Featureset +'</a></div></li>'
									// +'<li><select id="odds_type_select" onchange="TourSelection();"></select></li>'
									+'<li><div id="EventsSelect" class="EventsSelect"></div></li>'
								+'</ul>')
			}
			
			if(lang!='en'){
			this.Contents.push('<ul class="select_title" style="float:right;"><li><div class="bg notice'+(SportID != BB?'':' nba')+'"><a href="javascript:popup(\'/content/page/'+ (SportID != BB?'soccer':'nba')+'/notice.html?sport=0&lang=cn\')">'+notice_m+'</a></div></li></ul>');	
			}
			
			
			this.Contents.push('<div id="MSOption" style="margin:0;"></div>');	
			this.Contents.push('<table id="tableMain" width="100%" cellspacing="0" cellpadding="2" class="msl_odds_abs_hdr_table">');
			if(SportID != BB){
				this.Contents.push('<tr>'
										+'<td style="border-top-style:none;border-bottom-style:none;border-left-style:none;border-right-style:none; height:0;width:2.4%;"></td>'
										+'<td style="border-top-style:none;border-bottom-style:none;border-left-style:none;border-right-style:none; height:0;width:6%;"></td>'
										+'<td style="border-top-style:none;border-bottom-style:none;border-left-style:none;border-right-style:none; height:0;width:4%;"></td>'
										+'<td style="border-top-style:none;border-bottom-style:none;border-left-style:none;border-right-style:none; height:0;width:2%;"></td>'
										+'<td style="border-top-style:none;border-bottom-style:none;border-left-style:none;border-right-style:none; height:0;width:18%;"></td>'
										+'<td style="border-top-style:none;border-bottom-style:none;border-left-style:none;border-right-style:none; height:0;width:6%;"></td>'
										+'<td style="border-top-style:none;border-bottom-style:none;border-left-style:none;border-right-style:none; height:0;width:18%;"></td>'
										+'<td style="border-top-style:none;border-bottom-style:none;border-left-style:none;border-right-style:none; height:0;width:2%;"></td>'
										+'<td style="border-top-style:none;border-bottom-style:none;border-left-style:none;border-right-style:none; height:0;width:6%;"></td>'
										+'<td style="border-top-style:none;border-bottom-style:none;border-left-style:none;border-right-style:none; height:0;width:8%;"></td>'
										+'<td style="border-top-style:none;border-bottom-style:none;border-left-style:none;border-right-style:none; height:0;width:3%;"></td>'
										+'<td style="border-top-style:none;border-bottom-style:none;border-left-style:none;border-right-style:none; height:0;width:6%;"></td>'
										+'<td style="border-top-style:none;border-bottom-style:none;border-left-style:none;border-right-style:none; height:0;width:9%;"></td>'
										+'<td style="border-top-style:none;border-bottom-style:none;border-left-style:none;border-right-style:none; height:0;width:9%;"></td>'
									+'</tr>');
			}else{
				this.Contents.push('<tr>'
										+'<td style="border-top-style:none;border-bottom-style:none;border-left-style:none;border-right-style:none; height:0;width:2.4%;"></td>'
										+'<td style="border-top-style:none;border-bottom-style:none;border-left-style:none;border-right-style:none; height:0;width:6%;"></td>'
										+'<td style="border-top-style:none;border-bottom-style:none;border-left-style:none;border-right-style:none; height:0;width:6%;"></td>'
										+'<td style="border-top-style:none;border-bottom-style:none;border-left-style:none;border-right-style:none; height:0;width:6%;"></td>'
										+'<td style="border-top-style:none;border-bottom-style:none;border-left-style:none;border-right-style:none; height:0;width:20%;"></td>'
										+'<td style="border-top-style:none;border-bottom-style:none;border-left-style:none;border-right-style:none; height:0;width:8%;"></td>'
										+'<td style="border-top-style:none;border-bottom-style:none;border-left-style:none;border-right-style:none; height:0;width:4%;"></td>'
										+'<td style="border-top-style:none;border-bottom-style:none;border-left-style:none;border-right-style:none; height:0;width:6%;"></td>'
										+'<td style="border-top-style:none;border-bottom-style:none;border-left-style:none;border-right-style:none; height:0;width:6%;"></td>'
										+'<td style="border-top-style:none;border-bottom-style:none;border-left-style:none;border-right-style:none; height:0;width:6%;"></td>'
										+'<td style="border-top-style:none;border-bottom-style:none;border-left-style:none;border-right-style:none; height:0;width:6%;"></td>'
										+'<td style="border-top-style:none;border-bottom-style:none;border-left-style:none;border-right-style:none; height:0;width:6%;"></td>'
										+'<td style="border-top-style:none;border-bottom-style:none;border-left-style:none;border-right-style:none; height:0;width:6%;"></td>'

									+'</tr>');
			}

			if (SportID == BB) {
				this.Contents.push('<tr class="NBAHeader">');
				this.Contents.push('<td nowrap rowspan="2"></td>');
				this.Contents.push('<td nowrap rowspan="2">'+['賽事','賽事','賽事','League'][LangID]+'</td>');
				this.Contents.push('<td nowrap rowspan="2">'+['開賽時間','開賽時間','開賽時間','Start time'][LangID]+'</td>');
				this.Contents.push('<td nowrap rowspan="2" align="center">'+LangStringBB_HDR_Odds[LangID]+'</td>');
				this.Contents.push('<td nowrap rowspan="2"></td>');
				this.Contents.push('<td nowrap rowspan="2" colspan="2"></td>');
				this.Contents.push('<td nowrap colspan="2" align="center">'+LangStringBB_HDR_FH[LangID]+'</td>');
				this.Contents.push('<td nowrap colspan="3" align="center">'+LangStringBB_HDR_SH[LangID]+'</td>');
				this.Contents.push('<td nowrap rowspan="2" align="center">'+LangStringBB_HDR_TS[LangID]+'</td>');
				this.Contents.push('<td nowrap rowspan="2" align="center">'+LangStringBB_HDR_HS[LangID]+'</td>');
				this.Contents.push('</tr>');
				this.Contents.push('<tr class="NBAHeader">');
				this.Contents.push('<td nowrap align="center">'+LangStringBB_HDR_S1[LangID]+'</td>');
				this.Contents.push('<td nowrap align="center">'+LangStringBB_HDR_S2[LangID]+'</td>');
				this.Contents.push('<td nowrap align="center">'+LangStringBB_HDR_S3[LangID]+'</td>');
				this.Contents.push('<td nowrap align="center">'+LangStringBB_HDR_S4[LangID]+'</td>');
				this.Contents.push('<td nowrap align="center">'+LangStringBB_HDR_OT[LangID]+'</td>');
				this.Contents.push('</tr>');
			}
			//角球比分 20180517
			// this.Corner();
			this.GenRow();
		}
		//角球比分 20180517
		// this.Corner = function(){
		// 	Req = '';
		// 	if(SportID == FB){
				
		// 		//var url = '../../../../soccer/json/realtime/realtime_all_'+ lang +'_fb.json';
		// 	 	var url = '../../../../soccer/json/realtime/cornerScores.json';
		// 		Req = $.ajax({
		// 			type:"post",
		//             dataType:'json',
		//             url:url+"?nocache="+nocache.getTime(),
		//             async: false
		// 		}); 
		// 	}
		// }
		this.GenRow = function() {
			
			var d1, d2;
			var _self = this;
			var count = 0;
			var node = null;
			var node2 = null;
			var node2l = null;
			var i;
			var DISPLAY;
			var ALERTSelected;
			var ALERTAll;
			var ALERTAllCheck;

			//FB & Common
			var GD, TOUR, HTML_COLOR, NAME1, NAME2, ID, SID, TV, HCS, ACS, HHS, AHS, HRN, ARN, C, C2, SHOWC, ST, SP, FST, BIR, HTB, FSI;
			var TID, showMP;
			var HCSl, ACSl;
			var TOPNEWS, TOPNEWSl;
			//角球比分 20180517
			// var corner_state = corner_result = corner_result_HT = null;
			var corner_fhcs = corner_facs = corner_chcs = corner_cacs = corner_showcorner = '';
			var EV_ID;
			//BB
			var PATH1, PATH2, SessionNo, M, S, H1, H2, H3, H4, HO, A1, A2, A3, A4, AO, HSUM, ASUM, HHCAP, HTP, HCAP, TP, HASLC, SBP, SBS, ST, SHD;
			var HFS, AFS, HSS, ASS;
			window.clearTimeout(this.TimeoutID);

			d1 = new Date();
			d2 = d1;

			//this.Fixtures = 0;	// test no data
			ALERTAllCheck = (SportID == FB) && (
					((this.IsAlert & this.AlertSound) == this.AlertSound && (this.IsAlert & this.AlertSoundSelected) == 0) ||
					((this.IsAlert & (this.AlertPopup + this.AlertDiv)) > this.NoAlert && (this.IsAlert & this.AlertPopupSelected) == 0)
				);

			while (this.CurrentFixture < this.Fixtures && count < MaxGenRow && (d2-d1) < MaxGenTime) {
				count++;
				//this.CurrentFixture++;

				ID = this.FixtureIDs[this.CurrentFixture][0];	//xmlGet(node, 'FIXTURE_ID', -1);
				SID = this.FixtureIDs[this.CurrentFixture][1];	//xmlGet(node2, 'sid', 1);
				node = xmlGetNode(this.XML[this.CONFIG].getRoot(), '/ROWSET/ROW[FIXTURE_ID='+ID+']');

				TID = xmlGet(node, 'TID', '0');
				

			/* 	if (mp.indexOf(',' + TID + ',') >= 0) {
					showMP = true;
				} else {
					showMP = false;
				} */
			    TID = xmlGet(node, 'TID', '0');	
			
				
				
				// console.log(selected_tour)
				TOUR = xmlGet(node, 'TOURNAMENT_NAME', '--');
				//console.log("TID: " + TID + " " + TOUR + "	" + showMP);

				this.CurrentFixture++;

				// DISPLAY = (((SingleSelect == ' , ' || SingleSelect.indexOf(','+ID+',') > 0) && (FilterTourList == ' , ' || FilterTourList.indexOf(','+TOUR+',') > 0)) || ForceDisplayTourList.indexOf(','+TOUR+',') > 0);
			
				// console.log( selected_tour.indexOf('全部联赛(可多选)') )
				// console.log(TOUR)
			// for(var )
			// console.log(selected_tour.length)
				if( selected_tour.length>0 ){
					if(selected_tour.indexOf(TOUR)>=0){
						// console.log(SingleSelect)
						console.log(FilterTourList)
						// console.log(FilterTourList)
						// if(Chooseinput == 'yes'){
							DISPLAY = (((SingleSelect == ' , ' || SingleSelect.indexOf(','+ID+',') > 0) && (FilterTourList == ' , ' || FilterTourList.indexOf(','+TOUR+',') > 0)) || ForceDisplayTourList.indexOf(','+TOUR+',') > 0 );
						// }else{
							// DISPLAY = true;
						// }
						// console.log(DISPLAY)
					}else if(selected_tour.indexOf('all')>=0){
						DISPLAY = (((SingleSelect == ' , ' || SingleSelect.indexOf(','+ID+',') > 0) && (FilterTourList == ' , ' || FilterTourList.indexOf(','+TOUR+',') > 0)) || ForceDisplayTourList.indexOf(','+TOUR+',') > 0 );
						TmpForceDisplayTourList = ' , ';
						// console.log(SingleSelect)
					}else{
						DISPLAY = false;
					}
					// console.log(DISPLAY)
				}else{
					DISPLAY = (((SingleSelect == ' , ' || SingleSelect.indexOf(','+ID+',') > 0) && (FilterTourList == ' , ' || FilterTourList.indexOf(','+TOUR+',') > 0)) || ForceDisplayTourList.indexOf(','+TOUR+',') > 0 );
					TmpForceDisplayTourList = ' , ';
				}


				//changed by 20190225
			

				ALERTSelected = false;
				ALERTAll = false;

				if (DISPLAY) {
					this.CurrentDisplayFixture++;

					// if(TID)
					if (SportID == BB) {
						node2 = xmlGetNode(this.XML[this.LIVE].getRoot(), '/LIVESCORE/DATA/ROW[@fid='+ID+']');
						node2l = xmlGetNode(this.XML[this.LIVE].getRoot(1), '/LIVESCORE/DATA/ROW[@fid='+ID+']');
					} else { //FB
						node2 = xmlGetNode(this.XML[this.LIVE].getRoot(), '/LIVESCORE/DATA/ROWSET/ROW[@fid='+ID+']');
						node2l = xmlGetNode(this.XML[this.LIVE].getRoot(1), '/LIVESCORE/DATA/ROWSET/ROW[@fid='+ID+']');
					}

					GD = xmlGet(node, 'GAME_DATE_ORIGIN', '--');
					
					HTML_COLOR = xmlGet(node, 'HTML_COLOR', 'black');
					//SID = this.FixtureIDs[this.CurrentFixture][1];	//xmlGet(node2, 'sid', 1);
					NAME1 = xmlGet(node, 'NAME1', ' ');
					NAME2 = xmlGet(node, 'NAME2', ' ');
					TOURNAMENT_NAME_n = xmlGet(node, 'TOURNAMENT_FULLNAME', ' ');
					haslc =  xmlGet(node2, 'haslc', '');
					if (SportID == FB) {
						HCS = xmlGet(node2, 'hcs', 0);
						ACS = xmlGet(node2, 'acs', 0);
						HCSl = xmlGet(node2l, 'hcs', HCS);
						ACSl = xmlGet(node2l, 'acs', ACS);
						HHS = xmlGet(node2, 'hhs', 0);
						AHS = xmlGet(node2, 'ahs', 0);
						HRN = xmlGet(node2, 'hrn', 0);
						ARN = xmlGet(node2, 'arn', 0);
						C = xmlGet(node2, 'c', 0);
						C2 = (SID==2 && C>45)?"45'+":(SID==4 && C>90)?"90'+":(SID==6 && C>105)?"105'+":(SID==8 && C>120)?"120'+":C+"'";
						SHOWC = xmlGet(node2, 'showc', 0);
						ST = xmlGet(node2, 'st', 0);
						SP = xmlGet(node2, 'sp', 0);
						FST = xmlGet(node2, 'fst', 0);
						FT = xmlGet(node2, 'ft', 0);
						FT_SHOW = xmlGet(node2, 'ft_show', 0);
						
						csfs = xmlGet(node2, 'csfs', 0);
						sfs = xmlGet(node2, 'sfs', 0);
						
						BIR = xmlGet(node2, 'bir', 0);
						HTB = xmlGet(node2, 'htb', 0);
						FSI = xmlGet(node2, 'fsi'+LangStringFSI[LangID], '');
						TV = xmlGet(node2, 'tv', '');
						CTID = xmlGet(node2, 'ctid', '');
						EV_ID = xmlGet(node2, 'ev_id', '');
						
						showMP = false;
						
						for (var j = 0; j < TV.split(',').length; j++) {
							if (TV.split(',')[j] == '2017') {
									showMP = true;
							}
						}
						
						
						var ev_state='a',
							PK_s = 'a';
						if( (NAME1.indexOf("加時")>0 || NAME1.indexOf("加时")>0 || NAME1.indexOf("Extra Time")>0) && (NAME2.indexOf("加時")>0 || NAME2.indexOf("加时")>0 || NAME2.indexOf("Extra Time")>0)  ){
							ev_state= "b";
						}
						// console.log(NAME1.indexOf('Penalty') + NAME2)
						if( (NAME1.indexOf("十二碼")>0 || NAME1.indexOf("十二码")>0  || NAME1.indexOf('Penalty')>0) && (NAME2.indexOf("十二碼")>0 || NAME2.indexOf("十二码")>0 || NAME2.indexOf('Penalty')>0)  ){
							ev_state= "c";
							PK_s = 'c';
						}
						if(C>45 && SID ==2 && ev_state=='a'){
							C="45+";
						}else if(C>90 && SID ==4 && ev_state=='a'){
									C="90+";
						}else if(C>15 &&  SID ==2  && ev_state=='b'){
									C="15+";
						}else if( SID ==4 && ev_state=='b'){
									
							if(C==45 || C==46)
								C="16";								
							if(C>46 && (C-30)<=30 ){
									C= (C-30);							
							}else if((C-30)>30){
										C="30+";
							}							
									
						}else if(C==45 && SID ==3 && ev_state=='b'){
									C="15";
						}

						corner_fhcs = xmlGet(node2, 'fhcs', '');
						corner_facs = xmlGet(node2, 'facs', '');
						corner_chcs = xmlGet(node2, 'chcs', '');
						corner_cacs = xmlGet(node2, 'cacs', '');
						corner_showcorner = xmlGet(node2, 'showcorner', '');
						//角球比分 20180517
						// var corner_result =null, corner_result_HT = null;
						// var url = '../../soccer/json/realtime/corner_'+ EV_ID +'.json';
						
						
					// 	if(word_cup_filter.indexOf(TOURNAMENT_NAME_n)>=0){
					// 		var GetJsonReq2 = $.ajax({
					// 			type:"post",
					// 		    dataType:'json',
					// 		    url:url+"?nocache="+nocache.getTime(),
					// 		    async: false
					// 		}); 
														
					
						
					// 		$.when(GetJsonReq2).done(function(value){
													
					// 									$.each(value,function(key,value) {
															
					// 									 if(value.cornerResult_FT!=null){
					// 										corner_result = value.cornerResult_FT;
					// 										 if(SID==1 || SID==15 || SID==16)
					// 										corner_result=null;															
					// 									}
												
					// 								 if(value.cornerResult_HT!=null){
					// 										 corner_result_HT = value.cornerResult_HT;
					// 										 if(SID==1 || SID==15 || SID==16 || (ev_state=='c' && (SID==5 || SID==9 || SID==11) ))
					// 										 corner_result_HT =null;
					// 									}
												
															
					// 									});
													 
														
					// 								}); 
													
					// }							
												
							
					} else if (SportID == BB) {
						PATH1 = xmlGet(node, 'PATH1', '');
						PATH2 = xmlGet(node, 'PATH2', '');
						SessionNo = xmlGet(node, 'SESSION_NO', 0);
						M = xmlGet(node2, 'm', 0);
						S = xmlGet(node2, 's', 0);

						H1 = xmlGet(node2, 'h1', 0);
						H2 = xmlGet(node2, 'h2', 0);
						H3 = xmlGet(node2, 'h3', 0);
						H4 = xmlGet(node2, 'h4', 0);
						HO = xmlGet(node2, 'ho', 0);

						A1 = xmlGet(node2, 'a1', 0);
						A2 = xmlGet(node2, 'a2', 0);
						A3 = xmlGet(node2, 'a3', 0);
						A4 = xmlGet(node2, 'a4', 0);
						AO = xmlGet(node2, 'ao', 0);

						HSUM = xmlGet(node2, 'hsum', 0);
						ASUM = xmlGet(node2, 'asum', 0);
						HFS = xmlGet(node2, 'hhs'+SessionNo, 0);
						AFS = xmlGet(node2, 'ahs'+SessionNo, 0);
						HSS = HSUM - HFS;
						ASS = ASUM - AFS;

						SBP = xmlGet(node2, 'sbp', 0);
						SBS = xmlGet(node2, 'sbs', 0);
						SHD = xmlGet(node2, 'shd', 0);
						BIR = xmlGet(node2, 'bir', 0);

						HTP = xmlGet(node2, 'htp', '--');
						TP = xmlGet(node2, 'tp', '--');
						if (HTP == '-1') HTP = '--';
						if (TP == '-1') TP = '--';
						HHCAP = xmlGet(node2, 'hhcap', '--');
						HCAP = xmlGet(node2, 'hcap', '--');

					} else {	//??tenis?
					}


					if (GenRowDate && GD != this.LastRowDate) {
						this.Contents.push('<tr class="styledate"');
						if (SportID == BB) {
							this.Contents.push(' bgcolor="#fa961b" ');
						} else {
							this.Contents.push(' bgcolor="#169673" style="color:#fff;" ');
						}
						this.Contents.push('><td align="center" colspan="'+COLUMNS[SportID]+'" style="border-right:none;"><font style="font-seze:12px;">');
						this.Contents.push(GetDateStr(GD.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1/$2/$3")));
						
						this.Contents.push('</font></td></tr>');

						this.LastRowDate = GD;
					}

					if (GenRowTour && TOUR != this.LastRowTour) {
						this.Contents.push('<tr>');
						this.Contents.push('<td align="center" colspan="'+COLUMNS[SportID]+'">');
						this.Contents.push(TOUR);
						this.Contents.push('</td>');
						this.Contents.push('</tr>');

						this.LastRowTour = TOUR;
					}


					if (SportID == FB) {
						this.Contents.push('<tr class="FBRow" style="background:');

						this.Contents.push(RowColor[this.CurrentDisplayFixture%2]);
						if(_req){
							if (SingleSelectDisplay.indexOf(','+ID+',') < 0 && document.getElementsByName(TOUR).length==0) {
								SingleSelectDisplay = SingleSelectDisplay.replace('\,', ','+ID+',');
							}
						}
						if (this.FirstTime) {
							UpdateSingleSelect(true, ID);
							updateTourSelection(true, TOUR);

							TmpForceDisplayTourList = ' , ';
							

						} else if(FilterTourList != ' , ' && FilterTourList.indexOf(','+TOUR+',') > 0) {
							// console.log(SingleSelectDisplay )
							// if(_req){
							// 	SingleSelectDisplay = SingleSelectDisplay.replace(','+ID+',', ',');
							// }
							UpdateSingleSelect(true, ID);	
							SingleSelect = SingleSelectDisplay;
							
						}
						
						// console.log(corner_result)
						if(SID==1 || SID==15 || SID==16 || corner_showcorner == 'N'){					
							corner_chcs = corner_cacs = '';																				
						}
												
						if(SID==1 || SID==15 || SID==16 || (ev_state=='c' && (SID==5 || SID==9 || SID==11) )){						
							if(FT==0){
							corner_fhcs = corner_facs = '';	
							}						
						}
					
						var corner_condi = false;
						if( corner_showcorner != 'N' && SID!=1 && (corner_chcs != '' || corner_cacs != '' || corner_fhcs != '' || corner_facs != '') ){
							corner_condi =true;
						}
						
						
						//this.Contents.push('"><td align="center" '+ ((corner_showcorner != 'N' && (corner_chcs != '' || corner_cacs != '' || corner_fhcs != '' || corner_facs != '') || FT>0 )?'rowspan="2"':'') +'><div class="checkbox">'); //角球加時樣式
						this.Contents.push('"><td align="center" '+ (( corner_condi==true)?'rowspan="2"':'') +'><div class="checkbox">'); //角球加時樣式
						
						// this.Contents.push('"><td align="center"><div class="checkbox">');
						this.Contents.push('<input type="checkbox" value="'+ID+'" name="'+ TOUR +'" onClick="UpdateSingleSelect(this.checked, '+ID+',\''+TOUR+'\');"'+(SingleSelectDisplay.indexOf(','+ID+',')>0?' checked':'')+'>');

						this.Contents.push('<label for=' + ID + ' onClick="UpdateSingleSelect(this.checked, '+ID+',\''+TOUR+'\');"></label></div></td>');

						
						//this.Contents.push('<td bgcolor="'+HTML_COLOR+'" align="center" '+ ((corner_showcorner != 'N' && (corner_chcs != '' || corner_cacs != '' || corner_fhcs != '' || corner_facs != '') || FT>0 )?'rowspan="2"':'') +'><font color="white">'); //角球加時樣式
						this.Contents.push('<td bgcolor="'+HTML_COLOR+'" align="center" '+ ((corner_condi==true)?'rowspan="2"':'') +'><font color="white">'); //角球加時樣式
						// this.Contents.push('<td bgcolor="'+HTML_COLOR+'" align="center"><font color="white">');
						this.Contents.push(TOUR);
						this.Contents.push('</font></td>');

						//this.Contents.push('<td align="center" '+ ((corner_showcorner != 'N' || ( corner_fhcs != '' && corner_facs != '' &&  FT>0) ?'rowspan="2"':'') +'>'); // 角球加時樣式
						this.Contents.push('<td align="center" '+ ((corner_condi==true) ?'rowspan="2"':'') +'>'); // 角球加時樣式
						// this.Contents.push('<td align="center">');
						this.Contents.push(xmlGet(node, 'GAME_TIME', ' '));
						this.Contents.push('</td>');

						this.Contents.push('<td class="NoRightBorder">');
						if (FST == 1) {
							this.Contents.push(GenFST(FST));
						}
						this.Contents.push('</td>');

						this.Contents.push('<td style="text-align:right;padding-right:4px;" class="NoLeftBorder">');
						if (HRN > 0) {
							this.Contents.push(GenRedCard(HRN) + '&nbsp;');
						}

						if (showMP) {
							this.Contents.push(GenMP1());
						}
						this.Contents.push(NAME1);
						if (showMP) {
							this.Contents.push('</a>');
						}
						this.Contents.push('</td>');

						this.Contents.push('<td align="center"><font color="black">');
						if (((' ,2,3,4,5,6,7,8,9,10,11,12,17, ').indexOf(','+SID+',')) > 0) {
							if (HCS != HCSl || ACS != ACSl) {
								this.Contents.push('<marquee scrolldelay="'+MARQUEEDelay+'" scrollamount="'+MARQUEEAmount+'" loop="'+MARQUEELoop+'">');
								ALERTSelected = true;
							}
							if (HCS != HCSl) {
								this.Contents.push('<font color="red">');
							}
							this.Contents.push(HCS);
							if (HCS != HCSl) {
								this.Contents.push('</font>');
							}
							this.Contents.push(' : ');
							if (ACS != ACSl) {
								this.Contents.push('<font color="red">');
							}
							this.Contents.push(ACS);
							if (ACS != ACSl) {
								this.Contents.push('</font>');
							}
							if (HCS != HCSl || ACS != ACSl) {
								this.Contents.push('</marquee>');
							}
						}
						this.Contents.push('</font></td>');

						this.Contents.push('<td  style="text-align:left;padding-left:4px;"  class="NoRightBorder">');

						if (showMP) {
							this.Contents.push(GenMP1());
						}
						this.Contents.push(NAME2);
						if (showMP) {
							this.Contents.push('</a>');
						}

						if (ARN > 0) {
							this.Contents.push('&nbsp;' + GenRedCard(ARN));
						}
						this.Contents.push('</td>');

						this.Contents.push('<td class="NoLeftBorder">');
						if (FST == 2) {
							this.Contents.push(GenFST(FST));
						}
						this.Contents.push('</td>');

						this.Contents.push('<td class=""><table><tr>');

						if (SHOWC == 0 && ((' ,5,15, ').indexOf(','+SID+',')) > 0) {
						 	this.Contents.push('<td   style="border:0">'+GenMoney()+'</td>');
						} else {
							if (((' ,2,3,4,6,7,8,10, ').indexOf(','+SID+',')) > 0) {
								this.Contents.push('<td  style="border:0">'+GenGreenLamp() + '</td>');
							} else {
								this.Contents.push('<td  style="border:0">'+GenRedLamp()+'</td>');
							}
						}
						


						// if (SHOWC == 1 && ((' ,2,4,6,8, ').indexOf(','+SID+',')) > 0) {
						if(SHOWC == 1 && ev_state!='c' && ((' ,2,4,6,7,8,10,11,12 ').indexOf(','+SID+',')) > 0 ){	
							this.Contents.push('<td  style="border:0">'+'&nbsp;'+ C +'&#39;' +'</td>');
						}
						this.Contents.push('</tr></table></td>');

						this.Contents.push('<td align="center" class="" >');
						// console.log(ID+","+parseInt(HCS)+parseInt(ACS));
						if ( (SP == 1 || SID==15) && ev_state!='c' && SID!=1   ) {
							this.Contents.push('<a href="javascript:openScorer('+ID+')">');
						}
						var STATUSID = xmlGet(this.XML[this.STATUS].getRoot(), '/ROWSET/ROW[@num='+SID+']/STATUSID', '')
							status_label = xmlGet(this.XML[this.STATUS].getRoot(), '/ROWSET/ROW[@num='+SID+']/STATUS_LABEL', '');

						// this.Contents.push( (STATUSID=='9')?LangString_OTF:((ev_state=='b' && (SID==5 || SID==9 || SID==11))?LangString_OTF:( (ev_state == "c" && (SID==5 || SID==9 || SID==11)) ?['十二碼完','十二码完','PK'][lang_id] : (PK_s=='c'?['十二碼','十二码','PK'][lang_id]:status_label))) ); //120完場 改為 加時完 90分鐘加時改為加時完
						this.Contents.push( ((ev_state=='b' && (SID==5 || SID==9 || SID==11))?LangString_OTF:( (ev_state == "c" && (SID==5 || SID==9 || SID==11)) ?['十二碼完','十二码完','Penalty Shootout Finished'][lang_id] : (PK_s=='c' && SID!=1 && SID!=12 && SID!=15 && SID!=16 ?['十二碼','十二码','Penalty Shootout'][lang_id]:status_label))) ); //120完場 改為 加時完 90分鐘加時改為加時完
						if (SP == 1) {
							this.Contents.push('</a>');
						}
						this.Contents.push('</td>');

						if ((' ,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17, ').indexOf(','+SID+',') > 0 && FT > 0 && (ev_state !='c') ) {
							// console.log(TID)
							//if(ev_type_filter.indexOf(','+TID+',') >= 0){
								//if(check_league(TID)){
							if(FT_SHOW==1){
								
								this.Contents.push('<td align="center" style="border-right:none;">');
								this.Contents.push('<img src="../images/icons/halfshowc.png" alt="半場派彩"/>');
								this.Contents.push('</td>');
							}	
						}

						this.Contents.push('<td align="center" '+( ((' ,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17, ').indexOf(','+SID+',') > 0 && FT > 0&&FT_SHOW==1)?'style="border-left:none;"':'colspan="2"')+'>');
						// if (FSI.length > 0 && SID!=12 && SID!=15 && SID!=16 && ev_state!='c') {
						// 	this.Contents.push('<marquee onMouseOver="this.start();" scrolldelay="'+MARQUEEDelay+'" scrollamount="'+MARQUEEAmount+'" loop="'+MARQUEELoop+'">');
						// }
						if ( (  ((' ,3,4,5,6,7,8,9,10,11,17, ').indexOf(','+SID+',')) > 0 || FT==1 )   && ev_state!='c' && SID!=1) {
							this.Contents.push(LangStringFB_HT[LangID] + ' ');
							this.Contents.push(HHS);
							this.Contents.push(':');
							this.Contents.push(AHS);
						//}else if (FT == 2) {
						}else if (sfs == 15) {
							
							this.Contents.push(LangStringFB_HT[LangID] + ' ');
							this.Contents.push(xmlGet(this.XML[this.STATUS].getRoot(), '/ROWSET/ROW[@num=15]/STATUS_LABEL', ''));
						}

						// if (FSI.length > 0 && SID!=12 && SID!=15 && SID!=16 && ev_state!='c') {
						// 	// this.Contents.push(' &nbsp;' + LangStringFSI2[LangID] + ' ');
						// 	// this.Contents.push(FSI);
						// 	this.Contents.push('</marquee>');
						// }
						this.Contents.push('</td>');


						// this.Contents.push('<td align="left" style="text-align:left;">');
						/* if (SHOWC == 0 && ((' ,5,15, ').indexOf(','+SID+',')) > 0) {
							this.Contents.push(GenMoney()); //全场場派彩
						}  */
						// if ( ((' ,6,7,8,9,10 ').indexOf(','+SID+',')) > 0) {
						// 	this.Contents.push( '<strong>-- : --</strong>&nbsp;&nbsp;'+['90分鐘完','90分钟完','FULL TIME'][lang_id]); // 狀態為加時&12碼  顯示90分鐘賽果
						// } 
						// this.Contents.push('</td>');

						this.Contents.push('<td align="left">');
						if (FSI.length > 0 && SID!=12 && SID!=15 && SID!=16 && ev_state!='c') {
							this.Contents.push('<marquee onMouseOver="this.start();" scrolldelay="'+MARQUEEDelay+'" scrollamount="'+MARQUEEAmount+'" loop="'+MARQUEELoop+'" style="margin-top: 5px;">');
							this.Contents.push(' &nbsp;' + LangStringFSI2[LangID] + ' ');
							this.Contents.push(FSI);
							this.Contents.push('</marquee>');
						}
						this.Contents.push('</td>');

						this.Contents.push('<td class="lastCol"  style="text-align:left;">');
						if (BIR == 1 && C <= SoccerBIRMin && SID < 5 && ev_state=='a') {
								this.Contents.push(GenBIR() +'&nbsp;'); 
						}
						if (BIR == 1 && C < 25 && SID < 5 && ev_state=='b') {
								this.Contents.push(GenBIR() +'&nbsp;'); 
						}
						
						
						if (HTB == 1 && SID < 4) {
								this.Contents.push(GenHTB() +'&nbsp;');
						}
						if (showMP) {
								this.Contents.push(GenMP(TV));
						}
						if (TV.length > 0) {
								this.Contents.push(this.GenTV(TV));
						}
										 
						this.Contents.push('&nbsp;</td>');
						this.Contents.push('</tr>');
						//console.log("************"+corner_chcs)
                        //if( corner_showcorner != 'N' && (corner_chcs != '' || corner_cacs != '' || corner_fhcs != '' || corner_facs != '') || FT>0 ){ //角球加時
						if( corner_condi ){ //角球加時
	      					this.Contents.push('</tr>');
							this.Contents.push('<tr class="FBRow" style="background:');

							this.Contents.push(RowColor[this.CurrentDisplayFixture%2]);
							if(_req){
								if (SingleSelectDisplay.indexOf(','+ID+',') < 0 && document.getElementsByName(TOUR).length==0) {
									SingleSelectDisplay = SingleSelectDisplay.replace('\,', ','+ID+',');
								}
							}
							if (this.FirstTime) {
								UpdateSingleSelect(true, ID);
								updateTourSelection(true, TOUR);

								TmpForceDisplayTourList = ' , ';

							} else if(FilterTourList != ' , ' && FilterTourList.indexOf(','+TOUR+',') > 0) {

								UpdateSingleSelect(true, ID);
								SingleSelect = SingleSelectDisplay;
							}

							this.Contents.push('">'
											 // + '<td class="lastCol" style="border-right:none;">'+ ( ((' ,6,7,8,9, ').indexOf(','+SID+',')) > 0?'<img src="../images/icons/addtime.png" alt="加時"/>':'') +'</td>'//加時派彩
											 // + '<td style="text-align:left;border-left:none;">'+ ( ((' ,6,7,8,9, ').indexOf(','+SID+',')) > 0?'加時 -- : --':'') +'</td>' //加時完 1:1'+addtime(sid)+'
											 // + '<td><ul><li class="orange">--</li><li><img src="../images/icons/jiaoqiu.jpg" alt="角球"></li><li class="blue">--</li></ul></td>' //角球
											 + '<td class="lastCol" style="border-right:none;"> </td>'//加時派彩
											 + '<td style="text-align:left;border-left:none;"> </td>' //加時完 1:1'+addtime(sid)+'
											 + '<td>'
											 +( (corner_chcs != '' || corner_cacs != '')?'<ul><li class="orange">'+ corner_chcs +'</li><li><img src="../images/icons/jiaoqiu.png" alt="角球"></li><li class="blue">'+ corner_cacs +'</li></ul>':'')
											 // +(corner_result_HT!=null?'<div style="line-height:26px;">'+ corner_result_HT.split('|')[0] +' : '+ corner_result_HT.split('|')[1] +'</div>':'')
											 +'</td>' //角球
											 + '<td class="lastCol"></td>'
											 + '<td class="lastCol" style="border-left:none;">'
											 //+	(corner_result_HT!=null?'<ul class="half_req"><li class="">'+ corner_result_HT.split('|')[0] +'</li><li><img src="../images/icons/jiaoqiu.png" alt="角球"></li><li class="">'+ corner_result_HT.split('|')[1] +' 半場</li></ul>':'')
											 +'</td>'
											 + '<td style="border-left:1px solid #dcdcdc;"></td>'
											 + '<td style="border-left:none;"></td>'
											 + '<td align="center" colspan="2"  style="border-right:none;text-align:center">'+ ((  (corner_fhcs != '' || corner_facs != '')  && ( ((' ,3,4,5,6,7,8,9,10,11,17, ').indexOf(','+SID+',')) > 0 || FT>0) && ev_state!='c'     )?(csfs!=15?'<ul style="text-align:center;padding-left:14%" class="half_req"><li style="width: 35px;">'+LangStringFB_HT[LangID]+'</li><li style="width:6px" >'+ corner_fhcs +'</li><li><img src="../images/icons/jiaoqiu.png" alt="角球"></li><li style="width:6px" class="">'+ corner_facs +'</li><li style="width:35px"></li></ul>':LangStringFB_HT[LangID]+' '+['取消','取消','Cancel'][lang_id]):'')+'</td>'
											 + '<td style="border-left:1px solid #dcdcdc;"></td>'
											 + '<td style="border-left:none;"></td>')
											 // + '<td class="lastCol" style="text-align:left">')
							// this.Contents.push('&nbsp;</td></tr>');
							this.Contents.push('</tr>');
						}


					} else if (SportID == BB) {
						this.Contents.push('<tr class="BBRow1" style="background:');

						this.Contents.push(RowColor[this.CurrentDisplayFixture%2]);

						
						if(_req){
							if (SingleSelectDisplay.indexOf(','+ID+',') < 0 && document.getElementsByName(TOUR).length==0) {
								SingleSelectDisplay = SingleSelectDisplay.replace('\,', ','+ID+',');
							}
						}
						if (this.FirstTime) {
							UpdateSingleSelect(true, ID);
							updateTourSelection(true, TOUR);

							TmpForceDisplayTourList = ' , ';

						} else if(FilterTourList != ' , ' && FilterTourList.indexOf(','+TOUR+',') > 0) {

							UpdateSingleSelect(true, ID);
							SingleSelect = SingleSelectDisplay;
						}
						// this.Contents.push('"><td rowspan="2" align="center">');
						// this.Contents.push('<input type="checkbox" value="'+ID+'" name="'+ TOUR +'" onClick="UpdateSingleSelect(this.checked, '+ID+',\'' + TOUR + '\');"'+(SingleSelectDisplay.indexOf(','+ID+',')>0?' checked':'')+'>');
						// this.Contents.push('</td>');
						this.Contents.push('"><td align="center" rowspan="2"><div class="checkbox">');
						this.Contents.push('<input type="checkbox" value="'+ID+'" name="'+ TOUR +'" onClick="UpdateSingleSelect(this.checked, '+ID+',\''+TOUR+'\');"'+(SingleSelectDisplay.indexOf(','+ID+',')>0?' checked':'')+'>');

						this.Contents.push('<label for=' + ID + ' onClick="UpdateSingleSelect(this.checked, '+ID+',\''+TOUR+'\');"></label></div></td>');

						this.Contents.push('<td rowspan="2" bgcolor="'+HTML_COLOR+'" align="center"><font color="white"><b>');
						this.Contents.push(TOUR);
						this.Contents.push('</b></font></td>');

						this.Contents.push('<td rowspan="2" align="center">');
						this.Contents.push(xmlGet(node, 'GAME_TIME', ' '));
						if (BIR == 1) {
							this.Contents.push('<br>'+GenNBABIR());
						} else if (SHD == 1) {
							this.Contents.push('<br>'+GenNBASHB());
						}
						this.Contents.push('</td>');

						this.Contents.push('<td>');
						this.Contents.push(HTP + '/' + TP);
						this.Contents.push('</td>');

						this.Contents.push('<td>');
						if (PATH2 != null && PATH2.length > 0) {
							//this.Contents.push('<a href="javascript:openTeam(\''+PATH2+'\');">');
							this.Contents.push(NAME2);
							//this.Contents.push('</a>');
						} else {
							this.Contents.push(NAME2);
						}
						this.Contents.push('</td>');

						this.Contents.push('<td rowspan="2" align="right" class="NoRightBorder">');
						if (SBS == 1 && SID >= 30 && SID <= 31) {
							this.Contents.push('<a href="javascript:popup(\'../../../content/page/nba/livescore/boxscore.html?sport='+show_type+'&lang='+lang+'&event_id='+ID+'\', 900, 600)">');
						}
						this.Contents.push(xmlGet(this.XML[this.STATUS].getRoot(), '/ROWSET/ROW[@num='+SID+']/STATUS_LABEL', ''));
						if (SBS == 1 && SID >= 30 && SID <= 31) {
							this.Contents.push('</a>');
						}
						if (((' ,2,4,6,8,10,12,14,16,18,20,22,24,26,28, ').indexOf(','+SID+',')) > 0) {
							this.Contents.push('<br>'+M+':'+S);
						}
						this.Contents.push('</td>');

						this.Contents.push('<td rowspan="2" align="center" class="NoLeftBorder">');
						if (SBP == 4 && (SID == 30 || SID == 31 || SID == 34)) {
							this.Contents.push(GenMoney());
						} else if (SID > 1 && SID < 30) {
							this.Contents.push(GenGreenLamp());
						} else {
							this.Contents.push(GenRedLamp());
						}
						this.Contents.push('</td>');

						if (SessionNo == 4) {
							this.Contents.push('<td align="center">');
							if (SID > 1 && SID < 32) {
								this.Contents.push(A1);
							}
							this.Contents.push('</td>');

							this.Contents.push('<td align="center">');
							if (SID > 3 && SID < 32) {
								this.Contents.push(A2);
							}
							this.Contents.push('</td>');

							this.Contents.push('<td align="center">');
							if (SID > 5 && SID < 32) {
								this.Contents.push(A3);
							}
							this.Contents.push('</td>');

							this.Contents.push('<td align="center">');
							if (SID > 7 && SID < 32) {
								this.Contents.push(A4);
							}
							this.Contents.push('</td>');

							this.Contents.push('<td align="center">');

							if ((SID > 9 && SID < 30) || SID == 31) {
								this.Contents.push(AO);
							}
							this.Contents.push('</td>');

						} else {
							this.Contents.push('<td colspan="2" align="center">');
							if (SID > 1 && SID < 32) {
								this.Contents.push(A1);
							}
							this.Contents.push('</td>');

						this.Contents.push('<td colspan="' + ((SID > 9 && SID < 30) || SID == 31? "2" : "3") + '" align="center">');
							if (SID > 3 && SID < 32) {
								this.Contents.push(A2);
							}
							this.Contents.push('</td>');

							if ((SID > 9 && SID < 30) || SID == 31) {
								this.Contents.push('<td align="center">');
	
								this.Contents.push(AO);
				
								this.Contents.push('</td>');
							}	

						}

				
						this.Contents.push('</td>');

						this.Contents.push('<td align="center">');
						if (SID > 1 && SID < 32) {
							this.Contents.push(ASUM);
						}
						this.Contents.push('</td>');

						this.Contents.push('<td align="center">');
						if (((SessionNo == 4 && SID > 4) || (SessionNo == 2 && SID > 2)) && SID < 32) {
							this.Contents.push(AFS);
							if (((SessionNo == 4 && SID > 8) || (SessionNo == 2 && SID > 4))) {
								this.Contents.push('/');
								this.Contents.push(ASS);
							}
						}
						this.Contents.push('</td>');

						this.Contents.push('</tr>');


						// Row 2
						this.Contents.push('<tr class="BBRow2" style="background:');

						this.Contents.push(RowColor[this.CurrentDisplayFixture%2]);

						this.Contents.push('"><td>');

						this.Contents.push(HHCAP + '/' + HCAP);
						this.Contents.push('</td>');

						this.Contents.push('<td>');
						if (PATH1 != null && PATH1.length > 0) {
							//this.Contents.push('<a href="javascript:openTeam(\''+PATH1+'\');">');
							this.Contents.push(NAME1);
							//this.Contents.push('</a>');
						} else {
							this.Contents.push(NAME1);
						}
						this.Contents.push('</td>');

						if (SessionNo == 4) {
							this.Contents.push('<td align="center">');
							if (SID > 1 && SID < 32) {
								this.Contents.push(H1);
							}
							this.Contents.push('</td>');

							this.Contents.push('<td align="center">');
							if (SID > 3 && SID < 32) {
								this.Contents.push(H2);
							}
							this.Contents.push('</td>');

							this.Contents.push('<td align="center">');
							if (SID > 5 && SID < 32) {
								this.Contents.push(H3);
							}
							this.Contents.push('</td>');

							this.Contents.push('<td align="center">');
							if (SID > 7 && SID < 32) {
								this.Contents.push(H4);
							}
							this.Contents.push('</td>');

							this.Contents.push('<td align="center">');

							if ((SID > 9 && SID < 30) || SID == 31) {
								this.Contents.push(HO);
							}							
							this.Contents.push('</td>');		

						} else {
							this.Contents.push('<td colspan="2" align="center">');
							if (SID > 1 && SID < 32) {
								this.Contents.push(H1);
							}
							this.Contents.push('</td>');

							this.Contents.push('<td colspan="' + ((SID > 9 && SID < 30) || SID == 31? "2" : "3") + '" align="center">');
							if (SID > 3 && SID < 32) {
								this.Contents.push(H2);
							}
							this.Contents.push('</td>');

							if ((SID > 9 && SID < 30) || SID == 31) {
								this.Contents.push('<td align="center">');
						
								this.Contents.push(HO);
								this.Contents.push('</td>');		
							}
						}

						
	

						this.Contents.push('<td align="center">');
						if (SID > 1 && SID < 32) {
							this.Contents.push(HSUM);
						}
						this.Contents.push('</td>');

						this.Contents.push('<td align="center">');
						if (((SessionNo == 4 && SID > 4) || (SessionNo == 2 && SID > 2)) && SID < 32) {
							this.Contents.push(HFS);
							if (((SessionNo == 4 && SID > 8) || (SessionNo == 2 && SID > 4))) {
								this.Contents.push('/');
								this.Contents.push(HSS);
							}
						}
						this.Contents.push('</td>');
						this.Contents.push('</tr>');
					}	// BB

				} else {
					if (ALERTAllCheck) {
						if (SportID == FB) {
							node2 = xmlGetNode(this.XML[this.LIVE].getRoot(), '/LIVESCORE/DATA/ROWSET/ROW[@fid='+ID+']');
							node2l = xmlGetNode(this.XML[this.LIVE].getRoot(1), '/LIVESCORE/DATA/ROWSET/ROW[@fid='+ID+']');
							HCS = xmlGet(node2, 'hcs', 0);
							ACS = xmlGet(node2, 'acs', 0);
							HCSl = xmlGet(node2l, 'hcs', HCS);
							ACSl = xmlGet(node2l, 'acs', ACS);
							if (HCS != HCSl || ACS != ACSl) {
								ALERTAll = true;
								TOUR = xmlGet(node, 'TOURNAMENT_NAME', '--');
								HTML_COLOR = xmlGet(node, 'HTML_COLOR', 'black');
								NAME1 = xmlGet(node, 'NAME1', ' ');
								NAME2 = xmlGet(node, 'NAME2', ' ');
							}
						}
					}
				}

				// Sound
				if (!this.NeedAlertSound && (this.IsAlert & this.AlertSound) == this.AlertSound && 
						(
							(ALERTSelected) ||
							(ALERTAll && (this.IsAlert & this.AlertSoundSelected) == 0)
						)
					) {
					this.NeedAlertSound = true;
				}
				// Popup, Div
				if ((this.IsAlert & (this.AlertPopup + this.AlertDiv)) > this.NoAlert &&
						(
							(ALERTSelected) ||
							(ALERTAll && (this.IsAlert & this.AlertPopupSelected) == 0)
						)
					) {
					this.UpdateALERT(this.AlertContents, TOUR, HTML_COLOR, NAME1, NAME2, HCS, ACS, HCSl, ACSl);
				}
				d2 = new Date();
			}	// while


			if (TmpForceDisplayTourList == ' , ') {
				ForceDisplayTourList = ' , ';
			}
		

			if (this.Fixtures == 0) {
				this.Contents.push('<tr>');
				this.Contents.push('<td height="100" bgcolor="blue" colspan="'+COLUMNS[SportID]+'" align="center" valign="center"><font size="+2" color="white">'+LangStringNoData[LangID]+'</font></td>');
				this.Contents.push('</tr>');
			}

			if (this.CurrentFixture < this.Fixtures) {
				// console.log('this.CurrentFixture: '+this.CurrentFixture)
				// console.log('this.Fixtures: '+this.Fixtures)
				// this.TimeoutID = window.setTimeout(function(){_self.Corner();_self.GenRow()}, UpdateLivescoreRowDelay);
				this.TimeoutID = window.setTimeout(function(){_self.GenRow()}, UpdateLivescoreRowDelay);
			} else {
				this.Contents.push('<tr class="NoAllBorder"><td>&nbsp;</td></tr>');
				this.Contents.push('<tr class="NoAllBorder"><td style="font-size:12px;" colspan="'+COLUMNS[SportID]+'">'+LangStringStatement[LangID]+'</td></tr>');

				this.Contents.push('<tr class="NoAllBorder"><td>&nbsp;</td></tr>');
				this.Contents.push('<tr class="NoAllBorder"><td colspan="'+COLUMNS[SportID]+'" align="center">'+this.BottomAD+'</td></tr>');

				this.Contents.push('</table>');
				divMain.innerHTML = this.Contents.join('');
				genTourSelection(sresult);
				_f++;
		      	// console.log('999')
		     	// EventsSelect.setResult(["0"]);
				// console.log(Cvalue)
				genOption();
				$("#inside_sidebar").height($("#main_container").height()) //重置高度

				TOPNEWS = xmlGet(this.XML[this.LIVE].getRoot(), '/LIVESCORE/TOPNEWS/CONTENT'+((SportID==BB)?'':'_CACHE'), ' ');
				TOPNEWSl = xmlGet(this.XML[this.LIVE].getRoot(1), '/LIVESCORE/TOPNEWS/CONTENT'+((SportID==BB)?'':'_CACHE'), ' ');
				if (TOPNEWS != TOPNEWSl) {
					//marTopNews.innerHTML = '<table class="TOPNEWS" cellspacing="0" cellpadding="0" border="0"><tr><td>' + TOPNEWS.replace(/<br>/g, '</td></tr><tr><td>').replace(/\n/g, '</td></tr><tr><td>') + '</td></tr</table>';
					try {
						//if (this.TopNewsContents) this.TopNewsContents.clear();
						this.TopNewsContents = (TOPNEWS.replace(/\n/g, '<br>')).split('<br>');
					} catch (e) {
					}
				}

				// divTime = document.getElementById('MSLiveTime');
				// divTime.innerHTML = (''+xmlGet(this.XML[this.LIVE].getRoot(), '/LIVESCORE/TIME/value', ' ')).replace(/(..)(..)../, LangStringLastUpdate[LangID]+': $1:$2');

				this.UpdateStatus = this.Normal;
				document.body.style.cursor = '';
				this.FirstTime = false;

				AdjustWidth(false);

				if (this.NeedAlertSound || (this.AlertContents != null && this.AlertContents.length > 0)) {
					this.LastAlertContents = this.AlertContents;
					window.clearTimeout(this.AlertPopupTimeoutID);
					this.AlertPopupTimeoutID = window.setTimeout(function(){_self.GenAlert()}, AlertPopupDelay);
				}
				this.TimeoutID = window.setTimeout(function(){_self.download(_self.ModeNormal)}, ReloadDelay);
			}
		}

		this.UpdateALERT = function(AC, TOUR, HTML_COLOR, NAME1, NAME2, HCS, ACS, HCSl, ACSl) {
			if (AC != null) {
				AC.push(
					'<tr><td nowrap width="70" bgcolor="'
					+HTML_COLOR+'" align="center"><font color="#ffffff">'
					+TOUR+'</font></td><td nowrap align="right" width=120>'
					+NAME1+'&nbsp;</td><td nowrap width=40 align="center"><font color="blue"><b>'
					+HCS+' : '+ACS+'</b></font></td><td nowrap align="left" width=120>&nbsp;'
					+NAME2+'</td></tr>'
				);
			}
		}

		this.GenAlertSound = function() {
			//Play Sound
			divPlaySound.innerHTML = PlaySoundCode;
		}

		this.GenDummyAlert = function() {
			if (this.LastAlertContents == null) {
				this.LastAlertContents = new Array();
			}
			if (this.LastAlertContents.length == 0) {
				this.UpdateALERT(this.LastAlertContents, LangStringTour[LangID], 'RED', LangStringHomeTeam[LangID], LangStringAwayTeam[LangID], '-', '-', '-', '-');
			}
		}

		this.GenAlertPopupWindow = function(t) {
			if (t) {
				this.GenDummyAlert();
			}
			this.AlertPopupWindow = window.open('../../slot/html/result/livepop.htm'+(('?'+(new Date())).replace(/ /g, '')), 'MSLivePopup', 'top=0,left=0,width=40,height=40,status=yes,toolbar=no,menubar=no');
			this.AlertPopupWindow.document.write('<html><head>'+
													'<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">'+
													'<title>Livescore - Macau Slot</title>'+
													'<style>'+
														'HTML, BOBY {'+
															'margin:	0px;'+
															'padding:	0px;'+
														'}'+
														'TABLE {'+
														'	margin:	0px;'+
														'	padding:	0px;'+
														'	font-size:	12px;'+
														'	font-family:	新細明體, 細明體;'+
														'	border:	1px solid;'+
														'}'+
														'TR {'+
															'height:	20px;'+
														'}'+
														'TD {'+
														'	border:	1px solid;'+
														'}'+
													'</style>'+
												'</head>'+
												'<body onclick="javascript:window.close();">'+
												'	<div id="CheckSize" style="position:absolute;top:0;left:0;width:100%;height:100%;"></div>'+
												'	<div id="Contents" style="position:absolute;top:0;left:0;"><table border="1" cellspacing="0" cellpadding="0"><tbody><tr><td nowrap="" width="70" bgcolor="RED" align="center"><font color="#ffffff">球賽</font></td><td nowrap="" align="right" width="120">主隊&nbsp;</td><td nowrap="" width="40" align="center"><font color="blue"><b>- : -</b></font></td><td nowrap="" align="left" width="120">&nbsp;客隊</td></tr></tbody></table></div>'+
												'<script language="javascript">'+
													'function selfClose() {'+
														'try {'+
														'	self.focus();'+
														'	self.close();'+
														'} catch (e) {'+
														'}'+
														'try {'+
														'	window.focus();'+
														'	window.close();'+
														'} catch (e) {'+
														'}'+
													'}'+
												'</script>'+
												'<script language="javascript">'+
													'var divContent = document.getElementById(\'Contents\');'+
													'var divCheckSize = document.getElementById(\'CheckSize\');'+
													'divContent.innerHTML = \'<table border="1" cellspacing="0" cellpadding="0">'+LiveObj.LastAlertContents.join('')+'</table>\';'+
													'this.moveTo(10, 30);'+
													'window.setTimeout(\'selfClose()\', 25*1000);'+
												'</script>'+
												'<script language="javascript">'+
													'function adjust() {'+
													'	var x, y;'+
														'try {'+
															'if (window.outerHeight) {'+
															'	x = window.outerWidth - divCheckSize.offsetWidth + 10;'+
															'	y = window.outerHeight - divCheckSize.offsetHeight + 10;'+
															'} else {'+
															'	x = 10;'+
															'	y = 100;'+
															'}'+
														'} catch (e) {'+
														'	x = 10;'+   
														'	y = 100;'+
														'}'+
														'window.resizeTo(x+divContent.offsetWidth, y+divContent.offsetHeight);'+
													'}'+
													'window.setTimeout(\'adjust();\', 10);'+
												'</script>'+
												'</body></html>'
			);
			if (this.AlertPopupWindow != null) {
				this.AlertPopupWindow.focus();
			}
		}

		this.HideAlertDiv = function() {
			window.clearTimeout(this.HideAlertDivTimeoutID);

			changeStyle('DIV#MSAlert', 'visibility', 'hidden');
			changeStyle('DIV#MSAlert', 'display', 'none');
		}

		this.GenAlertDiv = function(t) {
			var _self = this;

			if (t) {
				this.GenDummyAlert();
			}

			divAlert.innerHTML = '';
			divAlert.innerHTML = '<table border="1" cellspacing="0" cellpadding="0">'+this.LastAlertContents.join('')+'</table>';

			changeStyle('DIV#MSAlert', 'visibility', 'visible');
			changeStyle('DIV#MSAlert', 'display', '');

			window.clearTimeout(this.HideAlertDivTimeoutID);
			this.HideAlertDivTimeoutID = window.setTimeout(function(){_self.HideAlertDiv()}, HideAlertDivDelay);
		}

		this.GenAlertPopupWindowTest = function() {
			var _self = this;
			window.setTimeout(function(){_self.GenAlertPopupWindow(true);}, 500);
		}

		this.GenAlert = function() {
			if (!this.HasAlert) {
				if (((this.IsAlert & this.AlertPopup) == this.AlertPopup) && this.LastAlertContents != null && this.LastAlertContents.length > 0) {
/*
					w = window.createPopup();
					w.document.domain = w.document.domain.substring(w.document.domain.indexOf('.') +1);
					w.document.body.innerHTML = '<table>'+this.LastAlertContents.join('')+'</table>';
					w.show(10,30,300, 200);	//tmp.offsetWidth,tmp.offsetHeight);
*/
					//this.AlertPopupWindow = window.open('livepop.htm'+(('?'+(new Date())).replace(/ /g, '')), 'MSLivePopup', 'top=0,left=0,width=40,height=40,status=yes,toolbar=no,menubar=no');
					this.GenAlertPopupWindow();
					//w.document.body.innerHTML = '<table>'+this.LastAlertContents.join('')+'</table>';
					//w.focus();
				}
				if (((this.IsAlert & this.AlertDiv) == this.AlertDiv) && this.LastAlertContents != null && this.LastAlertContents.length > 0) {
					this.GenAlertDiv();
				}
				if (((this.IsAlert & this.AlertSound) == this.AlertSound) && this.NeedAlertSound) {
					//Play Sound
					//divPlaySound.innerHTML = PlaySoundCode;
					this.GenAlertSound();
				}
			}
			this.HasAlert = true;
		}

		this.UpdateTopNews = function() {
// 			var _self = this;

// 			window.clearTimeout(this.TopNewsTimeoutID);
// //alert(this.TopNewsCount + ' : ' + this.TopNewsContents);

// 			if (this.TopNewsContents.length > 0) {
// 				this.TopNewsCount = (this.TopNewsCount + 1) % this.TopNewsContents.length;
// 				divMessage.innerHTML = '&nbsp; '+this.TopNewsContents[this.TopNewsCount]+' &nbsp;';
// 			} else {
// 				divMessage.innerHTML = '&nbsp; &nbsp;';
// 				this.TopNewsCount = -1;
// 			}

// 			this.TopNewsTimeoutID = window.setTimeout(function(){_self.UpdateTopNews()}, UpdateTopNewsDelay);
		}

		this.UpdateFixtureIDs = function() {
			var i, j;
			var f;
			var d1, d2;
			var l;
			var lStatus;

			this.Fixtures = xmlGetLength(this.XML[this.CONFIG].getRoot(), '/ROWSET/ROW');
			this.CurrentFixture = 0;
			this.CurrentDisplayFixture = 0;
			//if (this.FixtureIDs != null) = this.FixtureIDs.clear();
			this.FixtureIDs = null;

			l = new Array();
			l[Group0] = new Array();
			l[Group1] = new Array();
			l[Group2] = new Array();

//			d1 = new Date();
			this.FixtureIDs = new Array();

			for (i=1; i<=this.Fixtures; i++) {
				f = new Array();
				f[0] = xmlGet(this.XML[this.CONFIG].getRoot(), '/ROWSET/ROW['+i+']/FIXTURE_ID');
				f[1] = xmlGet(this.XML[this.LIVE].getRoot(), '/LIVESCORE/DATA/'+((SportID==FB)?'ROWSET/':'')+'ROW[@fid='+f[0]+']/sid');
				lStatus = xmlGet(this.XML[this.LIVE].getRoot(1), '/LIVESCORE/DATA/'+((SportID==FB)?'ROWSET/':'')+'ROW[@fid='+f[0]+']/sid', f[1]);
				if (IsGroupStatusDisplay) {
					if (GroupStatusDisplay[SportID][Group1].indexOf(','+f[1]+',') > 0) {
						f[2] = Group1;
					} else if (GroupStatusDisplay[SportID][Group2].indexOf(','+f[1]+',') > 0) {
						// if last times is not in this gruop, go to last group
						if (GroupStatusDisplay[SportID][Group2].indexOf(','+lStatus+',') > 0) {
							f[2] = Group2;
						} else {
							if (GroupStatusDisplay[SportID][Group1].indexOf(','+lStatus+',') > 0) {
								f[2] = Group1;
							} else {
								f[2] = Group0;
							}
						}
					} else {
						f[2] = Group0;
					}
				} else {
					f[2] = Group0;
				}
				//this.FixtureIDs.push(f);
				l[f[2]].push(f);
			}

			for (i=Group0; i<=Group2; i++) {
				for (j=0; j<l[i].length; j++) {
//alert(l[i][j]);
					this.FixtureIDs.push(l[i][j]);
				}
			}
//			d2 = new Date();
//alert(this.Fixtures + ' : ' + (d2-d1) + ' - ' + d1 + ' = ' + d2);
		}

		this.XMLPath = new Array();
		this.XML = new Array();
		this.XMLMode = new Array();
		var tmp = 0;
		this.TimeoutID = -1;
		this.AlertPopupTimeoutID = -1;
		this.HideAlertDivTimeoutID = -1;
		this.TopNewsTimeoutID = -1;
		this.TopNewsCount = -1;

		this.Contents = null;
		this.AlertContents = null;
		this.LastAlertContents = null;

		this.NoAlert = 0;
		this.AlertSound = 1;
		this.AlertSoundSelected = 2;
		this.AlertPopup = 4;
		this.AlertDiv = 8;
		this.AlertPopupSelected = 16;
		//this.AlertSelectedOnly = 4;

		this.AlertPopupWindow = null;
		this.IsAlert = this.NoAlert;
		this.NeedAlertSound = false;
		this.HasAlert = false;
		if (SportID == FB) this.IsAlert = this.AlertSound + this.AlertPopup;

		this.TopNewsContents = new Array();
		this.LastRowDate = 'dummy';
		this.LastRowTour = 'dummy';
		this.BottomAD = '';
		this.DownloadTimes = -1;
		this.Fixtures = -1;
		this.FixtureIDs = null;
		this.CurrentFixture = -1;
		this.CurrentDisplayFixture = -1;
		this.FirstTime = true;

		this.CONFIG = tmp++;
		this.LIVE = tmp++;
		this.STATUS = tmp++;
		this.XMLPrePath = WWWSer+'/'+SportString[SportID]+'/html/result/';

		this.XMLPath[this.CONFIG]	= this.XMLPrePath+LangString[LangID]+'-config.xml';
		this.XMLPath[this.LIVE]	= this.XMLPrePath+'live.xml';
		this.XMLPath[this.STATUS]	= this.XMLPrePath+LangString[LangID]+'-status.xml';

		// Download Mode
		this.ModeFirst = tmp++;
		this.ModeEverytime = tmp++;
		this.ModeCheckID = tmp++;
		this.ModeNormal = tmp++;
		this.ModeRetry = tmp++;

		this.XMLMode[this.CONFIG]	= this.ModeCheckID;
		this.XMLMode[this.LIVE]	= this.ModeEverytime;
		this.XMLMode[this.STATUS]	= this.ModeFirst;

		// Update Status
		this.NotReady = tmp++;
		this.INIT = tmp++;
		this.Normal = tmp++;
		this.Downloading = tmp++;
		this.Updating = tmp++;

		this.UpdateStatus = this.NotReady;

		return this;
	}	// function LIVESCOREOBJ()


// $('.inputWrap').click(function(){
// 	$('.EventsSelect-option').css({'opacity':'1','height':'400px;'})
// })