import Vue from 'vue';
import template from './index.template';
import {mapState} from 'vuex';
import './index.scss';
import 'components/agendaColumn';
import lang from './lang';
import {getLangMixin} from '#/mixin/langMixin';

export default Vue.component('agenda',{
    mixins: [getLangMixin(lang)],
    template,
    computed: mapState([
        'grpMatch'
    ]),
    created(){
        this.$store.dispatch('initData');
    }
})