// JavaScript Document
// var lang_id=request("lang_id");//語言
function hidedetails(){
$("#details").hide();
}
function showdetails(thisObj,orderid){
var d = $(thisObj);
var pos = d.offset();
var t = pos.top + d.height() -100; // 弹出框的上边位置
            var l = pos.left + d.width() - 100;  // 弹出框的左边位置
            $("#details").css({ "top": t, "left": l }).show();
$("#details").html($("#box"+orderid).html());
}
// JavaScript Document
var lang_id=request("lang_id");//語言

jQuery(document).ready(function($) {
	$('.web_pc').click(function(){
		$('.theme-popover-mask').fadeIn(100);
		$('.theme-popover').slideDown(200);
	})
	$('.close').click(function(){
		$('.theme-popover-mask').fadeOut(100);
		$('.theme-popover').slideUp(200);
	})

})
document.writeln("<link rel=\"stylesheet\"  href=\"css/theme.css\" >");
document.writeln("<div class=\"clear\"></div>");
document.writeln("<footer style=\"background:none;\">");
document.write("<img src=\"images/picfooter.png\">");
document.writeln("</footer>");
document.writeln("<!--演示内容开始-->");
document.writeln("<script type=\"text/javascript\" src=\"js/html_js/scrolltopcontrol.js\"></script>");
//document.writeln("<script type=\"text/javascript\" src=\"js/share_js/mobile_detect.js\"></script>");
// document.write(unescape("%3Cscript src='h" + "ttp://m." + "macauslot.com/js/share_js/google_count.js' type='text/javascript'%3E%3C/script%3E"));
document.write(googleCode);

//document.write("<section style=\"position:fixed; bottom:0px; margin-bottom:-5.5px;z-index:999;left:0px;width:100%\"><a href=\"h" + "ttps://mobile." + "macau-slot.com\" target=\"_blank\"><img src=\"images/pic.jpg\"></a></section>");
document.write("<section style=\"position:fixed; bottom:0px; margin-bottom:-5.5px;z-index:999;left:0px;width:100%\"><a href=\"javascript:domain_chk();\" target=\"_blank\"><img src=\"images/pic.jpg\"></a></section>");
