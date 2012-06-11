define(["jquery"
    , "underscore"
    , "tibbr"
    , "modules/dialog"
    , 'text!templates/events/stream_item.html'
]
    , function ($, _, Tibbr, Dialog, item) {
        return Tibbr.StreamItemView = Tibbr.View.extend({
            tagName:"li",
            initialize:function (options) {
                _.bindAll(this, 'render', 'disable');
                this.model.on('change', this.render, this);
            },
            events:{
                "click a.disable":"disable",
                "click a.enable":"enable"
            },
            render:function () {
                this.$el.html(this.template.render(item, {model:this.model}));
                if (this.model.get('app_type') !== this.options.type) this.$el.hide();
                return this;
            },
            disable:function (event) {
                $(event.target).append(spinner);
                var self = this;
                self.model.action("unsubscribe", "update", {success:function () {
                    Dialog.alert({text:self.t("application_definition.actions.disable", self.model.get('name'))});
                    self.model.set({"status":"delete"})
                }});
                return false;
            },
            enable:function (event) {
                $(event.target).append(spinner);
                var self = this;
                self.model.action("subscribe", "update", {success:function () {
                    Dialog.alert({text:self.t("application_definition.actions.enable", self.model.get('name'))});
                    self.model.set({"status":"active"})
                }});
                return false;
            }
        });
    });