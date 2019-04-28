import Vue from 'vue';
import template from './index.template';
import './index.scss';
import online from './images/online.png';
import offline from './images/offline.png';
const TIME_AXIS_WINDOW_WIDTH = "683";

export default Vue.component('score-column', {
    data() {
        return {
            online,
            offline,
            regularSateList: ['6', '7', '31'],                                     // 常规赛的赛事进行状态
            addTimeStateList: ['32', '33', '34', '41', '42', '70', '73', '999'],    // 加时赛正在进行的赛事进行状态
            pointStateList: ['34', '50', '120', '70', '73', '999'],                        // 点球的赛事进行状态
            regularFinalState: ['100', '32', '33', '34', '41', '42', '50', '120'], // 常规赛赛事完成状态
            addTimeFinalState: ['120', '34', '50'],                                 // 加时赛事完成状态
            addTimeAllState: ['32', '33', '34', '41', '42', '120', '34', '50', '70', '73', '999'],  // 加时赛存在的所有状态
            delayState: ['70', '73', '999']                                         // 取消延误状态
        }
    },
    template,
    props: {
        index: {default: 0},
        matchInfo: {
            default: () => {}
        }
    },
    methods: {
        /**
         * 比赛状态的点击（如上下半场的点击事件）
         */
        matchStateClick(){
            let urlParams = `title=${this.matchInfo.dateWeek} ${this.matchInfo.startTime}&matchId=${this.matchInfo.matchId}&homeId=${this.matchInfo.hometeamId}&awayId=${this.matchInfo.awayteamId}&homeName=${this.matchInfo.hometeamName}&awayName=${this.matchInfo.awayteamName}`;
            // parent.window.popup(`/timeAxis.html?${urlParams}`);
            parent.window.popupWithHW(`/timeAxis.html?${urlParams}`, "", TIME_AXIS_WINDOW_WIDTH);
        }
    }
})