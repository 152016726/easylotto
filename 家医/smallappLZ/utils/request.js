/**
 * 接口域名：domain
 * webview跳转域名：webDomain
 */
const domain = "https://zqceshi.jiankang120.com.cn/web/dev/api";//开发环境
//const domain = "https://zqceshi.jiankang120.com.cn/web/test/api";//测试环境
//const domain = "https://cda.heyuht.com/api";//正式环境
const webDomain = "https://zqceshi.jiankang120.com.cn";//测试环境
//const webDomain = "https://zqhomedoc.heyuht.com";//正式环境

const request = body => {
  var token = wx.getStorageSync('token');
  var orgData = wx.getStorageSync('orgData');
  var myData = body.data;
  if (token != '' && typeof (token) != 'undefined') {
    body.header.token = token;
  }

  if (body.url != '/user/miniAppLogin') {
    if (myData != '' && typeof (myData) != 'undefined') {
      if (myData.params) {
        myData.params.orgId = orgData.orgId;
      } else if(myData.news) {
        myData.news.orgId = orgData.orgId;
      }
    }
  } else {
    myData.params.orgId = '100002';
  }
  if (body.method == "post" || body.method == "POST") {
    myData = json2Form(myData);
  }
  //console.log(myData)
  wx.request({
    url: domain + body.url,
    data: myData,
    method: body.method,
    header: body.header,
    success: function (res) {
      if (res.statusCode == 200) {
        return typeof body.success == "function" && body.success(res.data);
      }
      if (res.statusCode == 403) {
        
      }
    },
    fail: function () {
      return typeof body.fail == "function" && body.fail();
    },
    complete: function () {
      return typeof body.complete == "function" && body.complete();
    }
  })
}
const json2Form = json => {
  var str = [];
  for (var p in json) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
  }
  return str.join("&");
}
module.exports = {
  request: request,
  json2Form: json2Form,
  domain: domain,
  webDomain: webDomain
}