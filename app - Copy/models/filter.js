define([
    "underscore"
    , "tibbr"
]
    , function (_, Tibbr) {
        return Tibbr.Filter = Tibbr.Model.extend({
            defaults:{modelType:"Filter"},
            initialize:function () {
                _.bindAll(this
                    , 'image', 'showUrl'
                );
            },
            image:function () {
                return  this._path("images/my_streams/" + this.get("type") + ".gif");
            },
            showUrl:function () {
                return this._url("messages/" + this.get("type") + "/filters");
            }

    });
    });
