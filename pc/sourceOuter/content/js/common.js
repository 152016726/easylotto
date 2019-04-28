/**
* Created by beate on 2017/10/13
* Copyright 2017 www.macauslot.com
* Be in common use
**/
window.console = window.console || (function () {  
    var c = {}; c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile  
    = c.clear = c.exception = c.trace = c.assert = function () { };  
    return c;  
})();  

if(!Array.indexOf){
Array.prototype.indexOf = function(obj){
for(var i=0; i<this.length; i++){
if(this[i]==obj){
 return i;
  }
 }
 return -1;
}
}

/*

var domain_new =['macauslot.com','mo-slot.com','moslot.com','mac-slot.com'];

if(domain_new.indexOf(document.domain) >=0 ){
	//console.log('same domain');
}else {
	//document.domain = document.domain.substring(document.domain.indexOf('.') +1);
}
*/

/* 
if (document.domain.indexOf(domain_new) !=0 ){
	
	document.domain = document.domain.substring(document.domain.indexOf('.') +1);
} */



var sMemberSvrHostOnly = 'members.macauslot.com';
var sAppsSvrHostOnly = 'members.macauslot.com';
var sWWWSvrHostOnly = 'web.macauslot.com';
var sWWWNSvrHostOnly = 'www.macauslot.com';
var sApps1SvrHostOnly = 'apps1.macauslot.com';


var sMemberSvr = '';
var sMemberSSLSvr = '';
var sAppsSvr = 'http://'+sAppsSvrHostOnly;
var sApps1Svr = 'http://'+sApps1SvrHostOnly;

var sWWWSvr = '';
var sWWWNSvr = '';
var sFJTSite = '/fjt/gate/gb/';
var sNFJTSite = '/fjt/gate/gb/';




jQuery(".load").append('<div class="loaders"><div class="loader"><div style="backgroundColor:black" class="ball-pulse-rise"><div></div><div></div><div></div><div></div><div></div></div></div></div>');
//google-analytics
 (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-119777053-1', 'auto');
ga('send', 'pageview');


//baidu
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?227db0ac3d2f8bbb88218ebbd891938c";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
/******************************** Get location ********************************/
function request(paras){ 
    var url = location.href;  
    var paraString = url.substring(url.indexOf("?")+1,url.length).split("&");  
    var paraObj = {}  
    for (i=0; j=paraString[i]; i++){  
        paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length);  
    }  
    var returnValue = paraObj[paras.toLowerCase()];  
    if(typeof(returnValue)=="undefined"){  
        return "";  
    }else{  
        return returnValue; 
    }
}
var show_type = (request('sport')!='')?request('sport').replace('#',''):'0',
    // show_type = (show_type!=1&&show_type!=2&&show_type!=0&&show_type!=3)?'1':show_type, //反之顯示tennis
    show_type = (show_type!=1&&show_type!=2&&show_type!=0)?'1':show_type, //hide tennis  反之顯示tennis  註釋
    ball_type = ["soccer","soccer","nba","tennis"],
    lang = (request('lang')!='')?request('lang').replace('#','').replace(/[0-9]/g,''):'cn',
     lang_id = (lang=='en')?'2':(lang=='sc')?'1':'0', //反之顯示英文
    // lang_id = (lang=='en')?'0':(lang=='sc')?'1':'0',  //hide engilsh   反之顯示英文  註釋
    news_type = [ ["","賽前新聞","花絮新聞","賽後新聞","世界盃"], ["","賽前新聞","花絮新聞","賽後新聞","世界盃"],  ["","Preview","Highlights","Report","World Cup"]][lang_id] ,
    news_type_jx = [ ["","賽前","花絮","賽後","世界盃"], ["","賽前","花絮","賽後","世界盃"], ["","Preview","Highlights","Report","World Cup"] ][lang_id],

    soccer_T = ['足球','足球','Soccer'][lang_id],
    basketball_T = ['籃球','篮球','Basketball'][lang_id],
    tennis_T = ['網球','网球','Tennis'][lang_id],
    ball = (show_type==2)?basketball_T:(show_type==3)?tennis_T:soccer_T; 
