define([
    "jquery"
    , "tibbr"
    , "models/subject"
]
    , function ($, Tibbr, Subject) {
        return Tibbr.SubjectLinks = Tibbr.Collection.extend({
            className: "subject_links",
            model:Subject,
            tibbrURL:{controller:"users", action:"subject_links"},
            load:function () {
                this.fetch(
                    {data:{params:{page:(this.current_page || 0) + 1, set_actions:true, per_page:5}
                    }
                    });
            }
        });
    });