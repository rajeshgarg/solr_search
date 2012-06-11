define([
    "underscore"
    , "tibbr"
]
    , function (_, Tibbr) {
        return Tibbr.FilterCriteria = Tibbr.Model.extend({
            baseName:"translations",
            defaults: {
                modelType: "PageTranslation"
            }
        });
    });