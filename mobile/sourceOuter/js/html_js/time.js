// JavaScript Document
// JavaScript Document
function GetDateStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth()+1;//获取当前月份的日期}
	if(m.toString().length == 1){
	     m = "0" + m;	 
	}
	
	var d = dd.getDate();
	if(d.toString().length == 1){
	     d = "0" + d;	 
	}
	

 return y+""+m+""+d;
 
}

function GetDateStr2(AddDayCount2) {
    var now = new Date();
    now.setDate(now.getDate()+AddDayCount2);//获取AddDayCount天后的日期
	
	var d = now.getDate();
	
	if(d.toString().length == 1){
	     d = "0" + d;	 
	}
	dayName = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
    monName = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
    
	mon = monName[now.getMonth()];
    day = dayName[now.getDay()];
	return day+", "+mon+" "+d;
}

function GetDateStr3(AddDayCount3) {
 var dd = new Date();
    dd.setDate(dd.getDate()+AddDayCount3);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth()+1;//获取当前月份的日期}
	var d = dd.getDate();

	return y+"年"+m+"月"+d+"日";
}

function GetDateStr5(AddDayCount5) {
    var now = new Date();
    now.setDate(now.getDate()+AddDayCount5);//获取AddDayCount天后的日期
	
	var d = now.getFullYear();

    monName = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
    
	mon = monName[now.getMonth()];
    day = now.getDate();
	if(day.toString().length == 1){
	     day = "0" + day;	 
	}
	return day+""+mon+""+d;
}


function GetDateStr4(AddDayCount4) {
    var now4 = new Date();
    now4.setDate(now4.getDate()+AddDayCount4);//获取AddDayCount天后的日期
	
	var d4 = now4.getDate();

	dayName4 = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
    
	mon4 =now4.getMonth()+1;
    day4 = dayName4[now4.getDay()];
	return day4+", "+mon4+"月"+d4+"日";
}