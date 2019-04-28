/**
 * Created by oWEn on 2019/4/11.
 */
import Vue from "vue"
import './index.scss'
import tpl from './index.template'

let vm = Vue.component('common-dialog', {
    template: tpl,
    data() {
        return {
            selfShow: this.initShow   //是否显示dialog(本身控制)
        }
    },
    methods: {
        /**
         * 关闭弹窗
         */
        close() {
            if (this.onBeforeClose() === false) {
                return;
            }
            this.selfShow = false;
            this.onAfterClose();
        },
        /**
         * 打开弹窗
         */
        open() {
            this.selfShow = true;
        }
    },
    props: {
        initShow: {       //初始化隐藏还是现实
            default: false
        },
        showTitle: {      //是否显示标题
            default: true
        },
        title: {          //标题
            default: ''
        },
        onBeforeClose: {  //关闭前事件
            default: function () {
                return function () {
                }
            }
        },
        onAfterClose: {   //关闭后事件
            default: function () {
                return function () {
                }
            }
        }
    }
});
export default vm;
