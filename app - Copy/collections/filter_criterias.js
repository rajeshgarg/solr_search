define([
    'tibbr'
    , 'models/filter_criteria'
]
    , function (Tibbr, FilterCriteria) {
        return    Tibbr.FiltersCriteria = Tibbr.Collection.extend({
            className:"FiltersCriteria",
            model:FilterCriteria
        });

    });