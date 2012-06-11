define([
    "jquery"
    , "tibbr"
    , "collections/announcements"
]
    , function ($,Tibbr,Announcements) {
        return  Tibbr.SubjectAnnouncement = Announcements.extend({
            className:"subject_announcements",
            tibbrURL:{controller:"users", action:"subject_announcements"}
        });

    });