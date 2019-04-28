/**
 * Created by easyLottoMac_Feng on 2019/4/8.
 */
import init from "common/js/init.js"
import "./style.scss";
import Vue from "vue";
import store from './store';
// import demo from "./components/demo/index.js";
import './topBar';
import './matchList';
import '#/components/scrollFixedBox'

var app = new Vue({
    el: '#root',
    store
});
























