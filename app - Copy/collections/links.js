define([
    "tibbr"
    , "models/link"
]
    , function (Tibbr, Link) {
        return    Tibbr.Links = Tibbr.Collection.extend({
            className:"links",
            model:Link
        });

    });