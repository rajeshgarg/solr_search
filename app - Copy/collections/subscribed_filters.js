define([
    "tibbr"
    , "models/subscribed_filter"
]
    , function (Tibbr, Filter) {
        return    Tibbr.SubscribedFilters = Tibbr.Collection.extend({
            className:"streams",
            tibbrURL: {controller: "users", action: "subscribed_applications_filters"},
            model:Filter,
            inOrder: function(){
                return this.sortBy(function(filter){
                    return filter.server()
                })
            },
            parse: function(data){
              return data
            }
        });

    });