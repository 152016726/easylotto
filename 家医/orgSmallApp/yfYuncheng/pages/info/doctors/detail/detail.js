//获取应用实例
const app = getApp()
Page({
  data: {
    teamMember:[],
  },
  onLoad: function (options) {
    var _this=this;
    _this.setData({
      teamId:options.teamId
    });
    //获取团队成员信息
    _this.getTeamMenber();
  },
  //获取团队成员信息
  getTeamMenber:function(){
    var _this=this;
    var params={
      params:{
        //"teamId":_this.data.teamId,//团队id
        "status": "1"
      }
    };
    if(_this.data.teamId){params.params.teamId=_this.data.teamId}
    app.request({
      url:"/familyTeamMember/selectByteam",
      header:{
        'content-type': 'application/json'
      },
      method:"GET",
      data:params,
      success:function(res){
        console.log(res)
        if(res.code==1){
          if(res.data.length>0){
            var teamMember = res.data;
            var leader = [],member = [];
            for (var i = 0; i < teamMember.length;i++) {
              if (teamMember[i].teamTitle == 1){
                leader.push(teamMember[i])
              } else {
                member.push(teamMember[i]);
              }
            }
            _this.setData({
              teamMember: res.data,
              leader: leader,
              member: member
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
});