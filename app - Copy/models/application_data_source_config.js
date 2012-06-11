define([
    "underscore"
    , "tibbr"
]
    , function (_, Tibbr) {
        return Tibbr.ApplicationDataSourceConfig = Tibbr.Model.extend({
                baseName:"application_data_source_configs",
                defaults:{modelType:"ApplicationDataSourceConfig"},
                initialize:function () {
                    _.bindAll(this, "subjects")
                },
                subjects:function () {
                    return this.get("subjects").split(Tibbr.separator).join(" ");
                },
                createOrUpdate:function (id, data) {
                    var self = this, type = self.isNew() ? "create" : "update";
                    data["application_config_id"] = id;
                    if (_.isBlank(data.password)) delete data.password;
                    if (_.isBlank(data.user)) delete data.user;
                    this.save({application_data_source_config:data},
                        {
                            success:function (model, resData) {
                                self.trigger("success", type, model)
                            },
                            complete:function (model, resData) {
                                if (resData.status === 200) {
                                    self.trigger("success", type, model)
                                }
                            },
                            error:function (model, resData) {
                                if (resData.status === 200) {
                                    model.set(data, {silent: true});
                                    self.trigger("success", type, model)
                                } else {
                                    var error = (eval(data.responseText)), all = _.flatten(error);
                                    self.trigger("error", _.without(all, "base"))
                                }
                            }
                        })
                }
            },
            {
                metaUrl:function (id) {
                    return Tibbr.path("application_data_source_configs/new/meta_details?application_data_source_config[application_config_id]=" + id)
                }
            })
    });