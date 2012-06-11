define([
    "underscore"
    , "tibbr"
]
    , function (_, Tibbr) {
        return Tibbr.ApplicationConfig = Tibbr.Model.extend({
                baseName:"application_configs",
                defaults:{modelType:"application_config"}
            },
            {
                metaUrl:function (id) {
                    return Tibbr.path("application_configs/new/meta_details?application_config[application_definition_id]=" + id)
                }
            });
    });
