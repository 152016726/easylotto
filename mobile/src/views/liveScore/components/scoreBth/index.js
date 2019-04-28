/**
 * 展示比分按钮
 * Created by easyLottoMac_Feng on 2019/4/17.
 */
import './index.scss';
import Vue from 'vue';
import template from './index.template';

let scoreBth = Vue.component('score-btn', {
    data() {
        return {}
    },
    props: {
        score: {
            default: ''
        }
    },
    template,
});

export default scoreBth;
