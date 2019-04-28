import './index.scss';
import template from './index.template';
import Vue from 'vue';
import getInfoDateCount from '#/services/getInfoDateCountService';
import lang from './lang';
import {getLangMixin} from '#/mixin/langMixin';
let _upperLimitYear = 0;          // 上限年份
let _upperLimitMonth = 0;         // 上限月份
let _upperLimitDay = 0;           // 上限日期
let _lowerLimitYear = 0;          // 下限年份
let _lowerLimitMonth = 0;         // 下限月份
let _lowerLimitDay = 0;           // 下限日期

export default Vue.component('date-plugin', {
    mixins: [getLangMixin(lang)],
    data() {
        return {
            isShow: false,                                // toggle显示
            monthDataList: [],                           // 月的数组
            currentFullYear: new Date().getFullYear(),   // 当前年
            currentMonth: new Date().getMonth(),         // 当前月
            currentDate: new Date().getDate(),           // 当前日
            selectedDate: new Date(),                    // 选中的日期
            axis: {x:'', y: ''},                         // 选中的日期的坐标
            dateCountList: []                            // 月份每天比赛数量
        }
    },
    template,
    props: {
        limitYear: {default: 0},                        // 外部所传前后可查看的年数限制
        limitMonth: {default: 0},                       // 外部所传前后可查看的月数限制
        limitDay: {default: 90},                        // 外部所传前后可查看的天数限制 默认前后90天
    },
    methods: {
        /**
         * 选择日期点击事件
         * @param item type: object
         * @param x    横坐标
         * @param y    纵坐标
         */
        setSelectedDate(item, x, y){
            if(item.isDisabled) return;
            const {currentFullYear, currentMonth} = this;
            this.currentDate = item.text;
            this.selectedDate = new Date(currentFullYear, currentMonth, item.text);
            // 重新初始化坐标
            this.axis = {x, y, month: currentMonth};
        },
        /**
         * 获取月的数组
         */
        getMonthDataList() {
            const {currentFullYear, currentMonth, currentDate, selectedDate} = this;
            const upperTime = new Date(_upperLimitYear, _upperLimitMonth, _upperLimitDay);  // 上限时间
            const lowerTime = new Date(_lowerLimitYear, _lowerLimitMonth, _lowerLimitDay);  // 下限时间
            const Cdate = new Date(currentFullYear, currentMonth, currentDate);       // 当前date
            let days = this.getCurrentMonthDatesNum(currentFullYear, currentMonth);   // 当前月的天数
            let day = 1;                                                              // 赋值用的天数
            let d = new Date(currentFullYear, currentMonth, currentDate);             // 用来操作的date
            let startDay = 1;                                                         // 计数Flag
            let weeks = [];                                                           // 用来存储的week
            let num = Math.ceil(                                                      // 当前月份有多少周
                (
                    days -
                    (6 - new Date(currentFullYear, currentMonth, 1).getDay() + 1) -
                    (new Date(currentFullYear, currentMonth, days).getDay() + 1)
                )
                / 7) + 2;
            for(let i = 1;i <= num; i++){
                let week = [{}, {}, {}, {}, {}, {}, {}];
                // 当小于这个月的总天数时
                while (day <= days){
                    d.setDate(day);
                    let dayOfWeek = d.getDay();
                    if(d.getTime() === Cdate.getTime()) week[dayOfWeek].isCurrent = true;
                    if(d.getTime() - upperTime.getTime() > 0) week[dayOfWeek].isDisabled = true;
                    if(d.getTime() - lowerTime.getTime() < 0) week[dayOfWeek].isDisabled = true;
                    if(this.dateCountList[day-1] === '0') week[dayOfWeek].isNoLived = true;
                    if(i === 1 && dayOfWeek === 0){
                        break;
                    }else if(dayOfWeek < 6){
                        if(d.getTime() === selectedDate.getTime()){
                            week[dayOfWeek].isSelected = true;
                            this.axis={x:dayOfWeek, y:i, month: currentMonth}
                        }
                        week[dayOfWeek].text = day++;
                    }else{
                        if(d.getTime() === selectedDate.getTime()){
                            week[dayOfWeek].isSelected = true;
                            this.axis={x:dayOfWeek, y:i, month: currentMonth}
                        }
                        week[dayOfWeek].text = day++;
                        break;
                    }
                }
                // 填补上一个月的和下一个月的 第一周和第四周之后
                if(i === 1 || i>4){
                    // 第一周填补上月的天数
                    if(i === 1){
                        let preDate = new Date(currentFullYear, currentMonth-1, 1);
                        let preDays = this.getCurrentMonthDatesNum(currentFullYear, currentMonth-1);
                        for(let k = week.length-1; k >= 0;k--){
                            if(week[k].text) continue;
                            preDate.setDate(preDays);
                            if(preDate.getTime() === Cdate.getTime()) week[k].isCurrent = true;
                            if(preDate.getTime() - upperTime.getTime() > 0) week[k].isDisabled = true;
                            if(preDate.getTime() - lowerTime.getTime() < 0) week[k].isDisabled = true;
                            week[k].text = preDays--;
                            week[k].ispm = true;
                        }

                    }else if(i>num-1){ // 最后一周填补下月的天数
                        let nextDate = new Date(currentFullYear, currentMonth+1, 1);
                        for(let k=0; k<=week.length-1; k++){
                            if(week[k].text) continue;
                            nextDate.setDate(startDay);
                            if(nextDate.getTime() === Cdate.getTime()) week[k].isCurrent = true;
                            if(nextDate.getTime() - upperTime.getTime() > 0) week[k].isDisabled = true;
                            if(nextDate.getTime() - lowerTime.getTime() < 0) week[k].isDisabled = true;
                            week[k].text = startDay++;
                            week[k].isnm = true;
                        }

                    }
                }
                weeks.push(week);
            }
            this.monthDataList = weeks;
        },
        /**
         * 获取本月的天数
         */
        getCurrentMonthDatesNum(currentFullYear, currentMonth) {
            return new Date(currentFullYear, currentMonth + 1, 0).getDate()
        },
        /**
         * 获取上一个月
         */
        preClick(){
            const {currentFullYear, currentMonth, currentDate} = this;

            if(this.currentMonth > _lowerLimitMonth){
                //下限时间
                const days = this.getCurrentMonthDatesNum(currentFullYear, currentMonth-1);
                let lowerTime = 0;
                if(days > currentDate){
                    lowerTime = new Date(currentFullYear, currentMonth-1, currentDate);
                }else{
                    lowerTime = new Date(currentFullYear, currentMonth-1, days);
                }
                this.currentFullYear = lowerTime.getFullYear();
                this.currentMonth = lowerTime.getMonth();
                this.currentDate = lowerTime.getDate();
                // 初始化当前月份比赛天数
                this.getInfoDate(this.currentFullYear, this.currentMonth).then(rsp=>{
                    // 初始化日历
                    this.getMonthDataList()
                }, rej=>{
                    // 初始化日历
                    this.getMonthDataList()
                });
            }else{
                return
            }
        },
        /**
         * 获取下一个月
         */
        nextClick(){
            const {currentFullYear, currentMonth, currentDate} = this;

            if(this.currentMonth < _upperLimitMonth){
                //上限时间
                const days = this.getCurrentMonthDatesNum(currentFullYear, currentMonth+1);
                let upperTime = 0;
                if(days > currentDate){
                    upperTime = new Date(currentFullYear, currentMonth+1, currentDate);
                }else{
                    upperTime = new Date(currentFullYear, currentMonth+1, days);
                }
                this.currentFullYear = upperTime.getFullYear();
                this.currentMonth = upperTime.getMonth();
                this.currentDate = upperTime.getDate();
                // 初始化当前月份比赛天数
                this.getInfoDate(this.currentFullYear, this.currentMonth).then(rsp=>{
                    // 初始化日历
                    this.getMonthDataList()
                }, rej=>{
                    // 初始化日历
                    this.getMonthDataList()
                });
            }else{
                return
            }
        },
        /**
         * 重新选择
         */
        componentReload(){
                this.currentFullYear = new Date().getFullYear();        // 当前年
                this.currentMonth = new Date().getMonth();         // 当前月
                this.currentDate = new Date().getDate();           // 当前日
                // 初始化被选中的日期
                this.selectedDate = new Date(this.currentFullYear, this.currentMonth, this.currentDate);
                this.getMonthDataList()
        },
        /**
         * 获取月份每天比赛数量
         * @param year 2019
         * @param month 04
         */
        getInfoDate(year, month){
            if(month < 10){
                month = '0'+month;
            }
            let dateStr= year+''+month;
            return new Promise((res, reject)=>{
                getInfoDateCount.getData({month: dateStr}).then(rsp=>{
                    this.dateCountList = rsp.data.list;
                    res()
                }, rej=>{
                    reject()
                })
            })
        },
        /**
         * 打开窗口
         */
        openDatePlugin(){
            this.isShow=true;
        },
        /**
         * 关闭窗口
         */
        closeDatePlugin(){
            this.isShow=false;
        },
        /**
         * 确认关闭窗口
         */
        enterBtnHandle(){
            // 触发父组件点击事件
            this.$emit('changeDate', this.selectedDate);
            this.closeDatePlugin();
        }
    },
    mounted() {

    },
    created() {
        const {currentFullYear, currentMonth, currentDate, limitYear, limitMonth, limitDay} = this;
        // 初始化被选中的日期
        this.selectedDate = new Date(currentFullYear, currentMonth, currentDate);
        // 上限时间
        const upperTime = new Date(currentFullYear+limitYear, currentMonth+limitMonth, currentDate+limitDay);
        _upperLimitYear = upperTime.getFullYear();
        _upperLimitMonth = upperTime.getMonth();
        _upperLimitDay = upperTime.getDate();

        //下限时间
        const lowerTime = new Date(currentFullYear-limitYear, currentMonth-limitMonth, currentDate-limitDay);
        _lowerLimitYear = lowerTime.getFullYear();
        _lowerLimitMonth = lowerTime.getMonth();
        _lowerLimitDay = lowerTime.getDate();

        // 初始化当前月份比赛天数
        this.getInfoDate(currentFullYear, currentMonth).then(rsp=>{
            // 初始化日历
            this.getMonthDataList()
        }, rej=>{
            // 初始化日历
            this.getMonthDataList()
        });
    }
})