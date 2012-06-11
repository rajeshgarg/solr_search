define([
    "jquery"
    , "tibbr"
    , "collections/messages"
]
    , function ($, Tibbr) {
        return Tibbr.ChatMessages = Tibbr.Messages.extend({
            className: "chat_messages",
            tibbrURL:{controller:"users", action:"subject_messages"},
            subjectId:function () {
                return  Tibbr.currentUser.get('login')  + ".c"
            },
            load:function () {
                this.fetch({data:{params:{subject_id:this.subjectId(), page:(this.current_page || 0) + 1, set_actions:true, per_page:10}}});
            }
        });
    });