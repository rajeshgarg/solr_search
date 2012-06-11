define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'text!templates/common/see_more.html'
]
    , function ($, _, Tibbr, seeMore) {
        return Tibbr.SeeMoreView = Tibbr.View.extend({
            tagName:'p',
            className:'more-tibs',
            collection:null,
            initialize:function (options) {
                this.collection = this.options.collection;
                this.render();
                Tibbr.Event.unbind('scrolled_to_end',this.getMoreMessages, this);
                Tibbr.Event.bind('scrolled_to_end',this.getMoreMessages, this);
            },
            render:function () {
                $(this.el).html(this.template.render(seeMore));
            },
            events:{
                "click a":"getMoreMessages"
            },
            getMoreMessages:function () {
                if(! this.$("a").is('.requesting')){
                  this.collection.getMoreMessages();
                  this.$("a").append(Tibbr.UI.loader).addClass('requesting');
                 }
                return false;
            }
        });
    });