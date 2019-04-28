/**
 * Created by easyLottoMac_Feng on 2019/4/24.
 */
import './index.scss';
import Vue from 'vue';
import template from './index.template';
import {EXTRA_TIME, ET_FIRST_HALF, ET_SECOND_HALF} from '#/constants/matchState';
import 'components/commonDialog';
import "../playerInfo";
import lang from './lang';
import {getLangMixin} from '#/mixin/langMixin';

let playerStatusLi = Vue.component('player-status-li', {
    mixins: [getLangMixin(lang)],
    data() {
        return {
            typeNum: '',            // 状态类型
            num: ''                 // 红牌数
        }
    },
    template,
    props: {
        clock: {                // 时间分钟数
            default: ''
        },
        playerName: {           // 球员名称
            default: ''
        },
        typeCode: {             // 信息类型
            default: ''
        },
        firstGoal: {            // 球队首名进球派彩信息
            default: ''
        },
        playerId: {             // 球员 Id
            default: ''
        },
        currentState: {         // 当前赛事状态
            default: ''
        },
        payout: {          // 球队首名进球派彩信息
            default: function () {
                return {}
            }
        }
    },
    computed: {
        /**
         * 监听比赛状态的时间
         * @returns {string}
         */
        minuteNum() {
            let {clock, currentState} = this;
            let minuteNum = clock + '′';
            // 加时赛的时间
            if ([EXTRA_TIME, ET_FIRST_HALF, ET_SECOND_HALF].indexOf(currentState) !== -1) {
                minuteNum = '90′+' + clock;
            }
            return minuteNum;
        }
    },
    mounted() {
        let {typeCode, payout} = this;
        let {fg, ap} = payout;
        let num = '';
        let typeNum = '';
        switch (typeCode) {
            case '2':      // 十二码
                if (ap === '2') {
                    typeNum = 5;
                } else if (ap === '3') {
                    typeNum = 3;
                }
                break;
            case '3':       // 球队首名进球
                if (fg === '2') {
                    typeNum = 6
                } else if (fg === '3') {
                    typeNum = 9
                }
                break;
            case '5':       // 红牌
                num = '1';
                typeNum = 7;
                break;
        }
        this.typeNum = typeNum;
        this.num = num;
        // console.log('player-status-li.....', fg, _typeNum, payout);
    },
    methods: {
        /**
         * 展示球员信息
         */
        playerInfoHandle() {
            this.$refs.dialog.open();
        }
    },
    created() {

    }
});

export default playerStatusLi;
