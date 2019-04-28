/**
 * 下拉展示框球员的进球展示状态
 * Created by easyLottoMac_Feng on 2019/4/18.
 */
import './index.scss';
import Vue from 'vue';
import template from './index.template';
import '../matchIcon';
import '../playerStatusLi';

const LEAGUEMATCH = [
    {}
];

let playerStatus = Vue.component('player-status-view', {
    data() {
        return {}
    },
    template,
    props: {
        playerList: {                   // 球员信息
            default: function () {
                return []
            }
        },
        firstGoal:{
            default: function () {
                return {}
            }
        },
        payout: {   // 球队首名进球派彩信息
            default: function () {
                return {}
            }
        }
    },
    created() {}
});

export default playerStatus;
