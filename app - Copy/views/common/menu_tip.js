define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'text!templates/common/menu_tip.html'
]
    , function ($, _, Tibbr, menuTipTmpl) {
        return Tibbr.PoupTip = Tibbr.View.extend({
            className:'more-actions-menu qtip-content',
            tagName:'ul',
            initialize:function (options) {
                _.bindAll(this, 'render');
                this.parent = this.options.parent;

            },
            events:{
                "click a.delete":'deleteBox',
                "click a.mute":'muteBox',
                "click a.unmute":'unMute',
                "click a.email":"email",
                "click a.copy_link":"copy_link",
                "click a.add":"add"
            },
            render:function () {
                $(this.el).html(this.template.render(menuTipTmpl, {model:this.model}));
                return this;
            },
            deleteBox:function () {
                this.parent.confirmDelete();
                return false;
            },
            muteBox:function () {
                this.parent.confirmMute();
                return false;
            },
            unMute:function(event){
                this.parent.unMute();
                return false;
            },
            copy_link:function(event){
                this.parent.copyLink(event.target);
                return false;
            },
            email:function () {
                this.parent.email();
                return false;
            },
            add:function(){
                this.parent.add();
                return false;
            }
        });
    });