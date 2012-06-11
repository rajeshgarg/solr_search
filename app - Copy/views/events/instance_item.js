define(["jquery"
    , "underscore"
    , "tibbr"
    , 'collections/application_data_source_configs'
    , 'models/application_data_source_config'
    , "modules/dialog"
    , 'views/common/form'
    , "views/events/instance_stream_item"
    , "views/events/instance_qtip"
    , 'text!templates/events/instance_item.html'
    , 'text!templates/events/stat.html'
]
    , function ($, _, Tibbr, DataConfigs, DataConfig, Dialog, Form, StreamItem, qTipView, item, stat) {
        return Tibbr.InstanceItemView = Tibbr.View.extend({
            tagName:"li",
            initialize:function (options) {
                _.bindAll(this, 'render', 'streamList', 'hideMenu', 'edit', 'destroy', 'addStream', 'saveStream', 'closeStream', 'streamSuccess', 'streamError');
                this.model.on('change', this.render, this);
                this.model.on('delete', this.remove, this);
                this.model.on("enable", this.enable, this);
                this.model.on("disable", this.disable, this);
                this.parent = this.options.parent;
                this.streams = new DataConfigs();
                this.streams.on("add", this.renderStreams, this);
            },
            events:{
                "click div.channel-description":"streamList",
                "click a.add-new-stream-btn":"addStream"
            },
            render:function () {
                this.$el.html(this.template.render(item, {model:this.model, definition:this.options.definition}));
                this.$(".feed-action-wrap").after(new qTipView({model:this.model, parent:this}).render().el);
                this.$('.q-tip').qtip(Tibbr.qtipConfigs.menu($(this.el)));
                var self = this;
                this.$('span.statistic').qtip({
                    content:function () {
                        return self.template.render(stat, {model:self.model.statistic})
                    },
                    position:{
                        my:'left center',
                        at:'right center',
                        viewport:$(window) // ...and make sure it stays on-screen if possible
                    },
                    show:{
                        event:'click',
                        solo:true // Only show one tooltip at a time
                    },
                    hide:'unfocus',
                    style:{
                        classes:'subject-user-snap ui-tooltip-wiki ui-tooltip-light ui-tooltip-shadow',
                        width:400,
                        tip:{
                            corner:true,
                            mimic:false,
                            method:true,
                            width:10,
                            height:10,
                            border:true,
                            offset:0

                        }
                    }
                });

                this.streams.reset(this.model.streams());
                this.renderStreams();

                return this;
            },
            renderStreams:function () {
                var $cont = this.$("li.header"), self = this;
                this.$("li.stream").remove();
                this.streams.each(function (stream) {
                    $cont.after(new StreamItem({model:stream, parent:self}).render().el);
                });
                return this;
            },
            streamList:function (event) {
                this.$(".feed-stream-list").toggle();
                $(event.target).toggleClass("active");
                return false;
            },
            addStream:function () {
                this.buildForm({id:this.model.get('application_config').id, header:"Add Stream"});
                return false;
            },

            buildForm:function (options, view) {
                options = options || {};
                var model = options.model || {};
                this.form = new Form({model:this.model, extraData:{"key":"name", "label":"Name", "position":1, "type":"string", "ui_type":"text_field", "required":true, "multi_value":false},
                    url:DataConfig.metaUrl(options.id), header:options.header, attributes:_.clone(model.attributes)});
                if (_.isObject(view)) {
                    view.$el.after(this.form.render().el);
                } else {
                    this.$(".add-stream").html(this.form.render().el).show();
                }

                this.$(".add-new-stream-btn").hide();
                this.stream = (model instanceof DataConfig) ? model : new DataConfig();
                this.form.bind("save", this.saveStream);
                this.form.bind("close", this.closeStream);
                this.form.bind("error", this.error);
            },

            saveStream:function (data) {
                _.each(data, function (d, i, l) {
                    if (_.isArray(d)) data[i] = d.join(Tibbr.separator)
                });
                this.stream.createOrUpdate(this.model.get('application_config').id, data);
                this.stream.bind('error', this.streamError);
                this.stream.bind('success', this.streamSuccess);
                this.$(".add-new-stream-btn").show();
                this.form.remove();
                return false;
            },

            editStream:function (model, view) {
                this.currentStream = view;
                this.buildForm({id:this.model.get('application_config').id, header:"Edit Stream", model:model}, view);
                return false;
            },
            error:function () {

            },
            closeStream:function () {
                this.$(".add-new-stream-btn").show();
                if (this.currentStream instanceof StreamItem) this.currentStream.reset();
                return false;
            },
            streamError:function (message) {
                Dialog.alert({text:message.join("<br />")});
                this.form.resetSave();
            },
            streamSuccess:function (type, instance) {
                if (type === "create") {
                    this.streams.add(instance);
                    this.$(".stream-" + instance.id).effect("highlight", {}, 3000);
                } else {
                    this.stream = instance;
                    this.stream.trigger("change");
                }
                this.closeStream();
            },
            hideMenu:function () {
                this.$('.q-tip').qtip('hide');
            },
            edit:function () {
                var obj = _.clone(this.model.attributes.application_config);
                this.parent.edit(this.model, obj);
                return false;
            },
            destroy:function () {
                var self = this;
                Dialog.remove({text:self.t("event.instance.delete.conformation"), okFunction:function () {
                    self.model.updateStatus("delete");
                }  })
            },
            enable:function () {
                this.model.set("status", "enabled");
            },
            disable:function () {
                this.model.set("status", "disabled");
            }
        })
    });