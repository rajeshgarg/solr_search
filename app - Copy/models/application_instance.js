define([
    "underscore"
    , "tibbr"
]
    , function (_, Tibbr) {
        return Tibbr.ApplicationInstance = Tibbr.Model.extend({
            baseName:"application_instances",
            defaults:{modelType:"ApplicationInstance"},
            initialize:function () {
                _.bindAll(this, "statistic", "status", "streams", 'updateStatus');
            },
            status:function () {
                return _.titleize(this.get('status'));
            },
            streams:function () {
                return this.get('application_config').data_sources
            },
            createOrUpdate:function (id, data) {
                var self = this, type = self.isNew() ? "create" : "update";
                this.save({
                        application_instance:{name:data.name, application_definition_id:id, application_config:data}
                    },
                    {
                        success:function (model, data) {
                            self.trigger("success", type, model)
                        },
                        error:function (model, data) {
                            var error = (eval(data.responseText)), all = _.flatten(error);
                            self.trigger("error", _.without(all, "base"))
                        }
                    })
            },
            statistic:function () {
                var type;
                if (this.get('status') === "disabled") {
                    type = "disabled";
                } else {
                    type = this.get('application_statistic').last_error === null ? "progress" : "error"
                }

                return type;
            },
            updateStatus:function (type) {
                var self = this;
                this.action(type, 'update', {success:function () {
                    self.trigger(type);
                }, complete:function (data) {
                    if (data.status === 200) {
                        self.trigger(type);
                        //self.trigger("delete")
                    }

                }})
            }
        });
    });