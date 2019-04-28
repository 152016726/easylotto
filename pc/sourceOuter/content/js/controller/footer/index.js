/**
* Created by beate on 2017/10/17
* Copyright 2017 www.macauslot.com
* Footer of the website
**/
var change_lang_id = [1,2,3];
var  alc = "'澳彩概不接受未滿18歲人仕博彩。\\n\\n澳彩為本地提供球類博彩服務之合法機構，參與境內非法賭博屬嚴重罪行，切勿以身試法，如有發現，請致電司法警察局博彩罪案舉報專線:2833 0099。\\n\\n澳彩提倡健康博彩娛樂，若遇有情緒問題及異常行為，可致電逸安社 2821 0033 求助。'";

var  getFullYear = new Date().getFullYear();
var  com_str_en = "Copyright © "+ getFullYear +" Sociedade de Lotarias e Apostas Mutuas de Macau, Lda. All rights reserved.";
var  com_str = "版權所有©"+ getFullYear +"澳門彩票有限公司";


var  alc_e = "'Any person under the age of 18 shall not be allowed to bet in SLOT.\\n\\nSLOT is the legal operator in Macao offering sports betting services. Being involved in illegal gambling is a serious crime and please do not defy the law. Please contact DIPJ at 28330099 for any findings on gaming-related crimes.\\n\\nSLOT advocates responsible gambling. Please call Yat On Center at 2821 0033 for help if there is any emotional problems or abnormal behaviors occur.'";

var Fhtml ='<div class="'+ball_type[show_type]+'_to-top_bgcolor to-top">'+
                '<p>'+ ['回到頁頂', '回到页顶', 'Back to top'][lang_id] +'</p>'+
                '<span></span>'+
            '</div>'+
            '<div class="footer-wrapper">'+
                '<div  style="'+(lang=='en'?'text-align:left;padding: 3em;':'text-align: center')+'" class="footer-nav"> '+              
                    '<div class="footer-nav-con">'+
                        '<ul>'+
                            '<li style="'+(lang=='en'?'width: 47%;':'')+'">'+
                                '<p><a href="javascript:openPopup(\'hr/Company_info.php\',1100,600);">'+ ['公司資訊', '公司资讯', 'Company Information'][lang_id] +'</a></p>'+
                                '<p><a href="javascript:openPopup(\'slot/html/new/statement/'+(lang=='en'?'en_':'')+'statement.html\',1000,600);">'+ ['公司聲明', '公司声明', 'Company Statement & Disclaimer'][lang_id] +'</a></p>'+
                                '<p><a href="javascript:openPopup(\'slot/html/new/contact_us/'+((lang=='en'?'en_':''))+'contact_us.html\',1000,600);">'+ ['聯絡我們', '联络我们', 'Contact Us'][lang_id] +'</a></p>'+
                            '</li>'+

                            '<li style="'+(lang=='en'?'width: 18%;':'')+'">'+
                                '<p><a href="javascript:openPopup(\'hr/hr_top_m1.php\',1100,600);">'+ ['招聘人才', '招聘人才', ''][lang_id] +'</a></p>'+
                                '<p><a href="javascript:openPopup(\'slot/jsp/feedback/feedback.jsp?langid='+change_lang_id[lang_id]+'\',900,600);">'+ ['反映意見', '反映意见', 'Feedback'][lang_id] +'</a></p>';
                               // '<p><a href="javascript:openPopup(\'slot/html/statement2.html\',1000,600);">'+ ['免責聲明', '免责声明', 'Disclaimer'][lang_id] +'</a></p>'+
