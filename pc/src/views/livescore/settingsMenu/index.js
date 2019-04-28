/**
 * 功能设定菜单组件
 * Created by owen on 2019/04/19.
 */
import template from './index.template';
import Vue from 'vue';
import './index.scss';
import audio from './audio/sound.wav'
import lang from './lang';
import {getLangMixin} from '#/mixin/langMixin'


let _radioVal = ['selected', 'all'];
let _sortRadioVal = ['play', 'time'];
let _checkboxVal = ['audio', 'win'];

let topBar = Vue.component('settings-menu', {
    mixins: [getLangMixin(lang)],
    template: template,
    data() {
        return {
            showSelf: this.show,            //是否显示菜单(本身控制)
            checkboxArr: _checkboxVal,      //所有的checkbox选项
            radioSelected: _radioVal[0],    //声音的radio选择
            winSelected: _radioVal[0],      //提示窗的radio选择
            sortSelected: _sortRadioVal[0]  //排序方式的radio选择
        }
    },
    props: {
        show: {    //是否显示菜单(父级控制, 可用于初始化)
            default: false
        },
        toggle: {  //是否显示菜单(父级控制，与上次值不同则切换显示状态，适用开关功能)
            default: false
        },
        audio: { //音频地址
            default: audio
        },
        radioVal: {    //radio的value
            default: function () {
                return _radioVal;
            }
        },
        sortRadioVal: { //排序方式radio的value
            default: function () {
                return _sortRadioVal;
            }
        },
        checkboxVal: {  //聲音 提示窗 本版提示的value
            default: function () {
                return _checkboxVal;
            }
        }
    },
    watch:{
        show(){
            this.showSelf = this.show;
        },
        toggle(){
            this.showSelf = !this.showSelf;
        }
    },
    methods: {
        /**
         * 声音测试
         */
        testAudio() {
            console.log('声音测试');
            this.$refs.audio.play();
        },
        /**
         * 提示窗测试
         */
        testWin() {
            console.log('提示窗测试');
        },
        /**
         * 显示隐藏功能设定菜单
         */
        toggleSettingsMenu() {
            this.showSelf = !this.showSelf ;
        }
    }
});

export default topBar;