/******************************** Get localtion Date ********************************/
var nocache = new Date(),
    nowdate = GetDateStr_now(0);

function GetDateStr_now(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate()+AddDayCount);
    var y = dd.getFullYear();
    var m = dd.getMonth()+1;
    if(m.toString().length == 1){
         m = "0" + m;    
    }   
    var d = dd.getDate();
    if(d.toString().length == 1){
         d = "0" + d;    
    }

    var h = dd.getHours();
    if(h.toString().length == 1){
        h = "0" + h;    
    }

    var min = dd.getMinutes();
    if(min.toString().length == 1){
         min = "0" + min;    
    }
    
   
    return y+"-"+m+"-"+d+" "+h+":"+min+":00";
}
// setTimeout(function(){ 
//     nocache = new Date(),
//     nowdate = GetDateStr(0);
//     nowdate = nowdate.replace(' ','');
// },100);   


function GetDateDiff(end,start){
    start_time = start.replace(/\-/g,'/');
    end_time = end.replace(/\-/g,'/');
    stime = new Date(start_time);
    etime = new Date(end_time);
    timertype = 1000*3600;
    return parseInt( (etime.getTime() - stime.getTime())/timertype );
}
/******************************** Common domain ********************************/
var www_link = location.href.split("page/")[0],
    www_domian = location.href.split("/")[0]+"//"+location.href.split("/")[2]+"/",
    WWW = www_link+"data",
    www_data = www_link+"data/";

/******************************** AJAX get xml ********************************/
function GetAjaxXml(url){
    var result = jQuery.ajax({
                  //  type:"post",
				    type:"get",
                    dataType:'XML',
                    url:url+"?nocache="+nocache.getTime(),
                    async: false
                })
    return result;
}

function GetAjaxXml_caches(url){
    var result = jQuery.ajax({
                  //  type:"post",
				    type:"get",
                    dataType:'XML',
                    url:url,
                    async: false,
					cache: true
                })
    return result;
}

/******************************** popup ********************************/
function popup(link){
    console.log(link)
    jQuery('#iframe_popup').attr('src',link);
    jQuery('body').css({
        "overflow-y": 'hidden'
    })
    jQuery('.popbox').css({
        "display": 'block'
    });
    jQuery('.Overlay').css({
        "display": 'block'
    });
}


function popupWithHW(link,div_height,div_width){
    console.log(link)
	$("#popbox").width(div_width).height(div_height);
	
    jQuery('#iframe_popup').attr('src',link);
    jQuery('body').css({
        "overflow-y": 'hidden'
    })
    jQuery('.popbox').css({
        "display": 'block'
    });
    jQuery('.Overlay').css({
        "display": 'block'
    });
}


var sWWWSvr = '',sWWWNSvr='';
function openPopup(sURL, iWidth, iHeight){
   sURL = (sURL.indexOf('/gate/gb/big5.macauslot.com')>=0)?sURL.replace('/gate/gb/big5.macauslot.com',''):sURL;
   sURL = (sURL.indexOf('/gate/gb/big5.macauslot.com')>=0)?sURL.replace('/gate/gb/big5.macauslot.com',''):sURL;
   var https_domain =(sURL.indexOf('https://www.we-slot.com')>=0)?'':(sURL.indexOf('lineup.html')>=0)?www_link+'page':location.href.split("content/")[0];
   if(sURL.indexOf('player')>=0){
        var player_id = sURL.split('_')[1].replace('.html','');
        if(location.href.indexOf('news')>=0){
            popup('../../'+(location.href.indexOf('content')>=0?'':'content/')+'page/player.html?sport='+ show_type +'&lang='+lang+'&player_id='+player_id);
        }else{
            window.open((location.href.indexOf('lineup')>=0?'../../':'')+'../../'+(location.href.indexOf('analysis')>=0?'':'content/')+'page/player.html?sport='+(sURL.indexOf('nba')>=0?'2':'1')+'&lang='+lang+'&player_id='+player_id,'Content','alwaysRaised=yes,menubar=no,toolbar=no,resizable=yes,scrollbars=no,status=yes,top=0,left=0,height='+iHeight+',width=620');
        }

   }else if(sURL.indexOf('feedback')>=0 || sURL.indexOf('statistical_search')>=0){
        // console.log(https_domain.replace('fjt/',''))
         window.open(https_domain.replace('fjt/','')+sURL.replace('content/',''),'Content','alwaysRaised=yes,menubar=no,toolbar=no,resizable=yes,scrollbars=no,status=yes,top=0,left=0,height='+iHeight+',width='+iWidth);
   }else{
        window.open(https_domain+(sURL.indexOf('https://www.we-slot.com')>=0?'h'+'t'+'tps:/'+'/www.we-slot.com'+sURL.replace('https://www.we-slot.com',''):sURL),'Content','alwaysRaised=yes,menubar=no,toolbar=no,resizable=yes,scrollbars=no,status=yes,top=0,left=0,height='+iHeight+',width='+iWidth);
   }
}

