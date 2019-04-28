/**
 * Created by on 2019/02/26.
 */
var _cArr = [];
var langstring_multiple = ['(可多選)', '(可多选)', '(multiple)'][lang_id];
(function ($) {
    //初始化参数
    var EventsSelect=function(ele,options){
        this.ele=ele;
        this.defaults={
            mult:false
        };
        this.options=$.extend({},this.defaults,options);
        this.result=[];
    };
    EventsSelect.prototype={
        init:function(){//初始化函数
            this.pubFunction();
            this.initOption();
            this.closeSelectEvent();
            this.addEvent();
        },
        closeSelectEvent:function(){
            var that=this;
            this.ele.find(".inputWrap").on("click",function(event){
                event.stopPropagation();
                if(that.ele.find(".inputWrap>p").hasClass("fa-angle-down")){
                    that.ele.find(".inputWrap>p").removeClass("fa-angle-down").addClass("fa-angle-up");
                    that.ele.find(".EventsSelect-option").animate({height:"500px",opacity:"1"},"fast","swing")
                    // that.ele.find(".Select_options").css({"height":"400px"})
                    // that.ele.find(".button").animate({height:"40px",opacity:"1"},"fast","swing")
                }else{
                    that.ele.find(".inputWrap>p").removeClass("fa-angle-up").addClass("fa-angle-down");
                    that.ele.find(".EventsSelect-option").animate({height:"0",opacity:"0"},"fast","swing");
                    // that.ele.find(".Select_options").css({"height":"400px","opacity":"1"})
                }
            });
            $("html").on("click",function(){
                that.ele.find(".inputWrap>p").removeClass("fa-angle-up").addClass("fa-angle-down");
                that.ele.find(".EventsSelect-option").animate({height:"0",opacity:"0"},"fast","swing");
                // that.ele.find(".button").animate({height:"0",opacity:"0"},"fast","swing")
            })
        },
        pubFunction:function(){
            Array.prototype.contains = function(obj) {
                var i = this.length;
                while (i--) {
                    if (this[i] === obj) {
                        return i;  // 返回的这个 i 就是元素的索引下标，
                    }
                }
                return false;
            }
        },
        initOption: function () {
            //初始化输入框和option
            this.ele.append('<div class="inputWrap"><div></div><p class="fa fa-angle-down"></p></div>');
            shtml = '<div class="EventsSelect-option '+(show_type==2?'Mul_nba':'Mul_soccer')+'"><div class="Select_options" style="height:80%;overflow-y: scroll;"><p id="_tips"></p>';
            for(var i= 0;i<this.options.option.length;i++){
                 shtml +='<div '+(i==0?'id="sall"':'')+' data-value="'+this.options.option[i].value+'" data-name="'+this.options.option[i].name+'" class="options"><span>'+this.options.option[i].label+'</span></div>'
            }
            shtml +='</div><div class="button">'+
                                '<a href="javascript:resetEvents();" class="reset">'+['重設', '重设', 'Reset'][lang_id]+'</a>'+
                                '<a href="javascript:submitEvents();" class="combo">'+['確定', '确定', 'Confirm'][lang_id]+'</a>'+
                            '</div></div>'
            this.ele.append(shtml);
        },
        addEvent:function(){
            var that=this;
            this.ele.find(".EventsSelect-option").find("div.options").on("click", function (event) {
                event.stopPropagation();
                // console.log(that.options.mult)
                if(that.options.mult){
                    if( $(this).attr('data-value') > 0 ){
                        $('#sall').removeClass("selected");
                        that.result = that.result.map(function(n){
                            if(n!='0'){
                                return n;
                            }
                        })
                        // console.log(that.result)
                        // that.result.splice(that.result.contains($('#sall').attr("data-value")),1)   
                        if($(this).hasClass("selected")){
                            $(this).removeClass("selected");
                            that.result.splice(that.result.contains($(this).attr("data-value")),1)
                        }else{
                            $(this).addClass("selected");
                            $('#_tips').html('')
                            that.result.push($(this).attr("data-value"))
                        } 
                    }else{
                        $('.EventsSelect-option div.options').removeClass("selected");
                        $(this).addClass("selected");
           
                        that.result = [];
                        that.result.push($(this).attr("data-value"))
                        // console.log(that.result)
                    }
                    // else{
                    //     $(this).addClass("selected");
                    //     that.result.push($(this).attr("data-value"))
                    // }

                    // console.log(that.result)
                    that.refreshInput();
                }else{
                    if($(this).hasClass("selected")){
                        $(this).removeClass("selected");
                        that.result='';
                    }else{
                        that.ele.find(".EventsSelect-option").find("div.options").removeClass("selected");
                        $(this).addClass("selected");
                        $('#_tips').html('')
                        that.result=$(this).attr("data-value");
                        that.ele.find(".inputWrap>p").removeClass("fa-angle-up").addClass("fa-angle-down");
                        that.ele.find(".EventsSelect-option").animate({height:"0",opacity:"0"},"fast","swing")
                    }
                    that.refreshInput($(this).find("span").text());
                }
                // that.options.onChange(that.result)
            });
        },
        inputResultRemoveEvent:function(){
            var that=this;
            this.ele.find(".inputWrap div p").on("click",function(event){
                event.stopPropagation();
                that.result.splice(that.result.contains($(this).attr("data-value")),1);
                that.refreshInput();
                that.removeOptionStyle($(this).attr("data-value"));
                // that.options.onChange(that.result);
            })
        },
        removeOptionStyle:function(val){
            this.ele.find(".EventsSelect-option").find("div.options").each(function(){
                if($(this).attr("data-value")==val){
                    $(this).removeClass("selected")
                }
            })
        },
        refreshInput:function(label){
            this.ele.find(".inputWrap div").empty();
            var _cArr = [],_k = 0;
            if(this.options.mult){
                for(var i=0;i<this.options.option.length;i++){
                    for(var j=0;j<this.result.length;j++){
                        // console.log(this.result[j])
                        // console.log(this.options.option[i].value)
                        if(this.result[j]==this.options.option[i].value){
                            _k++;
                            _cArr.push(this.options.option[i].label);
                            if(_k<2){
                                this.ele.find(".inputWrap div").append('<span>'+this.options.option[i].label.replace(langstring_multiple,'')+'</span>&nbsp;')
                            }else{
                                this.ele.find(".inputWrap div").html('')
                            }
                        }
                    }
                }
            }else{
                if(this.result==''){
                    this.ele.find(".inputWrap div").empty()
                }else{
                    this.ele.find(".inputWrap div").append('<li><span>'+label+'</span>&nbsp;&nbsp;</li>')
                }

            }
            this.inputResultRemoveEvent();
        },
        setResult:function(res){
            this.result=res;
            if(this.options.mult){
                if(res instanceof Array){
                    this.refreshInput();
                    this.ele.find(".EventsSelect-option").find("div.options").each(function(){
                        for(var i=0;i<res.length;i++){
                            if($(this).attr("data-value")==res[i]){
                                $(this).addClass("selected")
                            }
                        }

                    })
                }else{
                    alert("参数必须是数组")
                }

            }else{
                for(var i=0;i<this.options.option.length;i++){
                    if(this.options.option[i].value==res){
                        this.refreshInput(this.options.option[i].label)
                    }
                }
                this.ele.find(".EventsSelect-option").find("div.options").each(function(){
                        if($(this).attr("data-value")==res){
                            $(this).addClass("selected")
                        }
                })
            }

        },
        getResult:function(){
            return this.result;
        }
    };
    $.fn.EventsSelect=function(options){
        var select=new EventsSelect(this,options);
        select.init();
        return select;
    };
})(jQuery);