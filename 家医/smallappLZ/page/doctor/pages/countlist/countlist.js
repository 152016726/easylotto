//countlist.js
//获取应用实例
const app = getApp()
Page({
	data: {
		userInfo:{},
		scroll: {
	        ifNull: true,
	        loadText: '加载中...',
	        pageNum: 1,
	        nullText: '暂无数据'
	    },
	    height: 0,
	    countList:[],
	    orgId:"",
	    teamId:"",
	},
	onLoad: function (options) {
		var _this=this;
        this.setData({
            orgId: options.orgId,
            teamId: options.teamId
        })
        _this.getCountList(_this.data.scroll.pageNum);
		wx.getSystemInfo({
			success: function (res) {
				_this.setData({
					height: res.windowHeight-49
				})
			}
		})
	},
	//下拉刷新
	upper: function (e) {
		var _this = this;
		wx.showToast({
			title: '数据刷新中',
			icon: 'loading',
			duration: 10000,
			mask: true
		})
		_this.setData({
			countList: [],
			scroll: {
				pageNum: 1  //滚动的页数回到第一页
			}
		})
		_this.getCountList(1); //刷新回到第一页
	},
	//上拉加载
	lower: function (e) {
	  	var _this = this;
	  	var pageNo = _this.data.scroll.pageNum;
	  	_this.getCountList(pageNo);
	},
	getDay:function(){
        var pageSize = 15;
        var pageNo = this.data.scroll.pageNum;
        //获取当前日期
        var curDay = new Date();
        var newStartDate = new Date(curDay.getTime() - 1000*3600*24*(pageNo*pageSize));
        var startDate = newStartDate.getFullYear() + '-'+((newStartDate.getMonth()+1)>9?(newStartDate.getMonth()+1):('0'+(newStartDate.getMonth()+1)))+'-'+(newStartDate.getDate()>9?newStartDate.getDate():('0'+newStartDate.getDate()));
        var newEndDate = new Date(curDay.getTime() - 1000*3600*24*((pageNo-1)*pageSize+1));
        var endDate = newEndDate.getFullYear() + '-'+((newEndDate.getMonth()+1)>9?(newEndDate.getMonth()+1):('0'+(newEndDate.getMonth()+1)))+'-'+((newEndDate.getDate()>9?newEndDate.getDate():('0'+newEndDate.getDate())));
        return {
            startDate:startDate,
            endDate:endDate
        }
    },
	getCountList: function (current) {
		var _this=this;
		var countList = _this.data.countList;
        var interceptDate = _this.getDay();
        var params={
            params:{
                "orgId":_this.data.orgId,
                "teamId":_this.data.teamId,
                "startDate": interceptDate.startDate,
                "endDate":interceptDate.endDate,
            }
        };
        params.pageNo = current;
		if (params.pageNo) {
			app.request({
				url: '/doctor/familyUserSignMember/countOrgTeamMember',
				header: {
					'content-type': 'application/json'
				},
				method: "Get",
				data: params,
				success: function (res) {
					if (res.code == 1) {
						if(res.data.length>0){
							var listData = res.data;
							var signCountArr=[];
							for(var i =0; i < listData.length; i++){
								var signCount=new Object(); 
								signCount.signDate=listData[i].signDate.substring(2,10);
								signCount.orgTotal=listData[i].orgTotal;
	                            signCount.teamTotal=listData[i].teamTotal;
	                            signCountArr.push(signCount)
	                        }
							_this.setData({
								countList: countList.concat(signCountArr),
								scroll: {
									pageNum: current + 1,
									ifNull: false
								},
							})
						}else {
							if (res.pageNo == 1) {
								_this.setData({
									scroll: {
										ifNull: true,
										nullText: '暂无数据'
									}
								})
							} else {
								_this.setData({
									scroll: {
										ifNull: false,
										loadText: '加载完毕'
									}
								})
							}
						}
						wx.hideToast();
					}else {
						wx.showToast({
							title:res.message,
							icon:'none',
							duration:2000
						})
					}
				}
			})
		}
	}
})
 