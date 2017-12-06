import Base from './base'
import Calculate from './calculate'
import Interface from './interface'
import Timer from './timer'
import $ from 'jquery'
const copyProperties = function(target, source) {
    for (let key of Reflect.ownKeys(source)) {
        if (key !== 'constructor' && key !== 'prototype' && key !== 'name') {
            let desc = Object.getOwnPropertyDescriptor(source, key);
            Object.defineProperty(target, key, desc);
        }
    }
}

const mix = function(...mixins) {
    class Mix {}
    for (let mixin of mixins) {
        copyProperties(Mix, mixin);
        copyProperties(Mix.prototype, mixin.prototype);
    }
    return Mix
}

class Lottery extends mix(Base, Calculate, Interface, Timer) {
    constructor(name = 'syy', cname = '11选5', issue = '**', state = '**') {
        super();
        this.name = name;
        this.cname = cname;
        this.issue = issue;
        this.state = state;
        this.el = '';
        this.omit = new Map();
        this.open_code = new Set();
        this.open_code_list = new Set();
        this.play_list = new Map();
        this.number = new Set();
        this.issue_el = '#curr_issue';
        this.countdown_el = '#countdown';
        this.state_el = '.state_el';
        this.cart_el = '.codelist';
        this.omit_el = '';
        this.cur_play = 'r5';
        this.initPlayList();
        this.initNumber();
        this.updateState();
        this.initEvent();
    }

    /**
     * [updateState 状态更新]
     * @return {[type]} [description]
     */
    updateState() {
        let me = this;
        this.getState().then(function(res) {
            me.issue = res.issue;
            me.end_time = res.end_time;
            me.state = res.state;
            $(me.issue_el).text(res.issue);
            me.countdown(res.end_time, function(time) {
                $(me.countdown_el).html(time)
            }, function() {
                setTimeout(function() {
                    me.updateState();
                    me.getOmit(me.issue).then(function(res) {

                    });
                    me.getOpenCode(me.issue).then(function(res) {

                    })
                }, 500);
            })
        })
    }

    /**
     * [initEvent 初始化事件]
     * @return {[type]} [description]
     */
    initEvent() {
        let me = this;
        $('#plays').on('click', 'li', me.changePlayNav.bind(me));
        $('.boll-list').on('click', '.btn-boll', me.toggleCodeActive.bind(me));
        $('#confirm_sel_code').on('click', me.addCode.bind(me));
        $('.dxjo').on('click', 'li', me.assistHandle.bind(me));
        $('.qkmethod').on('click', '.btn-middle', me.getRandomCode.bind(me));
    }
}

export default Lottery;