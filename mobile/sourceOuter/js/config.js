// var www_domain="www.macauslot.com/";
// var web_domain="web.macauslot.com/";
// var www_domain="www.macauslot.com/";
var web_domain="./data/web/";
var www_domain="./data/www/";
// var m_domain  ="m.macauslot.com/";
var m_domain  ="";
// var translation_domain="translation.macauslot.com/gate/gb/";
var translation_domain="/fjt/";

var www_flie=m_domain;
var sdata_www='data/www/';
var sdata_web='data/web/';
//var sdata_www='';
//var sdata_web='';
// var sdata_m='';
// var sdata_g='h" + "ttp://m." + "macauslot.com';
var sdata_m='';
var sdata_g='./';
var googleCode=unescape("%3Cscript src='./js/share_js/google_count.js' type='text/javascript'%3E%3C/script%3E");


// var http_www_domain="https://"+www_domain;
// var http_web_domain="https://"+web_domain;
// var http_m_domain="http://"+m_domain;
var http_www_domain=www_domain;
var http_web_domain=web_domain;
var http_m_domain="./";
// var http_translation_domain="http://"+translation_domain;
var http_translation_domain="";


// var sFJTSite = 'h'+'ttp://'+www_flie;
var sFJTSite ='/';
// var sNFJTSite = 'h'+'ttp://'+translation_domain+www_flie;
var sNFJTSite = translation_domain+www_flie;

var LANG_CN = 1;
var LANG_SC = 2;
var LANG_EN = 3;

var SPORT_MSLOT = 0;
var SPORT_SOCCER = 1;
var SPORT_BASKETBALL = 2;
var SPORT_TENNIS = 3;

var SPORT_PREFIX = new Array();
SPORT_PREFIX[SPORT_MSLOT] = 'slot';
SPORT_PREFIX[SPORT_SOCCER] = 'soccer';
SPORT_PREFIX[SPORT_BASKETBALL] = 'nba';
SPORT_PREFIX[SPORT_TENNIS] = 'tennis';

/**
* Created by beate 20180508
* 上半場玩法 icons  聯賽id
**/
//var ev_type_filter = ['8642','72','61','52','124','272','50','294','309'],
var ev_livescore_halficon = ['3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17'];


function domain_chk()
{
	//console.log('domain:'+document.domain);
	var dm=document.domain;
	var mobile='m.macauslot.com';	
	if(dm == mobile)
	{	
		window.open("https://mobile.macau-slot.com/root.html");	
	}
	else
	{
		window.open("https://47.91.168.197/mobile/root.html");
	}
}
