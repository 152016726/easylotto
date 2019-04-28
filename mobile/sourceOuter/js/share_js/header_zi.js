//获取当前url的值
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

var lang_id=request("lang_id");//語言
var type_ball=request("typeball");;//分類
var type_type=request("type");;//分類

var Href=location.href.split("&")[0].split("?")[0].split("/")[1].split(".")[0];
/* changelog beate_tennis_20170228 begin 若需關閉tennis  將以下code注釋釋放*/
if(type_ball=="TB" || Href=="OddsTennis" || Href=="LivescoreTennis"){
   window.location.href=sFJTSite+sdata_m+'index.html';
}
/* changelog beate_tennis_20170228 end 若需關閉tennis  將以上code注釋釋放*/

var sWWWSvr="#sWWWSvr#/";
var sWWWNSvr="#sWWWNSvr#/";
function openPopup(sURL, iWidth, iHeight){
   if(type_ball!='TB')
      var newURL=sURL.replace(sWWWSvr+'/',http_web_domain);
   else
      var newURL=sURL.replace(sWWWNSvr+'/',http_www_domain);
   window.open(newURL,'Content','alwaysRaised=yes,menubar=no,toolbar=no,resizable=yes,scrollbars=no,status=yes,top=0,left=0,height='+iHeight+',width='+iWidth);
}

if(type_ball=="SB"){
   var sporttype="soccer";
   document.getElementById("bodypinch").style.background="#1E7D23";
   var langText=(lang_id=="CN")?"足球新闻":"足球新聞";
   var ImgLogo="left_menu.png";
   var H3=(type_type=="livescore")?"":(type_type!="odds")?"<h3 class=\"soc\"><div id=\"soccer\">"+langText+"<br><span class=\"smalltext\">Soccer News</span></div></h3>":"";
/* changelog beate_tennis_20170228 begin 若需關閉tennis  將以下code注釋釋放*/
} else {
/* changelog beate_tennis_20170228 end 若需關閉tennis  將以上code注釋釋放*/

/* changelog beate_tennis_20170228 begin 若需關閉tennis  將以下code注釋*/
// }else if(type_ball=="BB") {
/* changelog beate_tennis_20170228 end 若需關閉tennis  將以上code注釋*/

   var sporttype="nba";
   document.getElementById("bodypinch").style.background="#f47a39";
   var langText=(lang_id=="CN")?"篮球新闻":"籃球新聞";
   var ImgLogo="left_menu_bak.png";
   var H3=(type_type=="livescore")?"":(type_type!="odds")?"<h3 class=\"basket\"><div id=\"basketball\">"+langText+"<br><span class=\"smalltext\">Baskball News</span></div></h3>":"";

/* changelog beate_tennis_20170228 begin 若需關閉tennis  將以下code注釋*/
// } else {
//    var sporttype="tennis";
//    document.getElementById("bodypinch").style.background="#147dc1";
//    var langText=(lang_id=="CN")?"网球新闻":"網球新聞";
//    var ImgLogo="left_menu_ten.png";
//    var H3=(type_type=="livescore")?"":(type_type!="odds")?"<h3 class=\"ten\"><div id=\"tennis\">"+langText+"<br><span class=\"smalltext\">Tennis News</span></div></h3>":"";
/* changelog beate_tennis_20170228 end 若需關閉tennis  將以上code注釋*/
}
var LangLink=(lang_id=="ENG")?""+sFJTSite+sdata_m+"eng.html?lang_id=ENG":(lang_id=="CN")?""+sNFJTSite+sdata_m+"index.html?lang_id=CN":"./index.html";

document.writeln("<!--Top Begin-->");
document.writeln("	<!-- Sidebar Begin -->	");
document.writeln("	<aside id=\"sidebar\">");
document.writeln("	  <nav class=\"cbp-spmenu cbp-spmenu-vertical cbp-spmenu-left\" id=\"cbp-spmenu-s1\">");
document.writeln("	  </nav><!--LeftMenu end-->");
document.writeln("	  <script src=\"js/Leftmenu.js\"></script>");
document.writeln("	</aside>");
document.writeln("	<!-- Sidebar end -->");
document.writeln("	<!-- Main Content Begin -->	");
document.writeln("	<section id=\"content\">");
document.writeln("	<div class=\"content-scroll\">");
document.writeln("	<!-- Sidebar Toggle & Tabbed Navigation -->");
document.writeln("	<header>");
document.writeln("	<div style=\"height:10px;\"></div>");
document.writeln("	 <div class=\"header_border\" id=\"header_borderid\">");
document.writeln("	  <div class=\"left_push\"><a id=\"showLeftPush\"><img src=\"images/"+ImgLogo+"\"/></a></div>");
document.writeln("	  <div class=\"logo\"><a rel=\"prefetch\"  href=\""+LangLink+"\" title=\"\"><img src=\"images/logo.png\"/></a></div>");
document.writeln("	 </div>");
document.writeln("	</header>");
document.writeln("	<!-- Sidebar Toggle & Tabbed Navigation -->");
document.writeln("	");
document.writeln("<!--TOP End-->");
