/**
 * 赛事列表展示
 * Created by easyLottoMac_Feng on 2019/4/17.
 */
import template from './index.template';
import Vue from 'vue';
import { mapState } from 'vuex';
import './index.scss';
import '../components/matchLiView';

let matchList = Vue.component('match-list-view', {
    template: template,
    computed: mapState([
        'grpMatch'
    ]),
    watch: {
        grpMatch() {
            console.log(this.grpMatch);
        }
    },
    created(){
        this.$store.dispatch('initData');
    }
});

export default matchList;
