define([
    "underscore"
    , "tibbr"
    , "models/filter"
]
    , function (_, Tibbr, Filter) {
        return Tibbr.DefaultFilter = Filter.extend({
            defaults: {modelType: "DefaultFilter"},
            cssClassName:"custom-filter-link"
        });
    });