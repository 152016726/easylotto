/**
 * Created by oWEn on 2019/4/11.
 */
import Vue from "vue"
import './index.scss'
import tpl from './index.template'
import 'components/commonDialog'
import pushManager from "#/pushManager"
import pushMethod from "#/config/pushMethod"

let vm = Vue.component('match-message', {
    template: tpl,
    data: function () {
        return {
            haveMsgNoRead: false,
            msgList: []
        }
    },
    mounted: function () {
        //TODO
        let matchId = 45814;
        let test = pushManager.on(`${pushMethod.eventInfoUpdate.key}_${matchId}`, this.pushMatchMsg);
    },
    methods: {
        pushMatchMsg(data){
            this.haveMsgNoRead = true;
            this.msgList = this.msgList.push(data)
        },
        showMsg() {
            this.$refs.dialog.open();
            this.haveMsgNoRead = false;
        }
    }
});
export default vm;
