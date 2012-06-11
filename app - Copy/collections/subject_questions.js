define([
    "jquery"
    , "tibbr"
    , "models/message"
]
    , function ($, Tibbr, Message) {
        return Tibbr.SubjectQuestions = Tibbr.Collection.extend({
            className: "subject_questions",
            model:Message,
            tibbrURL:{controller:"users", action:"subject_questions"},
            load:function () {
                this.fetch(
                    {data:{params:{page:(this.current_page || 0) + 1, set_actions:true, per_page:5}
                    }
                    });
            }
        });
    });