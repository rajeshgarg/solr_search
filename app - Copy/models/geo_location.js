define([
    "underscore"
    , "tibbr"
]
    , function (_, Tibbr) {
        return Tibbr.GeoLocation = Tibbr.Model.extend({
            defaults: {modelType: "GeoLocation"}
        });
    });
