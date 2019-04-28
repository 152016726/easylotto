/**
* Created by beate on 2017/10/17
* Copyright 2017 www.macauslot.com
* header of the website
**/
var Odds_download = ['盤紙下載','盘纸下载','Odds Download'][lang_id],
    Betting_Customer =['投注及客服辦公時間','投注及客服办公时间','Betting & Customer Service Hours'][lang_id];
    ball = (show_type==2)?basketball_T:(show_type==3)?tennis_T:soccer_T; 
// var Hhtml ='<div class="header_wrapper">'+
    //     		'<div class="logo left">'+
    //     			'<a href="'+ location.href.split('content/')[0]+'content/page/index.html?sport='+show_type+'&lang='+lang+'"></a>'+
    //     		'</div>'+
    //     		'<ul class="nav_item right">';
    //             if(show_type!=0 && lang_id != 2){
    // Hhtml +=        '<li><a href="javascript:popup(\'/content/page/predictions.html?sport='+show_type+'&lang='+lang+'\',900,600)">'+ball+'心水推介 </a></li><li class="nav_item_border_right"></li>';
    //             }
    // Hhtml +=        '<li id="nav_odds"><a href="javascript:popup(\'/content/page/advertise.html?sport='+ show_type +'&lang='+lang+'\')">'+Odds_download+'</a></li>'+
    //                 '<li class="nav_item_border_right"></li>';
    //     			// '<li><a href="javascript:openPopup(\'slot/html/corprofile/soccer_bettime.html\',900,600)">'+Betting_Customer+'</a></li>'+
    //                 // '<li class="nav_item_border_right"></li>';
    //             if(show_type!=0 && lang_id != 2 && show_type !=3){
    // Hhtml +=        '<li><a href="javascript:openPopup(\'../../../'+ball_type[show_type]+'/jsp/database/statistical_search.jsp\',900,600)">進階搜尋</a></li><li class="nav_item_border_right"></li>';
    //             }    
    // Hhtml +=        '<li>'+
    //                     'GMT + 8 <span class="msl-header-clock" id="header-clock"></span>'+
    //                ' </li>'+
    //                 '<li class="nav_item_border_right"></li>'+
    //     			'<li class="lang last-item lang_select">'+
    //                     '<div class="btn-group">'+
    //                         // '<div class="select-text">'+
    //                             '<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true">'+
    //                             '繁體中文 <span class="caret"></span>'+
    //                             '</button>'+
    //                         // '</div>'+
    //                         // '<div class="select-option">'+
    //                             '<ul class="dropdown-menu"> '+                               
    //                                     '<li><a class="multi_lang" data-local="cn" href="javascript:">繁體中文</a></li>'+
    //                                     '<li><a class="multi_lang" data-local="sc" href="javascript:">简体中文</a></li> '+
    //                                     '<li><a class="multi_lang" data-local="en" href="javascript:">English</a></li> '+
    //                             '</ul>'+
    //                         // '</div>'+
    //                     '</div>'+         
    //                 '</li>'+
    //     		'</ul>'+
    //     	'</div>'+
