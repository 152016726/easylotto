var FrameTop = 125;
var FrameLeft = 0;
var FrameLeftMin = 0;	// for document.body.clientWidth <= MinWidth
var FrameRight = 0;
var FrameRightMin = 0;	// for document.body.clientWidth <= MinWidth
var FrameBottom = 0;
var FrameRightScroll = 0;
var Cvalue = 'all';
var Chooseinput = 'none';

var MinWidth = 800;

var DownloadDelay = 300;	//	Delay 300ms before download XML(Preload Images)
var CheckStatusDelay = 10;	//100;
var UpdateLivescoreDelay = 10;
var UpdateLivescoreRowDelay = 50;	//100;
var ReloadDelay = 30 * 1000;	// 30 sec
var ErrorReloadDelay = 60 * 1000;	// 60 sec
var ChangeIDReloadDelay = 5 * 1000;	// 5 sec
var UpdateTopNewsDelay = 3 * 1000;	// 3 sec
var AlertPopupDelay = 100;	// 100ms
var HideAlertDivDelay = 25 * 1000;	// 25 sec

var MaxDownloadErrorRetry = 2;	// for download Error Max Times and never show the page, gen no data, otherwise keep last page

var MaxGenRow = 50;
var MaxGenTime = 500;
var GenRowDelay = 100;
var GenRowDate = true;
var GenRowTour = false;

var SoccerBIRMin = 85;

var MARQUEEDelay = 250;
var MARQUEEAmount = 5;
var MARQUEELoop = 'true';

var RowColor = new Array();
RowColor[0] = '#F4F7F9';
RowColor[1] = '#EAEAEA';

var WWWSer = '';
var WEBSer = '';
var MEMSer = '';
var FJTWWWSer = '/fjt/gate/gb/www.macauslot.com';
var FJTWEBSer = '/fjt/gate/gb/web.macauslot.com';
var baseADURL = 'http://202.175.82.109/adcounter/hit.php?name=';

var FB = 1;
var BB = 2;
var SportID = FB;
var SportString = ['slot', 'soccer', 'nba'];

var mp = ',7211,7926,8642,8655,8320,9060,9262,9303,';

var IsGroupStatusDisplay = true;

var Group0 = 0;	// Default;
var Group1 = 1;
var Group2 = 2;

var GroupStatusDisplay = new Array();
GroupStatusDisplay[FB] = new Array();
GroupStatusDisplay[FB][Group1] = ' ,1, ';
GroupStatusDisplay[FB][Group2] = ' ,5,9,11,13,14,15,16,17, ';
GroupStatusDisplay[BB] = new Array();
GroupStatusDisplay[BB][Group1] = ' ,1, ';
GroupStatusDisplay[BB][Group2] = ' ,30,31,32,33,34, ';

var PlaySoundCode = "<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0' width='6' height='6'><param name='movie' value='"+WWWSer+"/soccer/images/result/sound.swf' /><param name='quality' value='high' /><embed src='"+WWWSer+"/soccer/images/result/sound.swf' quality='high' pluginspage='http://www.macromedia.com/go/getflashplayer' type='application/x-shockwave-flash' width='6' height='6'></embed></object>";

var divMain = null;
var divLeft = null;
var divRight = null;
var divMessage = null;
var divTime = null;
var divPlaySound = null;
var divOption = null;
var divAlert = null;
var LiveObj = null;
var TW = 1;
var CN = 2;
var EN = 3;

var LangID = [TW,CN,EN][lang_id];
var LangString = ['ch', 'ch', 'sc', 'en'];
var LangStringFJT = ['ch', 'ch', 'ch', 'en'];
var LangStringENOnly = ['', '', '', 'en-'];
var LangStringTV = ['t', 't', 's', 'e'];
var LangStringFSI = ['', '', '2', '3'];
var LangStringFSI2 = ['首名入球球員:', '首名入球球員:', '首名入球球员:', 'First goal player:'];
var LangStringFB_HT = ['半場', '半場', '半场', 'HT'];
var LangStringTour = ['球賽', '球賽', '球赛', 'Tour'];
var LangStringHomeTeam = ['主隊', '主隊', '主队', 'Home Team'];
var LangStringAwayTeam = ['客隊', '客隊', '客队', 'Away Team'];
var LangStringAD = ['CH', 'CH', 'SC', 'EN'];

