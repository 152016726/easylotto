/**
 * 赛事列表下拉框的赛事状态展示模块
 * Created by easyLottoMac_Feng on 2019/4/18.
 */
import './index.scss';
import Vue from 'vue';
import template from './index.template';
import '../matchIcon';



let gameStatue = Vue.component('game-status-view', {
    template,
    props: {
        dataList: {
            default: function () {
                return []
            }
        }
    },
    created() {
    }
});

export default gameStatue;
