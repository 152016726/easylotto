/**
 * 页面操作栏，包含触发按钮等内容
 * Created by DDT on 2019/04/11.
 */
import template from './index.template';
import Vue from 'vue';
import {mapState} from 'vuex';
import './index.scss';
import 'components/iconButton';
import lang from './lang';
import {getLangMixin} from '#/mixin/langMixin';

let topBar = Vue.component('top-bar', {
    mixins: [getLangMixin(lang)],
    template: template,
    data() {
        return {}
    },
    computed: mapState([
        'arrTournament'
    ]),
    methods: {
        clickHandle() {
            console.log('click');
        },
        /**
         * 显示时间表
         */
        handleShowSchedule() {
            let url = 'http://10.200.4.232:88/content/soccer/payoutSchedule.html';
            parent.window.popup(url)
        }
    }
});

export default topBar;
