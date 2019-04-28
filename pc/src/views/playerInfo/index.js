/**
 * Created by owen on 2019/4/18s.
 */

require('./index.scss');
require('common/js/init');
import './info'
import Vue from "vue";
import urlParamsMgr from "#/tools/urlParamsMgr.js";
import lang from './lang';
import {getLangMixin} from '#/mixin/langMixin'

// 初始化vue内容
new Vue({
    mixins: [getLangMixin(lang)],
    el: '#root',
    data: {
        playerId: ""
    },
    created(){
        this.playerId = urlParamsMgr.getQueryString("playerId");
    }
});