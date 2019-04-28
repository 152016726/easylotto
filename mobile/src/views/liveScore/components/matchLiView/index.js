/**
 * 展示赛事列表模块
 * Created by easyLottoMac_Feng on 2019/4/17.
 */
import './index.scss';
import Vue from 'vue';
import template from './index.template';
import '../scoreBth';
import '../matchListDropDown';
import '../matchIcon';
import matchState from '#/config/dictData';
import dict from '@easylotto/dict';

const dictType = 'matchState';

let matchLiView = Vue.component('match-li-view', {
    data() {
        return {
            isShowBottom: false,            // 是否展开下拉
            matchStateStr: '',              // 赛事状态
            isHomeFirst: false,             // 是否主队首进球
            isAwayFirst: false,             // 是否客队首进球
            firstPayout: false,             // 首进球是否已派彩
        }
    },
    template,
    props: {
        // 赛事信息
        eventInfo: {
            default: function () {
                return []
            }
        },
        indexNum: {
            default: ''
        }
    },
    created() {
        let {firstGoal, currentState, hometeamId, awayteamId, payout} = this.eventInfo;
        // 匹配赛事状态
        this.matchStateStr = dict.getDictText(dictType, currentState, 'text');
        // 最先进球是否派彩
        if(payout && payout.fg !== '1') {
            this.isHomeFirst = firstGoal && firstGoal.teamId === hometeamId;
            this.isAwayFirst = firstGoal && firstGoal.teamId === awayteamId;
            this.firstPayout = payout.ftg === '3'
        }
    },
    methods: {
        /**
         * 展示隐藏模块
         */
        showBottomHandle() {
            this.isShowBottom = !this.isShowBottom;
            // console.log(this.eventInfo);
        }
    }
});

export default matchLiView;
