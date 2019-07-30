//var domain = "https://zqceshi.jiankang120.com.cn/web/dev/api";
var domain = "https://zqceshi.jiankang120.com.cn/web/test/api";
function request(body){
    var token = wx.getStorageSync('token');
    if(token != '' && typeof(token) != 'undefined'){
      body.header.token = token;
    }
    if(body.method == "post" || body.method == "POST"){
      body.data = json2Form(body.data);
    }
    wx.request({
      url: domain+body.url,
      data: body.data,
      method: body.method,
      header: body.header,
      success: function(res){
        if(res.statusCode == 200){
          return typeof body.success == "function" && body.success(res.data);
        }
        if(res.statusCode == 403){
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
      fail: function() {
        return typeof body.fail == "function" && body.fail();
      },
      complete: function() {
        return typeof body.complete == "function" && body.complete();
      }
    })
}
function json2Form(json) {  
    var str = [];  
    for(var p in json){  
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));  
    }  
    return str.join("&");  
}  
module.exports = {
    request : request,
    json2Form: json2Form
}