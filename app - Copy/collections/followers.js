define([
    "jquery"
    ,"tibbr"
    , "collections/users"
]
    , function ($, Tibbr, Users) {
        return  Tibbr.Followers = Users.extend({
            className:"followers",
            tibbrURL:{controller:"users", action:"followers"}

        });
    });