var Hhtml = ''+
        	'<div id="header_menu" class="'+ball_type[show_type]+'_bordercolor">'+
                    '<div class="left" style="position: absolute; width: 456px;padding-left: 55px;">'+
                    '<div class="logo">'+
                        '<a href="'+ location.href.split('content/')[0]+'content/page/index.html?sport='+show_type+'&lang='+lang+'"></a>'+
                    '</div>'+
                    '<div class="sport_nav"> '+
                        '<div class="sport_nav_item nav_home">'+
                            '<div  onclick="javascript:ga(\'send\', \'event\', \'click\', \'(點擊)網站主頁\', \'網站主頁\');" class="bg_image_home '+(show_type==0?"active":"")+'" data-type="0"><span>'+["網站主頁","网站主页",'Home'][lang_id]+'</span></div>'+
                        '</div> '+  

                        '<div class="sport_nav_item nav_football">'+
                            '<div onclick="javascript:ga(\'send\', \'event\', \'click\', \'(點擊)足球主頁\', \'足球主頁\');"  class="bg_image_football '+(show_type==1?"active":"")+' '+(lang_id==2?"eng_soccer_indent":"")+'" data-type="1"><span>'+["足球","足球",'Soccer'][lang_id]+'</span></div>'+
                        '</div>'+
                        
                        '<div  onclick="javascript:ga(\'send\', \'event\', \'click\', \'(點擊)篮球主頁\', \'篮球主頁\');"  class="sport_nav_item nav_basketball">'+
                            '<div  class="bg_image_basketball '+(show_type==2?"active":"")+' '+(lang_id==2?"eng_nba_indent":"")+'" data-type="2"><span>'+["籃球","篮球","Basketball"][lang_id]+'</span></div>'+
                        '</div>'+
                        
                        // '<div class="sport_nav_item nav_tennis">'+
                        //     '<div class="bg_image_tennis '+(show_type==3?"active":"")+' '+(lang_id==2?"eng_tennis_indent":"")+'" data-type="3"><span>'+["網球","网球","Tennis"][lang_id]+'</span></div>'+
                        // '</div> '+                  
                    '</div>'+
                    '</div><div class="right">'+
                    '<ul class="nav_item" style="float:right;">';
                    if(show_type!=0 && lang_id != 2){
        Hhtml +=        '<li><a href="javascript:popup(\'/content/page/predictions.html?sport='+show_type+'&lang='+lang+'\',900,600)">'+ball+'心水推介 </a></li><li class="nav_item_border_right"></li>';
                    }
        Hhtml +=        '<li id="nav_odds"><a href="javascript:popup(\'/content/page/advertise.html?sport='+ show_type +'&lang='+lang+'\')">'+Odds_download+'</a></li>'+
                        '<li class="nav_item_border_right"></li>';
                        // '<li><a href="javascript:openPopup(\'slot/html/corprofile/soccer_bettime.html\',900,600)">'+Betting_Customer+'</a></li>'+
                        // '<li class="nav_item_border_right"></li>';
                    if(show_type!=0 && lang_id != 2 && show_type !=3){
        Hhtml +=        '<li><a href="javascript:openPopup(\'../../../'+ball_type[show_type]+'/jsp/database/statistical_search.jsp\',900,600)">進階搜尋</a></li><li class="nav_item_border_right"></li>';
                    }    
        Hhtml +=        '<li>'+
                            'GMT + 8 <span class="msl-header-clock" id="header-clock"></span>'+
                       ' </li>'+
                        '<li class="nav_item_border_right"></li>'+
                        '<li class="lang last-item lang_select">'+
                            '<div class="btn-group">'+
                                // '<div class="select-text">'+
                                    '<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true">'+
                                    '繁體中文 <span class="caret"></span>'+
                                    '</button>'+
                                // '</div>'+
                                // '<div class="select-option">'+
                                    '<ul class="dropdown-menu"> '+                               
                                            '<li><a class="multi_lang" data-local="cn" href="javascript:">繁體中文</a></li>'+
                                            '<li><a class="multi_lang" data-local="sc" href="javascript:">简体中文</a></li> '+
                                            '<li><a class="multi_lang" data-local="en" href="javascript:">English</a></li> '+
                                    '</ul>'+
                                // '</div>'+
                            '</div>'+         
                        '</li>'+
                    '</ul>'+
                    '<div class="header_banner clear">'+
                    	//'<a href="h'+'tt'+'ps://www.mac'+'au-slot.com/content/'+(show_type!=2?'soccer':'basketball')+'/" class="bg_image_mslot'+( lang!='cn'?'_'+lang:'')+(show_type!=2?'':'_nba')+'" target="_blank"><span></span></a>'+
						//'<a href="h'+'tt'+'ps://52.77.202.65/content/'+(show_type!=2?'soccer':'basketball')+'/" class="bg_image_mslot'+( lang!='cn'?'_'+lang:'')+(show_type!=2?'':'_nba')+'" target="_blank"><span></span>'+
						'<a href="javascript:to_betting_site(' + show_type +')" class="bg_image_mslot'+( lang!='cn'?'_'+lang:'')+(show_type!=2?'':'_nba')+'"><span></span>'+
                            // '<img src="../images/header/'+(show_type!=2?'soccer':'nba')+'_topbanner/mslot'+ ( lang=='sc'?'_sc':(lang=='en'?'_en':'') ) +'.jpg" alt="">'
                        '</a>'+
                    '</div><div>'+
        	'</div>';
$("#header").html(Hhtml)

// var GMTt = null;
// GMTt = jQuery.ajax({async: false}).getResponseHeader("Date");
// var dt = new Date(GMTt);
// dt = dt.toString().split(' ')[4];
// var hour = dt.split(':')[0];
// var min = dt.split(':')[1];
// var sec = dt.split(':')[2];
// ss = Number(hour*3600) + Number(min*60) + Number(sec);
// times = sec_to_time(ss);
// // console.log(time_to_sec(times))
// function GMTtime(){
//     times = sec_to_time(ss);
//     ss++; 
//     jQuery("#header-clock").html(times);
//     GMTt = setTimeout(GMTtime,1000);    
// } 
// GMTtime();


// function sec_to_time(s) {
//         var t;
//         if(s > -1){
//             var hour = Math.floor(s/3600);
//             var min = Math.floor(s/60) % 60;
//             var sec = s % 60;
//             if(hour < 10) {
//                 t = '0'+ hour + ":";
//             } else {
//                 t = (hour==24?'00':hour) + ":";
//             }
 
//             if(min < 10){t += "0";}
//             t += min + ':';
//             if(sec < 10){t += "0";}
//             t += sec.toFixed(2).split('.')[0];
//         }
//         return t;
// }

var GMTt = null;
function GMTtime(){
    var dt = new Date(),
        h=dt.getHours(),
        m=dt.getMinutes();
    jQuery("#header-clock").html((h<10?'0'+h:h)+":"+(m<10?'0'+m:m));
    GMTt = setTimeout(GMTtime,1000);
} 
// window.onload=function(){
    GMTtime();
// }

function to_betting_site(show_type)
{
   var link1='www.macau-slot.com';
   var link2='47.91.168.197';
   var url='h'+'tt'+'ps://'+link2+'/content/'+(show_type!=2?'soccer':'basketball');
   var dm=document.domain;
   //console.log(dm);
  if(dm == 'www.macauslot.com' || dm == 'macauslot.com') 
  {  
     url='h'+'tt'+'ps://'+link1+'/content/'+(show_type!=2?'soccer':'basketball');
  }
     window.open(url);
}
