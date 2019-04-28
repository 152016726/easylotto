/**
 * Created by oWEn on 2019/4/11.
 */
import Vue from "vue";
import './index.scss';
import tpl from './index.template';
import {getMatchGoalCardListGroupByCurrentState} from "#/dataCenter/matchInfo";
const TIME_AXIS_WINDOW_WIDTH = 585;

let vm = Vue.component('time-axis', {
    template: tpl,
    props: ["params"],
    data(){
        return {
            matchGoalCardList: []
        };
    },
    methods: {
        jumpTo(playerId){
            if(playerId !== "") {
                let urlParams = `playerId=${playerId}`;
                parent.window.popupWithHW(`/playerInfo.html?${urlParams}`, "", TIME_AXIS_WINDOW_WIDTH);
            }
        }
    },
    created(){
        getMatchGoalCardListGroupByCurrentState({
            matchId: this.params.matchId,
            homeId: this.params.homeId,
            awayId: this.params.awayId
        }).then((data) => {
            this.matchGoalCardList = data;
        });
    }
});
export default vm;























