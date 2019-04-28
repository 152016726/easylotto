function gotoBetting(iAFF2) {
	var pageTracker;
	var iAFF=1;
	try {
		pageTracker = _gat._getTracker("UA-3689458-1");
		pageTracker._initData();
		pageTracker._trackPageview('BettingSite');
	} catch (e) {}

	try {
		iAFF=getCookie("AFF")?getCookie("AFF"):iAFF2;
	} catch (e) {
		iAFF=iAFF2;
	}

	openPopupDetailsBetting(
		'h'+'ttps://47.91.168.197/content/soccer/',
		window.screen.width-11,
		window.screen.height-50,
		'scrollbars=yes,',
		'Betting'
	);
}

function openPopupDetailsBetting(sURL, iWidth, iHeight, sEx, sWinName, iLeft, iTop, bIsReturn){
   var w=window.open(sURL,(sWinName ? sWinName : 'PopupDetailsWin'),(sEx ? sEx : '')+'alwaysRaised=yes,resizable=yes,status=yes,top='+(iTop ? iTop : 0)+',left='+(iLeft ? iLeft : 0)+',height='+iHeight+',width='+iWidth);
   w.focus();
   if(bIsReturn) return w;
}

