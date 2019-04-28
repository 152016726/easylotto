/**
 * 联赛筛选组件
 * Created by easyLottoMac_Feng on 2019/4/16.
 */

import './index.scss';
import Vue from 'vue';
import template from './index.template';
import _ from 'lodash';
import lang from './lang';
import {getLangMixin} from '#/mixin/langMixin';

let defaultSelectArr = [];           // 储存上一次的选中数据

let leagueSelect = Vue.component('league-select-view', {
    mixins: [getLangMixin(lang)],
    data() {
        return {
            isShow: false,                  // 是否展示联赛筛选展示框
            isAllLeague: true,              // 是否选中全部联赛
            selectLeagueArr: []             // 选中的联赛Id数组集合
        }
    },
    template,
    props: {
        // 联赛信息
        arrTournament: {
            default: function () {
                return []
            }
        },
        // 父级回调
        callBackFn: {}
    },
    watch: {
        selectLeagueArr(newValue) {
            this.isAllLeague = !newValue.length;
        }
    },
    created() {
        // console.log('create.....', this.$store.state.arrTournament)
    },
    methods: {
        /**
         *  联赛选择按钮事件
         * @param id  联赛下标索引
         */
        leagueHandle(id) {
            let {selectLeagueArr} = this;
            let len = selectLeagueArr.indexOf(id);
            if (len === -1) {
                selectLeagueArr.push(id);
            } else {
                selectLeagueArr.splice(len, 1);
            }
            this.selectLeagueArr = selectLeagueArr;
        },
        /**
         * 全部联赛按钮事件
         */
        allLeagueHandle() {
            if (this.isAllLeague) return;
            this.isAllLeague = true;
            this.selectLeagueArr = [];
        },
        /**
         * 重置按钮事件
         */
        resetHandle() {
            let {leagueArr, callBackFn, closeHandle} = this;
            closeHandle();
            let callBackData = _.map(leagueArr, 'id');
            this.isAllLeague = true;
            this.selectLeagueArr = [];
            defaultSelectArr = [];
            callBackFn && callBackFn(callBackData);
        },
        /**
         * 关闭组件
         */
        closeHandle() {
            this.isShow = false;
        },
        /**
         * 展示组件
         */
        openHandle() {
            this.isShow = true;
            this.selectLeagueArr = defaultSelectArr.slice(0);
        },
        /**
         * 关闭按钮事件
         */
        closeBtnHandle() {
            this.closeHandle();
        },
        /**
         * 确认按钮事件
         */
        enterBtnHandle() {
            let {selectLeagueArr, callBackFn, isAllLeague, leagueArr, closeHandle} = this;
            let callBackData = [];              // 返回选中的联赛数组
            closeHandle();
            callBackData = isAllLeague ? _.map(leagueArr, 'id') : selectLeagueArr;
            defaultSelectArr = selectLeagueArr.slice(0);
            callBackFn && callBackFn(callBackData);
        }
    }
});

export default leagueSelect;
