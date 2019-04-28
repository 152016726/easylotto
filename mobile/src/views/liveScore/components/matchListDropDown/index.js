/**
 * 赛事列表下拉展示框
 * Created by easyLottoMac_Feng on 2019/4/17.
 */
import './index.scss';
import Vue from 'vue';
import template from './index.template';
import '../gameStatus';
import '../playerStatus';
import {getMatchGoalCardListGroupByTeamId} from '#/dataCenter/matchInfo';

let flag = false;
const GAMESTATUS = [  // 赛事时间轴
    {name: '半場', isCorner: false, home: '0', away: '0', typeId: '1', isShowBottom: false, iconType: 4, signT: 'Ht'},
    {name: '半場', isCorner: true, home: '0', away: '0', typeId: '2', isShowBottom: true, iconType: null, signT: 'Ht'},
    {name: '90’完', isCorner: false, home: '0', away: '0', typeId: '3', isShowBottom: false, iconType: 2, signT: 'Ft'},
    {name: '90’', isCorner: true, home: '0', away: '0', typeId: '4', isShowBottom: true, iconType: null, signT: 'Ft'},
    {name: '加時半場', isCorner: false, home: '0', away: '0', typeId: '5', isShowBottom: false, iconType: 1, signT: 'Oht'},
    {name: '加時半場', isCorner: true, home: '0', away: '0', typeId: '6', isShowBottom: true, iconType: null, signT: 'OHt'},
    {name: '加時完', isCorner: false, home: '0', away: '0', typeId: '7', isShowBottom: false, iconType: 1, signT: 'Oft'},
    {name: '加時', isCorner: true, home: '0', away: '0', typeId: '8', isShowBottom: true, iconType: null, signT: 'Oft'},
    {name: '十二碼', isCorner: false, home: '0', away: '0', typeId: '9', isShowBottom: false, iconType: 3, signT: 'Ap'},
];

let matchListViewBottom = Vue.component('match-list-drop-down', {
    data() {
        return {
            homeList: [],                    // 主队信息
            awayList: []                     // 客队信息
        }
    },
    template,
    props: [
        "matchId",              // 赛事 ID
        "homeTeamId",           // 主队 ID
        "awayTeamId",           // 客队 ID
        "broadCast",            // 电台列表
        "corner",               // 角球信息
        "payout",               // 派彩信息
        "firstGoal",            // 首进球信息
        "cornerCurrent",        // 角球当前比分
        "cornerHt",             // 半场角球比分
        "cornerFt",             // 90'完角球比分
        "cornerOtf",            // 加时完场比分
        "cornerOth",            // 加时半场比分
        "scoreCurrent",         // 当前比分
        "scoreFt",              // 90'比分
        "scoreHt",              // 半场比分
        "scoreOtf",             // 加时完场比分
        "scoreOth",             // 加时半场比分
        "scoreAp"               // 十二码比分
    ],
    computed: {
        /**
         * 计算赛事状态时间轴
         * @returns {Array}
         */
        gameStateList() {
            let gameStateList = [];
            let gfSign = '';
            GAMESTATUS.forEach(GF => {
                flag = false;
                let scoreGF = this['score' + GF.signT];     // 足球比分
                let cornerGF = this['corner' + GF.signT];   // 角球比分
                if (scoreGF || cornerGF) {
                    // 角球状态
                    if (GF.isCorner && cornerGF) {
                        GF.home = cornerGF.home;
                        GF.away = cornerGF.away;
                        gameStateList.push(GF);
                        // 正常比分状态
                    } else if (!GF.isCorner && scoreGF) {
                        // 判断是否有角球，若没有角球则要显示分割线
                        GF.isShowBottom = !cornerGF;
                        // 主客队比分
                        GF.home = scoreGF.home;
                        GF.away = scoreGF.away;
                        // 判断是否派彩
                        gfSign = this.payout[GF.signT.toLowerCase()];
                        if (gfSign !== '1') {
                            switch (GF.signT) {
                                case 'Ht':
                                    GF.iconType = gfSign === '3' ? 4 : null;
                                    break;
                                case 'Ft':
                                    GF.iconType = gfSign === '3' ? 2 : null;
                                    break;
                                case 'Oht':
                                case 'Oft':
                                    GF.iconType = gfSign === '3' ? 1 : null;
                                    break;
                                case 'Ap':
                                    GF.iconType = gfSign === '3' ? 3 : 5;
                                    break;
                                default:
                                    GF.iconType = null;
                                    break;
                            }
                        } else {
                            GF.iconType = null;
                        }
                        gameStateList.push(GF);
                    }
                }
            });
            return gameStateList
        }
    },
    created() {
        let {matchId, homeTeamId, awayTeamId} = this;
        getMatchGoalCardListGroupByTeamId({matchId}).then(data => {
            this.homeList = data[homeTeamId];
            this.awayList = data[awayTeamId];
        })
    }
});

export default matchListViewBottom;
