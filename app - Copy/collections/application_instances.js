define([
    "jquery"
    , "tibbr"
    , "models/application_instance"
]
    , function ($, Tibbr, Instance) {
        return Tibbr.ApplicationDefinitions = Tibbr.Collection.extend({
            className:"ApplicationInstances",
            tibbrURL:{controller:"application_instances"},
            model:Instance,
            all:function (definitionId) {
                this.fetch({data:{"application_definition_id":definitionId}, success:function (collection, data) {
                    collection.reset(data);
                }})
            }
        });
    });