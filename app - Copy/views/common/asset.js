define([
    "jquery"
    , "underscore"
    , "tibbr"
    , "text!templates/common/asset.html"
]
    , function ($, _, Tibbr, asset) {
        return Tibbr.AssetView = Tibbr.View.extend({
            tagName:"fieldset",
            events:{
                "click .attachments a":"file",
                "click .close-btn":"close",
                "change .file":"fileChange"
            },
            initialize:function () {
                _.bindAll(this, 'render');

            },
            render:function () {
                $(this.el).html(this.template.render(asset, {}));
                return this;
            },
            file:function (event) {
                var $ele = $(event.currentTarget);
                this.$(".attach").hide();
                this.$("." + $ele.data("type") + "-attachment").show();
                return false;
            },
            close:function (event) {
                this.$(".attach").hide();
                this.clear();
                return false;
            },
            clear:function (event) {
                this.render();
            },
            fileChange:function (event) {
                var $in = $(event.target);
                this.$(".title").html($in.val());
            }
        });
    });