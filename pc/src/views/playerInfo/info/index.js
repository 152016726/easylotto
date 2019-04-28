/**
 * Created by oWEn on 2019/4/11.
 */
import Vue from "vue";
import './index.scss';
import tpl from './index.template';
import {getPlayerInfo} from "#/dataCenter/playerInfo";
import lang from './lang';
import {getLangMixin} from '#/mixin/langMixin';
import Language from "@easylotto/lang";
import questionmanImg from "./images/questionman.jpg";

let vm = Vue.component('play-info-panel', {
    mixins: [getLangMixin(lang)],
    template: tpl,
    props: ["playerId"],
    data(){
        return {
            info: {},
            langType: "",
            questionmanImg: questionmanImg
        };
    },
    created(){
        getPlayerInfo({
            playerId: this.playerId
        }).then((data) => {
            this.info = data;
            this.langType = Language.getLanguage();
        });
    }
});
export default vm;























