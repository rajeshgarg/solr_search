/**
 * right now we are supporting only one asset, that's why there is only the list item
 */
define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'models/asset'
    , 'text!templates/messages/asset.html'
]
    , function ($, _, Tibbr, Asset, assetTmpl) {
        return Tibbr.MessageLinkView = Tibbr.View.extend({
            tagName:"ul",
            initialize:function () {
                _.bindAll(this, 'render');
            },
            events:{},
            render:function () {
                $(this.el).html(this.template.render(assetTmpl, {model:this.model}));
                return this;
            }


        });
    });