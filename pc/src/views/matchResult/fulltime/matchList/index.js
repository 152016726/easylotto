/**
 * Created by owen on 2019/4/26.
 */
import Vue from 'vue';
import template from './index.template';

export default Vue.component('match-result-match-list', {
    props: {
        list: {
            default: []
        },
    },
    template
})