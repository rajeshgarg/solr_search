define(['jquery'
    , 'underscore'
    , 'tibbr'
    , 'models/application_config'
    , 'models/application_instance'
    , 'views/common/form'
    , 'views/events/instance_list'
    , 'modules/dialog'
    , 'text!templates/events/configure.html'
]
    , function ($, _, Tibbr, AppConfig, ApplicationInstance, ChannelForm, InstanceList, Dialog, configure) {
        return  Tibbr.StreamItemView = Tibbr.View.extend({
            separator:Tibbr.separator,
            id:"event-streams-configure",
            className:"grid_16",
            initialize:function (options) {
                _.bindAll(this, 'render', 'addNew', 'edit', 'save', 'close', 'renderInstance', 'instanceSuccess', 'instanceError');
                this.model.on('reset', this.render);
                this.model.on("action:change", this.actionsChange, this);
                this.instances = this.options.instances;
                this.instances.on("reset", this.renderInstance);
                this.instances.on("add", this.renderInstance);
            },
            events:{
                "click a.add-new":"addNew",
                "change input.actions":"updateActions"
            },
            render:function () {
                $(this.el).html(this.template.render(configure, {model:this.model}));
                return this;
            },
            renderInstance:function () {
                var view = new InstanceList({collection:this.instances, definition:this.options.definition, parent:this});
                this.$(".instances").html(view.render().el);
            },
            addNew:function () {
                this.buildForm(this.t("application_definition.configuration.add_channel", this.model.get('name')));
                return false;
            },

            buildForm:function (header, model, attributes) {
                this.form = new ChannelForm({model:this.model, extraData:{"key":"name", "label":"Name", "position":1, "type":"string", "ui_type":"text_field", "required":true, "multi_value":false},
                    url:AppConfig.metaUrl(this.params().id), header:header, attributes:attributes});
                this.$(".add-new-channel").html(this.form.render().el).show();
                this.$(".button-wrap").hide();
                this.instance = (model instanceof ApplicationInstance) ? model : new ApplicationInstance();
                this.form.bind("save", this.save);
                this.form.bind("close", this.close);
                this.form.bind("error", this.error);
            },

            edit:function (model, attributes) {
                this.buildForm(this.t("application_definition.configuration.edit_channel", this.model.get('name')), model, attributes)
            },
            save:function (data) {
                var self = this;
                _.each(data, function (d, i, l) {
                    if (_.isArray(d)) data[i] = d.join(self.separator)
                });
                this.instance.createOrUpdate(this.model.id, data);
                this.instance.bind('error', this.instanceError);
                this.instance.bind('success', this.instanceSuccess);
            },


            error:function () {

            },
            close:function () {
                this.$(".add-new-channel").hide().empty();
                this.$(".button-wrap").show();
            },
            instanceError:function (message) {
                Dialog.alert({text:message.join("<br />")});
                this.form.resetSave();
            },
            instanceSuccess:function (type, instance) {
                if (type === "create") {
                    this.instances.add(instance);
                    if (!this.$(".channel-install").is("visible")) this.$(".channel-install").show();
                    this.$(".feed-channel-list > li").last().effect("highlight", {}, 3000);
                } else {
                    this.instance = instance;
                }
                this.close();
            },

            updateActions:function () {
                this.model.updateActions();
                return false;
            },

            actionsChange:function (type) {
                Dialog.alert({text:(type === "unsubscribe" ? this.t("application_definition.actions.disable", this.model.get('name')) : this.t("application_definition.actions.enable", this.model.get('name')) )});
            }
        });
    });