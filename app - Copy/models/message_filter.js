define([
    "underscore"
    , "tibbr"
    , "models/filter"
]
    , function (_, Tibbr, Filter) {
        return Tibbr.SubscribedFilter = Filter.extend({
            defaults:{modelType:"MessageFilter"},
            initialize:function () {
                _.bindAll(this, 'showUrl', 'image', 'manageUrl');
                this.set({"type":this.get("id")})
            },
            cssClassName:"message-filter-link",
            showUrl:function () {
                return this._url("messages/" + this.id + "/filters");
            },
            image:function () {
                return  this._path("images/my_streams/default.gif");
            },
            manageUrl:function (){
                 return this._url("filters/manage");
            }

        });
    });