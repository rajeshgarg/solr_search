define([
    "underscore"
    , "tibbr"
]
    , function (_, Tibbr) {
        return Tibbr.FilterCriteria = Tibbr.Model.extend({
            defaults: {"id":"", "cfield":"keywords", "cvalue":"now", "coperator":"equal_to", "destroy":"0"}
        });
    });