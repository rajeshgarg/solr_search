define([
    "jquery"
    , "tibbr"
    , "collections/subjects"
]
    , function ($,Tibbr, Subjects) {
        return  Tibbr.MySubjects = Subjects.extend({
            className:"my_subjects",
            tibbrURL:{controller:"users", action:"subscriptions"}
        });

    });