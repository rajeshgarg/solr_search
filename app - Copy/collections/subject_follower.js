define([
    "jquery"
    , "tibbr"
    , "collections/subjects"
]
    , function ($, Tibbr, Subjects) {
        return Tibbr.MySubjects = Subjects.extend({
            className: "follower_stat",
            tibbrURL:{controller:"users", action:"subscribers"},
            load:function () {
                this.fetch(
                    {data:{params:{page:(this.current_page || 0) + 1, set_actions:true, per_page:10}
                    }
                    });
            }
        });
    });