/******************************** GiveGoal ********************************/
function getGiveGoal(give) {
    var tg = '',
        re = '',
        tmp = 0;
    if (give < 0) {
        tg = '-';
    } else if (give > 0) {
        tg = '+';
    }
    give = Math.abs(give);
    if (give > 0) {
        tmp = Math.floor((give) / 2.0) / 2;
        re = '' + ((tmp>0)?tg:'') + tmp;
        if (give % 2 == 1) {
            tmp = Math.floor((give + 1) / 2.0) / 2;
            re += '/' + ((tmp>0)?tg:'') + tmp;
        }
        re += '';
    } else {
        re = '0.0';
    }
    return re;
}
function getOverUnderLine(ID) {
    var vTmp='',
        vTmp1='',
        vTmp2='',
        id=eval(ID);
    if (id >= 0) {
        vTmp1 = '' + (Math.floor(id / 2) / 2);
        if ((id % 2) == 1) {
            vTmp2 = '/' + (Math.ceil(id / 2.0) / 2);
        } else {
            if (false && (Math.ceil(vTmp1)) == vTmp1) {
                vTmp2 = '.0';
            }
        }
    }
        vTmp = vTmp1 + vTmp2;
    return vTmp;
}
function undefinedValue(e){
    e = (e!=undefined&&e!=null&&e!='')?e:'--';
    return e;
}
/******************************** nopic ********************************/
function nopic(lnk){
    jQuery.ajax({
        type:"GET",
        url:lnk,
        async: false,
        complete: function(response){
            if(response.status == 200){
                lnk = lnk;
            }else{
                lnk=location.href.split("page/")[0]+"images/nopic.jpg";
            }
        }
    })
    return lnk;
}
/******************************* TABS **********************************/ 
function Tabs(ID){
    jQuery("#"+ID+">ul>li").on("click",function(){
        tabItemTakes(ID,this);
    });
    var liActiveNumber =  jQuery("#"+ID+" ul li.active").length;
    var liRel = jQuery("#"+ID+">ul>li").eq(0).attr("data-rel");
    jQuery("#"+ID+">ul>li").eq(0).addClass("active");
         jQuery("#"+ID+">div").eq(0).css("display","block");
        var tabHrefRel = jQuery("#"+ID+">ul>li").eq(0).attr("data-href");
        if(tabHrefRel!=null&&tabHrefRel!=""){
        jQuery("#"+ID+">div[data-rel='"+liRel+"']").load(tabHrefRel);
    }  
    if(ID=='charts_tabs')newInit(id, liRel.replace('charts_tab_',''),'1');       
}
function tabItemTakes(ID,thisObj){
    var tabRel = jQuery(thisObj).attr("data-rel");
    jQuery("#"+ID+">ul>li").removeClass("active");
    jQuery(thisObj).addClass("active");
    jQuery("#"+ID+">div").css("display","none");
    jQuery("#"+ID+">div[data-rel='"+tabRel+"']").css("display","block");
    var tabHrefRel = jQuery(thisObj).attr("data-href");
    if(tabHrefRel!=null&&tabHrefRel!=""){
        jQuery("#"+ID+">div[data-rel='"+tabRel+"']").load(tabHrefRel);  
    }
    if(ID=='charts_tabs')newInit(id, tabRel.replace('charts_tab_',''),'1');
}


