/**
 * 联赛筛选框
 * Created by easyLottoMac_Feng on 2019/4/15.
 */
import template from './index.template';
import Vue from 'vue';
import {mapState} from 'vuex';
import './index.scss';
import $ from 'jquery';

// 联赛的信息
const TOURNAMETARR = [
    {
        id: '1',
        name: '澳國聯'
    },
    {
        id: '2',
        name: '芬超'
    },
    {
        id: '3',
        name: '亞協盃'
    },
    {
        id: '4',
        name: '丹超附'
    },
    {
        id: '5',
        name: '瑞典超'
    },
    {
        id: '6',
        name: '土超'
    },
    {
        id: '7',
        name: '瑞典甲'
    },
    {
        id: '8',
        name: '荷乙'
    },
    {
        id: '9',
        name: '意甲'
    },
    {
        id: '10',
        name: '德乙'
    }];

let leagueSelect = Vue.component('league-select', {
    data() {
        return {
            titleText: '全部聯賽',              // title 展示的文字
            isOpen: false,                     // 控制是否展开联赛选择
            selectArr: [],                    // 选中的联赛下标
            isAllLeague: true,
            tournamentArr: TOURNAMETARR
        }
    },
    template,
    created() {
    },
    computed: {
        /**
         * 获取联赛信息
         * @returns {leagueSelect.computed.arrTournament|(function())|Array}
         */
        arrTournament() {
            return this.$store.state.arrTournament;
        }
    },
    watch: {
        /**
         * 监视下拉筛选框选中的元素
         */
        selectArr(newValue) {
            if (newValue.length) {
                this.isAllLeague = false;
                if (newValue.length === 1) {
                    this.titleText = this.tournamentArr[newValue[0]].name;
                } else {
                    this.titleText = '';
                }
            } else {
                this.isAllLeague = true;
                this.titleText = '全部联赛';
            }
        },
        /**
         * 监视下拉筛选框展开动画事件
         */
        isOpen() {
            $('.league-select-content').slideToggle(60);
        }
    },
    methods: {
        /**
         * 全部联赛筛选选择事件
         */
        allLeagueHandle() {
            if (this.isAllLeague) return;
            this.titleText = '全部聯賽';
            this.selectArr = []
        },
        /**
         * 筛选列表选中事件
         * @param index
         */
        selectHandle(index) {
            let {selectArr} = this;
            let len = selectArr.indexOf(index);
            if (len === -1) {
                selectArr.push(index);
            } else {
                selectArr.splice(len, 1);
            }
            this.selectArr = selectArr;
        },
        /**
         * 重置按钮事件
         */
        resetHandle() {
            this.isAllLeague = true;
            this.selectArr = [];
            this.titleText = '全部聯賽';
            $('.league-select-content-top').scrollTop(0);
            this.handleClose();
        },
        /**
         * 确认按钮事件
         */
        enterHandle() {
            this.handleClose();
        },
        /**
         * 切换筛选弹窗的展示与隐藏
         */
        toggleContentHandle() {
            this.isOpen = !this.isOpen;
        },
        /**
         * 关闭筛选弹窗
         */
        handleClose() {
            this.isOpen = false;
        }
    },
    directives: {
        //实现点击容器以外的地方隐藏容器
        clickOutside: {
            // 初始化指令
            bind(el, binding) {
                function documentHandler(e) {
                    // 这里判断点击的元素是否是本身，是本身，则返回
                    if (el.contains(e.target)) {
                        return false;
                    }
                    // 判断指令中是否绑定了函数
                    if (binding.expression) {
                        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
                        binding.value(e);
                    }
                }

                // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
                el.__vueClickOutside__ = documentHandler;
                document.addEventListener('click', documentHandler);
            },
            unbind(el) {
                // 解除事件监听
                document.removeEventListener('click', el.__vueClickOutside__);
                delete el.__vueClickOutside__;
            }
        }
    }
});

export default leagueSelect;
