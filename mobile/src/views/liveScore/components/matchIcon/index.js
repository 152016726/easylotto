/**
 * 赛事状态展示
 * Created by easyLottoMac_Feng on 2019/4/22.
 */
import './index.scss';
import Vue from 'vue';
import template from './index.template';

const CLASSNAMES = {
    class_0: 'payout_first_entry',        // 最先入球球队派彩
    class_1: 'overtime_player',           // 加时派彩
    class_2: 'payout_full',               // 全场派彩
    class_3: 'payout_twelve_yards',       // 十二码派彩
    class_4: 'payout_half',               // 半场派彩
    class_5: 'twelve_yards_in',           // 十二码入球
    class_6: 'first_player',              // 首名入球员未派彩
    class_7: 'red-card-style-box',        // 红牌样式
    class_8: 'first_goal_entry',          // 最先入球球队未派彩
    class_9: 'payout_first_player'        // 球队首名入球已派彩
};

let matchIcon = Vue.component('match-icon-view', {
    data() {
        return {
            //className: ''
        }
    },
    template,
    props: {
        type: {                     // 赛事 icon 状态
            default: '0'
        },
        num: {                      // 展示数值
            default: ''
        }
    },
    computed: {
        className(){
            return CLASSNAMES['class_' + this.type];
        }
    },
    mounted() {

    }
});

export default matchIcon;
