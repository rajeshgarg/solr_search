define([
    "jquery"
    ,"tibbr"
    , "collections/subjects"
]
    , function ($,Tibbr, Subjects) {
        return  Tibbr.Users_Search = Subjects.extend({
            tibbrURL:{controller:"users", action:"search_subjects"}
        });
    });