var LangStringBB_HDR_Odds = ['半/全場<br>上下/讓分', '半/全場<br>上下/讓分', '半/全场<br>上下/让分', 'Half/Full<br>Over/Under<br>Point<br>Spread'];
var LangStringBB_HDR_S1 = ['第一節', '第一節', '第一节', '1<sup>st</sup>'];
var LangStringBB_HDR_S2 = ['第二節', '第二節', '第二节', '2<sup>nd</sup>'];
var LangStringBB_HDR_S3 = ['第三節', '第三節', '第三节', '3<sup>rd</sup>'];
var LangStringBB_HDR_S4 = ['第四節', '第四節', '第四节', '4<sup>th</sup>'];
var LangStringBB_HDR_FH = ['上半場', '上半場', '上半场', 'First Half'];
var LangStringBB_HDR_SH = ['下半場', '下半場', '下半场', 'Second Half'];
var LangStringBB_HDR_OT = ['加時', '加時', '加时', 'OT'];
var LangStringBB_HDR_TS = ['總比數', '總比數', '总比数', 'Total<br>Score'];
var LangStringBB_HDR_HS = ['上/下<br>半場', '上/下<br>半場', '上/下<br>半场', '1<sup>st</sup>/2<sup>nd</sup><br>Half'];
var LangStringAlertWay = ['入球提示方式', '入球提示方式', '入球提示方式', 'Score Alert'];
var LangStringAlertFixtures = ['賽　事', '賽　事', '赛　事', 'Fixtures'];
var LangStringAlertSound = ['聲音', '聲音', '聲音', 'Sound'];
var LangStringAlertPopup = ['提示窗', '提示窗', '提示窗', 'Popup Window'];
var LangStringAlertDiv = ['本版提示', '本版提示', '本版提示', 'Popup'];
var LangStringAlertAll = ['所有', '所有', '所有', 'All'];
var LangStringAlertSelectOnly = ['已選', '已選', '已选', 'Selected'];
var LangStringAlertRemark = ['<i>*</i> <b>提示窗</b>會被部分瀏覽器阻擋', '<i>*</i> <b>提示窗</b>會被部分瀏覽器阻擋', '<i>*</i> <b>提示窗</b>会被部分浏览器阻挡', '<i>*</i> <b>Popup Window</b> may be blocked by some browser.'];
var LangStringSortWay = ['排序方式', '排序方式', '排序方式', 'Sort'];
var LangStringSortByPlaying = ['進行中優先', '進行中優先', '进行中优先', 'playing first'];
var LangStringSortByTime = ['按時間順序', '按時間順序', '按时间顺序', 'by time'];
var LangStringTest = ['測試', '測試', '测试', 'Test'];
var LangStringClose = ['關閉', '關閉', '关闭', 'Close'];

var LangStringNoData = ['暫 時 沒 有 資 料 提 供', '暫 時 沒 有 資 料 提 供', '暂 时 没 有 资 料 提 供', 'No Data available'];
var LangStringUpdatingAlert = ['資料更新中, 請稍候...', '資料更新中, 請稍候...', '資料更新中, 請稍候...', 'Page is updating, please wait...'];
var LangStringLastUpdate = ['更新時間', '更新時間', '更新时间', 'Refresh at'];
var LangStringUncheckFixtures = ['取消所選賽事', '取消所選賽事', '取消所选赛事', 'uncheck selected fixtures'];

