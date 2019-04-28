/**
 * 带icon的按钮
 * Created by oWEn on 2019/4/11.
 */
import Vue from "vue"
import './index.scss'
import tpl from './index.template'

let vm =  Vue.component('icon-button', {
    props: {
        text: {
            default: ''        //按钮内容
        },
        onClick: {              //点击回调
            default: function () {
            },
            type: Function
        }
    },
    methods: {
        clickHandle(){
           this.onClick();
        }
    },
    template: tpl
});
export default vm;
