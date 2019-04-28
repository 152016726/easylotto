import Vue from 'vue';
import template from './index.template';
import lang from './lang';
import {getLangMixin} from '#/mixin/langMixin';
import './index.scss';
import '../fulltime';

export default Vue.component('web-content', {
    mixins: [getLangMixin(lang)],
    data() {
        return {
            date: '2019-04-18 14:29'
        }
    },
    template,
    methods: {}
})