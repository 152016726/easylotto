/**
 * Created by DDT on 2019/4/9.
 */

import 'common/js/init';
import './index.scss';
import Vue from "vue";
import store from './store';
import './topBar';
import '#/components/scrollFixedBox';
import './agenda';
import 'components/datePlugin';
import lang from './lang';
import {getLangMixin} from '#/mixin/langMixin';
import {getAdvertisementList} from "#/dataCenter/advertisement";

// 初始化vue内容
new Vue({
    el: '#main_container',
    mixins: [getLangMixin(lang)],
    data: {
        adList: []
    },
    methods: {
        gotoAd(url){
            window.open(url);
        }
    },
    created(){
        getAdvertisementList().then((list) => {
            this.adList = list;
            console.log(list);
        })

    },
    store
});