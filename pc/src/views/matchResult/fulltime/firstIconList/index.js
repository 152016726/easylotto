/**
 * Created by owen on 2019/4/26.
 */
import Vue from 'vue';
import template from './index.template';

let _iconList = [
    {
        key: 'ftg_po',
        show: (payout) => {
            return payout.ftg === '3';
        }
    },
    {
        key: 'ftg',
        show: (payout) => {
            return payout.ftg === '2';
        }
    },
    {
        key: 'fg_po',
        show: (payout) => {
            return payout.fg === '3';
        }
    }, {
        key: 'fg',
        show: (payout) => {
            return payout.fg === '2';
        }
    }]
export default Vue.component('first-icon-list', {
    data() {
        return {}
    },
    props: {
        away: {
            default: false
        },
        payout: {
            default: {}
        }
    },
    template,
    computed: {
        iconlist() {
            if (this.away) {
                return _iconList.reverse();
            }
            return _iconList;
        }
    },
    methods: {}
})