import Vue from 'vue';
import template from './index.template';
import {mapState} from 'vuex';
import './index.scss';
import './firstIconList';
import './matchList'

export default Vue.component('fulltime', {
    data() {
        return {}
    },
    computed: mapState([
        'grpMatch'
    ]),
    template,
    props: {},
    methods: {},
    created() {
        this.$store.dispatch('initData');
    }
})