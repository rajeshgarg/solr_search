define([
    "jquery"
    , "tibbr"
    , "models/application_definition"
]
    , function ($, Tibbr, ApplicationDefinition) {
        return Tibbr.ApplicationDefinitions = Tibbr.Collection.extend({
            className:"application_definitions",
            tibbrURL:{controller:"application_definitions"},
            model:ApplicationDefinition
        });
    });