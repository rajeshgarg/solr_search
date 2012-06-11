/**
 * right now we are supporting only one link, that's why there is only the list item
 */
define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'models/link'
    , 'text!templates/messages/link.html'
]
    , function ($, _, Tibbr, Link, linkTmpl) {
        return Tibbr.MessageLinkView = Tibbr.View.extend({
            tagName:"ul",
            initialize:function () {
                _.bindAll(this, 'render');
            },
            events:{},
            render:function () {
                $(this.el).html(this.template.render(linkTmpl, {model:this.model}));
                return this;
            }


        });
    });