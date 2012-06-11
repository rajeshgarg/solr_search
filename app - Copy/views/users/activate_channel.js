define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'text!templates/users/activate_channel.html'
]
    , function ($, _, Tibbr, activateChannel) {
        return Tibbr.ChannelNewView = Tibbr.View.extend({
            className: "activate_channel",
            events:{
                "click #activation_subject_code": "activated"
            },
            initialize:function (options) {
                _.bindAll(this, 'render');
                this.model.bind('change',this.render, this);
                this.model.bind('channel_activate',this.activate, this);
                this.model.bind('success',this.success, this);
            },
            render:function () {
                $(this.el).html(this.template.render(activateChannel));
                return this;
            },
            activated: function(){
               var activation_code = $("#activation_code").val();
                console.log(activation_code);
                this.model.activate(activation_code);
            },
            success: function(){
                $(".activate_channel").hide();
            }
        });
    });