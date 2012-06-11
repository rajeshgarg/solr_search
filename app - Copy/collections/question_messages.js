define([
    "jquery"
    , "tibbr"
    , "collections/messages"
]
    , function ($, Tibbr) {
        return Tibbr.QuestionMessages = Tibbr.Messages.extend({
            className: "question_messages",
            tibbrURL:{controller:"users", action:"question_messages"},
            load:function () {
                this.fetch(
                    {data:{params:{page:(this.current_page || 0) + 1, set_actions:true, per_page:10}
                    }
                    });
            }
        });
    });