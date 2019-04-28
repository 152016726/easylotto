/**
 * 头部功能导航
 * Created by easyLottoMac_Feng on 2019/4/16.
 */

import './index.scss';
import Vue from 'vue';
import template from './index.template';
import '../components/leagueSelect';
import '../components/datePlugin';
import {mapState} from 'vuex';
import lang from './lang';
import {getLangMixin} from '#/mixin/langMixin';
import '../components/matchMsg'

let topBar = Vue.component('top-bar-view', {
    mixins: [getLangMixin(lang)],
    data() {
        return {}
    },
    template,
    created() {
    },
    computed: mapState([
        'arrTournament'
    ]),
    methods: {
        /**
         * 重设按钮事件
         */
        resetBtnHandle() {
            console.log('重设按钮');
        },
        /**
         * 展示联赛筛选
         */
        leagueSelectHandle() {
            this.$refs.leagueSelect.openHandle();
        },
        /**
         * 展示日期
         */
        datePluginHandle(){
            this.$refs.datePluginView.openDatePlugin();
        },
        /**
         * 日期改变
         * @param date  日期 type: new Date(2019,4,1)
         */
        changeDate(date){
            console.log(date, '日期');
        },
        /**
         * 联赛筛选事件
         * @param filterTournamentId            选中的联赛 Id
         */
        selectLeagueHandle(filterTournamentId) {
            this.$store.dispatch('filterEventByTournament', {filterTournamentId});
        }
    }
});

export default topBar;
