var root;

//创建selectNodes方法
if (!window.ActiveXObject) 
{ 
  XMLDocument.prototype.selectSingleNode = Element.prototype.selectSingleNode = function (xpath) 
  { 
    var x = this.selectNodes(xpath) 
    if ( ! x || x.length < 1 ) return null ; 
    return x[ 0 ]; 
  } 
  XMLDocument.prototype.selectNodes = Element.prototype.selectNodes = function (xpath) 
  { 
    var xpe = new XPathEvaluator(); 
    var nsResolver = xpe.createNSResolver( this.ownerDocument == null?this.documentElement : this.ownerDocument.documentElement); 
    var result = xpe.evaluate(xpath, this , nsResolver, 0 , null ); 
    var found = []; 
    var res; 
    while (res = result.iterateNext()) 
    found.push(res); 
    return found; 
  } 
} 
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

var type_ball=request("typeball");//分類
var oXmlHttp = '';
function createXMLHttpRequest() { 
    if (window.ActiveXObject) { 
        oXmlHttp = new ActiveXObject("Microsoft.XMLHTTP"); 
    }else if (window.XMLHttpRequest) { 
        oXmlHttp = new XMLHttpRequest(); 
    } 

} 

//chrome 報錯---CreateXMLDOM
function CreateXMLDOM() 
{ 
  createXMLHttpRequest();
  
//   try{
//        oXmlHttp.responseType("msxml-document");
//   }catch(e){
//   }
//   oXmlHttp.send(null) ; 
}
var httpxml=''; 
CreateXMLDOM()
  if(lang_id=="CN"){  
    httpxml="LeftMenuXml/STmenu.xml";
    livescoretext="现场比数"; 
    result="赛果";
    OddsDataText1="今日无赛事赔率！";
    OddsDataText2="以下日期有赔率：";
    OddsDataText3="且往后日期无赔率!";
    TeamText="暂时没有资料！";
  }else if(lang_id=="ENG"){
    httpxml="LeftMenuXml/menu_en.xml";
    livescoretext="Livescore"; 
    result="Result";
    OddsDataText1="No Betting Odds today!";
    OddsDataText2="The following dates have odds:";
    OddsDataText3=" And no future date odds!";
    TeamText="Information not available at the moment!";  
  }else{  
    httpxml="LeftMenuXml/menu.xml"; 
    livescoretext="現場比數"; 
    result="賽果";
    OddsDataText1="今日無賽事賠率！";
    OddsDataText2="以下日期有賠率：";
    OddsDataText3="且往後日期無賠率!";
    TeamText="暫時沒有資料！";
  }
   $.ajax({
    url: httpxml,
    dataType: 'xml',
  }).done(function(root) { 
   var tmp_s=""; var k=0; 
  /* changelog beate_tennis_20170228 begin 若需關閉tennis  將以下code注釋釋放*/
   $(root).find("Item[id!=9]").each(function() { 
  /* changelog beate_tennis_20170228 end 若需關閉tennis  將以上code注釋釋放*/ 

  /* changelog beate_tennis_20170228 begin 若需關閉tennis  將以下code注釋*/
   // $(root).find("Item").each(function() { 
  /* changelog beate_tennis_20170228 end 若需關閉tennis  將以上code注釋*/ 
       if($(this).attr("pid")==0){
			var _id = $(this).attr("id");
			tmp_s +='<div class="vtitle_class" id="vtitle'+_id+'"  onclick="showsubmenu('+_id+')"><em class="v 02 v02"></em>';
			tmp_s +='<p id="vt'+_id+'" style="'+(lang_id=="ENG"?"padding:12px 15%;":"")+'">'+$(this).text()+'</p></div>'; 
			tmp_s +='<div id="piv'+_id+'"  class="vconclass"><ul >';
/* changelog beate_tennis_20170228 begin 若需關閉tennis  將以下code注釋釋放*/
			$(root).find("Item[id!=9]").each(function() {
/* changelog beate_tennis_20170228 end 若需關閉tennis  將以上code注釋釋放*/

/* changelog beate_tennis_20170228 begin 若需關閉tennis  將以下code注釋*/
      // $(root).find("Item").each(function() {
/* changelog beate_tennis_20170228 end 若需關閉tennis  將以上code注釋*/        
				if($(this).attr("pid")==_id){   	
				  tmp_s +='<li id="tt'+$(this).attr("class")+'"><div style="'+(lang_id=="ENG"?"line-height: 28px;":"")+'"><a href="'+$(this).attr("link")+'&lang_id='+lang_id+'&typeball='+$(this).attr("type")+'"  data-prefetch="true">'+$(this).text()+'</a></div></li>';
				}
			 });
			 tmp_s +='</ul></div>';
      }
	});
    $('#cbp-spmenu-s1').html(tmp_s);//顯示 

   // $('.vtitle_class').unbind('click');
   //    $(".vtitle_class").click(function(){
   //      if($(this).find("em").hasClass("vc02")){
   //        $(this).find("em").removeClass("vc02").addClass("vc01");
   //        $(this).next().slideUp();;
   //      }else{
   //        $(".vc02").removeClass("vc02").addClass("vc01");
   //        $(this).find("em").removeClass("vc01").addClass("vc02");
   //        $(".vconclass").slideUp();
   //        $(this).next().slideDown();
   //      }
   //    });



// } 
})


//显示隐藏层 
function showsubmenu(sid) 
{ 
      
  var whichEl = document.getElementById( "piv" +sid);
  if (whichEl.style.display == "none") 
    { 
         whichEl.style.display="block";
  		   $('#vtitle'+sid+' em').removeClass('v01').addClass('v02');
    } else { 
       whichEl.style.display="none";
  	   $('#vtitle'+sid+' em').removeClass('v02').addClass('v01'); 
    } 
}

/* changelog beate_tennis_20170228 begin 若需關閉tennis  將以下code注釋*/
// function  DoublesPlayer(name) {
//    var html = (name.split('/')[1] != undefined)?name.split('/')[0]+'<br/>'+name.split('/')[1]:name;
//    return html;
// }
/* changelog beate_tennis_20170228 end 若需關閉tennis  將以上code注釋*/