jQuery(function(){ 
    jQuery('#cboxClose_comm').click(function() {
        jQuery('.popbox').css({
            "display": 'none'
        });
        jQuery('.Overlay').css({
            "display": 'none'
        });
        jQuery('body').css({
            "overflow-y": 'auto'
        })
    });  
    jQuery('#cboxClose_comm2').click(function() {
        jQuery('.popbet').css({
            "display": 'none'
        });
        jQuery('body').css({
            "overflow-y": 'auto'
        })
        // jQuery('.Overlay').css({
        //     "display": 'none'
        // });
    });  
})


function convertTennisGive(give){
    var re=give.substring(0,1);
    if(re=='-')
        var tg='+'+give.split('-')[1];
    else if(give=="0.0")
         var tg='0';
    else
        var tg='-'+give;
    return tg;
}
function convertTennisGivegg(give){
    var re=give.substring(0,1);
    if(give=="0.0")
        var tg='0';
    else if(re!='-')
        var tg='+'+give;     
    else
        var tg=give;
    return tg;
}

var nodatatext = ['暫時沒有資料','暂时没有资料','No data'][lang_id];
var nodataHtml ='<tr><td colspan="21" style="height:200px;"><div class="nodata_fluid"><div class="nodata_Text">'+nodatatext+'</div></div></td></tr>';


function Torepeat(arr) {
  var result=[];
  for(var i=0,lens=arr.length; i<lens; i++){ 
    if(result.indexOf(arr[i])<0){
      result.push(arr[i])
    }
  }
  return result;
}  


/**Breadcrumb**/
var Breadcrumb_odds = ['賠率', '赔率', ' Odds'][lang_id],
    Breadcrumb_Livescore = ['現場比數', '现场比数', ' Livescore'][lang_id],
    Breadcrumb_others = ['大戰分析', '大战分析', ''][lang_id],
    Breadcrumb_ranking = ['球員排名', '球员排名', 'Ranking'][lang_id],
    Breadcrumb_Fixture = ['賽程', '赛程', ' Fixture'][lang_id];
    Breadcrumb_library = ['資料庫', '资料库', ' Library'][lang_id];
$('#container_title').html('<a href="'+ www_link +'page/index.html?sport='+ show_type +'&lang='+ lang +'">'+ ball +'</a> > <span class="'+ball_type[show_type]+'_text_color">'+ ( location.href.indexOf('odds')>=0? ball + Breadcrumb_odds:location.href.indexOf('fixture')>=0?ball + Breadcrumb_Fixture:location.href.indexOf('livescore')>=0?ball + Breadcrumb_Livescore:location.href.indexOf('analysis')>=0?ball + Breadcrumb_others:location.href.indexOf('ranking')>=0?Breadcrumb_ranking:location.href.indexOf('library')>=0?ball + Breadcrumb_library:'' )+' </span>')


/***/
var calculator = ['計算機','计算机','Calculator'][lang_id],
    remark = ['備註','备注','Remark'][lang_id],
    // playout_schedule = ['派彩','派彩','Playout Schedule'][lang_id];
    playout_schedule = ['時間表','时间表','Schedule'][lang_id];
var pop_oddsLive =   (location.href.indexOf('fixture')<0 ?'<li><div class="bg odds_calculator'+ (lang=='en'?'_en':'') +'"><a href="javascript:openPopup(\''+ ball_type[show_type] +'/html/bet_calculator/bet_calculator_new.html\',600,600);">'+calculator+'</a></div></li>':'')+
// var pop_oddsLive =    '<li><div class="bg odds_calculator"><a href="javascript:addOpenerOdds( )">'+calculator+'</a></div></li>'+
                      '<li><div class="bg odds_time'+ (lang=='en'?'_en':'') +'"><a href="javascript:openPopup(\'slot/html/corprofile/timepaid/timepaid.html\',900,600);">'+playout_schedule+'</a></div></li>'+
                      '<li><div class="bg backup"><a href="javascript:openPopup(\'soccer/html/odds/'+ ['ch', 'sc', 'en'][lang_id] +'-oddsremark2.html\',900,600);">'+remark+'</a></div></li>';
