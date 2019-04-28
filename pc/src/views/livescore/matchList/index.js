/**
 * 比赛列表展示
 * Created by DDT on 2019/04/11.
 */
import template from './index.template';
import Vue from 'vue';
import { mapState } from 'vuex';
import './index.scss';
import '../score';

let matchList = Vue.component('match-list', {
    template: template,
    computed: mapState([
        'grpMatch'
    ]),
    mounted(){

    },
    created(){
        this.$store.dispatch('initData');
    }
});

export default matchList;