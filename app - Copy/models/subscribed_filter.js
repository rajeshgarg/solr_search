define([
    "underscore"
    , "tibbr"
    , "models/filter"
]
    , function (_, Tibbr, Filter) {
        return Tibbr.SubscribedFilter = Filter.extend({
            defaults:{modelType:"SubscribedFilter"},
            initialize:function () {
                _.bindAll(this, 'client', 'server', 'showUrl', 'image');
                this.set({"type":this.get("name").replace(/®/g, "").replace(/\s/g, "_").toLowerCase()})
            },
            cssClassName:"subscribed-filter-link",
            client:function () {
                return this.get('app_type') === "client"
            },
            server:function () {
                return this.get('app_type') === "server"
            },
            showClientUrl:function () {
                return this.get('app_url')
            },
            showServerUrl:function () {
                return this._url("messages/" + this.get('type') + "/filters");
            },
            showUrl:function () {
                return this.client() ? this.showClientUrl() : this.showServerUrl();
            }
        });
    });