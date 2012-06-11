define([
    "underscore"
    , "tibbr"
]
    , function (_, Tibbr) {
        return Tibbr.Link = Tibbr.Model.extend({
            defaults: {modelType: "Link"}
        });
    });
