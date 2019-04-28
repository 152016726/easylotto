/**
 * Created by owen on 2019/4/18s.
 */

require('./index.scss');
require('common/js/init');
import './timeAxis'
import Vue from "vue";
import urlParamsMgr from "#/tools/urlParamsMgr.js";

// 初始化vue内容
new Vue({
    el: '#root',
    data: {
        title: "",
        params: {
            matchId: "",
            awayId: "",
            awayName: "",
            homeId: "",
            homeName: ""
        }
    },
    created(){
        this.title = urlParamsMgr.getQueryString("title");
        this.params.matchId = urlParamsMgr.getQueryString("matchId");
        this.params.awayId = urlParamsMgr.getQueryString("awayId");
        this.params.awayName = urlParamsMgr.getQueryString("awayName");
        this.params.homeId = urlParamsMgr.getQueryString("homeId");
        this.params.homeName = urlParamsMgr.getQueryString("homeName");
    }
});