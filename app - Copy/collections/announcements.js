define([
    "tibbr"
    , "models/announcement"
]
    , function (Tibbr, Announcement) {
        return    Tibbr.Subjects = Tibbr.Collection.extend({
            className:"announcements",
            model:Announcement
        });

    });