define([
    "jquery"
    , "tibbr"
    , "models/reply"
]
    , function ($, Tibbr, Reply) {
        return    Tibbr.Replies = Tibbr.Collection.extend({
            className:"replies",
            tibbrURL:{action:"messages"},
            model:Reply
        });

    });