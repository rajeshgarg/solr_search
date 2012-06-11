define(["jquery"
    , "underscore"
    , "tibbr"
    , "modules/dialog"
    , 'text!templates/events/instance_stream_item.html'
]
    , function ($, _, Tibbr, Dialog, item) {
        return Tibbr.InstanceStreamItemView = Tibbr.View.extend({
            tagName:"li",
            className:"stream",
            initialize:function (options) {
                _.bindAll(this, 'render', 'edit');
                this.model.on('change', this.render, this);
            },
            events:{
                "click a.edit-btn":"edit"
            },
            render:function () {
                this.$el.html(this.template.render(item, {model:this.model})).addClass("stream-" + this.model.id);
                return this;
            },

            reset:function () {
                this.$(".edit-btn").text(this.t("event.instance.edit"));
            },
            edit:function (event) {
                this.options.parent.editStream(this.model, this);
                this.$(".edit-btn").text(this.t("event.instance.editing"));
                return false;
            }
        });
    });