	/*******************************************************完場賽果 beate**************************************************************/
// $('#get_result').click(function(){
	
// 	GetResult_scoer();
// })
$('#msl_result_cboxClose_comm').click(function(){
	$('.Overlay').hide();
	$('#msl-livescore-result').hide();
})
function GetResult_scoer(){
	$('.Overlay').show();
	$('#msl-livescore-result').show();
	$('#msl-livescore-result .cboxWrapper').html('<div class="loaders"><div class="loader"><div style="backgroundColor:black" class="ball-pulse-rise"><div></div><div></div><div></div><div></div><div></div></div></div></div>');

    var livesocer_status = new Array(), 
    	update_time = '--/--/-- --:--', 
    	shtml = '<div class="top_preds"><div class="herder_title left"><strong>'+ FinishedMatches +'</strong></div><div class="herder_time right">'+['資料只供參考<br>更新於 ','資料只供參考<br>更新於 ','Last Update:<br> '][lang_id]+' ----/--/-- --:--</div></div>';
    var GetXML = GetAjaxXml("../data/soccer/xml/scores/"+(lang!='cn'?lang:'ch')+"-score.xml");
    var Half_txt = ['半場','半場','Half Time'][lang_id];
	setTimeout(function(){
		if(GetXML.statusText != 'Not Found'){
		    $.when(GetXML).done(function(resultData){
		        shtml +='<div class="overflow_y"><table border="0" width="100%" cellpadding="0" cellspacing="0"><tbody>';
		        // console.log(resultData)
		        if( $(resultData).find("ROW").length > 0 ){

			        $(resultData).find("ROW").each(function() {

			            STATUS = $(this).find('STATUS').text();
			            statusid = $(this).find('STATUSID').text();
						
						FT = $(this).find('FT').text();
						
						csfs = $(this).find('csfs').text();
						sfs = $(this).find('sfs').text();
						
			            fid = $(this).find('FIXTURE_ID').text();
						EV_ID = $(this).find('EV_ID').text();
						
			            first_scorer_info = $(this).find('FIRST_SCORER_INFO').text();
			            update_time = $(this).find('UPDATE_TIME').text();
			            // console.log($(this).find('GAME_DATE').parent().prev().find('GAME_DATE').text())
			            var ev_state='a',
							C = ($(this).attr('c')!=null)?$(this).attr('c'):'-';

						if( ($(this).find('NAME1').text().indexOf("加時")>0 || $(this).find('NAME1').text().indexOf("Extra Time")>0) && ($(this).find('NAME2').text().indexOf("加時")>0 || $(this).find('NAME2').text().indexOf("Extra Time")>0)  ){
							ev_state= "b";
						}
						
						if( ($(this).find('NAME1').text().indexOf("十二碼")>0 || $(this).find('NAME1').text().indexOf("Penalty Shootout")>0) && ($(this).find('NAME2').text().indexOf("十二碼")>0 || $(this).find('NAME2').text().indexOf("Penalty Shootout")>0)  ){
							ev_state= "c";
						}
						corner_fhcs = $(this).find('FHCS').text();
						corner_facs = $(this).find('FACS').text();
						corner_chcs = $(this).find('CHCS').text();
						corner_cacs = $(this).find('CACS').text();


						if(statusid==1 || statusid==15 || statusid==16){
							
							corner_chcs = corner_cacs = '';															
						}
						if (((' ,3,4,5,6,7,8,9,10,11,17, ').indexOf(','+statusid+',')) > 0 && ev_state!='c') {
							//notthing
						}else{
							if(FT==0  ){
							corner_fhcs = corner_facs = '';	
							}
							
						}							
						
						corner_showcorner = $(this).find('SHOWCORNER').text();

			            if( $(this).find('GAME_DATE').parent().prev().find('GAME_DATE').text() != $(this).find('GAME_DATE').text()){
			                shtml +='<tr class="date"><td colspan="9" align="center">'+ GetDateStr( $(this).find('GAME_DATE').text() ) +'</td></tr>';
			            }
			            shtml +='<tr class="styleone">'+ //rowspan =2
			                        '<td '+( (corner_showcorner != 'N' && (corner_chcs != '' || corner_cacs != '' || corner_fhcs != '' || corner_facs != '') )?'rowspan="2"':'' ) +' width="100" style="background-color:#'+ $(this).find('HTML_COLOR').text() +';color:#fff;">'+ $(this).find('TOURNAMENT_NAME').text() +'</td>'+
			                        '<td '+( (corner_showcorner != 'N' && (corner_chcs != '' || corner_cacs != '' || corner_fhcs != '' || corner_facs != '') )?'rowspan="2"':'' ) +' width="60">'+ $(this).find('GAME_TIME').text()+'</td>'+

			                        '<td style="width:30px;">'+ ($(this).find('FST').text()=="1"?'<img src="../images/icons/fst.png" alt="最先入球球隊">':'') +'</td>'+

			                        '<td style="text-align:right;border-left:none;">'+ 
			                        	($(this).find('HOMEREDCARDNUM').text()>0?'<span style="background:red;color:white;">&nbsp;'+$(this).find('HOMEREDCARDNUM').text()+'&nbsp;</span>':'') +' '+
			                            // ($(this).find('HOMEREDCARDNUM').text()>0?'<img src="../data/soccer/images/result/redcard'+$(this).find('HOMEREDCARDNUM').text()+'.gif"/>':'') +' '+
			                            $(this).find('NAME1').text() +
			                        '</td>'+
			                        //'<td width="70">'+ $(this).find('HOME_SCORE').text() +':'+ $(this).find('AWAY_SCORE').text() +'</td>'+
									'<td width="70">'+ ( statusid!=15 && statusid!=16 ?$(this).find('HOME_SCORE').text() +':'+ $(this).find('AWAY_SCORE').text() :'') +'</td>'+
									
									
			                        '<td style="text-align:left;">'+
			                            $(this).find('NAME2').text() +' '+
			                            ($(this).find('AWAYREDCARDNUM').text()>0?'<span style="background:red;color:white;">&nbsp;'+$(this).find('AWAYREDCARDNUM').text()+'&nbsp;</span>':'')+
			                            // ($(this).find('AWAYREDCARDNUM').text()>0?'<img src="../data/soccer/images/result/redcard'+$(this).find('AWAYREDCARDNUM').text()+'.gif"/>':'')+
			                        '</td>'+
			                        '<td style="width:30px;border-left:none;">'+ ($(this).find('FST').text()=="2"?'<img src="../images/icons/fst.png" alt="最先入球球隊">':'') +'</td>';

			            if(statusid != 12 && statusid != 14) { 
			            // console.log(ev_state + $(this).find('NAME1').text() +$(this).find('NAME2').text() ) 
			            shtml +=    '<td>'+ ( $(this).find('SHOWSCORER').text()!=1 || ev_state=='c'?(ev_state=='b'? LangString_OTF : (ev_state=="c"?['十二碼完','十二码完','Penalty Shootout Finished'][lang_id]:STATUS) ):'<a href="javascript:openScorerR('+ fid +')">'+ (ev_state=='b'? LangString_OTF : (ev_state=="c"?['十二碼完','十二码完','Penalty Shootout Finished'][lang_id]:STATUS) )+'</a>' ) +'</td>';
			            } else {
			            shtml +=    '<td></td>';
			            } 

			            if( (statusid == 1|| statusid == 2 || statusid == 13 || statusid == 14 || statusid == 15 ) && !(first_scorer_info) &&  FT==0  && sfs!=15){
			           	shtml +=    '<td></td>';
			            }else{
			            shtml +=    '<td> '+ ( ev_state !='c'  ? ( sfs!=15? Half_txt +' '+ $(this).find('HOME_HALF_SCORE').text() +':'+ $(this).find('AWAY_HALF_SCORE').text():Half_txt+' '+['取消','取消','Cancel'][lang_id]  ) :'')+(first_scorer_info!=''?'<br/>'+['首名入球球員','首名入球球員','First goal player'][lang_id]+':'+first_scorer_info:'')+'</td>';	
			            }
			            shtml +='</tr>';
			            
							
			            if(corner_showcorner != 'N' && (corner_chcs != '' || corner_cacs != '' || corner_fhcs != '' || corner_facs != '') ){ //角球加時
				            shtml +='<tr class="styletwo">' +
				                        // '<td>&nbsp;</td>' +
				                        // '<td>&nbsp;</td>' +
				                        '<td colspan="2">&nbsp;</td>' +
				                        '<td>'+
				                        	((corner_chcs != '' || corner_cacs != '')?'<ul><li class="orange">'+ corner_chcs +'</li><li><img src="../images/icons/jiaoqiu.jpg" alt="角球"></li><li class="blue">'+ corner_cacs +'</li></ul>':'')+
										'</td>'+
				                        '<td colspan="2">&nbsp;</td>' +
				                        '<td>&nbsp;</td>' +
				                        '<td>'+
				                        	((corner_fhcs != '' || corner_facs != '')?(csfs!=15?'<div style="line-height:26px;">'+ Half_txt +' '+ corner_fhcs +' <img src="../images/icons/jiaoqiu.jpg" alt="角球" style="vertical-align: sub;"> '+ corner_facs +'</div>':Half_txt+' '+['取消','取消','Cancel'][lang_id]):'')+
										'</td>'+
				                    '</tr>';
			            }
			        })
				}else{
					shtml += nodataHtml;
				}
		    })
		    shtml +='</tbody></table></div>';
		    $('#msl-livescore-result .cboxWrapper').html(shtml);
		    $('.herder_time').html(['資料只供參考<br>更新於 ','資料只供參考<br>更新於 ','Last Update:<br> '][lang_id]+update_time);

		}else{
			$('#msl-livescore-result .cboxWrapper').html('<table width="100%">'+ nodataHtml +'</table>');
		}
	},500)
}