// $('.popbox_overlay').css('height','70%');
// $('#slider_container').css('height','70%');
// console.log($(window).height())


var googleCode = unescape("%3Cscript src='ht"+"t"+"p"+"s:/"+"/ww"+"w.google-analytics.com/analytics.js' type='text/javascript'%3E%3C/script%3E");
$('#footer').append(googleCode)


/**
* Created by beate 20180503
* 上半場玩法 icons  聯賽id
**/
//var ev_type_filter = (' , 7926, 8657, 8655, 8656, 8320, 8823, 5873, 4590, 6426, ');



/*body background*/
if(location.href.indexOf('soccer/')>=0 || show_type == 1){
    $('.body_bk').css({
        'background-image':'url('+( location.href.indexOf('soccer/')>=0?(location.href.indexOf('analysis')>=0?'../':'../../'):(location.href.indexOf('news/')>=0)?'../':'')+'../images/soccer_bir.jpg)'
    });
}else if(location.href.indexOf('nba/')>=0 || show_type == 2){
    $('.body_bk').css({
        'background-image':'url('+( location.href.indexOf('nba/')>=0?'../../':location.href.indexOf('news/')>=0?'../':'')+'../images/nba_bir.jpg)'
    });
}else if(location.href.indexOf('tennis/')>=0 || show_type == 3){
    $('.body_bk').css({
        'background-image':'url('+( location.href.indexOf('tennis/')>=0?'../../':location.href.indexOf('news/')>=0?'../':'')+'../images/tennis_bir.jpg)'
    });
}else{
	

	$('.body_bk').css({'background-image':'url(../images/homepage.jpg)'});		
	
		
	
	
    
}



function convertFBGive(give,tg2,t) {
 var tg = '',
   re = '',
  tmp = 0;

 tg = (tg2 == t)?'-':'+';

    if (give > 0) {
        tmp = Math.floor((give - 1) / 2.0) / 2;
        re = ((tmp>0)?tg:'') + tmp;
        if (give % 2 == 0) {
            tmp = Math.floor(give / 2.0) / 2;
            re += '/' + ((tmp>0)?tg:'') + tmp;
        }
    }else {
        re = '--'; 
    }
 return re;
}





check_league = function (num){

var result=false;
	
	 for(var i=0;i<ev_type_filter.length;i++){ 
            if(ev_type_filter[i]==num){ 			
                result=true; 
            } 
        }
		return result; 
}

// date
function GetDateStr(AddDayCount5) {
    monName_en = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
    dayName_cn = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
    dayName_en = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");

    var now = new Date(AddDayCount5);
    var year = now.getFullYear();

    
    mon = now.getMonth();
    mon = (lang_id != 2)?mon+1 : monName_en[mon];


    days = now.getDate();
    if(days.toString().length == 1){
         days = "0" + days;  
    }


    weeks = (lang_id != 2)? dayName_cn[now.getDay()] : dayName_en[now.getDay()];

    if(lang_id != 2){
        return year +" 年 "+ mon +" 月 "+ days +" 日 ("+ weeks +")";
    } else{
        return days +" "+ mon +" "+ year + " ("+ weeks +")";
    }
    
}
function GetPrevDate(){
    var now = new Date();
    var year = now.getFullYear();
    var mon = now.getMonth() + 1;
    var year2 = year;
    var mon2 = parseInt(mon) - 1;
    if(mon2 == 0){
        year2 = parseInt(year2) - 1;
        mon2 = 12;
    }

    var mon3 = parseInt(mon2) - 1;
    if(mon3 == 0){
        year2 = parseInt(year2) - 1;
        mon3 = 12;
    }

    var mon4 = parseInt(mon3) - 1;
    if(mon4 == 0){
        year2 = parseInt(year2) - 1;
        mon4 = 12;
    }

    if(mon4.toString().length == 1){
         mon4= "0" + mon4;  
    }

    return  year2+'-'+ mon4
}

