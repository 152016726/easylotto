// let noDataNames = new Array("今天没有赛事","今天沒有賽事","THERE IS NO EVENT TODAY");
let langIndex = 0;
let noDataNames = new Array("暂无现场比数相关资料","暫無現場比數相關資料","NO DATAS!");
let disclaimers = new Array("注：现场资讯仅供参考，www.macauslot.com及澳门彩票有限公司有权但不承担更正任何资讯错误、滞后或疏失之义务。由此所产生之任何直接、间接、附带或因而导致之损失，www.macauslot.com及澳门彩票有限公司概不负责。 ",
							"註：現場資訊僅供參考，www.macauslot.com及澳門彩票有限公司有權但不承擔更正任何資訊錯誤、滯後或疏失之義務。由此所產生之任何直接、間接、附帶或因而導致之損失，www.macauslot.com及澳門彩票有限公司概不負責。 ",
							"Note: All details shown are for reference only");
let noDataName = noDataNames[langIndex];
let disclaimer = disclaimers[langIndex];
let nocache;
nocache = new Date();

$(function(){
    $("#disclaimer").html(disclaimer);
});