function GetResult_scoernba(){
	$('.Overlay').show();
	$('#msl-livescore-result').show();
    var livesocer_status = new Array(),
    	update_time = '--/--/-- --:--', 
    	shtml = '<div class="top_preds"><div class="herder_title_nba left"><strong>'+ FinishedMatches +'</strong></div><div class="herder_time right">'+['資料只供參考<br>更新於 ','資料只供參考<br>更新於 ','Last Update:<br> '][lang_id]+' --/--/-- --:--</div></div>';
    var GetXML = GetAjaxXml("../data/nba/xml/scores/"+(lang!='cn'?lang:'ch')+"-score.xml");
    
    shtml +='<div class="overflow_y"><table border="0" width="100%" cellpadding="0" cellspacing="0"><thead><tr>'+
    			'<th rowspan="2" width="80px">'+ ['賽事','賽事','賽事','League'][LangID] +'</th>'+
    			'<th width="60px">'+ LangStringStartTime_1 +'</th>'+
    			'<th width="60px">'+ LangStringBB_HDR_Odds_1 +'</th>'+
    			'<th rowspan="2" width="200px">'+ LangStringTourTeam +'</th>'+
    			'<th rowspan="2" width="100px"> </th>'+
    			'<th colspan="2">'+ LangStringBB_HDR_FH[LangID] +'</th>'+
    			'<th colspan="3">'+ LangStringBB_HDR_SH[LangID] +'</th>'+
    			'<th rowspan="2" width="60px">'+ LangStringBB_HDR_TS[LangID] +'</th>'+
    			'<th width="80px">'+ LangStringBB_HDR_HS_2 +'</th>'+
    		'</tr><tr>'+
    			'<th>'+ LangStringStartTime_2 +'</th>'+
    			'<th>'+ LangStringBB_HDR_Odds_2 +'</th>'+
    			'<th width="80px">'+ LangStringBB_HDR_S1[LangID] +'</th>'+
    			'<th width="80px">'+ LangStringBB_HDR_S2[LangID] +'</th>'+
    			'<th width="80px">'+ LangStringBB_HDR_S3[LangID] +'</th>'+
    			'<th width="80px">'+ LangStringBB_HDR_S4[LangID] +'</th>'+
    			'<th width="80px">'+ LangStringBB_HDR_OT[LangID] +'</th>'+
    			'<th>'+ LangStringFB_HT[LangID] +'</th></tr></thead><tbody>';
    // console.log(GetXML.statusText)
	if(GetXML.statusText != 'Not Found'){			
	    $.when(GetXML).done(function(resultData){
	    	if( $(resultData).find("ROW").length > 0 ){
		        $(resultData).find("ROW").each(function() {
		                    // console.log($(this).find('GAME_DATE').parent().next().find('GAME_DATE').text())
		            if($(this).find('GAME_DATE').parent().prev().find('GAME_DATE').text() != $(this).find('GAME_DATE').text()){
		                shtml +='<tr class="date nba"><td colspan="12" align="center">'+ GetDateStr( $(this).find('GAME_DATE').text() ) +'</td></tr>';
		            }
		            var session_num = $(this).find('SESSION_NO').text() ,
		                statusid = $(this).find('STATUSID').text(),
		                showboxscore = $(this).find('SHOWBOXSCORE').text(),
		                fid = $(this).find('FIXTURE_ID').text(),
		                status = $(this).find('STATUS').text(),
		            	H1 =  $(this).find('H1').text(),
		            	H2 =  $(this).find('H2').text(),
		            	H3 =  $(this).find('H3').text(),
		            	H4 =  $(this).find('H4').text(),
		            	HO =  $(this).find('HO').text(),
		            	A1 =  $(this).find('A1').text(),
		            	A2 =  $(this).find('A2').text(),
		            	A3 =  $(this).find('A3').text(),
		            	A4 =  $(this).find('A4').text(),
		            	AO =  $(this).find('AO').text(),
		            	Hsum =  parseInt( isNaN(parseInt( $(this).find('HSUM').text() ))?'0':$(this).find('HSUM').text() ),
		            	sess2_Hsum = parseInt( isNaN(parseInt( $(this).find('SESS2HOMEHALFSUM').text() ))?'0':$(this).find('SESS2HOMEHALFSUM').text() ),
		            	sess4_Hsum = parseInt( isNaN(parseInt( $(this).find('SESS4HOMEHALFSUM').text() ))?'0':$(this).find('SESS4HOMEHALFSUM').text() ),
		            	Asum =  parseInt( isNaN(parseInt( $(this).find('ASUM').text() ))?'0':$(this).find('ASUM').text() ),
		            	sess2_Asum = parseInt( isNaN(parseInt( $(this).find('SESS2AWAYHALFSUM').text() ))?'0':$(this).find('SESS2AWAYHALFSUM').text() ),
		            	sess4_Asum = parseInt( isNaN(parseInt( $(this).find('SESS4AWAYHALFSUM').text() ))?'0':$(this).find('SESS4AWAYHALFSUM').text() ),
		            	totalpoints = $(this).find('TOTALPOINTS').text(),
		            	totalpoints = (totalpoints=='-1' || totalpoints =='0' || totalpoints == '')?'--':totalpoints,
		            	half_totalpoints = $(this).find('HALF_TOTALPOINTS').text(),
		            	half_totalpoints = (half_totalpoints=='-1' || half_totalpoints =='0' || half_totalpoints == '')?'--':half_totalpoints,
		            	hcap = $(this).find('HCAP').text(),
		            	hcap = (hcap=='-1' || hcap =='0' || hcap == '')?'--':hcap,
		            	half_hcap = $(this).find('HALF_HCAP').text(),
		            	half_hcap = (half_hcap=='-1' || half_hcap =='0' || half_hcap == '')?'--':half_hcap;
		            	update_time = $(this).find('UPDATE_TIME').text();
		            // var num_1 = (show_type==2)?'2':'1',
		            // 	num_2 = (show_type==2)?'1':'2';	
					
					
					
		            shtml +='<tr class="styleone">'+
		                        '<td rowspan="2" style="background-color:#'+ $(this).find('HTML_COLOR').text() +';color:#fff;">'+ $(this).find('TOURNAMENT_NAME').text() +'</td>'+
		                        '<td rowspan="2">'+ $(this).find('GAME_TIME').text() +'</td>'+
		                        //'<td>'+( (half_totalpoints!='--' && totalpoints!='--')?half_totalpoints +'/'+ totalpoints:'--/--' )+'</td>'+
								'<td>'+( half_totalpoints +'/'+ totalpoints )+'</td>'+
		                        '<td>'+ [$(this).find('NAME2').text(),$(this).find('NAME2').text(),$(this).find('EN_NAME2').text()][lang_id] +'</td>'+
		                        '<td rowspan="2">';
		            // if(statusid <= 29){            
		            // shtml +=    '<a href="javascript:openPopupDetails(\'../../../data/nba/html/result/bestplayer/sc-bestplayer-'+ fid +'.html\', 780, 540, \'scrollbars=yes\', \'BestPlayer\')">'+ status +'</a></td>';
		            // }else 
		            if(statusid >= 30 && statusid <= 31 && showboxscore ==1){
		            shtml +=    '<a href="javascript:openScorer_BB('+ fid+')">'+ status +'</a></td>';
		            }else{
		            shtml +=    status +'</td>';	
		            }
		            if(session_num == 4){    
		            shtml +=    '<td>'+ A1 +'</td>'+
		                        '<td>'+ A2 +'</td>'+
		                        '<td>'+ A3 +'</td>'+
		                        '<td>'+ A4 +'</td>'+
		                        '<td>'+ AO +'</td>';
		            }else{
		            shtml +=    '<td colspan="2">'+ A1 +'</td>'+'<td colspan="3">'+ A2 +'</td>';        	
		            }
		            shtml +=    '<td><span style="color:#'+ (parseInt($(this).find('ASUM').text())>parseInt($(this).find('HSUM').text())?'ff0000':'0046ff' ) +'">'+ $(this).find('ASUM').text() +'</span></td>'+
		            		    '<td>';
		            if(session_num==2){           
		            shtml +=    (statusid>=3)? (statusid==30 || statusid==31)?sess2_Asum+'/'+(Asum-sess2_Asum):sess2_Asum :'';
		            }else {
		            shtml +=    (statusid>=5)? (statusid==30 || statusid==31)?sess4_Asum+'/'+(Asum-sess4_Asum):sess4_Asum :'';	
		            }			
		            shtml +=	'</td>'+
		                    '</tr><tr class="styletwo">' +
		                        //'<td>'+( (half_hcap!='--' && hcap!='--')?half_hcap +'/'+ hcap:'--/--' )+'</td>'+
								'<td>'+( half_hcap +'/'+ hcap )+'</td>'+
		                        '<td>'+ [$(this).find('NAME1').text(),$(this).find('NAME1').text(),$(this).find('EN_NAME1').text()][lang_id] +'</td>';
		            		if(session_num == 4){    
		            shtml +=    '<td>'+ H1 +'</td>'+
		                        '<td>'+ H2 +'</td>'+
		                        '<td>'+ H3 +'</td>'+
		                        '<td>'+ H4 +'</td>'+
		                        '<td>'+ HO +'</td>';
		                    }else{
		            shtml +=    '<td colspan="2">'+ H1 +'</td>'+'<td colspan="3">'+ H2 +'</td>';        	
		                    }
		            shtml +=    '<td><span style="color:#'+ (parseInt($(this).find('HSUM').text())>parseInt($(this).find('ASUM').text())?'ff0000':'0046ff' ) +'">'+ $(this).find('HSUM').text() +'</span></td>'+
		                        '<td>';
		            if(session_num==2){           
		            shtml +=    (statusid>=3)?( (statusid==30 || statusid==31)?sess2_Hsum+'/'+(Hsum-sess2_Hsum):sess2_Hsum ):'';
		            }else {
		            shtml +=    (statusid>=5)?( (statusid==30 || statusid==31)?sess4_Hsum+'/'+(Hsum-sess4_Hsum):sess4_Hsum ):'';	
		            }	   
		            shtml +=	'</td>'+         
		                    '</tr>';
		        })
			}else{
				shtml += nodataHtml;
			}
	    })
	    shtml +='</tbody></table></div>';
	    $('#msl-livescore-result .cboxWrapper').html(shtml);
	    $('.herder_time').html(['資料只供參考<br>更新於 ','資料只供參考<br>更新於 ','Last Update:<br> '][lang_id]+update_time);
	}else{
		$('#msl-livescore-result .cboxWrapper').html(nodataHtml + shtml +'</table>');
	}

   
} 
function openScorerR(id) {
        var w;
        w = window.open('../page/soccer/livescore/player-scorer.html?result=1&id='+ id +'&lang='+lang+'&nocache=' + ('' + (new Date())).replace(/ /g, ''), 'MSSoccerScorer', 'width=1000,height=400,scrollbars=yes,resizable=yes');
        w.focus();
}
function openScorer(id) {
        var w;
        w = window.open('../page/soccer/livescore/player-scorer.html?id='+ id +'&lang='+lang+'&nocache=' + ('' + (new Date())).replace(/ /g, ''), 'MSSoccerScorer', 'width=1000,height=400,scrollbars=yes,resizable=yes');
        w.focus();
}
function openScorer_BB(id) {
        var w;
        w = window.open('../page/nba/livescore/boxscore.html?sport='+show_type+'&lang='+lang+'&event_id='+id+'&nocache=' + ('' + (new Date())).replace(/ /g, ''), 'MSSoccerScorer', 'width=1100,height=800,scrollbars=yes,resizable=yes');
        w.focus();
}