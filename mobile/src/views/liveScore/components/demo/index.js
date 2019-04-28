/**
 * Author: hezhiwei
 * Create Time: 2019-04-12 11:24
 * Description:
 */

import temp from "./index.template";
import "./index.scss";
import Vue from "vue";
import pushMgr from "#/pushManager";
import globalConfig from "common/js/globalConfig";

let a ;
function cc(data){
    console.log(this, data, "fejafjesaj");
}
function bb() {
    console.log(1, "hehe");
}

let demo = Vue.component('component-demo', {
    template: temp,
    data(){
        return {
            demoStr: "我是實例組件",
        };
    },
    methods: {
        demoClick(){
            console.log("jfajefoajfoeao");
        }
    },
    created: function () {
        let matchId = 5;

        a = cc.bind(this);
        let test = pushMgr.on(`${globalConfig.eventKey.eventInfoUpdate.key}_${matchId}`, a);
        // off 1
        // pushMgr.off(`${globalConfig.eventKey.eventInfoUpdate.key}_${matchId}`, a);
        // off 2
        // test();

        // 重连
        pushMgr.onReconn(a);
        pushMgr.onReconn(bb);
        pushMgr.offReconn();
    }
});

export default demo;
