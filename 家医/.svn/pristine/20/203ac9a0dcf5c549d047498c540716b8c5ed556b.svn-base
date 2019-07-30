//mine.js
//获取应用实例
const app = getApp()

Page({
    data: {
        userInfo:{},
        memberList: [],
        otherMemberList:[],
        selfList:[]
    },
    onLoad: function () {
      var _this = this;
      wx.getSystemInfo({
        success: function (res) {
          _this.setData({
            height: res.windowHeight - 20
          })
          console.log(res.windowHeight)
        }
      })
    },
    onShow: function () {
        var _this=this;
        wx.getStorage({
          key: 'userInfo',//获取用户信息
          success: function(res){
              _this.setData({
                  userInfo:res.data
              });
              if(res.data.id){
                  //获取列表数据
                  _this.getMemberList()
              }else{
                  wx.navigateTo({
                    url: '../../editinfo/editinfo'//注册用户页面
                  })
              }
          }
        });
    },

    navAdd: function () {
        wx.navigateTo({
            url: '../add/add',
        })
    },
    getMemberList:function(){
        var _this=this;
        _this.setData({
            noShowMyself:""//不显示本人时可用1，显示时false或""
        });
        var params={
            familyUserMember: {
                "userId": _this.data.userInfo.id,
                "status": "1",
                "noMyself":_this.data.noShowMyself//不显示本人时可用1,显示时false或""
            }
        };
        app.request({
            url:"/familyUserMember/selectList",
            header:{
                'content-type': 'application/json'
            },
            method:"GET",
            data:params,
            success:function(res){
              console.log(res)
                if(res.code==1){
                    if(res.data.length>0){
                        var memberList=[],otherMemberList=[],selfList=[];
                        var memberList=res.data;
                        for(var i=0;i<memberList.length;i++){
                            if(memberList[i].dicName == "本人"){
                                selfList.push(memberList[i])
                            }else{
                                otherMemberList.push(memberList[i])
                            }
                        }
                        _this.setData({
                            memberList:res.data,
                            selfList:selfList,
                            otherMemberList:otherMemberList,
                        });

                    }
                }else{
                    wx.showToast({
                        title: res.message,
                        icon:'none',
                        duration:2000
                    })
                }
            }
        })
    }
})
