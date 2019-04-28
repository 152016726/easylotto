require('./index.scss');
require('common/js/init');
import Vue from "vue";
import store from './store';
import './webContent';

// 初始化vue内容
new Vue({
    el: '#root',
    store
});