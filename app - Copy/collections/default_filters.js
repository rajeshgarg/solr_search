define([
    "tibbr"
    , "models/default_filter"
]
    , function (Tibbr, Filter) {
        return    Tibbr.DefaultFilters = Tibbr.Collection.extend({
            className:"filters",
            model:Filter
        });

    });