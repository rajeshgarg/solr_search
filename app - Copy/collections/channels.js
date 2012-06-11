define([
    "jquery"
    , "tibbr"
    , "models/channel"
]
    , function ($, Tibbr, Channel) {
        return Tibbr.Channels = Tibbr.Collection.extend({
            className:"channels",
            model:Channel,
            tibbrURL:{controller:"users", action:"channels"}
        });

    });