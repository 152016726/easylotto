/**
* Created by beate on 2017/10/13
* Copyright 2017 www.macauslot.com
* Be in common use
**/

document.write("<script src='../"+ ( ( location.href.indexOf('livescore_soccernba')>=0?'':(location.href.indexOf('soccer')>=0 || location.href.indexOf('nba')>=0 )?( location.href.indexOf('analysis')>=0?'../':'../../') : ( location.href.indexOf('news')>=0?'../':'') ) ) +"js/controller/header/index.js'><\/script>");
document.write("<script src='../"+ ( ( location.href.indexOf('livescore_soccernba')>=0?'':(location.href.indexOf('soccer')>=0 || location.href.indexOf('nba')>=0 )?( location.href.indexOf('analysis')>=0?'../':'../../') : ( location.href.indexOf('news')>=0?'../':'') ) ) +"js/controller/footer/index.js'><\/script>");
document.write("<script src='../"+ ( ( location.href.indexOf('livescore_soccernba')>=0?'':(location.href.indexOf('soccer')>=0 || location.href.indexOf('nba')>=0 )?( location.href.indexOf('analysis')>=0?'../':'../../') : ( location.href.indexOf('news')>=0?'../':'') ) ) +"js/controller/leftslidebar/index.js'><\/script>");




/************* right banner ***************/
if( location.href.indexOf('odds')>=0 || location.href.indexOf('livescore')>=0 || location.href.indexOf('analysis')>=0 ){

}else{
    var banner_type = ["","_Soccer","_Nba",""],
        GetBanner = GetAjaxXml( (location.href.indexOf('fixture')>=0?'../../':location.href.indexOf('news')>=0?'../':'') +'../data/slot/advertise_xml/Banner_Photo'+ banner_type[show_type] +'.xml'),
        bhtml = '';
        // bhtml = '<div class="home_advert_panel right">';
    jQuery.when(GetBanner).done(function(result){
        var tag = (lang_id=='1')?'chinese':(lang_id=='2')?'english':'cantonese',
            langtag = (lang_id=='1')?'_SC':(lang_id=='2')?'_EN':'',
            i=0;
        $(result).find(tag).find('R').each(function(){
            i++;
		if($(this).find('BANNER_URL'+ langtag).text()!='/survey/esurvey_201805/esurvey_201805.html'){
			 bhtml +='<a href="'+ $(this).find('BANNER_URL'+ langtag).text() +'" target="_blank"><img class="home_advert_panel_img0'+i+'" src="'+ ( location.href.indexOf('fixture')>=0?'../../':location.href.indexOf('news')>=0?'../':'') +'../data/slot/advertise/'+ $(this).find('BANNER_FILENAME'+ langtag).text() +'"></a>';
            // bhtml +='<p class="home_advert_panel_img0'+i+'" style="background: url('+ ( location.href.indexOf('fixture')>=0?'../../':location.href.indexOf('news')>=0?'../':'') +'../data/slot/advertise/'+ $(this).find('BANNER_FILENAME'+ langtag).text() +') no-repeat;"><a href="'+ $(this).find('BANNER_URL'+ langtag).text() +'" target="_blank"></a></p>';
		}
           
        })
    })
    // http://172.16.6.206/slot/advertise_xml/Banner_Photo.xml
    var facebooklink="h" + "ttps://www." + "facebook.com/macauslot88986868";
    var sinalink="h" + "ttp://m." + "weibo.cn/n/澳彩情報站";
    // bhtml += '<p class="facebook"><a href="'+facebooklink+'" target="_blank"></a></p>'+'<p class="sina"><a href="'+sinalink+'" target="_blank"></a></p>';
    bhtml += '<p class="facebook"><a href="'+facebooklink+'" target="_blank"></a></p>';
    if(lang!='en'){
        jQuery(".home_advert_panel").html(bhtml);
    }

}
/**************** popup box ****************/ 
jQuery("#footer").after(' <div class="Overlay" style="opacity: 0.9; visibility: visible; display: none;"></div>'+
    '<div id="popbox" class="popbox_overlay popbox" style="display: none;">'+
    '<button type="button" id="cboxClose_comm">close</button>'+
    '<div id="cboxWrapper">'+  
        '<iframe id ="iframe_popup" frameborder="0" name="" scrolling="NO"  src="/content/page/load.html" class="cboxIframe" width="100%" height="100%" style="filter:Chroma(Color=white);" allowTransparency="true" ></iframe>'+
    '</div>'+
'</div>');
jQuery("#footer").after('<div class="Overlay" style="opacity: 0.9; visibility: visible; display: none;"></div><div id="popbet" class="popbox_overlay popbet" style="display: none;">'+
    '<button type="button" id="cboxClose_comm2">close</button>'+
    '<div id="cboxWrapper2">'+  
        '<iframe id ="iframe_bet" frameborder="0" name="" scrolling="NO"  src="/content/page/load.html" class="cboxIframe" width="100%" height="100%" style="filter:Chroma(Color=white);" allowTransparency="true" ></iframe>'+
    '</div>'+
'</div>');

jQuery(function(){ 
    jQuery(".dropdown-menu li a").click(function() {
        jQuery(".btn-group button").html(jQuery(this).html()+'<span class="caret"></span>');
        lang = jQuery(this).attr('data-local'); 

        var www_link =(lang!='sc')?www_domian:www_domian+"fjt/";
        window.location.href=www_link+(location.href.indexOf("fjt/")>=0?location.href.split("&")[0].replace(www_domian,'').replace("fjt/",''):(location.href.indexOf('?')>=0?location.href.replace(www_domian,'').replace('&lang=en','').replace('&lang=cn','').replace('&lang=sc',''):'content/page/index.html?sport=0'))+"&lang="+lang;
        console.log(www_link+(location.href.indexOf("fjt/")>=0?location.href.split("&")[0].replace(www_domian,'').replace("fjt/",''):(location.href.indexOf('?')>=0?location.href.replace(www_domian,'').replace('&lang=en','').replace('&lang=cn','').replace('&lang=sc',''):'content/page/index.html?sport=0'))+"&lang="+lang)
        // window.location.href=www_link+(location.href.indexOf("fjt/")>=0?location.href.split("&")[0].replace(www_domian,'').replace("fjt/",''):(location.href.indexOf('?')>=0?location.href.split("&")[0].replace(www_domian,''):'content/page/index.html?sport=0&'))+"&lang="+lang;
    });
    jQuery(".sport_nav_item div").click(function(event) {
        show_type = jQuery(this).attr('data-type');
        window.location.href=www_link+"page/index.html?sport="+show_type+"&lang="+lang;
    });
    if(lang_id == "1"){
        jQuery(".btn-group button").html('简体中文<span class="caret"></span>');
    } else if(lang_id == "2"){
        jQuery(".btn-group button").html('English<span class="caret"></span>');
    } else{
        jQuery(".btn-group button").html('繁體中文<span class="caret"></span>');
    }
    var clicknum =0;
    jQuery(".btn-group").click(function() {
        if(clicknum%2==0){
            jQuery(this).addClass('open')
        }else{
            jQuery(this).removeClass('open')
        }
        clicknum++;
    }); 
    jQuery('.to-top').click(function(e){
        jQuery('body,html').animate({scrollTop:0},600)
    })

   
})


/*load*/
jQuery('#loader').hide();