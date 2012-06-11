define([
    "jquery"
    ,"tibbr"
    , "collections/users"
]
    , function ($, Tibbr, Users) {
        return  Tibbr.Idols = Users.extend({
            className:"idols",
            tibbrURL:{controller:"users", action:"idols"}
        });
    });