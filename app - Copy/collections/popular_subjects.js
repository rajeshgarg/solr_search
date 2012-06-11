define([
    "jquery"
    ,"tibbr"
    , "collections/subjects"
]
    , function ($,Tibbr, Subjects) {
        return  Tibbr.Popular_Subjects = Subjects.extend({
            className:"popular_subjects",
            tibbrURL:{controller:"users", action:"subject_trend"}

        });
    });