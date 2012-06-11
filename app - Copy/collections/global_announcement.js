define([
    "jquery"
    , "tibbr"
    , "collections/announcements"
]
    , function ($,Tibbr,Announcements) {
        return  Tibbr.GlobalAnnouncement = Announcements.extend({
            className:"global_announcements",
            tibbrURL:{controller:"users", action:"global_announcements"}
        });

    });