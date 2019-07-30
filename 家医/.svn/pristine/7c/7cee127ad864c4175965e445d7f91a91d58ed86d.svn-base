//const domain = "https://zqceshi.jiankang120.com.cn/web/dev/api";
//const domain = "https://zqceshi.jiankang120.com.cn/web/test/api";
const domain = "https://cda.heyuht.com/api";

const request = body => {
  var token = wx.getStorageSync('token');
  var orgId = wx.getStorageSync('orgId');
  var myData = body.data;
  if (token != '' && typeof (token) != 'undefined') {
    body.header.token = token;
  }

  if (body.url != '/user/miniAppLogin') {
    if (myData != '' && typeof (myData) != 'undefined') {
      if (myData.params) {
        myData.params.orgId = orgId;
      } else if (myData.news) {
        myData.news.orgId = orgId;
      }
    }
  } else {
    myData.params.orgId = '773745954466103298';
    
  }
  if (body.method == "post" || body.method == "POST") {
    myData = json2Form(myData);
  }
  console.log(myData)
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
        //wx.clearStorage();
        //var id = setTimeout(function(){
        /*wx.redirectTo({
          url: '/pages/info/editinfo/editinfo',
        success: function(res){
          console.log("redirectTo:成功，"+res);
        },
        fail: function() {
          console.log("redirectTo:失败，");
        },
        complete: function() {
          console.log("redirectTo:完成，");
        }
      })//}, 1500);*/

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
  json2Form: json2Form
}