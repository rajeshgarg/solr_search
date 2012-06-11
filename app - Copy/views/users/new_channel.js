define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'text!templates/users/new_channel.html'
]
    , function ($, _, Tibbr, newChannel) {
        return Tibbr.ChannelNewView = Tibbr.View.extend({
            className: "email_delivery",
            events:{},
            initialize:function (options) {
                _.bindAll(this, 'render');
            },
            render:function () {
                $(this.el).html(this.template.render(newChannel, {collection:this.collection}));
                return this;
            }
        });
    });