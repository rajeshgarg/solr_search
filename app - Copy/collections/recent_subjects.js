define([
    "jquery"
    ,"tibbr"
    , "collections/subjects"
]
    , function ($,Tibbr, Subjects) {
        return  Tibbr.Recent_Subjects = Subjects.extend({
            className:"recent_subjects",
            tibbrURL:{controller:"subjects", action:"recent_subjects"}
        });
    });