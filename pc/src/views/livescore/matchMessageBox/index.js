/**
 * 赛事消息按钮组件
 * Created by oWEn on 2019/4/11.
 */
import Vue from "vue"
import './index.scss'
import tpl from './index.template'
import 'components/iconButton'
import pushManager from "#/pushManager"
import pushMethod from "#/config/pushMethod"
import lang from './lang';
import {getLangMixin} from '#/mixin/langMixin'
import $ from 'jquery'

let vm = Vue.component('match-message-box', {
    mixins: [getLangMixin(lang)],
    template: tpl,
    data() {
        return {
            showingMsg: false,
            haveMsgNoRead: false
        }
    },
    props: {
        text: {
            default: ''
        }
    },
    mounted: function () {
        let matchId = 45814
        let test = pushManager.on(`${pushMethod.eventInfoUpdate.key}_${matchId}`, this.pushMatchMsg);
    },
    methods: {
        pushMatchMsg(data){
            console.log('pushMatchMsg');
            console.log(data);
            this.showMatchMsg(data.text);
        },
        showMatchMsg(text){
            this.text = text;
            this.showMsg(true);
        },
        clickHandle() {
            parent.window.popup('/matchMsgList.html');
            this.haveMsgNoRead = false;
        },
        /**
         * 显示弹窗
         * @param haveMsgNoRead 是否有信息未读
         */
        showMsg(haveMsgNoRead) {
            if (!this.showingMsg) {
                let msg = $('.msg_box .msg');
                let match_msg_box = $('.match_msg_box.icon_button');
                let msgText = $('.msg_box .msg .text');
                let redPoint = $('.msg_box i');
                let mh = msg.height();
                let boxMinSize = 40;
                let self = this;
                let padding = 10;
                let marginTop = 20;
                self.showingMsg = true;
                msg.css({
                    left: match_msg_box.outerWidth() - msg.outerWidth(),
                    display: 'block',
                    height: mh > boxMinSize ? mh : boxMinSize
                }).animate({opacity: 1}, 2000, function () {
                    setTimeout(function () {
                        msg.animate({opacity: .5}, 500, function () {
                            msgText.css({opacity: .5}).animate({opacity: 0}, 500, function () {
                                msgText = msgText.css({display: 'none'});
                                msg.animate({width: `${boxMinSize}px`}, 400, function () {
                                    msg.animate({height: `${boxMinSize}px`}, 400, function () {
                                        msg.animate({
                                            left: match_msg_box.outerWidth() - padding * 2,
                                            top: -marginTop,
                                            opacity: 0,
                                            width: 0,
                                            height: 0
                                        }, 500, 'linear', function () {
                                            msg.removeAttr('style');
                                            msgText.removeAttr('style');
                                            self.haveMsgNoRead = haveMsgNoRead;
                                            //设置红点显示
                                            if (haveMsgNoRead) {
                                                redPoint.animate({opacity: 1}, 500, function () { //出现红点
                                                    self.showingMsg = false;
                                                    redPoint.removeAttr('style');
                                                })
                                            }
                                            else {
                                                self.showingMsg = false;
                                            }
                                        })
                                    });
                                });
                            });
                        })
                    }, 1500);
                });
            }
        }
    }
});
export default vm;
