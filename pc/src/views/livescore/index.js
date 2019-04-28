/**
 * Created by DDT on 2019/4/9.
 */
import 'common/js/init';
import './index.scss';
import Vue from "vue";
import store from './store';
import './topBar';
import './matchList';
import '#/components/scrollFixedBox'
import lang from './lang';
import {getLangMixin} from '#/mixin/langMixin';

// 初始化vue内容
new Vue({
    el: '#main_container',
    mixins: [getLangMixin(lang)],
    store
});