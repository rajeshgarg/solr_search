define([
    "underscore"
    , "tibbr"
]
    , function (_, Tibbr) {
        return Tibbr.OptionQuestion = Tibbr.Model.extend({
            defaults: {modelType: "OptionQuestion"}
        });
    });