// 							   '<p><a href="javascript:openPopup(\'slot/html/friendship/partnership.html\',900,600);">'+ ['合作夥伴', '合作伙伴', 'Partners'][lang_id] +'</a></p>';
							   if(lang=='en'){
							    Fhtml+='<p><a href="javascript:openPopup(\'slot/html/new/corprofile/faq/faq_en.html\',900,600);">'+ ['常見問題', '常见问题', 'FAQ'][lang_id] +'</a></p>';   
							   }
							 
                            Fhtml+='</li>'+

                            '<li style="'+(lang=='en'?'width: 28%;border-right: 0px solid':'border-right: 0px solid')+'" >'+
							'<p><a href="javascript:openPopup(\'Engapp/index.html?lang='+(lang=='sc'?'sc':lang=='en'?'eng':'cn')+'\',1024,768)">'+['工具下載','工具下载','Free App Download'][lang_id]+'</a></p>';
                              //  '<p><a href="javascript:openPopup(\'slot/html/sitemap/sitemap.html\',900,600);">'+ ['網頁指南', '网页指南', 'Site Map'][lang_id] +'</a></p>'+
							    if(lang!='en'){
                              Fhtml+= '<p><a href="javascript:openPopup(\'slot/html/new/corprofile/faq/faq.html\',900,600);">'+ ['常見問題', '常见问题', 'FAQ'][lang_id] +'</a></p>';
								}
                                //'<p><a href="javascript:openPopup(\'slot/html/friendship/partnership.html\',900,600);">'+ ['合作夥伴', '合作伙伴', 'Partner'][lang_id] +'</a></p>'+
                             Fhtml+='</li>'+

                          /*   '<li>'+
                                '<p><a href="javascript:openPopup(\'https://www.we-slot.com/promotion.html\',900,600)">'+ ['推廣活動', '推广活动', 'Promotion activity'][lang_id] +'</a></p>'+
                                '<p><a href="h'+'t'+'t'+'ps'+':'+'/'+'/ww'+'w.'+'ma'+'cau-sl'+'ot.com/content/soccer/CashDeposit.html"  target="_blank">'+ ['存款提款', '存款提款', 'Deposit/Withdrawal'][lang_id] +'</a></p>'+
                                '<p><a href="javascript:openPopup(\'slot/html/corprofile/timepaid/timepaid.html\',900,600)">'+ ['派彩時間', '派彩时间', ''][lang_id] +'</a></p>'+
                            '</li>'+ */
                            //'<li><p><a href="javascript:openPopup(\'Engapp/index.html?lang='+(lang=='sc'?'sc':lang=='en'?'eng':'cn')+'\',1024,768)">'+['工具下載','工具下载','Download Tool'][lang_id]+'</a></p></li>'+
                            //  '<li>'+
                            //     '<p><a href="https://www.mslot-test.com/content/soccer/company.html" target="_blank">'+ ['公司資訊', '公司资讯', 'Company Information'][lang_id] +'</a></p>'+
                            //     '<p><a href="javascript:openPopup(\'/slot/html/statement.html\',1000,600);">'+ ['公司聲明', '公司声明', '公司聲明'][lang_id] +'</a></p>'+
                            //     '<p><a href="https://www.mslot-test.com/content/soccer/contact_us.html" target="_blank">'+ ['聯絡我們', '联络我们', 'Contact Us'][lang_id] +'</a></p>'+
                            // '</li>'+

                            // '<li>'+
                            //     '<p><a href="javascript:openPopup(\'/hr/hr_top_m1.php\',900,600);">'+ ['招聘人才', '招聘人才', 'Recruit Talent'][lang_id] +'</a></p>'+
                            //     '<p><a href="javascript:openPopup(\'/slot/jsp/feedback/feedback.jsp\',900,600);">'+ ['反映意見', '反映意见', 'Reflect the views'][lang_id] +'</a></p>'+
                            //     '<p><a href="javascript:openPopup(\'/slot/html/statement2.html\',900,600);">'+ ['免責聲明', '免责声明', 'Disclaimer'][lang_id] +'</a></p>'+
                            // '</li>'+

                            // '<li>'+
                            //     '<p><a href="javascript:openPopup(\'/slot/html/sitemap/sitemap.html\',900,600);">'+ ['網頁指南', '网页指南', 'Site Map'][lang_id] +'</a></p>'+
                            //     '<p><a href="javascript:openPopup(\'/slot/html/corprofile/faq/faq.html\',900,600);">'+ ['常見問題', '常见问题', 'FAQ'][lang_id] +'</a></p>'+
                            //     '<p><a href="javascript:openPopup(\'/slot/html/friendship/partnership.html\',900,600);">'+ ['合作夥伴', '合作伙伴', 'Partner'][lang_id] +'</a></p>'+
                            // '</li>'+

                            // '<li>'+
                            //     '<p><a href="javascript:openPopup(\'https://www.we-slot.com/promotion.html\',900,600)">'+ ['推廣活動', '推广活动', 'Promotion activity'][lang_id] +'</a></p>'+
                            //     '<p><a href="https://www.mslot-test.com/content/soccer/CashDeposit.html"  target="_blank">'+ ['存款提款', '存款提款', 'Deposit/Withdrawal'][lang_id] +'</a></p>'+
                            //     '<p><a href="javascript:openPopup(\'/slot/html/corprofile/timepaid/timepaid.html\',900,600)">'+ ['派彩時間', '派彩时间', ''][lang_id] +'</a></p>'+
                            // '</li>'+
                        '</ul>'+
                    '</div>'+
                '</div>'+
                '<div class="copyright">'+
				'<table width="100%" style="padding: 0px 0px 0px 0px; border 0px 0px 0px 0px; margin: 0px 0px 0px 0px; -webkit-border-horizontal-spacing: 0px; -webkit-border-vertical-spacing: 0px;"><tbody><tr><td align="right" id="copyright"><a href="http://www.miitbeian.gov.cn" target="_blank">粤ICP备13062347号-1</a><br>'+(lang=='en'?com_str_en:com_str)+'</td><td align="right" width="35" id="illegal"><img src="/slot/images/illegal/18_1.png" width="30px" border="0" onclick="alert('+(lang_id==2?alc_e:alc)+')" ></td></tr></tbody></table>'+
				/* '<div style="float:left">'+
                    '<p><a href="h'+'t'+'tp'+':/'+'/w'+'ww.'+'miitbeian.gov.cn" target="_blank">粤ICP备13062347号-1</a></p>'+

                    '<span>'+ ['版權所有©'+ getFullYear +'澳門彩票有限公司', '版权所有©'+ getFullYear +'澳门彩票有限公司', 'Copyright ©'+ getFullYear +' Sociedade de Lotarias e Apostas Mutuas de Macau, Lda. All rights reserved.'][lang_id] +'</span>'+
                '</div>'+
				   '<div style="float:left">'+				
                    '<p> <a href="#" onclick="alert(\'澳彩概不接受未滿18歲人仕博彩。\n\n澳彩為本地提供球類博彩服務之合法機構，參與境內非法賭博屬嚴重罪行，切勿以身試法，如有發現，請致電司法警察局博彩罪案舉報專線:2833 0099。\n\n澳彩提倡健康博彩娛樂，若遇有情緒問題及異常行為，可致電逸安社 2821 0033 求助。\')"><img src="/slot/images/illegal/18_1.png" width="30px" border="0"></a></p>'+
					'<span></span>'+
                '</div>'+ */
            '</div>';
$('#footer').html(Fhtml);
// console.log( ( Number((document.documentElement||document.body).clientHeight) - Number(window.screen.height) )/2  )
// alert( (document.documentElement||document.body).clientHeight  )
if(window.devicePixelRatio < 2.1 && window.screen.height > 760 && window.screen.height < 1023){
    $("#main_container").css({'min-height': (document.documentElement||document.body).clientHeight+ ( Number((document.documentElement||document.body).clientHeight) - Number(window.screen.height) )/2 })  
}
$("#inside_sidebar").height($("#main_container").height()) 