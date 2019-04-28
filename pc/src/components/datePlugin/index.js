import './index.scss';
import template from './index.template';
import Vue from 'vue';
let _upperLimitYear = 0;          // 上限年份
let _upperLimitMonth = 0;         // 上限月份
let _upperLimitDay = 0;           // 上限日期
let _lowerLimitYear = 0;          // 下限年份
let _lowerLimitMonth = 0;         // 下限月份
let _lowerLimitDay = 0;           // 下限日期

export default Vue.component('date-plugin', {
    data() {
        return {
            monthDataList: [],                           // 月的数组
            currentFullYear: new Date().getFullYear(),   // 当前年
            currentMonth: new Date().getMonth(),         // 当前月
            currentDate: new Date().getDate(),           // 当前日
            selectedDate: new Date(),                    // 选中的日期
            axis: {x:'', y: ''},                         // 选中的日期的坐标
            weekNames: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']  // 周名list
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
            // 触发父组件点击事件
            this.$emit('changeDate', this.selectedDate);
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
                    days -                                                                 // 总共天数
                    (6 - new Date(currentFullYear, currentMonth, 1).getDay() + 1) -        // 第一周天数
                    (new Date(currentFullYear, currentMonth, days).getDay() + 1)           // 最后一周天数
                )
                / 7) + 2;
            for(let i = 1;i <= num; i++){
                let week = [{}, {}, {}, {}, {}, {}, {}];
                while (day <= days){
                    d.setDate(day);
                    let dayOfWeek = d.getDay();
                    if(d.getTime() === Cdate.getTime()) week[dayOfWeek].isCurrent = true;
                    if(d.getTime() - upperTime.getTime() > 0) week[dayOfWeek].isDisabled = true;
                    if(d.getTime() - lowerTime.getTime() < 0) week[dayOfWeek].isDisabled = true;
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
                // 填补上一个月的和下一个月的
                if(i === 1 || i>4){
                    // 第一周
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

                    }else if(i>num-1){
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
                this.getMonthDataList()
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
                this.getMonthDataList()
            }else{
                return
            }
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

        // 初始化日历
        this.getMonthDataList()
    }
})