define([
    "jquery"
    , "tibbr"
    , "collections/messages"
]
    , function ($, Tibbr) {
        return Tibbr.StartMessages = Tibbr.Messages.extend({
            className: "starred_messages",
            tibbrURL:{controller:"users", action:"starred_messages"},
            load:function () {
                this.fetch(
                    {data:{params:{page:(this.current_page || 0) + 1, set_actions:true, per_page:10}
                    }
                    });
            }
        });
    });