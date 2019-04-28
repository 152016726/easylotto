/**
 * 页面操作栏，包含触发按钮等内容
 * Created by DDT on 2019/04/11.
 */
import template from './index.template';
import Vue from 'vue';
import {mapState} from 'vuex';
import lang from './lang';
import {getLangMixin} from '#/mixin/langMixin';
import './index.scss';
import 'components/iconButton';
import 'components/leagueSelect';
import '../matchMessageBox';
import '../settingsMenu';

let topBar = Vue.component('top-bar', {
    mixins: [getLangMixin(lang)],
    template: template,
    data() {
        return {
            toggleSettingsMenu: true        //是否显示功能设定菜单
        }
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
        handleShowSchedule(){
             let url = 'http://10.200.4.232:88/content/soccer/payoutSchedule.html';
            parent.window.popup(url)
        },
        /**
         * 显示赛果列表
         */
        resultClick(){
            parent.window.popup('/matchResult.html');
        },
        /**
         * 显示隐藏功能设定菜单
         */
        toggleSettingsMenuFn() {
            this.toggleSettingsMenu = !this.toggleSettingsMenu;
        }
    }
});

export default topBar;
