import Vue from 'vue';
import template from './index.template';
import './index.scss';
import lang from './lang';
import {getLangMixin} from '#/mixin/langMixin';

export default Vue.component('agenda-column',{
    mixins: [getLangMixin(lang)],
    data(){
        return{

        }
    },
    template,
    props:{
        index: {default: 0},
        matchInfo: {default: ()=>{}}
    },
    methods:{

    },
    created(){

    }
})