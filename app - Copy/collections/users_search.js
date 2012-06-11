define([
    "jquery"
    ,"tibbr"
    , "collections/users"
]
    , function ($,Tibbr, Users) {
        return  Tibbr.Users_Search = Users.extend({
            tibbrURL:{controller:"users", action:"search_users"}
        });
    });