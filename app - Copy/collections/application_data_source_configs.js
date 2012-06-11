define([
    "jquery"
    , "tibbr"
    , "models/application_data_source_config"
]
    , function ($, Tibbr, Config) {
        return Tibbr.ApplicationDefinitions = Tibbr.Collection.extend({
            className:"ApplicationDataSourceConfigs",
            tibbrURL:{controller:"application_data_source_configs"},
            model:Config
        });
    });