var LangStringFont = ['字型', '字型', '字体', '<br/>Font Size'];
var LangStringFontS = ['小', '小', '小', 'S'];
var LangStringFontM = ['中', '中', '中', 'M'];
var LangStringFontL = ['大', '大', '大', 'L'];
var LangStringStatement = [
	'註：現場資訊僅供參考，www.macauslot.com及澳門彩票有限公司有權但不承擔更正任何資訊錯誤、滯後或疏失之義務。由此所產生之任何直接、間接、附帶或因而導致之損失，www.macauslot.com及澳門彩票有限公司概不負責。 ',
	'註：現場資訊僅供參考，www.macauslot.com及澳門彩票有限公司有權但不承擔更正任何資訊錯誤、滯後或疏失之義務。由此所產生之任何直接、間接、附帶或因而導致之損失，www.macauslot.com及澳門彩票有限公司概不負責。 ',
	'注：现场资讯仅供参考，www.macauslot.com及澳门彩票有限公司有权但不承担更正任何资讯错误、滞后或疏失之义务。由此所产生之任何直接、间接、附带或因而导致之损失，www.macauslot.com及澳门彩票有限公司概不负责。 ',
	'Note: All details shown are for reference only'
];
var LangStringTourSelectionTitle = ['請於下方選擇賽事','請於下方選擇賽事','请于下方选择赛事','Please select tournament'];
var LangStringConfirm = ['確定', '確定','确定','Confirm'];
var LangStringSelectAll = ['全選','全選','全选','Select All'];
var LangStringUnselectAll = ['清除','清除','清除', 'Clear All'];
var LangStringDisplayAll = ['顯示所有賽事','顯示所有賽事','显示所有赛事', 'Display All'];
var LangStringPleaseSelectTour = ['請至少選擇一個聯賽','請至少選擇一個聯賽','请至少选择一个联赛','Please select at least one tournament'];
var COLUMNS = new Array();
// COLUMNS[FB] = 13;
COLUMNS[FB] = 14;
COLUMNS[BB] = 14;

var SingleSelectDisplay = ' , ';		// Keep checkbox status
var SingleSelect = ' , ';		// Keep Select status

var FilterTourList = ' , ';
var TmpFilterTourList = ' , ';

var ForceDisplayTourList = ' , ';
var TmpForceDisplayTourList = ' , ';

var LangStringTournament = ['聯賽', '联赛', 'tournament'][lang_id];
var LangStringStartTime_1 = ['開賽', '开赛', 'start'][lang_id];
var LangStringStartTime_2 = ['時間', '时间', 'time'][lang_id];

var LangStringBB_HDR_Odds_1 = ['半/全場', '半/全场', 'Half/Full'][lang_id];
var LangStringBB_HDR_Odds_2 = ['上下/讓分', '上下/让分', 'Over/Under<br>Point<br>Spread'][lang_id];
var LangStringTourTeam = ['對賽隊伍', '对赛队伍', 'TourTeam'][lang_id];
var LangStringBB_HDR_HS_2 = ['上/下', '上/下', '1<sup>st</sup>/2<sup>nd</sup> '][lang_id];

// var ShowSelected = ['聯賽選擇', '联赛选择', 'Show Selected'][lang_id];
var ShowSelected = ['全部聯賽', '全部联赛', 'All Tournaments'][lang_id];
var Featureset = ['功能設定', '功能设定', 'Function'][lang_id];
var Note = ['備註', '备注', 'Remark'][lang_id];
// var PayoutSchedule = ['派彩', '派彩', 'Payout Schedule'][lang_id];
var PayoutSchedule = ['時間表', '时间表', 'Schedule'][lang_id];
var FinishedMatches = ['完場賽果', '完场赛果', 'Finished Matches'][lang_id];
var mPlus = ['m直播', 'm直播', 'm Plus'][lang_id];
var LangString_OTF = ['加時完', '加时完', 'Extra Time Finished'][lang_id];
var notice_m = ['賽事消息', '赛事消息', 'Notice Message'][lang_id];
