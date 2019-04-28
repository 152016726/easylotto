/**
 * Created by oWEn on 2019/4/11.
 */
import Vue from "vue"
import './index.scss'
import tpl from './index.template'

let vm = Vue.component('match-message-box-list', {
    template: tpl,
    data() {
        return {
            list: [{a: 1}, {b: 1}, {a: 1}, {b: 1}, {a: 1}, {b: 1}]
        }
    }
});
export default vm;
