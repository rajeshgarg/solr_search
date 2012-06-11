define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'text!templates/messages/mute.html'
]
    , function ($, _, Tibbr, muteTmpl) {
        return Tibbr.MessageMuteView = Tibbr.View.extend({
            className:"confirm-mute",
            initialize:function () {
                _.bindAll(this, 'render', 'cancel');
                this.model.bind('message:mute',this.muteHandler, this );
                this.model.bind('message:unmute',this.unmuteHandler, this );
                },
            events:{
                "click a.cancel-btn":"cancel",
                "click a.yes":"yes"
            },
            render:function () {
                $(this.el).html(this.template.render(muteTmpl));
                return this;
            },
            cancel:function () {
                $(this.el).parent().children(":not('.hidden')").show();
                $(this.el).remove();
                return false;
            },
            yes:function () {
                this.model.mute();
                return false;
            },
            muteHandler: function(){
                if($("#filter-my_wall").parent("li").is(".active"))
                    $(this.el).parent().remove();
                else{
                    this.model.fetch();
                    $(this.el).remove();
                }
                return false;
            },
            unmuteHandler: function(){
                this.model.fetch();
                return false;
            }
        });
    });