function GetNextDate(){
    var now = new Date();
    var year = now.getFullYear();
    var mon = now.getMonth() + 1;
    var year2 = year;
    var mon2 = parseInt(mon) + 1;
    if(mon2 == 12){
        year2 = parseInt(year2) + 1;
        mon2 = 1;
    }

    var mon3 = parseInt(mon2) + 1;
    if(mon3 == 12){
        year2 = parseInt(year2) + 1;
        mon3 = 1;
    }

    var mon4 = parseInt(mon3) + 1;
    if(mon4 == 12){
        year2 = parseInt(year2) + 1;
        mon4 = 1;
    }
    if(mon4.toString().length == 1){
        mon4= "0" + mon4;  
    }
    var days = new Date(year2,mon4,0)
    days = days.getDate();
    if(days.toString().length == 1){
         days = "0" + days;  
    }

    return  year2+'-'+ mon4+'-'+days
}

function GetURLParameter(sParam){


    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');

    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam){
            return sParameterName[1];
        }
    }
    return null;
}

// JavaScript Document
function mobile_device_detect(site){

        var thisOS=navigator.platform;
        var thisUserAgent=navigator.userAgent;
        var isMobile = false;

        var os=new Array("iPhone","iPod","android","Nokia","SymbianOS","Symbian","Windows Phone","Phone","Linux armv71","UNTRUSTED/1.0","Windows CE","BlackBerry","IEMobile");
        //var inch7Device = new Array("SM-T","P3100","iPad","SM-P60","GT-N5110","A3000","ME370TG","ME372CL","ME175CG ","A1000","SGP521","P1000","N8000","RX-113","P5220","P5100","SM-P905","X1","A3300","V500","SO-03E","SGP321","P5200","B1-A71","P650","A2107","P3110","P6200","M1","P7501","P5210","SGP511","SGP512","S5000","A1-713HD","P8110","A1-810");
 
       // var is7ich = false;

        // for (var i=0; i<inch7Device.length;i++)
        //   if(thisUserAgent.match(inch7Device[i])){
        //     is7ich=true;
        //     break;
        //   }

      //  if (! is7ich){
          for(var i=0;i<os.length;i++)
            if(thisOS.match(os[i])){
              isMobile=true;
			 // alert("isMobile"+isMobile);
              window.location=site;
			}

          //因为相当部分的手机系统不知道信息,这里是做临时性特殊辨认
          if(navigator.platform.indexOf('iPad') != -1){
			isMobile=true;
			// alert("isMobile0"+isMobile);
			//window.location=site;
		  }

			//alert("thisOS"+thisOS);
			
           //做这一部分是因为Android手机的内核也是Linux
           //但是navigator.platform显示信息不尽相同情况繁多,因此从浏览器下手，即用navigator.appVersion信息做判断
          var check = navigator.appVersion;

          if( check.match(/linux/i) )
            if(check.match(/mobile/i) || check.match(/X11/i)){
              isMobile=true;
			   //alert("isMobile2"+isMobile);
              window.location=site;
			}
       // }
        if(navigator.platform.indexOf('iPad') != -1){
			isMobile=false;
		  }

	
	if(isMobile==true)
		window.location=site;
 //return isMobile;
} 

function getDomain(url) {
    var hostName = url;
    var domain = hostName;
	
	console.log (domain);
    
    if (hostName != null) {
        var parts = hostName.split('.').reverse();
        
        if (parts != null && parts.length > 1) {
            domain = parts[1] + '.' + parts[0];
                
            if (hostName.toLowerCase().indexOf('.com.mo') != -1 && parts.length > 2) {
              domain = parts[2] + '.' + domain;
            }
        }
    }
    
    if (domain == null) domain = "www.macauslot.com";
    
    return domain;
}

if((GetURLParameter('id') == null && GetURLParameter('langid') == null  && GetURLParameter('sport') == null    ) || (GetURLParameter('id') != null && GetURLParameter('id') != "pc" && GetURLParameter('sport') == null))
	mobile_device_detect("https://m." + getDomain(window.location.hostname) + "?id=mobile"); 