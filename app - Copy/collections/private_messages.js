define([
    "jquery"
    , "tibbr"
    , "collections/messages"
]
    , function ($, Tibbr) {
        return Tibbr.PrivateMessages = Tibbr.Messages.extend({
            className: "private_messages",
            tibbrURL:{controller:"users", action:"private_messages"},
            load:function () {
                this.fetch(
                    {data:{params:{page:(this.current_page || 0) + 1, set_actions:true, per_page:10}
                    }
                    });
            }
        });
    });