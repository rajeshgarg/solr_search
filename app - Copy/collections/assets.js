define([
    "tibbr"
    , "models/asset"
]
    , function (Tibbr, Asset) {
        return    Tibbr.Assets = Tibbr.Collection.extend({
            className:"assets",
            initialize:function (scopeId) {
                this.scopeId = scopeId
            },
            model:Asset
        });

    });