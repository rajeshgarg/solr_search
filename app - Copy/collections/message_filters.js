define([
    'tibbr'
    , 'models/message_filter'
]
    , function (Tibbr, Filter) {
        return    Tibbr.MessageFilters = Tibbr.Collection.extend({
            className:"filters",
            tibbrURL:{controller:"users", action:"message_filters"},
            model:Filter
        });

    });